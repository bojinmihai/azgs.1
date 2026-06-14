import fs from 'node:fs';
import path from 'node:path';
import type { Locale } from './site';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export type BlogMeta = {
  slug: string;
  altSlug: string | null;
  title: string;
  pageTitle: string;
  description: string;
  intro: string;
  date: string;
  category: string;
  readTime: number;
  cover: string;
  coverFallback: string;
  toc: string;
};

export type BlogPost = BlogMeta & {
  pairKey: string; // folder name
  locale: Locale;
};

export type BlogPostFull = BlogPost & {
  body: string;
};

let _allPosts: BlogPost[] | null = null;

function loadAllPosts(): BlogPost[] {
  if (_allPosts) return _allPosts;
  if (!fs.existsSync(BLOG_DIR)) return (_allPosts = []);
  const folders = fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const posts: BlogPost[] = [];
  for (const pairKey of folders) {
    const dir = path.join(BLOG_DIR, pairKey);
    for (const locale of ['nl', 'en'] as const) {
      const metaPath = path.join(dir, `meta.${locale}.json`);
      if (!fs.existsSync(metaPath)) continue;
      const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8')) as BlogMeta;
      posts.push({ ...meta, pairKey, locale });
    }
  }
  // Sort by date descending
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  _allPosts = posts;
  return posts;
}

export function getAllPosts(locale: Locale): BlogPost[] {
  return loadAllPosts().filter((p) => p.locale === locale);
}

export function getPostBySlug(
  locale: Locale,
  slug: string
): BlogPostFull | null {
  const post = loadAllPosts().find(
    (p) => p.locale === locale && p.slug === slug
  );
  if (!post) return null;
  const bodyPath = path.join(
    BLOG_DIR,
    post.pairKey,
    `body.${locale}.html`
  );
  const body = fs.existsSync(bodyPath)
    ? fs.readFileSync(bodyPath, 'utf8')
    : '';
  return { ...post, body };
}

export function getPostUrl(post: BlogPost): string {
  return post.locale === 'nl' ? `/blog/${post.slug}` : `/en/blog/${post.slug}`;
}

export function getAltPath(post: BlogPost): string | null {
  if (!post.altSlug) return null;
  return post.locale === 'nl'
    ? `/en/blog/${post.altSlug}`
    : `/blog/${post.altSlug}`;
}

export function getAllSlugs(locale: Locale): string[] {
  return getAllPosts(locale).map((p) => p.slug);
}
