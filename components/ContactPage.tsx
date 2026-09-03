import { getPageContent } from '@/lib/pages';
import type { Locale } from '@/lib/site';
import { AdaptiveContactSection } from './AdaptiveContactSection';
import { SiteShell } from './SiteShell';

const CONTACT_MARKER = '<!-- ADAPTIVE_CONTACT_SECTION -->';

export function ContactPage({ locale, altPath }: { locale: Locale; altPath: string }) {
  const html = getPageContent('contact', locale);
  const parts = html.split(CONTACT_MARKER);

  if (parts.length !== 2) {
    throw new Error(`Expected one ${CONTACT_MARKER} marker in contact.${locale}.html`);
  }

  return (
    <SiteShell locale={locale} altPath={altPath} showWhatsApp={false}>
      <div dangerouslySetInnerHTML={{ __html: parts[0] }} />
      <AdaptiveContactSection locale={locale} />
      <div dangerouslySetInnerHTML={{ __html: parts[1] }} />
    </SiteShell>
  );
}
