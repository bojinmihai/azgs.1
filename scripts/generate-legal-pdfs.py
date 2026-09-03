#!/usr/bin/env python3
"""Generate the four versioned AZGS legal PDFs from the website HTML sources."""

from __future__ import annotations

import argparse
import html as html_std
import re
import shutil
import subprocess
import tempfile
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

import reportlab
from lxml import html
from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.pdfdoc import PDFString
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
PUBLIC_DIR = ROOT / "public" / "downloads" / "legal"

NAVY = colors.HexColor("#1E3A5F")
NAVY_DARK = colors.HexColor("#142A45")
ORANGE = colors.HexColor("#F5A623")
ORANGE_DARK = colors.HexColor("#A85D00")
TEXT = colors.HexColor("#1F2937")
MUTED = colors.HexColor("#5E6A78")
BORDER = colors.HexColor("#D9DEE5")
SURFACE = colors.HexColor("#F7F8FA")
NOTE_BG = colors.HexColor("#FFF8E1")
WHITE = colors.white


@dataclass(frozen=True)
class PdfSpec:
    source: str
    filename: str
    locale: str
    lang_tag: str
    audience: str
    version: str
    effective_date: str
    binding: bool

    @property
    def source_path(self) -> Path:
        return ROOT / self.source

    @property
    def output_path(self) -> Path:
        return OUTPUT_DIR / self.filename

    @property
    def public_path(self) -> Path:
        return PUBLIC_DIR / self.filename


SPECS = (
    PdfSpec(
        source="content/pages/terms.nl.html",
        filename="azgs-algemene-voorwaarden-consumenten-nl-v1-0-2026-09-03.pdf",
        locale="nl",
        lang_tag="nl-NL",
        audience="B2C",
        version="1.0",
        effective_date="3 september 2026",
        binding=True,
    ),
    PdfSpec(
        source="content/pages/terms.en.html",
        filename="azgs-consumer-terms-and-conditions-en-v1-0-2026-09-03.pdf",
        locale="en",
        lang_tag="en-GB",
        audience="B2C",
        version="1.0",
        effective_date="3 September 2026",
        binding=False,
    ),
    PdfSpec(
        source="content/pages/termsBusiness.nl.html",
        filename="azgs-algemene-voorwaarden-zakelijk-nl-v1-1-2026-09-03.pdf",
        locale="nl",
        lang_tag="nl-NL",
        audience="B2B",
        version="1.1",
        effective_date="3 september 2026",
        binding=True,
    ),
    PdfSpec(
        source="content/pages/termsBusiness.en.html",
        filename="azgs-business-terms-and-conditions-en-v1-1-2026-09-03.pdf",
        locale="en",
        lang_tag="en-GB",
        audience="B2B",
        version="1.1",
        effective_date="3 September 2026",
        binding=False,
    ),
)


def register_fonts() -> None:
    fonts_dir = Path(reportlab.__file__).resolve().parent / "fonts"
    files = {
        "AZGS-Regular": "Vera.ttf",
        "AZGS-Bold": "VeraBd.ttf",
        "AZGS-Italic": "VeraIt.ttf",
        "AZGS-BoldItalic": "VeraBI.ttf",
    }
    for name, filename in files.items():
        pdfmetrics.registerFont(TTFont(name, str(fonts_dir / filename)))
    pdfmetrics.registerFontFamily(
        "AZGS",
        normal="AZGS-Regular",
        bold="AZGS-Bold",
        italic="AZGS-Italic",
        boldItalic="AZGS-BoldItalic",
    )


def normalize_text(value: str) -> str:
    """Keep PDF text predictable and avoid typographic dash compatibility issues."""
    replacements = {
        "\u00a0": " ",
        "\u2010": "-",
        "\u2011": "-",
        "\u2012": "-",
        "\u2013": "-",
        "\u2014": "-",
        "\u2212": "-",
    }
    for old, new in replacements.items():
        value = value.replace(old, new)
    return re.sub(r"\s+", " ", value)


def class_names(element) -> set[str]:
    return set((element.get("class") or "").split())


def inline_markup(element) -> str:
    parts: list[str] = []

    def walk(node) -> None:
        if node.text:
            parts.append(html_std.escape(normalize_text(node.text)))
        for child in node:
            tag = str(child.tag).lower() if isinstance(child.tag, str) else ""
            if tag in {"ol", "ul"}:
                pass
            elif tag == "br":
                parts.append("<br/>")
            else:
                before = len(parts)
                walk(child)
                content = "".join(parts[before:])
                del parts[before:]
                if tag in {"strong", "b"}:
                    parts.append(f"<b>{content}</b>")
                elif tag in {"em", "i"}:
                    parts.append(f"<i>{content}</i>")
                elif tag == "a":
                    href = child.get("href", "")
                    if href.startswith("/"):
                        href = f"https://azgs.nl{href}"
                    safe_href = html_std.escape(href, quote=True)
                    parts.append(
                        f'<link href="{safe_href}" color="#A85D00"><u>{content}</u></link>'
                    )
                else:
                    parts.append(content)
            if child.tail:
                parts.append(html_std.escape(normalize_text(child.tail)))

    walk(element)
    return "".join(parts).strip()


def plain_text(element) -> str:
    return normalize_text(" ".join(element.itertext())).strip()


def make_styles():
    sample = getSampleStyleSheet()
    return {
        "kicker": ParagraphStyle(
            "Kicker",
            parent=sample["Normal"],
            fontName="AZGS-Bold",
            fontSize=8,
            leading=10,
            textColor=ORANGE_DARK,
            spaceAfter=8,
        ),
        "title": ParagraphStyle(
            "Title",
            parent=sample["Title"],
            fontName="AZGS-Bold",
            fontSize=21,
            leading=25,
            textColor=NAVY,
            alignment=TA_LEFT,
            spaceAfter=10,
        ),
        "subtitle": ParagraphStyle(
            "Subtitle",
            parent=sample["Normal"],
            fontName="AZGS-Regular",
            fontSize=9.5,
            leading=14,
            textColor=MUTED,
            spaceAfter=10,
        ),
        "version": ParagraphStyle(
            "Version",
            parent=sample["Normal"],
            fontName="AZGS-Bold",
            fontSize=9,
            leading=12,
            textColor=NAVY_DARK,
            spaceAfter=12,
        ),
        "scope": ParagraphStyle(
            "Scope",
            parent=sample["Normal"],
            fontName="AZGS-Regular",
            fontSize=8.3,
            leading=12,
            textColor=TEXT,
        ),
        "toc_title": ParagraphStyle(
            "ContentsHeading",
            parent=sample["Heading2"],
            fontName="AZGS-Bold",
            fontSize=10.5,
            leading=13,
            textColor=NAVY,
            spaceBefore=8,
            spaceAfter=5,
        ),
        "toc_item": ParagraphStyle(
            "ContentsItem",
            parent=sample["Normal"],
            fontName="AZGS-Regular",
            fontSize=6.9,
            leading=9.3,
            textColor=TEXT,
        ),
        "article": ParagraphStyle(
            "ArticleHeading",
            parent=sample["Heading2"],
            fontName="AZGS-Bold",
            fontSize=12.2,
            leading=15.5,
            textColor=NAVY,
            spaceBefore=11,
            spaceAfter=6,
            keepWithNext=True,
        ),
        "heading3": ParagraphStyle(
            "Subheading",
            parent=sample["Heading3"],
            fontName="AZGS-Bold",
            fontSize=9.5,
            leading=12.5,
            textColor=NAVY,
            spaceBefore=8,
            spaceAfter=4,
            keepWithNext=True,
        ),
        "body": ParagraphStyle(
            "LegalBody",
            parent=sample["BodyText"],
            fontName="AZGS-Regular",
            fontSize=8.15,
            leading=11.7,
            textColor=TEXT,
            spaceAfter=5,
            allowWidows=0,
            allowOrphans=0,
        ),
        "list": ParagraphStyle(
            "LegalList",
            parent=sample["BodyText"],
            fontName="AZGS-Regular",
            fontSize=8.05,
            leading=11.6,
            textColor=TEXT,
            leftIndent=16,
            firstLineIndent=-14,
            spaceAfter=4,
            allowWidows=0,
            allowOrphans=0,
        ),
        "nested_list": ParagraphStyle(
            "NestedLegalList",
            parent=sample["BodyText"],
            fontName="AZGS-Regular",
            fontSize=7.9,
            leading=11.3,
            textColor=TEXT,
            leftIndent=31,
            firstLineIndent=-13,
            spaceAfter=3,
            allowWidows=0,
            allowOrphans=0,
        ),
        "definition_term": ParagraphStyle(
            "DefinitionTerm",
            parent=sample["Normal"],
            fontName="AZGS-Bold",
            fontSize=7.3,
            leading=10,
            textColor=MUTED,
        ),
        "definition_value": ParagraphStyle(
            "DefinitionValue",
            parent=sample["Normal"],
            fontName="AZGS-Regular",
            fontSize=7.8,
            leading=10.5,
            textColor=TEXT,
        ),
        "box": ParagraphStyle(
            "BoxText",
            parent=sample["Normal"],
            fontName="AZGS-Regular",
            fontSize=7.9,
            leading=11.4,
            textColor=TEXT,
            spaceAfter=4,
        ),
        "closing": ParagraphStyle(
            "Closing",
            parent=sample["Normal"],
            fontName="AZGS-Bold",
            fontSize=7.8,
            leading=10.5,
            textColor=NAVY,
        ),
        "header": ParagraphStyle(
            "Header",
            parent=sample["Normal"],
            fontName="AZGS-Bold",
            fontSize=7.4,
            leading=9,
            textColor=NAVY,
        ),
        "footer": ParagraphStyle(
            "Footer",
            parent=sample["Normal"],
            fontName="AZGS-Regular",
            fontSize=6.8,
            leading=8,
            textColor=MUTED,
        ),
        "footer_right": ParagraphStyle(
            "FooterRight",
            parent=sample["Normal"],
            fontName="AZGS-Regular",
            fontSize=6.8,
            leading=8,
            textColor=MUTED,
            alignment=TA_RIGHT,
        ),
    }


class LegalDocTemplate(BaseDocTemplate):
    def __init__(self, filename: str, spec: PdfSpec, styles, total_pages: int | None):
        super().__init__(
            filename,
            pagesize=A4,
            leftMargin=18 * mm,
            rightMargin=18 * mm,
            topMargin=23 * mm,
            bottomMargin=19 * mm,
            title="",
            author="AZ Grand Solutions vof",
            allowSplitting=1,
        )
        self.spec = spec
        self.styles = styles
        self.total_pages = total_pages
        self.outline_counter = 0
        frame = Frame(
            self.leftMargin,
            self.bottomMargin,
            self.width,
            self.height,
            id="legal-body",
            leftPadding=0,
            rightPadding=0,
            topPadding=0,
            bottomPadding=0,
        )
        self.addPageTemplates(PageTemplate(id="legal", frames=[frame], onPage=self.draw_page))

    def beforeDocument(self):
        self.canv.setTitle(self.document_title)
        self.canv.setAuthor("AZ Grand Solutions vof")
        translation_status = (
            "binding Dutch draft for external legal review"
            if self.spec.binding
            else "informational English translation; Dutch text controls; draft for external legal review"
        )
        self.canv.setSubject(
            f"{self.spec.audience} general terms and conditions, version {self.spec.version}; {translation_status}"
        )
        self.canv.setCreator("AZ Grand Solutions legal PDF generator")
        self.canv.setKeywords(
            f"AZ Grand Solutions vof, {self.spec.audience}, general terms, version {self.spec.version}"
        )
        self.canv._doc.Catalog.Lang = PDFString(self.spec.lang_tag)
        self.canv.showOutline()

    def draw_page(self, canvas, _doc):
        width, height = A4
        canvas.saveState()
        canvas.setStrokeColor(BORDER)
        canvas.setLineWidth(0.55)
        canvas.line(18 * mm, height - 17.5 * mm, width - 18 * mm, height - 17.5 * mm)
        canvas.line(18 * mm, 13 * mm, width - 18 * mm, 13 * mm)

        logo_path = ROOT / "public" / "android-chrome-192.png"
        if logo_path.exists():
            canvas.drawImage(
                str(logo_path),
                18 * mm,
                height - 15.4 * mm,
                width=8.2 * mm,
                height=8.2 * mm,
                preserveAspectRatio=True,
                mask="auto",
                anchor="sw",
            )
        canvas.setFont("AZGS-Bold", 7.6)
        canvas.setFillColor(NAVY)
        canvas.drawString(28.5 * mm, height - 12.1 * mm, "AZ Grand Solutions vof")
        canvas.setFont("AZGS-Regular", 6.6)
        canvas.setFillColor(MUTED)
        status_label = "CONCEPT" if self.spec.locale == "nl" else "DRAFT"
        canvas.drawRightString(
            width - 18 * mm,
            height - 12.1 * mm,
            f"{self.spec.audience} / {self.spec.locale.upper()} / v{self.spec.version} / {status_label}",
        )

        canvas.setFont("AZGS-Regular", 6.7)
        canvas.setFillColor(MUTED)
        footer_left = (
            "azgs.nl"
            if self.spec.binding
            else "azgs.nl / informational translation - Dutch text controls"
        )
        canvas.drawString(18 * mm, 8.8 * mm, footer_left)
        page_number = canvas.getPageNumber()
        if self.total_pages:
            page_text = (
                f"Pagina {page_number} van {self.total_pages}"
                if self.spec.locale == "nl"
                else f"Page {page_number} of {self.total_pages}"
            )
        else:
            page_text = f"{page_number}"
        canvas.drawRightString(width - 18 * mm, 8.8 * mm, page_text)
        canvas.restoreState()

    def afterFlowable(self, flowable):
        if isinstance(flowable, Paragraph) and flowable.style.name == "ArticleHeading":
            self.outline_counter += 1
            key = getattr(flowable, "bookmark_name", f"article-{self.outline_counter}")
            title = flowable.getPlainText()
            self.canv.bookmarkPage(key)
            self.canv.addOutlineEntry(title, key, level=0, closed=False)


def parse_source(spec: PdfSpec):
    document = html.fromstring(spec.source_path.read_text(encoding="utf-8"))
    hero = next(
        e for e in document.iter("section") if "legal-hero" in class_names(e)
    )
    scope = next(
        e for e in document.iter("section") if "legal-scope-note" in class_names(e)
    )
    article = next(
        e for e in document.iter("article") if "legal-text" in class_names(e)
    )
    title = next(hero.iter("h1"))
    subtitle = next(
        e for e in hero.iter("p") if "legal-hero-subtitle" in class_names(e)
    )
    version = next(e for e in hero.iter("p") if e.find("strong") is not None)
    scope_p = next(scope.iter("p"))
    primary_download = next(
        e
        for e in hero.iter("a")
        if "btn-primary" in class_names(e)
    )
    assert Path(primary_download.get("href", "")).name == spec.filename
    assert primary_download.get("data-audience") == spec.audience.lower()
    assert primary_download.get("data-document-language") == spec.locale
    assert primary_download.get("data-document-version") == spec.version
    assert spec.version in plain_text(version)
    assert spec.effective_date in plain_text(version)
    closing = next(
        e for e in article.iter("div") if "legal-last-updated" in class_names(e)
    )
    assert spec.version in plain_text(closing)
    assert spec.effective_date in plain_text(closing)
    return title, subtitle, version, scope_p, article


def list_flowables(element, styles, level: int = 0):
    result = []
    children = [child for child in element if str(child.tag).lower() == "li"]
    ordered = str(element.tag).lower() == "ol"
    alpha = "sub-list" in class_names(element)
    for index, item in enumerate(children, start=1):
        if ordered and alpha:
            prefix = f"{chr(96 + index)}."
        elif ordered:
            prefix = f"{index}."
        else:
            prefix = "-"
        style = styles["nested_list"] if level else styles["list"]
        markup = inline_markup(item)
        result.append(
            Paragraph(
                f'<font color="#A85D00"><b>{prefix}</b></font> {markup}',
                style,
            )
        )
        for nested in item:
            if str(nested.tag).lower() in {"ol", "ul"}:
                result.extend(list_flowables(nested, styles, level + 1))
    return result


def definition_table(element, styles):
    terms = [child for child in element if str(child.tag).lower() in {"dt", "dd"}]
    rows = []
    index = 0
    while index < len(terms):
        term = terms[index]
        value = terms[index + 1] if index + 1 < len(terms) else None
        rows.append(
            [
                Paragraph(inline_markup(term), styles["definition_term"]),
                Paragraph(inline_markup(value), styles["definition_value"])
                if value is not None
                else "",
            ]
        )
        index += 2
    table = Table(rows, colWidths=[42 * mm, 126 * mm], hAlign="LEFT", repeatRows=0)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), SURFACE),
                ("BOX", (0, 0), (-1, -1), 0.55, BORDER),
                ("LINEBEFORE", (0, 0), (0, -1), 2.2, ORANGE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 4.5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4.5),
            ]
        )
    )
    return table


def boxed_paragraphs(element, styles):
    content = []
    for child in element:
        if str(child.tag).lower() == "p":
            value = plain_text(child)
            field_match = re.match(r"^(.*?:)\s*\.{8,}\s*$", value)
            if field_match:
                field = Table(
                    [[Paragraph(html_std.escape(field_match.group(1)), styles["box"]), ""]],
                    colWidths=[61 * mm, 97 * mm],
                )
                field.setStyle(
                    TableStyle(
                        [
                            ("LINEBELOW", (1, 0), (1, 0), 0.55, MUTED),
                            ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
                            ("LEFTPADDING", (0, 0), (-1, -1), 0),
                            ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                            ("TOPPADDING", (0, 0), (-1, -1), 3),
                            ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
                        ]
                    )
                )
                content.append(field)
            else:
                content.append(Paragraph(inline_markup(child), styles["box"]))
    table = Table([[content]], colWidths=[168 * mm], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), SURFACE),
                ("BOX", (0, 0), (-1, -1), 0.55, BORDER),
                ("LINEBEFORE", (0, 0), (0, -1), 2.2, ORANGE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    return table


def closing_box(element, styles):
    parts = [plain_text(child) for child in element if plain_text(child)]
    text = " / ".join(parts)
    table = Table(
        [[Paragraph(html_std.escape(text), styles["closing"])]],
        colWidths=[168 * mm],
        hAlign="LEFT",
    )
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), SURFACE),
                ("BOX", (0, 0), (-1, -1), 0.55, BORDER),
                ("LINEBEFORE", (0, 0), (0, -1), 2.2, ORANGE),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    return table


def article_flowables(article, styles):
    story = []
    for child in article:
        tag = str(child.tag).lower() if isinstance(child.tag, str) else ""
        if tag == "h2":
            if child.get("id") == "b2c-annex-a":
                story.append(PageBreak())
            heading = Paragraph(inline_markup(child), styles["article"])
            heading.bookmark_name = child.get("id") or f"article-{len(story) + 1}"
            story.append(heading)
        elif tag == "h3":
            story.append(Paragraph(inline_markup(child), styles["heading3"]))
        elif tag == "p":
            story.append(Paragraph(inline_markup(child), styles["body"]))
        elif tag in {"ol", "ul"}:
            story.extend(list_flowables(child, styles))
        elif tag == "dl":
            story.extend([definition_table(child, styles), Spacer(1, 6)])
        elif tag == "div" and "legal-withdrawal-form" in class_names(child):
            story.extend([boxed_paragraphs(child, styles), Spacer(1, 6)])
        elif tag == "div" and "legal-last-updated" in class_names(child):
            story.extend([Spacer(1, 8), closing_box(child, styles)])
        elif tag == "div":
            story.extend(article_flowables(child, styles))
    return story


def contents_table(article, styles, locale: str):
    headings = [child for child in article if str(child.tag).lower() == "h2"]
    items = []
    for heading in headings:
        identifier = heading.get("id", "")
        label = inline_markup(heading)
        items.append(
            Paragraph(
                f'<link href="#{html_std.escape(identifier, quote=True)}" color="#1E3A5F">{label}</link>',
                styles["toc_item"],
            )
        )
    split_at = (len(items) + 1) // 2
    left = items[:split_at]
    right = items[split_at:]
    rows = []
    for index in range(split_at):
        rows.append([left[index], "", right[index] if index < len(right) else ""])
    table = Table(rows, colWidths=[81 * mm, 6 * mm, 81 * mm], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 3),
                ("TOPPADDING", (0, 0), (-1, -1), 1.6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1.6),
            ]
        )
    )
    title = "Inhoud" if locale == "nl" else "Contents"
    return [Paragraph(title, styles["toc_title"]), table]


def build_story(spec: PdfSpec, styles):
    title, subtitle, version, scope, article = parse_source(spec)
    binding_label = (
        "NEDERLANDSE JURIDISCH LEIDENDE TEKST"
        if spec.binding
        else "INFORMATIONAL ENGLISH TRANSLATION - DUTCH TEXT CONTROLS"
    )
    story = [
        Spacer(1, 4 * mm),
        Paragraph(f"{spec.audience} / {binding_label}", styles["kicker"]),
        Paragraph(inline_markup(title), styles["title"]),
        Paragraph(inline_markup(subtitle), styles["subtitle"]),
        Paragraph(inline_markup(version), styles["version"]),
    ]
    scope_table = Table(
        [[Paragraph(inline_markup(scope), styles["scope"])]],
        colWidths=[168 * mm],
        hAlign="LEFT",
    )
    scope_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), NOTE_BG),
                ("BOX", (0, 0), (-1, -1), 0.7, ORANGE),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    story.extend(
        [
            scope_table,
            Spacer(1, 7),
            *contents_table(article, styles, spec.locale),
            PageBreak(),
            *article_flowables(article, styles),
        ]
    )
    return story, plain_text(title)


def build_pdf(spec: PdfSpec, destination: Path, total_pages: int | None, styles) -> str:
    story, document_title = build_story(spec, styles)
    document = LegalDocTemplate(str(destination), spec, styles, total_pages)
    document.document_title = document_title
    document.build(story)
    return document_title


def generate_one(spec: PdfSpec, qa_root: Path, styles) -> int:
    first_pass = qa_root / "first-pass" / spec.filename
    first_pass.parent.mkdir(parents=True, exist_ok=True)
    build_pdf(spec, first_pass, None, styles)
    page_count = len(PdfReader(str(first_pass)).pages)
    build_pdf(spec, spec.output_path, page_count, styles)
    shutil.copyfile(spec.output_path, spec.public_path)
    return page_count


def render_pdf(pdf: Path, render_dir: Path) -> list[Path]:
    pdftoppm = shutil.which("pdftoppm")
    if not pdftoppm:
        raise RuntimeError("pdftoppm was not found on PATH")
    render_dir.mkdir(parents=True, exist_ok=True)
    prefix = render_dir / pdf.stem
    subprocess.run(
        [pdftoppm, "-png", "-r", "150", str(pdf), str(prefix)],
        check=True,
        capture_output=True,
        text=True,
    )
    return sorted(render_dir.glob(f"{pdf.stem}-*.png"))


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--audience",
        choices=("B2C", "B2B"),
        help="Generate only the selected audience; omit to generate all legal PDFs.",
    )
    parser.add_argument(
        "--qa-dir",
        type=Path,
        help="Optional QA directory (for example tmp/pdfs/legal-qa).",
    )
    parser.add_argument(
        "--render",
        action="store_true",
        help="Render every generated page to PNG in the selected QA directory.",
    )
    args = parser.parse_args()

    register_fonts()
    styles = make_styles()
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    qa_root = args.qa_dir.resolve() if args.qa_dir else Path(tempfile.mkdtemp(prefix="azgs-legal-pdf-qa-"))
    qa_root.mkdir(parents=True, exist_ok=True)
    selected_specs = tuple(spec for spec in SPECS if not args.audience or spec.audience == args.audience)

    for spec in selected_specs:
        page_count = generate_one(spec, qa_root, styles)
        print(f"GENERATED {spec.output_path.relative_to(ROOT)} ({page_count} pages)")
        print(f"COPIED    {spec.public_path.relative_to(ROOT)}")
        if args.render:
            rendered = render_pdf(spec.output_path, qa_root / "rendered" / spec.output_path.stem)
            print(f"RENDERED  {len(rendered)} pages for {spec.filename}")

    print(f"QA_DIR    {qa_root}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
