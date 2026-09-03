#!/usr/bin/env python3
"""Verify AZGS B2B capabilities PDFs and their public copies."""

from __future__ import annotations

import hashlib
import re
from dataclasses import dataclass
from pathlib import Path

import pdfplumber
from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
PUBLIC_DIR = ROOT / "public" / "downloads" / "business"
A4_WIDTH = 595.276
A4_HEIGHT = 841.89


@dataclass(frozen=True)
class Expected:
    filename: str
    lang: str
    required: tuple[str, ...]
    footer: str


EXPECTED = (
    Expected(
        "azgs-capabilities-statement-b2b-nl-v1-0-2026-09-03.pdf",
        "nl-NL",
        (
            "AZ Grand Solutions vof",
            "A-Z Grand Solutions",
            "42064891",
            "000053925335",
            "Sanitair en leidingwerk",
            "Thermische installaties",
            "Ventilatie",
            "Breda, Tilburg en Eindhoven",
            "Purmerend en Beverwijk",
            "Den Haag, Rotterdam en Leiden",
            "Lelystad en Zwolle",
            "Algemene voorwaarden zakelijk (B2B)",
        ),
        "Pagina",
    ),
    Expected(
        "azgs-b2b-capabilities-statement-en-v1-0-2026-09-03.pdf",
        "en-GB",
        (
            "AZ Grand Solutions vof",
            "A-Z Grand Solutions",
            "42064891",
            "000053925335",
            "Plumbing and pipework",
            "Thermal systems",
            "Ventilation",
            "Breda, Tilburg and Eindhoven",
            "Purmerend and Beverwijk",
            "The Hague, Rotterdam and Leiden",
            "Lelystad and Zwolle",
            "Business terms and conditions (B2B)",
            "Dutch version is primary",
        ),
        "Page",
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


def verify(spec: Expected) -> None:
    output = OUTPUT_DIR / spec.filename
    public = PUBLIC_DIR / spec.filename
    assert output.is_file(), f"missing output PDF: {output}"
    assert public.is_file(), f"missing public PDF: {public}"
    assert 25_000 < output.stat().st_size < 750_000, f"unexpected email attachment size: {spec.filename}"
    assert digest(output) == digest(public), f"public copy differs: {spec.filename}"

    reader = PdfReader(str(output))
    assert not reader.is_encrypted, f"encrypted PDF: {spec.filename}"
    assert len(reader.pages) == 2, f"expected exactly 2 pages: {spec.filename}"
    root = root_object(reader)
    assert str(root.get("/Lang", "")) == spec.lang, f"incorrect /Lang: {spec.filename}"
    assert not {"/OpenAction", "/AA", "/AcroForm"}.intersection(root.keys()), f"unsafe catalog: {spec.filename}"
    names = root.get("/Names")
    if names:
        names = names.get_object() if hasattr(names, "get_object") else names
        assert not {"/JavaScript", "/EmbeddedFiles"}.intersection(names.keys()), f"unsafe names: {spec.filename}"
    assert reader.metadata is not None
    assert reader.metadata.author == "AZ Grand Solutions vof"
    assert "version 1.0" in (reader.metadata.subject or "").lower()

    uri_count = 0
    checked_fonts = set()
    for page_number, page in enumerate(reader.pages, start=1):
        assert abs(float(page.mediabox.width) - A4_WIDTH) < 1, f"page {page_number} width: {spec.filename}"
        assert abs(float(page.mediabox.height) - A4_HEIGHT) < 1, f"page {page_number} height: {spec.filename}"
        annotations = page.get("/Annots") or []
        for annotation in annotations:
            annotation = annotation.get_object()
            action = annotation.get("/A")
            if action:
                action = action.get_object() if hasattr(action, "get_object") else action
                if action.get("/URI"):
                    uri_count += 1
        resources = page.get("/Resources")
        if resources:
            resources = resources.get_object() if hasattr(resources, "get_object") else resources
            fonts = resources.get("/Font") or {}
            fonts = fonts.get_object() if hasattr(fonts, "get_object") else fonts
            for name, reference in fonts.items():
                key = str(reference)
                if key in checked_fonts:
                    continue
                checked_fonts.add(key)
                assert font_is_embedded(reference), f"unembedded font {name}: {spec.filename}"
    assert uri_count >= 3, f"expected clickable links: {spec.filename}"

    with pdfplumber.open(output) as pdf:
        page_texts = [(page.extract_text() or "").strip() for page in pdf.pages]
    assert all(len(text) > 800 for text in page_texts), f"sparse page: {spec.filename}"
    all_text = "\n".join(page_texts)
    normalized = re.sub(r"\s+", " ", all_text)
    for phrase in spec.required:
        assert phrase in normalized, f"missing phrase {phrase!r}: {spec.filename}"
    for page_number, text in enumerate(page_texts, start=1):
        assert f"{spec.footer} {page_number} / 2" in text, f"missing footer on page {page_number}: {spec.filename}"
    assert not re.search(r"[\u2010-\u2014\u2212]", all_text), f"non-ASCII dash found: {spec.filename}"
    print(f"PASS {spec.filename}: 2 pages, {output.stat().st_size} bytes, {uri_count} links")


def main() -> int:
    for spec in EXPECTED:
        verify(spec)
    print("PASS both B2B capabilities PDFs and public copies")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
