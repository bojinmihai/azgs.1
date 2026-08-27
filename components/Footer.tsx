import Link from 'next/link';
import Image from 'next/image';
import { COMPANY, type Locale, url } from '@/lib/site';
import { getMessages } from '@/lib/i18n';
import { MailIcon, PhoneIcon, WhatsAppIcon } from './icons';

type Props = { locale: Locale };

export function Footer({ locale }: Props) {
  const t = getMessages(locale);
  const other: Locale = locale === 'nl' ? 'en' : 'nl';
  const otherHome = url('home', other);
  const directionsLabel = locale === 'nl' ? 'Richtingen' : 'Directions';
  const technicalLabel = locale === 'nl' ? 'Technische diensten' : 'Technical services';

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Image
              src="/assets/img/logo/logo-white-orange.svg"
              alt={COMPANY.name}
              width={160}
              height={48}
              style={{ width: 'auto', height: 'auto' }}
            />
            <p>{t.footer.tagline}</p>
          </div>

          <div className="footer-col">
            <h3>{t.footer.servicesHeading}</h3>
            <div className="footer-subhead">{directionsLabel}</div>
            <ul>
              <li>
                <Link href={url('private', locale)}>{t.nav.private}</Link>
              </li>
              <li>
                <Link href={url('business', locale)}>{t.nav.business}</Link>
              </li>
              <li>
                <Link href={url('maintenance', locale)}>{t.nav.maintenance}</Link>
              </li>
            </ul>
            <div className="footer-subhead">{technicalLabel}</div>
            <ul>
              <li>
                <Link href={url('plumbing', locale)}>{t.nav.plumbing}</Link>
              </li>
              <li>
                <Link href={url('heating', locale)}>{t.nav.heating}</Link>
              </li>
              <li>
                <Link href={url('underfloorHeating', locale)}>
                  {t.nav.underfloorHeating}
                </Link>
              </li>
              <li>
                <Link href={url('drywall', locale)}>{t.nav.drywall}</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>{t.footer.companyHeading}</h3>
            <ul>
              <li>
                <Link href={url('private', locale)}>{t.nav.private}</Link>
              </li>
              <li>
                <Link href={url('business', locale)}>{t.nav.business}</Link>
              </li>
              <li>
                <Link href={url('maintenance', locale)}>{t.nav.maintenance}</Link>
              </li>
              <li>
                <Link href={url('about', locale)}>{t.nav.about}</Link>
              </li>
              <li>
                <Link href={url('emergency', locale)}>{t.footer.emergencyService}</Link>
              </li>
              <li>
                <Link href={url('blog', locale)}>{t.nav.blog}</Link>
              </li>
              <li>
                <Link href={url('contact', locale)}>{t.nav.contact}</Link>
              </li>
              <li>
                <a href={otherHome}>{t.footer.languageVersion}</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>{t.footer.contactHeading}</h3>
            <ul>
              <li className="footer-contact-item">
                <PhoneIcon className="icon" size={16} />
                <a href={`tel:${COMPANY.phone}`}>{COMPANY.phoneDisplay}</a>
              </li>
              <li className="footer-contact-item">
                <MailIcon className="icon" />
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              </li>
              <li className="footer-contact-item">
                <WhatsAppIcon className="icon" size={16} />
                <a
                  href={`https://wa.me/${COMPANY.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.common.whatsapp}
                </a>
              </li>
            </ul>
            <div className="footer-subhead">{t.footer.forQuotes}</div>
            <ul>
              <li>
                <a href={`mailto:${COMPANY.emailRequest}`}>
                  {COMPANY.emailRequest}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>{t.footer.copyright}</div>
          <div className="footer-bottom-legal">
            <Link href={url('privacy', locale)}>{t.footer.privacy}</Link>
            <Link href={url('cookies', locale)}>{t.footer.cookies}</Link>
            <Link href={url('terms', locale)}>{t.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
