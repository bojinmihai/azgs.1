import { SiteShell } from './SiteShell';
import { getPageContent, getPageMeta } from '@/lib/pages';
import { serviceJsonLd } from '@/lib/seo';
import { audienceForPageKey, type AudienceScope, type Locale, type RouteKey, url } from '@/lib/site';

type Props = {
  pageKey: string;
  locale: Locale;
  altPath: string;
  audience?: AudienceScope;
};

export function LegacyPage({ pageKey, locale, altPath, audience }: Props) {
  const html = getPageContent(pageKey, locale);
  const serviceNames: Record<string, Record<Locale, string>> = {
    drywall: { nl: 'Gipsplaten en metalstud', en: 'Drywall and metal stud' },
    painting: { nl: 'Binnenschilderwerk', en: 'Interior painting' },
    parquet: { nl: 'Parket en houten vloeren', en: 'Parquet and wooden flooring' },
    tiling: { nl: 'Tegelwerk', en: 'Tiling' },
    plumbing: { nl: 'Sanitair en leidingwerk', en: 'Plumbing and sanitary work' },
    heating: { nl: 'Verwarming', en: 'Heating' },
    underfloorHeating: { nl: 'Vloerverwarming', en: 'Underfloor heating' },
    electrical: { nl: 'Elektrawerkzaamheden', en: 'Electrical work' },
  };
  const serviceName = serviceNames[pageKey]?.[locale];
  const serviceSchema = serviceName
    ? serviceJsonLd({
        locale,
        name: serviceName,
        description: getPageMeta(pageKey, locale).description,
        path: url(pageKey as RouteKey, locale),
      })
    : null;
  return (
    <SiteShell locale={locale} altPath={altPath} audience={audience ?? audienceForPageKey(pageKey)}>
      {serviceSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      ) : null}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </SiteShell>
  );
}
