import { SiteShell } from './SiteShell';
import { getPageContent } from '@/lib/pages';
import type { Locale } from '@/lib/site';

type Props = {
  pageKey: string;
  locale: Locale;
  altPath: string;
};

export function LegacyPage({ pageKey, locale, altPath }: Props) {
  const html = getPageContent(pageKey, locale);
  return (
    <SiteShell locale={locale} altPath={altPath}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </SiteShell>
  );
}
