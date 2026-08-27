import { SiteShell } from './SiteShell';
import { getPageContent } from '@/lib/pages';
import { audienceForPageKey, type AudienceScope, type Locale } from '@/lib/site';

type Props = {
  pageKey: string;
  locale: Locale;
  altPath: string;
  audience?: AudienceScope;
};

export function LegacyPage({ pageKey, locale, altPath, audience }: Props) {
  const html = getPageContent(pageKey, locale);
  return (
    <SiteShell locale={locale} altPath={altPath} audience={audience ?? audienceForPageKey(pageKey)}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </SiteShell>
  );
}
