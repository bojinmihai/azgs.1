import type { MetadataRoute } from 'next';
import { SITE_URL, SLUGS } from '@/lib/site';
import { getAllPosts } from '@/lib/blog';
import {
  getAudienceServiceContent,
  getAudienceServiceParams,
  resolveAudienceServiceParams,
} from '@/lib/audience-services';
import { getBusinessSectorBySlug, getBusinessSectorParams } from '@/lib/business-sectors';

export const dynamic = 'force-static';

// Update only when the corresponding static content has materially changed.
// The current site-wide release was completed on this date.
const STATIC_CONTENT_LAST_MODIFIED = new Date('2026-09-03T00:00:00.000Z');

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const [key, paths] of Object.entries(SLUGS)) {
    if (key === 'thankYou') continue;
    entries.push({
      url: `${SITE_URL}${paths.nl}`,
      lastModified: STATIC_CONTENT_LAST_MODIFIED,
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
      lastModified: STATIC_CONTENT_LAST_MODIFIED,
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
    for (const params of getAudienceServiceParams(locale)) {
      const resolved = resolveAudienceServiceParams(locale, params.audience, params.service);
      if (!resolved) continue;
      const content = getAudienceServiceContent(resolved.audience, resolved.service, locale);
      entries.push({
        url: `${SITE_URL}${content.path}`,
        lastModified: STATIC_CONTENT_LAST_MODIFIED,
        changeFrequency: 'monthly',
        priority: resolved.audience === 'business' ? 0.82 : 0.76,
        alternates: {
          languages: {
            [locale]: `${SITE_URL}${content.path}`,
            [locale === 'nl' ? 'en' : 'nl']: `${SITE_URL}${content.altPath}`,
            'x-default': locale === 'nl' ? `${SITE_URL}${content.path}` : `${SITE_URL}${content.altPath}`,
          },
        },
      });
    }
  }

  for (const locale of ['nl', 'en'] as const) {
    for (const params of getBusinessSectorParams(locale)) {
      const content = getBusinessSectorBySlug(locale, params.sector);
      if (!content) continue;
      entries.push({
        url: `${SITE_URL}${content.path}`,
        lastModified: STATIC_CONTENT_LAST_MODIFIED,
        changeFrequency: 'monthly',
        priority: 0.78,
        alternates: {
          languages: {
            nl: `${SITE_URL}${locale === 'nl' ? content.path : content.altPath}`,
            en: `${SITE_URL}${locale === 'en' ? content.path : content.altPath}`,
            'x-default': `${SITE_URL}${locale === 'nl' ? content.path : content.altPath}`,
          },
        },
      });
    }
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
