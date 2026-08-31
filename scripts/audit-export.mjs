import fs from 'node:fs';
import path from 'node:path';

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

const files = walk('out').filter((file) => file.endsWith('.html'));
const routes = new Set(
  files.map((file) => {
    const route = path.relative('out', file).slice(0, -5).replaceAll(path.sep, '/');
    return route === 'index' ? '/' : `/${route}`;
  })
);
const hrefs = new Set();
const issues = [];

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/)?.[1] ?? '';
  const description = html.match(/<meta name="description" content="(.*?)"/)?.[1] ?? '';
  const h1Count = html.match(/<h1(?:\s|>)/g)?.length ?? 0;

  const isFramework404 = path.basename(file) === '404.html';
  if (!title || (!description && !isFramework404) || h1Count !== 1 || title.includes('&amp;amp;')) {
    issues.push({ file, title, descriptionLength: description.length, h1Count });
  }

  for (const match of html.matchAll(/href="(\/[^"?#]*)/g)) hrefs.add(match[1]);
}

const brokenLinks = [...hrefs].filter((href) => {
  if (href.startsWith('/_next')) return false;
  const exportedAsset = path.join('out', href.slice(1));
  return !routes.has(href) && !fs.existsSync(exportedAsset) && !fs.existsSync(`${exportedAsset}.html`);
});

if (issues.length || brokenLinks.length) {
  console.error(JSON.stringify({ pages: files.length, issues, brokenLinks }, null, 2));
  process.exitCode = 1;
} else {
  console.log(`Audited ${files.length} exported pages: metadata, H1 structure and internal links are valid.`);
}
