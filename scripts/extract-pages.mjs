#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const LEGACY_DIR = path.join(process.cwd(), 'legacy');
const OUT_DIR = path.join(process.cwd(), 'content/pages');
fs.mkdirSync(OUT_DIR, { recursive: true });

const NL_LINK_MAP = {
  '/index.html': '/',
  '/diensten.html': '/diensten',
  '/over-ons.html': '/over-ons',
  '/spoed.html': '/spoed',
  '/contact.html': '/contact',
  '/blog.html': '/blog',
  '/bedankt.html': '/bedankt',
  '/gipsplaten.html': '/gipsplaten',
  '/schilderwerk.html': '/schilderwerk',
  '/parket.html': '/parket',
  '/tegelwerk.html': '/tegelwerk',
  '/sanitair.html': '/sanitair',
  '/verwarming.html': '/verwarming',
  '/vloerverwarming.html': '/vloerverwarming',
  '/elektra.html': '/elektra',
  '/privacybeleid.html': '/privacybeleid',
  '/cookiebeleid.html': '/cookiebeleid',
  '/algemene-voorwaarden.html': '/algemene-voorwaarden',
  '/blog-tegels-kiezen-badkamer.html': '/blog/tegels-kiezen-badkamer',
  '/blog-vloerverwarming-warmtepomp.html': '/blog/vloerverwarming-warmtepomp',
  '/blog-vloerverwarming-bestaande-woning.html': '/blog/vloerverwarming-bestaande-woning',
  '/blog-lekkage-eerste-10-minuten.html': '/blog/lekkage-eerste-10-minuten',
};

const EN_LINK_MAP = {
  '/en/index.html': '/en',
  '/en/services.html': '/en/services',
  '/en/about.html': '/en/about',
  '/en/emergency.html': '/en/emergency',
  '/en/contact.html': '/en/contact',
  '/en/blog.html': '/en/blog',
  '/en/thank-you.html': '/en/thank-you',
  '/en/drywall.html': '/en/drywall',
  '/en/painting.html': '/en/painting',
  '/en/parquet.html': '/en/parquet',
  '/en/tiling.html': '/en/tiling',
  '/en/plumbing.html': '/en/plumbing',
  '/en/heating.html': '/en/heating',
  '/en/underfloor-heating.html': '/en/underfloor-heating',
  '/en/electrical.html': '/en/electrical',
  '/en/privacy-policy.html': '/en/privacy-policy',
  '/en/cookie-policy.html': '/en/cookie-policy',
  '/en/terms-and-conditions.html': '/en/terms-and-conditions',
  '/en/blog-choosing-bathroom-tiles.html': '/en/blog/choosing-bathroom-tiles',
  '/en/blog-underfloor-heating-existing-home.html': '/en/blog/underfloor-heating-existing-home',
  '/en/blog-leak-first-10-minutes.html': '/en/blog/leak-first-10-minutes',
  '/en/': '/en',
  '/': '/',
};

function extractMain(html) {
  let start = html.indexOf('<main id="main">');
  let tagLen = '<main id="main">'.length;
  if (start === -1) {
    start = html.indexOf('<main>');
    tagLen = '<main>'.length;
  }
  const endIdx = html.indexOf('</main>', start);
  if (start === -1 || endIdx === -1) return null;
  return html.slice(start + tagLen, endIdx).trim();
}

function cleanLinks(html, locale) {
  const map = locale === 'nl' ? NL_LINK_MAP : EN_LINK_MAP;
  let out = html;
  for (const [from, to] of Object.entries(map)) {
    out = out.split(from).join(to);
  }
  return out;
}

function extractMeta(html) {
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const descMatch = html.match(/<meta name="description" content="([^"]+)"/);
  return {
    title: titleMatch ? titleMatch[1] : '',
    description: descMatch ? descMatch[1] : '',
  };
}

const PAGES = [
  // [legacyFile, locale, key]
  ['index.html', 'nl', 'home'],
  ['diensten.html', 'nl', 'services'],
  ['over-ons.html', 'nl', 'about'],
  ['spoed.html', 'nl', 'emergency'],
  ['contact.html', 'nl', 'contact'],
  ['bedankt.html', 'nl', 'thankYou'],
  ['gipsplaten.html', 'nl', 'drywall'],
  ['schilderwerk.html', 'nl', 'painting'],
  ['parket.html', 'nl', 'parquet'],
  ['tegelwerk.html', 'nl', 'tiling'],
  ['sanitair.html', 'nl', 'plumbing'],
  ['verwarming.html', 'nl', 'heating'],
  ['vloerverwarming.html', 'nl', 'underfloorHeating'],
  ['elektra.html', 'nl', 'electrical'],
  ['privacybeleid.html', 'nl', 'privacy'],
  ['cookiebeleid.html', 'nl', 'cookies'],
  ['algemene-voorwaarden.html', 'nl', 'terms'],
  ['en/index.html', 'en', 'home'],
  ['en/services.html', 'en', 'services'],
  ['en/about.html', 'en', 'about'],
  ['en/emergency.html', 'en', 'emergency'],
  ['en/contact.html', 'en', 'contact'],
  ['en/thank-you.html', 'en', 'thankYou'],
  ['en/drywall.html', 'en', 'drywall'],
  ['en/painting.html', 'en', 'painting'],
  ['en/parquet.html', 'en', 'parquet'],
  ['en/tiling.html', 'en', 'tiling'],
  ['en/plumbing.html', 'en', 'plumbing'],
  ['en/heating.html', 'en', 'heating'],
  ['en/underfloor-heating.html', 'en', 'underfloorHeating'],
  ['en/electrical.html', 'en', 'electrical'],
  ['en/privacy-policy.html', 'en', 'privacy'],
  ['en/cookie-policy.html', 'en', 'cookies'],
  ['en/terms-and-conditions.html', 'en', 'terms'],
];

const meta = {};
for (const [file, locale, key] of PAGES) {
  const fullPath = path.join(LEGACY_DIR, file);
  if (!fs.existsSync(fullPath)) {
    console.warn(`MISSING: ${file}`);
    continue;
  }
  const html = fs.readFileSync(fullPath, 'utf8');
  const main = extractMain(html);
  if (!main) {
    console.warn(`No <main> in ${file}`);
    continue;
  }
  const cleaned = cleanLinks(main, locale);
  const m = extractMeta(html);
  const outFile = path.join(OUT_DIR, `${key}.${locale}.html`);
  fs.writeFileSync(outFile, cleaned);
  meta[`${key}.${locale}`] = m;
  console.log(`Wrote ${path.relative(process.cwd(), outFile)} (${cleaned.length} bytes)`);
}

fs.writeFileSync(
  path.join(OUT_DIR, 'meta.json'),
  JSON.stringify(meta, null, 2)
);
console.log(`\nDone. Meta saved to content/pages/meta.json`);
