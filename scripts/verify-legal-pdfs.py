#!/usr/bin/env python3
"""Verify AZGS legal PDFs structurally, textually and against their public copies."""

from __future__ import annotations

import hashlib
import re
from dataclasses import dataclass
from pathlib import Path

import pdfplumber
from lxml import html
from pypdf import PdfReader
from pypdf.generic import ContentStream


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
PUBLIC_DIR = ROOT / "public" / "downloads" / "legal"
A4_WIDTH = 595.276
A4_HEIGHT = 841.89


@dataclass(frozen=True)
class ExpectedPdf:
    filename: str
    source: str
    lang: str
    version_phrase: str
    outline_count: int
    required_phrases: tuple[str, ...]


EXPECTED = (
    ExpectedPdf(
        "azgs-algemene-voorwaarden-consumenten-nl-v1-0-2026-09-03.pdf",
        "content/pages/terms.nl.html",
        "nl-NL",
        "Versie 1.0",
        19,
        (
            "AZ Grand Solutions vof",
            "000053925335",
            "Artikel 7:758 lid 4 BW",
            "Bijlage A - Modelformulier voor herroeping",
        ),
    ),
    ExpectedPdf(
        "azgs-consumer-terms-and-conditions-en-v1-0-2026-09-03.pdf",
        "content/pages/terms.en.html",
        "en-GB",
        "Version 1.0",
        19,
        (
            "AZ Grand Solutions vof",
            "000053925335",
            "Section 7:758(4)",
            "Annex A - Model withdrawal form",
            "informational translation",
        ),
    ),
    ExpectedPdf(
        "azgs-algemene-voorwaarden-zakelijk-nl-v1-1-2026-09-03.pdf",
        "content/pages/termsBusiness.nl.html",
        "nl-NL",
        "Versie 1.1",
        23,
        (
            "AZ Grand Solutions vof",
            "000053925335",
            "artikel 7:758 lid 4 BW",
            "uitsluitend B2B",
        ),
    ),
    ExpectedPdf(
        "azgs-business-terms-and-conditions-en-v1-1-2026-09-03.pdf",
        "content/pages/termsBusiness.en.html",
        "en-GB",
        "Version 1.1",
        23,
        (
            "AZ Grand Solutions vof",
            "000053925335",
            "Section 7:758(4)",
            "informational translation",
        ),
    ),
)


def digest(path: Path) -> str:
    hasher = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            hasher.update(chunk)
    return hasher.hexdigest()


def root_object(reader: PdfReader):
    root = reader.trailer["/Root"]
    return root.get_object() if hasattr(root, "get_object") else root


def assert_safe_catalog(reader: PdfReader, filename: str) -> None:
    root = root_object(reader)
    forbidden_root_keys = {"/OpenAction", "/AA", "/AcroForm"}
    present = forbidden_root_keys.intersection(root.keys())
    assert not present, f"{filename}: forbidden catalog entries: {sorted(present)}"
    names = root.get("/Names")
    if names:
        names = names.get_object() if hasattr(names, "get_object") else names
        forbidden_names = {"/JavaScript", "/EmbeddedFiles"}.intersection(names.keys())
        assert not forbidden_names, f"{filename}: forbidden names: {sorted(forbidden_names)}"


def outline_items(items) -> int:
    count = 0
    for item in items:
        if isinstance(item, list):
            count += outline_items(item)
        else:
            count += 1
    return count


def font_is_embedded(font) -> bool:
    font = font.get_object() if hasattr(font, "get_object") else font
    descendants = font.get("/DescendantFonts")
    if descendants:
        return all(font_is_embedded(descendant) for descendant in descendants)
    descriptor = font.get("/FontDescriptor")
    if not descriptor:
        return False
    descriptor = descriptor.get_object() if hasattr(descriptor, "get_object") else descriptor
    return any(key in descriptor for key in ("/FontFile", "/FontFile2", "/FontFile3"))


def assert_embedded_fonts(reader: PdfReader, filename: str) -> None:
    checked = set()
    for page_number, page in enumerate(reader.pages, start=1):
        resources = page.get("/Resources")
        if not resources:
            continue
        resources = resources.get_object() if hasattr(resources, "get_object") else resources
        fonts = resources.get("/Font")
        if not fonts:
            continue
        fonts = fonts.get_object() if hasattr(fonts, "get_object") else fonts
        used_fonts = set()
        current_font = None
        stream = ContentStream(page.get_contents(), reader)
        for operands, operator in stream.operations:
            if operator == b"BT":
                current_font = None
            elif operator == b"Tf":
                current_font = str(operands[0])
            elif operator in {b"Tj", b"TJ", b"'", b'"'} and current_font:
                used_fonts.add(current_font)
        for name, reference in fonts.items():
            if str(name) not in used_fonts:
                continue
            key = str(reference)
            if key in checked:
                continue
            checked.add(key)
            assert font_is_embedded(reference), (
                f"unembedded font {name} on page {page_number}: {filename}"
            )


def normalize_text(value: str) -> str:
    for dash in "\u2010\u2011\u2012\u2013\u2014\u2212":
        value = value.replace(dash, "-")
    value = value.replace("\u00a0", " ")
    return re.sub(r"\s+", " ", value).strip()


def source_blocks(source_path: Path) -> list[str]:
    document = html.fromstring(source_path.read_text(encoding="utf-8"))
    article = next(
        element
        for element in document.iter("article")
        if "legal-text" in (element.get("class") or "").split()
    )
    blocks = []

    def rendered_text(element) -> str:
        parts = [element.text or ""]
        for child in element:
            if str(child.tag).lower() == "br":
                parts.append(" ")
            else:
                parts.append(rendered_text(child))
            parts.append(child.tail or "")
        return "".join(parts)

    for element in article.iter():
        if str(element.tag).lower() not in {"h2", "p", "li", "dt", "dd"}:
            continue
        if any(
            str(ancestor.tag).lower() in {"li", "p", "dt", "dd"}
            for ancestor in element.iterancestors()
            if ancestor is not article
        ):
            continue
        value = normalize_text(rendered_text(element))
        dotted = re.match(r"^(.*?:)\s*\.{8,}\s*$", value)
        if dotted:
            value = dotted.group(1)
        if value:
            blocks.append(value)
    return blocks


def verify(spec: ExpectedPdf) -> None:
    output = OUTPUT_DIR / spec.filename
    public = PUBLIC_DIR / spec.filename
    assert output.is_file(), f"missing QA PDF: {output}"
    assert public.is_file(), f"missing public PDF: {public}"
    assert output.stat().st_size > 25_000, f"unexpectedly small PDF: {output}"
    assert digest(output) == digest(public), f"public copy differs: {spec.filename}"

    reader = PdfReader(str(output))
    assert 2 <= len(reader.pages) <= 30, f"unexpected page count: {spec.filename}"
    assert not reader.is_encrypted, f"encrypted PDF: {spec.filename}"
    root = root_object(reader)
    assert str(root.get("/Lang", "")) == spec.lang, f"incorrect /Lang: {spec.filename}"
    assert_safe_catalog(reader, spec.filename)
    assert_embedded_fonts(reader, spec.filename)
    assert outline_items(reader.outline) == spec.outline_count, (
        f"incorrect outline count: {spec.filename}"
    )
    assert reader.metadata is not None
    assert reader.metadata.author == "AZ Grand Solutions vof"
    assert spec.version_phrase.split()[-1] in (reader.metadata.subject or "")

    for page_number, page in enumerate(reader.pages, start=1):
        width = float(page.mediabox.width)
        height = float(page.mediabox.height)
        assert abs(width - A4_WIDTH) < 1, f"page {page_number} is not A4: {spec.filename}"
        assert abs(height - A4_HEIGHT) < 1, f"page {page_number} is not A4: {spec.filename}"

    with pdfplumber.open(output) as pdf:
        page_texts = [(page.extract_text() or "").strip() for page in pdf.pages]
        body_texts = [
            (
                page.crop((0, 50, page.width, page.height - 38)).extract_text()
                or ""
            ).strip()
            for page in pdf.pages
        ]
    assert all(len(text) > 120 for text in page_texts), f"blank/sparse page: {spec.filename}"
    all_text = "\n".join(page_texts)
    normalized_pdf_text = normalize_text(all_text).casefold()
    normalized_body_text = normalize_text(" ".join(body_texts)).casefold()
    assert spec.version_phrase in all_text, f"missing version: {spec.filename}"
    for phrase in spec.required_phrases:
        assert normalize_text(phrase).casefold() in normalized_pdf_text, (
            f"missing required phrase {phrase!r}: {spec.filename}"
        )
    for block in source_blocks(ROOT / spec.source):
        assert block.casefold() in normalized_body_text, (
            f"source block omitted or changed in PDF: {block[:100]!r} ({spec.filename})"
        )
    expected_footer = (
        rf"Pagina\s+\d+\s+van\s+{len(page_texts)}"
        if spec.lang == "nl-NL"
        else rf"Page\s+\d+\s+of\s+{len(page_texts)}"
    )
    for page_number, text in enumerate(page_texts, start=1):
        assert re.search(expected_footer, text), (
            f"missing page x/y footer on page {page_number}: {spec.filename}"
        )
    assert not re.search(r"[\u2010-\u2014\u2212]", all_text), (
        f"non-ASCII dash found: {spec.filename}"
    )
    print(f"PASS {spec.filename}: {len(page_texts)} pages, {output.stat().st_size} bytes")


def main() -> int:
    for spec in EXPECTED:
        verify(spec)
    print(f"PASS all {len(EXPECTED)} legal PDFs and public copies")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
