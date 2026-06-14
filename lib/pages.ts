import fs from 'node:fs';
import path from 'node:path';
import meta from '@/content/pages/meta.json';
import type { Locale } from './site';

const PAGES_DIR = path.join(process.cwd(), 'content/pages');

export type PageMeta = { title: string; description: string };

export function getPageContent(key: string, locale: Locale): string {
  const file = path.join(PAGES_DIR, `${key}.${locale}.html`);
  return fs.readFileSync(file, 'utf8');
}

export function getPageMeta(key: string, locale: Locale): PageMeta {
  const m = (meta as Record<string, PageMeta>)[`${key}.${locale}`];
  return m ?? { title: '', description: '' };
}
