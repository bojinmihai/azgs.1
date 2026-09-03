#!/usr/bin/env python3
"""Generate the AZGS B2B capabilities statements in Dutch and English."""

from __future__ import annotations

import re
import shutil
from dataclasses import dataclass
from pathlib import Path

import reportlab
from pypdf import PdfReader, PdfWriter
from pypdf.generic import NameObject, TextStringObject
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen.canvas import Canvas
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    TableStyle,
)
from reportlab.platypus import Table as ReportLabTable


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
PUBLIC_DIR = ROOT / "public" / "downloads" / "business"

NAVY = colors.HexColor("#1E3A5F")
NAVY_DARK = colors.HexColor("#142A45")
ORANGE = colors.HexColor("#F5A623")
ORANGE_DARK = colors.HexColor("#A85D00")
TEXT = colors.HexColor("#223247")
MUTED = colors.HexColor("#5E6B78")
PALE = colors.HexColor("#F7F4EE")
PALE_BLUE = colors.HexColor("#EEF3F8")
BORDER = colors.HexColor("#D7DEE6")
WHITE = colors.white


@dataclass(frozen=True)
class CapabilitiesCopy:
    lang: str
    filename: str
    header_label: str
    version_line: str
    title: str
    subtitle: str
    intro: str
    capabilities_heading: str
    capabilities: tuple[tuple[str, str], ...]
    clients_heading: str
    clients_intro: str
    clients: tuple[str, ...]
    area_heading: str
    area_text: str
    page_two_title: str
    process_heading: str
    process: tuple[tuple[str, str], ...]
    quote_heading: str
    quote_intro: str
    quote_items: tuple[str, ...]
    responsibilities_heading: str
    azgs_heading: str
    azgs_items: tuple[str, ...]
    client_heading: str
    client_items: tuple[str, ...]
    conditions_heading: str
    conditions_text: str
    terms_label: str
    note_text: str
    identity_heading: str
    identity_lines: tuple[tuple[str, str], ...]
    contact_heading: str
    contact_lines: tuple[tuple[str, str], ...]
    footer_page: str


COPIES = (
    CapabilitiesCopy(
        lang="nl-NL",
        filename="azgs-capabilities-statement-b2b-nl-v1-0-2026-09-03.pdf",
        header_label="B2B CAPABILITIES",
        version_line="Nederlandse hoofdversie | versie 1.0 | 3 september 2026",
        title="Technische projectuitvoering voor B2B",
        subtitle="Afgebakende installatiepakketten vanuit Woerden",
        intro=(
            "AZ Grand Solutions vof voert voor zakelijke opdrachtgevers afgebakende werkpakketten uit "
            "voor sanitaire installaties en leidingwerk, thermische installaties en ventilatie. "
            "Projectlocatie, scope, planning, capaciteit en raakvlakken worden vooraf per aanvraag beoordeeld."
        ),
        capabilities_heading="Technische capabilities",
        capabilities=(
            (
                "Sanitair en leidingwerk",
                "Leidingen, aansluitpunten, sanitair, pantry's, toiletzones en technische ruimten binnen het overeengekomen werkpakket.",
            ),
            (
                "Thermische installaties",
                "Verwarmingsleidingen, radiatoren, verdelers en vloerverwarming, afgestemd op vloeropbouw, aansluitpunten en projectplanning.",
            ),
            (
                "Ventilatie",
                "Ventilatiekanalen, doorvoeren en aansluitpunten binnen een begrensde scope, afgestemd met bouw- en installatiepartners.",
            ),
        ),
        clients_heading="Voor wie",
        clients_intro="Aanvragen worden onder meer beoordeeld voor:",
        clients=(
            "aannemers en bouwbedrijven",
            "vastgoedbeheerders",
            "horeca en hotels",
            "kantoren en winkels",
            "VvE's",
            "installatie- en ventilatiebedrijven",
        ),
        area_heading="Werkgebied B2B projecten",
        area_text=(
            "Projectlocaties worden vanuit Woerden beoordeeld. Orientatiepunten: Breda, Tilburg en Eindhoven in het zuiden; "
            "Purmerend en Beverwijk in het noorden; Den Haag, Rotterdam en Leiden in het westen; Lelystad en Zwolle in het oosten. "
            "De genoemde plaatsen zijn geen garantie op acceptatie of volledige dekking. Andere locaties alleen na projectbeoordeling."
        ),
        page_two_title="Samenwerking en projectinformatie",
        process_heading="Modus van samenwerking",
        process=(
            ("1. Aanvraag", "Projectlocatie, scope, fase, planning, gebouwtype en contactpersoon."),
            ("2. Beoordeling", "Controle van diensten, werkgebied, informatie en afhankelijkheden."),
            ("3. Afbakening", "Werkpakket, materialen, aansluitpunten, toegang, uitsluitingen en verantwoordelijkheden."),
            ("4. Offerte", "Prijsbasis, planning en B2B-voorwaarden worden voor contractsluiting verstrekt."),
            ("5. Uitvoering", "Afstemming op werkzones, bouwvolgorde en interfaces met andere teams."),
            ("6. Overdracht", "Controle en opleverpunten binnen de toegewezen scope; vervolgwerk wordt apart benoemd."),
        ),
        quote_heading="Nodig voor een gerichte offerte",
        quote_intro="Waar beschikbaar ontvangen wij graag:",
        quote_items=(
            "bedrijfsnaam, contactpersoon en rol",
            "projectlocatie en type gebouw",
            "sanitaire, thermische of ventilatiescope",
            "projectfase, gewenste periode en hoofdlijnen van de planning",
            "tekeningen, werkomschrijving, hoeveelheden en bekende aansluitpunten",
            "informatie over toegang, werkzones en afstemming met andere partijen",
            "gewenste eenmalige of doorlopende samenwerking, zonder vooraf veronderstelde SLA",
        ),
        responsibilities_heading="Rolverdeling",
        azgs_heading="AZGS binnen de afgesproken scope",
        azgs_items=(
            "uitvoering van het overeengekomen installatiepakket",
            "praktische afstemming over werkvolgorde en raakvlakken",
            "signaleren van zichtbare afwijkingen die de uitvoering beinvloeden",
            "controle en terugkoppeling van toegewezen opleverpunten",
        ),
        client_heading="Opdrachtgever en aangewezen partijen",
        client_items=(
            "ontwerp, berekeningen, vergunningen en tijdige beslissingen",
            "goedgekeurde tekeningen, maatvoering en vrijgegeven werkzones",
            "specialistische keuringen, commissioning en certificering indien vereist",
            "toegang, coordinatie en projectvoorwaarden buiten de AZGS-scope",
        ),
        conditions_heading="Projectvoorwaarden",
        conditions_text=(
            "Certificering, verzekering, garantie, retentie, beproeving, inspectie en documentatie worden niet door dit statement bevestigd. "
            "Projectspecifieke eisen moeten vooraf worden gecontroleerd en schriftelijk overeengekomen. Er geldt geen openbare SLA. "
            "Zakelijke spoed wordt alleen afzonderlijk beoordeeld voor een sanitaire, thermische of ventilatie-installatie die AZGS eerder zelf heeft uitgevoerd."
        ),
        terms_label="Algemene voorwaarden zakelijk (B2B)",
        note_text="Dit document is een informatief capabilities statement en geen offerte, opdrachtbevestiging of garantie.",
        identity_heading="Bedrijfsgegevens",
        identity_lines=(
            ("Juridische naam", "AZ Grand Solutions vof"),
            ("Handelsnaam", "A-Z Grand Solutions"),
            ("KvK", "42064891"),
            ("Vestigingsnummer", "000053925335"),
            ("Vestigingsadres", "Alpenstraat 12, 3446 DN Woerden"),
        ),
        contact_heading="Contact voor aanvragen",
        contact_lines=(
            ("E-mail", "aanvragen@azgs.nl"),
            ("Algemeen", "info@azgs.nl"),
            ("Telefoon", "+31 6 13636925"),
            ("Website", "https://azgs.nl/zakelijk"),
        ),
        footer_page="Pagina",
    ),
    CapabilitiesCopy(
        lang="en-GB",
        filename="azgs-b2b-capabilities-statement-en-v1-0-2026-09-03.pdf",
        header_label="B2B CAPABILITIES",
        version_line="Informational English version | version 1.0 | 3 September 2026 | Dutch version is primary",
        title="Technical project execution for B2B",
        subtitle="Defined installation packages from Woerden",
        intro=(
            "AZ Grand Solutions vof carries out defined work packages for business clients covering plumbing and pipework, "
            "thermal systems and ventilation. Project location, scope, planning, capacity and interfaces are assessed in advance for each request."
        ),
        capabilities_heading="Technical capabilities",
        capabilities=(
            (
                "Plumbing and pipework",
                "Pipework, connection points, sanitary fixtures, pantries, toilet areas and technical rooms within the agreed work package.",
            ),
            (
                "Thermal systems",
                "Heating pipework, radiators, manifolds and underfloor heating, coordinated with floor build-up, connection points and project planning.",
            ),
            (
                "Ventilation",
                "Ventilation ducts, penetrations and connection points within a defined scope, coordinated with construction and installation partners.",
            ),
        ),
        clients_heading="Client types",
        clients_intro="Requests are assessed for, among others:",
        clients=(
            "contractors and construction companies",
            "property managers",
            "hospitality and hotels",
            "offices and retail",
            "owners associations",
            "installation and ventilation companies",
        ),
        area_heading="B2B project area",
        area_text=(
            "Project locations are assessed from Woerden. Orientation points: Breda, Tilburg and Eindhoven to the south; "
            "Purmerend and Beverwijk to the north; The Hague, Rotterdam and Leiden to the west; Lelystad and Zwolle to the east. "
            "Named places do not guarantee acceptance or full coverage. Other locations only after project assessment."
        ),
        page_two_title="Cooperation and project information",
        process_heading="How we cooperate",
        process=(
            ("1. Request", "Project location, scope, phase, planning, building type and contact person."),
            ("2. Assessment", "Check of services, project area, information and dependencies."),
            ("3. Definition", "Work package, materials, connection points, access, exclusions and responsibilities."),
            ("4. Quotation", "Price basis, planning and B2B terms are supplied before conclusion."),
            ("5. Execution", "Coordination with work zones, site sequence and interfaces with other teams."),
            ("6. Handover", "Checks and completion points within the assigned scope; follow-up is identified separately."),
        ),
        quote_heading="Information for a focused quotation",
        quote_intro="Where available, please provide:",
        quote_items=(
            "company, contact person and role",
            "project location and building type",
            "plumbing, thermal-system or ventilation scope",
            "project phase, preferred period and high-level planning",
            "drawings, work description, quantities and known connection points",
            "access, work zones and coordination with other parties",
            "preferred one-off or ongoing cooperation, without assuming an SLA",
        ),
        responsibilities_heading="Allocation of roles",
        azgs_heading="AZGS within the agreed scope",
        azgs_items=(
            "execution of the agreed installation package",
            "practical coordination of sequence and interfaces",
            "reporting visible deviations that affect execution",
            "checks and feedback for assigned completion points",
        ),
        client_heading="Client and appointed parties",
        client_items=(
            "design, calculations, permits and timely decisions",
            "approved drawings, dimensions and released work zones",
            "specialist inspections, commissioning and certification where required",
            "access, coordination and project conditions outside the AZGS scope",
        ),
        conditions_heading="Project conditions",
        conditions_text=(
            "Certification, insurance, warranty, retention, testing, inspection and documentation are not confirmed by this statement. "
            "Project-specific requirements must be checked and agreed in writing in advance. No public SLA applies. "
            "Business emergencies are assessed separately only for a plumbing, thermal or ventilation installation previously carried out by AZGS itself."
        ),
        terms_label="Business terms and conditions (B2B)",
        note_text="This document is an informational capabilities statement, not a quotation, order confirmation or warranty.",
        identity_heading="Company details",
        identity_lines=(
            ("Legal name", "AZ Grand Solutions vof"),
            ("Trade name", "A-Z Grand Solutions"),
            ("KVK", "42064891"),
            ("Establishment no.", "000053925335"),
            ("Registered office", "Alpenstraat 12, 3446 DN Woerden"),
        ),
        contact_heading="Contact for requests",
        contact_lines=(
            ("Email", "aanvragen@azgs.nl"),
            ("General", "info@azgs.nl"),
            ("Phone", "+31 6 13636925"),
            ("Website", "https://azgs.nl/en/business"),
        ),
        footer_page="Page",
    ),
)


def normalize(value: str) -> str:
    for dash in "\u2010\u2011\u2012\u2013\u2014\u2212":
        value = value.replace(dash, "-")
    return re.sub(r"\s+", " ", value.replace("\u00a0", " ")).strip()


def register_fonts() -> None:
    fonts_dir = Path(reportlab.__file__).resolve().parent / "fonts"
    fonts = {
        "AZGS-Regular": "Vera.ttf",
        "AZGS-Bold": "VeraBd.ttf",
        "AZGS-Italic": "VeraIt.ttf",
        "AZGS-BoldItalic": "VeraBI.ttf",
    }
    for name, filename in fonts.items():
        pdfmetrics.registerFont(TTFont(name, str(fonts_dir / filename)))
    pdfmetrics.registerFontFamily(
        "AZGS",
        normal="AZGS-Regular",
        bold="AZGS-Bold",
        italic="AZGS-Italic",
        boldItalic="AZGS-BoldItalic",
    )


def styles():
    sample = getSampleStyleSheet()
    return {
        "title": ParagraphStyle("Title", parent=sample["Title"], fontName="AZGS-Bold", fontSize=22, leading=25, textColor=WHITE, alignment=TA_LEFT, spaceAfter=7),
        "subtitle": ParagraphStyle("Subtitle", parent=sample["Normal"], fontName="AZGS-Bold", fontSize=10, leading=13, textColor=ORANGE, spaceAfter=8),
        "version": ParagraphStyle("Version", parent=sample["Normal"], fontName="AZGS-Regular", fontSize=7.6, leading=10, textColor=colors.HexColor("#DDE7F2")),
        "intro": ParagraphStyle("Intro", parent=sample["BodyText"], fontName="AZGS-Regular", fontSize=9, leading=13, textColor=TEXT, spaceAfter=8),
        "h1_page2": ParagraphStyle("PageTwoTitle", parent=sample["Heading1"], fontName="AZGS-Bold", fontSize=16, leading=19, textColor=NAVY, spaceAfter=6),
        "h2": ParagraphStyle("H2", parent=sample["Heading2"], fontName="AZGS-Bold", fontSize=10.5, leading=12.5, textColor=NAVY, spaceBefore=2, spaceAfter=3.5, keepWithNext=True),
        "card_title": ParagraphStyle("CardTitle", parent=sample["Heading3"], fontName="AZGS-Bold", fontSize=9.3, leading=11.5, textColor=NAVY, spaceAfter=4),
        "card_body": ParagraphStyle("CardBody", parent=sample["BodyText"], fontName="AZGS-Regular", fontSize=7.45, leading=10.3, textColor=MUTED),
        "body": ParagraphStyle("Body", parent=sample["BodyText"], fontName="AZGS-Regular", fontSize=8, leading=10.8, textColor=TEXT, spaceAfter=3.5),
        "small": ParagraphStyle("Small", parent=sample["BodyText"], fontName="AZGS-Regular", fontSize=7.2, leading=9.8, textColor=MUTED),
        "bullet": ParagraphStyle("Bullet", parent=sample["BodyText"], fontName="AZGS-Regular", fontSize=7.3, leading=9.2, textColor=TEXT, leftIndent=9, firstLineIndent=-7, bulletFontName="AZGS-Regular", spaceAfter=1.2),
        "label": ParagraphStyle("Label", parent=sample["Normal"], fontName="AZGS-Bold", fontSize=7.2, leading=9, textColor=ORANGE_DARK),
        "value": ParagraphStyle("Value", parent=sample["Normal"], fontName="AZGS-Regular", fontSize=7.3, leading=9.3, textColor=TEXT),
        "note": ParagraphStyle("Note", parent=sample["BodyText"], fontName="AZGS-Regular", fontSize=7.1, leading=9.6, textColor=MUTED),
        "link": ParagraphStyle("Link", parent=sample["BodyText"], fontName="AZGS-Bold", fontSize=8, leading=11, textColor=NAVY),
    }


def p(text: str, style, **kwargs) -> Paragraph:
    return Paragraph(normalize(text), style, **kwargs)


class EmbeddedFontCanvas(Canvas):
    """Use the embedded body font for ReportLab's initial text state."""

    def __init__(self, *args, **kwargs):
        kwargs["initialFontName"] = "AZGS-Regular"
        super().__init__(*args, **kwargs)


class Table(ReportLabTable):
    """Give every table cell an embedded default font, including empty draw states."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.setStyle(TableStyle([("FONTNAME", (0, 0), (-1, -1), "AZGS-Regular")]))


def draw_brand_mark(canvas, x: float, y: float, size: float = 18) -> None:
    canvas.saveState()
    canvas.setStrokeColor(NAVY)
    canvas.setLineWidth(1.8)
    canvas.line(x, y + size * 0.45, x + size * 0.5, y + size)
    canvas.line(x + size * 0.5, y + size, x + size, y + size * 0.45)
    canvas.setFillColor(NAVY)
    canvas.rect(x + size * 0.14, y, size * 0.72, size * 0.48, fill=1, stroke=0)
    canvas.setFillColor(ORANGE)
    for offset, height in ((0.24, 0.22), (0.43, 0.34), (0.62, 0.27)):
        canvas.rect(x + size * offset, y + size * 0.05, size * 0.1, size * height, fill=1, stroke=0)
    canvas.restoreState()


def page_decoration(canvas, doc, copy: CapabilitiesCopy) -> None:
    canvas.saveState()
    width, height = A4
    canvas.setFillColor(WHITE)
    canvas.rect(0, 0, width, height, fill=1, stroke=0)
    draw_brand_mark(canvas, 18 * mm, height - 18 * mm, 11 * mm)
    canvas.setFont("AZGS-Bold", 8.5)
    canvas.setFillColor(NAVY)
    canvas.drawString(32 * mm, height - 13.2 * mm, "AZ GRAND SOLUTIONS")
    canvas.setFont("AZGS-Regular", 6.8)
    canvas.setFillColor(MUTED)
    canvas.drawString(32 * mm, height - 17.2 * mm, copy.header_label)
    canvas.setStrokeColor(BORDER)
    canvas.setLineWidth(0.6)
    canvas.line(18 * mm, 17 * mm, width - 18 * mm, 17 * mm)
    canvas.setFont("AZGS-Regular", 6.8)
    canvas.setFillColor(MUTED)
    canvas.drawString(18 * mm, 11.5 * mm, "azgs.nl | aanvragen@azgs.nl | +31 6 13636925")
    canvas.drawRightString(width - 18 * mm, 11.5 * mm, f"{copy.footer_page} {doc.page} / 2")
    canvas.restoreState()


def make_doc(path: Path, copy: CapabilitiesCopy) -> BaseDocTemplate:
    doc = BaseDocTemplate(
        str(path),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=27 * mm,
        bottomMargin=21 * mm,
        title=copy.title,
        author="AZ Grand Solutions vof",
        subject="B2B capabilities statement version 1.0",
        creator="AZ Grand Solutions",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main", leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    doc.addPageTemplates(PageTemplate(id="capabilities", frames=[frame], onPage=lambda canvas, current_doc: page_decoration(canvas, current_doc, copy)))
    return doc


def hero(copy: CapabilitiesCopy, st) -> Table:
    block = [p(copy.title, st["title"]), p(copy.subtitle, st["subtitle"]), p(copy.version_line, st["version"])]
    table = Table([[block]], colWidths=[174 * mm])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), NAVY),
        ("BOX", (0, 0), (-1, -1), 0, NAVY),
        ("LEFTPADDING", (0, 0), (-1, -1), 10 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 8 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8 * mm),
    ]))
    return table


def capability_cards(copy: CapabilitiesCopy, st) -> Table:
    cells = []
    for title, text in copy.capabilities:
        cells.append([p(title, st["card_title"]), p(text, st["card_body"])])
    table = Table([cells], colWidths=[56 * mm] * 3)
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BACKGROUND", (0, 0), (-1, -1), PALE_BLUE),
        ("BOX", (0, 0), (-1, -1), 0.7, BORDER),
        ("INNERGRID", (0, 0), (-1, -1), 0.7, WHITE),
        ("LEFTPADDING", (0, 0), (-1, -1), 5 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 5 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5 * mm),
    ]))
    return table


def client_chips(copy: CapabilitiesCopy, st) -> Table:
    rows = []
    for start in (0, 3):
        rows.append([p(item, st["card_body"]) for item in copy.clients[start:start + 3]])
    table = Table(rows, colWidths=[56 * mm] * 3)
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("BACKGROUND", (0, 0), (-1, -1), PALE),
        ("BOX", (0, 0), (-1, -1), 0.6, BORDER),
        ("INNERGRID", (0, 0), (-1, -1), 0.6, WHITE),
        ("LEFTPADDING", (0, 0), (-1, -1), 4 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 2.4 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.4 * mm),
    ]))
    return table


def info_box(heading: str, text: str, st, background=PALE_BLUE) -> Table:
    table = Table([[[p(heading, st["card_title"]), p(text, st["card_body"])]]], colWidths=[174 * mm])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), background),
        ("BOX", (0, 0), (-1, -1), 0.7, BORDER),
        ("LINEBEFORE", (0, 0), (0, -1), 3, ORANGE),
        ("LEFTPADDING", (0, 0), (-1, -1), 6 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 3 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3 * mm),
    ]))
    return table


def process_table(copy: CapabilitiesCopy, st) -> Table:
    rows = []
    for title, text in copy.process:
        rows.append([p(title, st["card_title"]), p(text, st["card_body"])])
    table = Table(rows, colWidths=[39 * mm, 129 * mm], repeatRows=0)
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BACKGROUND", (0, 0), (0, -1), PALE_BLUE),
        ("BACKGROUND", (1, 0), (1, -1), WHITE),
        ("BOX", (0, 0), (-1, -1), 0.6, BORDER),
        ("INNERGRID", (0, 0), (-1, -1), 0.6, BORDER),
        ("LEFTPADDING", (0, 0), (-1, -1), 3.5 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 3.5 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 1.5 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5 * mm),
    ]))
    return table


def bullet_list(items: tuple[str, ...], st) -> list[Paragraph]:
    return [p(item, st["bullet"], bulletText="•") for item in items]


def role_table(copy: CapabilitiesCopy, st) -> Table:
    left = [p(copy.azgs_heading, st["card_title"]), *bullet_list(copy.azgs_items, st)]
    right = [p(copy.client_heading, st["card_title"]), *bullet_list(copy.client_items, st)]
    table = Table([[left, right]], colWidths=[84 * mm, 84 * mm])
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BACKGROUND", (0, 0), (0, 0), PALE_BLUE),
        ("BACKGROUND", (1, 0), (1, 0), PALE),
        ("BOX", (0, 0), (-1, -1), 0.7, BORDER),
        ("INNERGRID", (0, 0), (-1, -1), 0.7, WHITE),
        ("LEFTPADDING", (0, 0), (-1, -1), 4.5 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4.5 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 2.5 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5 * mm),
    ]))
    return table


def details_block(heading: str, lines: tuple[tuple[str, str], ...], st, link_values: bool = False) -> list:
    rows = []
    for label, value in lines:
        rendered = value
        if link_values and value.startswith("http"):
            rendered = f'<link href="{value}" color="#1E3A5F"><u>{value}</u></link>'
        elif link_values and "@" in value:
            rendered = f'<link href="mailto:{value}" color="#1E3A5F"><u>{value}</u></link>'
        rows.append([p(label, st["label"]), Paragraph(rendered, st["value"])])
    table = Table(rows, colWidths=[31 * mm, 51 * mm])
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 1 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 1.1 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1.1 * mm),
        ("LINEBELOW", (0, 0), (-1, -2), 0.3, BORDER),
    ]))
    return [p(heading, st["h2"]), table]


def build(copy: CapabilitiesCopy) -> Path:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    path = OUTPUT_DIR / copy.filename
    st = styles()
    doc = make_doc(path, copy)
    story = [
        hero(copy, st),
        Spacer(1, 5 * mm),
        p(copy.intro, st["intro"]),
        p(copy.capabilities_heading, st["h2"]),
        capability_cards(copy, st),
        Spacer(1, 2 * mm),
        p(copy.clients_heading, st["h2"]),
        p(copy.clients_intro, st["body"]),
        client_chips(copy, st),
        Spacer(1, 4 * mm),
        info_box(copy.area_heading, copy.area_text, st),
        PageBreak(),
        p(copy.page_two_title, st["h1_page2"]),
        p(copy.process_heading, st["h2"]),
        process_table(copy, st),
        Spacer(1, 3.5 * mm),
        KeepTogether([
            p(copy.quote_heading, st["h2"]),
            p(copy.quote_intro, st["body"]),
            Table(
                [[bullet_list(tuple(copy.quote_items[:4]), st), bullet_list(tuple(copy.quote_items[4:]), st)]],
                colWidths=[84 * mm, 84 * mm],
                style=TableStyle([
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 3 * mm),
                    ("TOPPADDING", (0, 0), (-1, -1), 0),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                ]),
            ),
        ]),
        Spacer(1, 1.5 * mm),
        p(copy.responsibilities_heading, st["h2"]),
        role_table(copy, st),
        Spacer(1, 1.5 * mm),
        info_box(copy.conditions_heading, copy.conditions_text, st, background=PALE),
        Spacer(1, 1.5 * mm),
        Table(
            [[details_block(copy.identity_heading, copy.identity_lines, st), details_block(copy.contact_heading, copy.contact_lines, st, link_values=True)]],
            colWidths=[86 * mm, 86 * mm],
            style=TableStyle([
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4 * mm),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]),
        ),
        Spacer(1, 1.5 * mm),
        Paragraph(
            f'<link href="https://azgs.nl/{"algemene-voorwaarden-zakelijk" if copy.lang == "nl-NL" else "en/business-terms-and-conditions"}" color="#1E3A5F"><u>{normalize(copy.terms_label)}</u></link>',
            st["link"],
        ),
        Spacer(1, 0.8 * mm),
        p(copy.note_text, st["note"]),
    ]
    doc.build(story, canvasmaker=EmbeddedFontCanvas)

    reader = PdfReader(str(path))
    writer = PdfWriter()
    writer.clone_document_from_reader(reader)
    writer.root_object.update({NameObject("/Lang"): TextStringObject(copy.lang)})
    with path.open("wb") as stream:
        writer.write(stream)

    shutil.copy2(path, PUBLIC_DIR / copy.filename)
    return path


def main() -> int:
    register_fonts()
    for copy in COPIES:
        path = build(copy)
        print(f"WROTE {path.relative_to(ROOT)} ({path.stat().st_size} bytes)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
