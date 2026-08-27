import type { AudienceScope, Locale } from '@/lib/site';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppFloat } from './WhatsAppFloat';
import { CookieConsent } from './CookieConsent';
import { MobileNavScript } from './MobileNavScript';
import { TermsConsentScript } from './TermsConsentScript';
import { getMessages } from '@/lib/i18n';

type Props = {
  locale: Locale;
  altPath?: string;
  audience?: AudienceScope;
  children: React.ReactNode;
};

export function SiteShell({ locale, altPath, audience = 'general', children }: Props) {
  const t = getMessages(locale);
  return (
    <>
      <a className="skip-link" href="#main">
        {t.nav.skipToContent}
      </a>
      <Header locale={locale} altPath={altPath} audience={audience} />
      <main id="main">{children}</main>
      <Footer locale={locale} audience={audience} />
      <WhatsAppFloat label={`${t.common.whatsapp} ${t.nav.contact}`} />
      <CookieConsent locale={locale} />
      <MobileNavScript />
      <TermsConsentScript />
    </>
  );
}
