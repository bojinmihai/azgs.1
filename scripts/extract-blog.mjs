#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const LEGACY = path.join(ROOT, 'legacy');
const OUT = path.join(ROOT, 'content/blog');
fs.mkdirSync(OUT, { recursive: true });

// Each post: pairKey (folder), nl/en file paths in legacy, slug per locale
const POSTS = [
  {
    key: 'tegels-kiezen-badkamer',
    nl: { file: 'blog-tegels-kiezen-badkamer.html', slug: 'tegels-kiezen-badkamer' },
    en: { file: 'en/blog-choosing-bathroom-tiles.html', slug: 'choosing-bathroom-tiles' },
  },
  {
    key: 'lekkage-eerste-10-minuten',
    nl: { file: 'blog-lekkage-eerste-10-minuten.html', slug: 'lekkage-eerste-10-minuten' },
    en: { file: 'en/blog-leak-first-10-minutes.html', slug: 'leak-first-10-minutes' },
  },
  {
    key: 'vloerverwarming-bestaande-woning',
    nl: { file: 'blog-vloerverwarming-bestaande-woning.html', slug: 'vloerverwarming-bestaande-woning' },
    en: { file: 'en/blog-underfloor-heating-existing-home.html', slug: 'underfloor-heating-existing-home' },
  },
  {
    key: 'vloerverwarming-warmtepomp',
    nl: { file: 'blog-vloerverwarming-warmtepomp.html', slug: 'vloerverwarming-warmtepomp' },
    // EN missing
  },
];

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
};
const EN_LINK_MAP = {
  '/en/services.html': '/en/services',
  '/en/about.html': '/en/about',
  '/en/emergency.html': '/en/emergency',
  '/en/contact.html': '/en/contact',
  '/en/blog.html': '/en/blog',
  '/en/drywall.html': '/en/drywall',
  '/en/painting.html': '/en/painting',
  '/en/parquet.html': '/en/parquet',
  '/en/tiling.html': '/en/tiling',
  '/en/plumbing.html': '/en/plumbing',
  '/en/heating.html': '/en/heating',
  '/en/underfloor-heating.html': '/en/underfloor-heating',
  '/en/electrical.html': '/en/electrical',
};

function cleanLinks(html, locale) {
  const map = locale === 'nl' ? NL_LINK_MAP : EN_LINK_MAP;
  let out = html;
  for (const [from, to] of Object.entries(map)) {
    out = out.split(from).join(to);
  }
  return out;
}

function pluck(html, regex) {
  const m = html.match(regex);
  return m ? m[1] : '';
}

function extractBody(html) {
  // Get content between <article class="article-text"> and </article>
  const start = html.indexOf('<article class="article-text">');
  if (start === -1) return '';
  const open = html.indexOf('>', start) + 1;
  // find the matching closing </article> — assume the next </article> closes it
  const end = html.indexOf('</article>', open);
  if (end === -1) return '';
  return html.slice(open, end).trim();
}

function extractToc(html) {
  const start = html.indexOf('<aside class="article-toc"');
  if (start === -1) return '';
  const end = html.indexOf('</aside>', start);
  if (end === -1) return '';
  // Just the <ol>...</ol>
  const ol = html.slice(start, end);
  const olStart = ol.indexOf('<ol>');
  const olEnd = ol.indexOf('</ol>');
  if (olStart === -1 || olEnd === -1) return '';
  return ol.slice(olStart, olEnd + '</ol>'.length);
}

function extractIntro(html) {
  return pluck(html, /<p class="article-intro">([\s\S]*?)<\/p>/);
}

function extractMeta(html) {
  const title = pluck(html, /<title>([^<]+)<\/title>/);
  const description = pluck(html, /<meta name="description" content="([^"]+)"/);
  const h1 = pluck(html, /<h1>([^<]+)<\/h1>/);
  const datePublished = pluck(html, /"datePublished":\s*"([^"]+)"/);
  const ogImage = pluck(html, /"image":\s*"([^"]+)"/);
  const category = pluck(html, /<span class="article-category"[^>]*>([^<]+)<\/span>/);
  // Read time: search "(\d+) min lezen" or "(\d+) min read"
  const readTime = pluck(html, /(\d+)\s*min\s*(?:lezen|read)/);
  return { title, description, h1, datePublished, ogImage, category, readTime: parseInt(readTime || '7', 10) };
}

function buildMeta(metaRaw, slug, otherSlug) {
  // ogImage might be absolute — make relative
  let cover = metaRaw.ogImage.replace(/^https:\/\/azgs\.nl/, '');
  if (cover.endsWith('.jpg')) {
    cover = cover.replace('.jpg', '.webp');
  }
  return {
    slug,
    altSlug: otherSlug || null,
    title: metaRaw.h1,
    pageTitle: metaRaw.title,
    description: metaRaw.description,
    intro: '',
    date: metaRaw.datePublished,
    category: metaRaw.category,
    readTime: metaRaw.readTime,
    cover,
    coverFallback: cover.replace('.webp', '.jpg'),
  };
}

for (const post of POSTS) {
  const dir = path.join(OUT, post.key);
  fs.mkdirSync(dir, { recursive: true });

  for (const locale of ['nl', 'en']) {
    if (!post[locale]) continue;
    const filePath = path.join(LEGACY, post[locale].file);
    if (!fs.existsSync(filePath)) {
      console.warn(`Missing ${filePath}`);
      continue;
    }
    const html = fs.readFileSync(filePath, 'utf8');
    const metaRaw = extractMeta(html);
    const body = cleanLinks(extractBody(html), locale);
    const toc = extractToc(html);
    const intro = extractIntro(html);
    const otherLocale = locale === 'nl' ? 'en' : 'nl';
    const otherSlug = post[otherLocale]?.slug || null;
    const meta = buildMeta(metaRaw, post[locale].slug, otherSlug);
    meta.intro = intro;
    meta.toc = toc;

    fs.writeFileSync(
      path.join(dir, `meta.${locale}.json`),
      JSON.stringify(meta, null, 2)
    );
    fs.writeFileSync(path.join(dir, `body.${locale}.html`), body);
    console.log(`Wrote ${post.key}/${locale} (slug=${post[locale].slug}, ${body.length}b)`);
  }
}
