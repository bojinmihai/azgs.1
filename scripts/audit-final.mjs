import fs from 'node:fs';
import path from 'node:path';

const OUT_DIR = path.resolve('out');
const SITE_URL = 'https://azgs.nl';
const FORM_ENDPOINT = 'https://formspree.io/f/xjgjryzn';

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function decodeHtml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#x27;', "'")
    .replaceAll('&#39;', "'");
}

function getAttribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'i'));
  return match ? decodeHtml(match[2]) : null;
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map((match) => match[0]);
}

function exportedRoute(file) {
  const relative = path.relative(OUT_DIR, file).replaceAll(path.sep, '/').replace(/\.html$/, '');
  return relative === 'index' ? '/' : `/${relative}`;
}

function routeFromUrl(value) {
  try {
    const parsed = new URL(value, SITE_URL);
    if (parsed.origin !== SITE_URL) return null;
    const pathname = decodeURIComponent(parsed.pathname);
    return pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  } catch {
    return null;
  }
}

function normalizePublicUrl(value) {
  try {
    return new URL(value, SITE_URL).href;
  } catch {
    return value;
  }
}

function localTargetExists(value, routes) {
  const route = routeFromUrl(value);
  if (route === null) return true;
  if (routes.has(route)) return true;
  const relative = route.replace(/^\//, '');
  return fs.existsSync(path.join(OUT_DIR, relative));
}

function jsonLdTypes(value, output = []) {
  if (Array.isArray(value)) {
    value.forEach((entry) => jsonLdTypes(entry, output));
    return output;
  }
  if (!value || typeof value !== 'object') return output;
  const type = value['@type'];
  if (Array.isArray(type)) output.push(...type.filter((entry) => typeof entry === 'string'));
  else if (typeof type === 'string') output.push(type);
  Object.values(value).forEach((entry) => jsonLdTypes(entry, output));
  return output;
}

if (!fs.existsSync(OUT_DIR)) {
  throw new Error('Missing out/. Run npm run build first.');
}

const htmlFiles = walk(OUT_DIR).filter((file) => file.endsWith('.html'));
const routes = new Set(htmlFiles.map(exportedRoute));
const issues = [];
const warnings = [];
const pages = new Map();
let jsonLdBlocks = 0;
let internalLinks = 0;
let localAssets = 0;

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const route = exportedRoute(file);
  const relative = path.relative(process.cwd(), file).replaceAll(path.sep, '/');
  const is404 = route === '/404' || route.endsWith('/404') || route === '/_not-found';
  const expectedLanguage = route === '/en' || route.startsWith('/en/') ? 'en' : 'nl';
  const htmlTag = tags(html, 'html')[0] ?? '';
  const language = getAttribute(htmlTag, 'lang');
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? '';
  const descriptionTag = tags(html, 'meta').find((tag) => getAttribute(tag, 'name')?.toLowerCase() === 'description');
  const description = descriptionTag ? getAttribute(descriptionTag, 'content') ?? '' : '';
  const h1Count = (html.match(/<h1(?:\s|>)/gi) ?? []).length;
  const robotsTag = tags(html, 'meta').find((tag) => getAttribute(tag, 'name')?.toLowerCase() === 'robots');
  const noindex = (robotsTag ? getAttribute(robotsTag, 'content') ?? '' : '').toLowerCase().includes('noindex');

  if (!is404 && language !== expectedLanguage) issues.push(`${relative}: expected html lang=${expectedLanguage}, found ${language || 'missing'}`);
  if (!is404 && (!title || !description || h1Count !== 1)) {
    issues.push(`${relative}: title=${Boolean(title)}, description=${Boolean(description)}, h1Count=${h1Count}`);
  }
  if (title.length > 70) warnings.push(`${relative}: long title (${title.length} characters)`);
  if (description && (description.length < 70 || description.length > 180)) {
    warnings.push(`${relative}: description length ${description.length}`);
  }

  const linkTags = tags(html, 'link');
  const canonicalTags = linkTags.filter((tag) => (getAttribute(tag, 'rel') ?? '').toLowerCase().split(/\s+/).includes('canonical'));
  const canonical = canonicalTags.length === 1 ? getAttribute(canonicalTags[0], 'href') ?? '' : '';
  const expectedCanonical = normalizePublicUrl(`${SITE_URL}${route}`);
  if (!is404 && canonicalTags.length !== 1) issues.push(`${relative}: expected exactly one canonical, found ${canonicalTags.length}`);
  if (!is404 && normalizePublicUrl(canonical) !== expectedCanonical) issues.push(`${relative}: canonical ${canonical || 'missing'} != ${expectedCanonical}`);

  const alternateTags = linkTags.filter((tag) => (getAttribute(tag, 'rel') ?? '').toLowerCase().split(/\s+/).includes('alternate'));
  const alternates = Object.fromEntries(alternateTags.map((tag) => [
    (getAttribute(tag, 'hreflang') ?? '').toLowerCase(),
    getAttribute(tag, 'href') ?? '',
  ]));
  if (!is404) {
    for (const languageCode of ['nl', 'en', 'x-default']) {
      if (!alternates[languageCode]) issues.push(`${relative}: missing hreflang ${languageCode}`);
      else if (!localTargetExists(alternates[languageCode], routes)) issues.push(`${relative}: hreflang target missing: ${alternates[languageCode]}`);
    }
  }

  const openGraphUrlTag = tags(html, 'meta').find((tag) => getAttribute(tag, 'property')?.toLowerCase() === 'og:url');
  const openGraphUrl = openGraphUrlTag ? getAttribute(openGraphUrlTag, 'content') ?? '' : '';
  if (!is404 && normalizePublicUrl(openGraphUrl) !== normalizePublicUrl(canonical)) issues.push(`${relative}: og:url does not match canonical`);

  const ids = tags(html, '[a-z][a-z0-9:-]*')
    .map((tag) => getAttribute(tag, 'id'))
    .filter(Boolean);
  const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  if (duplicateIds.length) issues.push(`${relative}: duplicate ids ${duplicateIds.join(', ')}`);

  for (const tag of tags(html, '[a-z][a-z0-9:-]*')) {
    for (const attribute of ['aria-labelledby', 'aria-describedby', 'aria-controls']) {
      const references = (getAttribute(tag, attribute) ?? '').split(/\s+/).filter(Boolean);
      for (const reference of references) {
        if (!ids.includes(reference)) issues.push(`${relative}: ${attribute} references missing #${reference}`);
      }
    }
  }

  for (const imageTag of tags(html, 'img')) {
    if (getAttribute(imageTag, 'alt') === null) issues.push(`${relative}: image without alt attribute`);
  }

  const assetValues = [];
  for (const tag of [...tags(html, 'img'), ...tags(html, 'script'), ...tags(html, 'source')]) {
    const src = getAttribute(tag, 'src');
    if (src) assetValues.push(src);
    const srcset = getAttribute(tag, 'srcset');
    if (srcset) assetValues.push(...srcset.split(',').map((entry) => entry.trim().split(/\s+/)[0]));
  }
  for (const tag of linkTags) {
    const rel = (getAttribute(tag, 'rel') ?? '').toLowerCase();
    if (rel.includes('stylesheet') || rel.includes('icon') || rel.includes('preload')) {
      const href = getAttribute(tag, 'href');
      if (href) assetValues.push(href);
    }
  }
  for (const value of assetValues) {
    if (/^(data:|https?:|blob:)/i.test(value)) continue;
    localAssets += 1;
    if (!localTargetExists(value, routes)) issues.push(`${relative}: missing local asset ${value}`);
  }

  const externalInitialScripts = tags(html, 'script')
    .map((tag) => getAttribute(tag, 'src'))
    .filter((src) => src && /^https?:/i.test(src));
  if (externalInitialScripts.length) issues.push(`${relative}: external script loaded before consent: ${externalInitialScripts.join(', ')}`);

  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    jsonLdBlocks += 1;
    try {
      const data = JSON.parse(match[1]);
      const forbidden = jsonLdTypes(data).filter((type) => type === 'Review' || type === 'AggregateRating');
      if (forbidden.length) issues.push(`${relative}: forbidden review schema ${[...new Set(forbidden)].join(', ')}`);
    } catch (error) {
      issues.push(`${relative}: invalid JSON-LD (${error.message})`);
    }
  }

  for (const anchorTag of tags(html, 'a')) {
    const href = getAttribute(anchorTag, 'href');
    if (!href || /^(mailto:|tel:|https?:|#|javascript:)/i.test(href)) continue;
    internalLinks += 1;
    if (!localTargetExists(href, routes)) issues.push(`${relative}: broken internal link ${href}`);
  }

  const forms = tags(html, 'form');
  if (route === '/contact' || route === '/en/contact') {
    if (forms.length !== 1) issues.push(`${relative}: expected one contact form, found ${forms.length}`);
    const action = forms[0] ? getAttribute(forms[0], 'action') : null;
    const method = forms[0] ? (getAttribute(forms[0], 'method') ?? '').toLowerCase() : '';
    if (action !== FORM_ENDPOINT || method !== 'post') issues.push(`${relative}: unexpected contact form destination or method`);
    if (/<input\b[^>]*type=["']file["']/i.test(html)) issues.push(`${relative}: file upload is active without an approved Formspree plan`);
  }

  if (!is404) {
    const canonicalKey = normalizePublicUrl(canonical);
    if (pages.has(canonicalKey)) issues.push(`${relative}: duplicate canonical also used by ${pages.get(canonicalKey).relative}`);
    pages.set(canonicalKey, { relative, alternates, noindex });
  }
}

for (const [canonical, page] of pages) {
  if (!page.alternates.nl || !page.alternates.en) continue;
  const nlPage = pages.get(normalizePublicUrl(page.alternates.nl));
  const enPage = pages.get(normalizePublicUrl(page.alternates.en));
  if (!nlPage || !enPage) continue;
  for (const [languageCode, target] of Object.entries(page.alternates)) {
    if (
      normalizePublicUrl(nlPage.alternates[languageCode]) !== normalizePublicUrl(target) ||
      normalizePublicUrl(enPage.alternates[languageCode]) !== normalizePublicUrl(target)
    ) {
      issues.push(`${page.relative}: non-reciprocal hreflang set for ${canonical}`);
      break;
    }
  }
}

const sitemapPath = path.join(OUT_DIR, 'sitemap.xml');
const sitemap = fs.readFileSync(sitemapPath, 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => normalizePublicUrl(decodeHtml(match[1].trim())));
const duplicateSitemapUrls = [...new Set(sitemapUrls.filter((url, index) => sitemapUrls.indexOf(url) !== index))];
if (duplicateSitemapUrls.length) issues.push(`sitemap.xml: duplicate URLs ${duplicateSitemapUrls.join(', ')}`);
for (const sitemapUrl of sitemapUrls) {
  if (!pages.has(sitemapUrl)) issues.push(`sitemap.xml: URL has no exported canonical page ${sitemapUrl}`);
  else if (pages.get(sitemapUrl).noindex) issues.push(`sitemap.xml: noindex URL included ${sitemapUrl}`);
}
for (const [canonical, page] of pages) {
  if (!page.noindex && !sitemapUrls.includes(canonical)) issues.push(`sitemap.xml: indexable page missing ${canonical}`);
  if (page.noindex && sitemapUrls.includes(canonical)) issues.push(`sitemap.xml: noindex page included ${canonical}`);
}

const robots = fs.readFileSync(path.join(OUT_DIR, 'robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) issues.push('robots.txt: canonical sitemap declaration missing');

const redirects = fs.readFileSync(path.join(OUT_DIR, '_redirects'), 'utf8');
const redirectSources = new Set();
for (const line of redirects.split(/\r?\n/)) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const [source, target, status] = trimmed.split(/\s+/);
  if (!source || !target || !status) {
    issues.push(`_redirects: malformed line ${trimmed}`);
    continue;
  }
  if (redirectSources.has(source)) issues.push(`_redirects: duplicate source ${source}`);
  redirectSources.add(source);
  if (!['301', '302'].includes(status)) issues.push(`_redirects: unsupported status ${status} for ${source}`);
  if (target.includes(':splat') && !target.startsWith(`${SITE_URL}/`)) {
    issues.push(`_redirects: wildcard target must stay on the canonical origin for ${source}`);
  }
  if (!target.includes(':splat') && !localTargetExists(target, routes)) issues.push(`_redirects: missing target ${target}`);
}

const headers = fs.readFileSync(path.join(OUT_DIR, '_headers'), 'utf8');
for (const header of [
  'Strict-Transport-Security',
  'X-Content-Type-Options',
  'X-Frame-Options',
  'Cross-Origin-Opener-Policy',
  'Cross-Origin-Resource-Policy',
  'Referrer-Policy',
  'Permissions-Policy',
]) {
  if (!headers.includes(`${header}:`)) issues.push(`_headers: missing ${header}`);
}

const middlewarePath = path.resolve('functions/_middleware.js');
if (!fs.existsSync(middlewarePath)) {
  issues.push('functions/_middleware.js: generated CSP middleware missing');
} else {
  const middleware = fs.readFileSync(middlewarePath, 'utf8');
  const mapMatch = middleware.match(/const CSP_BY_PATH = (\{[\s\S]*?\n\});\nconst FALLBACK_CSP/);
  if (!mapMatch) issues.push('functions/_middleware.js: CSP route map cannot be parsed');
  else {
    const cspByPath = JSON.parse(mapMatch[1]);
    for (const file of htmlFiles) {
      const route = exportedRoute(file);
      if (!cspByPath[route] && !cspByPath[`${route}.html`]) issues.push(`CSP: no policy for ${route}`);
    }
    for (const [route, csp] of Object.entries(cspByPath)) {
      for (const directive of ['default-src', 'script-src', 'style-src', 'object-src', 'base-uri', 'form-action', 'frame-ancestors', 'upgrade-insecure-requests']) {
        if (!csp.includes(directive)) issues.push(`CSP ${route}: missing ${directive}`);
      }
      if (csp.includes("'unsafe-eval'")) issues.push(`CSP ${route}: unsafe-eval is forbidden`);
      if (/script-src[^;]*'unsafe-inline'/.test(csp)) issues.push(`CSP ${route}: unsafe-inline scripts are forbidden`);
    }
    if (!middleware.includes("const FALLBACK_CSP = CSP_BY_PATH['/404'] || CSP_BY_PATH['/404.html'] || null;")) {
      issues.push('CSP: 404 fallback policy is missing');
    }
    if (!middleware.includes("response.status === 404 ? FALLBACK_CSP : null")) {
      issues.push('CSP: unknown 404 responses do not receive the fallback policy');
    }
  }
}

const publicPdfs = walk(path.join(OUT_DIR, 'downloads')).filter((file) => file.endsWith('.pdf'));
for (const pdf of publicPdfs) {
  const buffer = fs.readFileSync(pdf);
  if (buffer.length < 10_000 || buffer.subarray(0, 5).toString('ascii') !== '%PDF-') {
    issues.push(`${path.relative(process.cwd(), pdf)}: invalid or unexpectedly small PDF`);
  }
}

if (issues.length) {
  console.error(JSON.stringify({
    status: 'FAIL',
    pages: htmlFiles.length,
    sitemapUrls: sitemapUrls.length,
    jsonLdBlocks,
    internalLinks,
    localAssets,
    publicPdfs: publicPdfs.length,
    warnings,
    issues,
  }, null, 2));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({
    status: 'PASS',
    pages: htmlFiles.length,
    sitemapUrls: sitemapUrls.length,
    jsonLdBlocks,
    internalLinks,
    localAssets,
    publicPdfs: publicPdfs.length,
    warnings,
  }, null, 2));
}
