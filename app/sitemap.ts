import type { MetadataRoute } from 'next';
import { SITE_URL, SLUGS } from '@/lib/site';
import { getAllPosts } from '@/lib/blog';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const [, paths] of Object.entries(SLUGS)) {
    entries.push({
      url: `${SITE_URL}${paths.nl}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          nl: `${SITE_URL}${paths.nl}`,
          en: `${SITE_URL}${paths.en}`,
          'x-default': `${SITE_URL}${paths.nl}`,
        },
      },
    });
    entries.push({
      url: `${SITE_URL}${paths.en}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          nl: `${SITE_URL}${paths.nl}`,
          en: `${SITE_URL}${paths.en}`,
          'x-default': `${SITE_URL}${paths.nl}`,
        },
      },
    });
  }

  for (const locale of ['nl', 'en'] as const) {
    for (const post of getAllPosts(locale)) {
      const path =
        locale === 'nl' ? `/blog/${post.slug}` : `/en/blog/${post.slug}`;
      const altPath = post.altSlug
        ? locale === 'nl'
          ? `/en/blog/${post.altSlug}`
          : `/blog/${post.altSlug}`
        : null;
      const langs: Record<string, string> = {
        [locale]: `${SITE_URL}${path}`,
      };
      if (altPath) {
        const other = locale === 'nl' ? 'en' : 'nl';
        langs[other] = `${SITE_URL}${altPath}`;
        langs['x-default'] = locale === 'nl' ? `${SITE_URL}${path}` : `${SITE_URL}${altPath}`;
      }
      entries.push({
        url: `${SITE_URL}${path}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: { languages: langs },
      });
    }
  }

  return entries;
}
