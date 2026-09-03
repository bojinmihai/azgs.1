import Link from 'next/link';
import Image from 'next/image';
import { COMPANY, audienceServiceUrl, type AudienceScope, type Locale, url } from '@/lib/site';
import { getMessages } from '@/lib/i18n';
import { MailIcon, PhoneIcon, WhatsAppIcon } from './icons';

type Props = { locale: Locale; audience?: AudienceScope };

function footerServices(locale: Locale, audience: AudienceScope) {
  const isNl = locale === 'nl';

  if (audience === 'business') {
    return {
      heading: isNl ? 'B2B diensten' : 'B2B services',
      items: [
        { href: audienceServiceUrl('business', 'plumbing', locale), label: isNl ? 'Installatiewerk B2B' : 'B2B installation work' },
        { href: audienceServiceUrl('business', 'heating', locale), label: isNl ? 'Thermische installaties' : 'Thermal systems' },
        { href: audienceServiceUrl('business', 'underfloor', locale), label: isNl ? 'Vloerverwarming B2B' : 'B2B underfloor heating' },
        { href: audienceServiceUrl('business', 'climate', locale), label: isNl ? 'Ventilatieprojecten' : 'Ventilation projects' },
      ],
    };
  }

  if (audience === 'maintenance') {
    return {
      heading: isNl ? 'Service en onderhoud' : 'Service and maintenance',
      items: [
        { href: url('maintenance', locale), label: isNl ? 'Gebouwonderhoud' : 'Building maintenance' },
        { href: audienceServiceUrl('maintenance', 'plumbing', locale), label: isNl ? 'Lekkage en sanitair herstel' : 'Leaks and plumbing repair' },
        { href: audienceServiceUrl('maintenance', 'heating', locale), label: isNl ? 'Verwarming en storingen' : 'Heating and faults' },
        { href: audienceServiceUrl('maintenance', 'underfloor', locale), label: isNl ? 'Vloerverwarming storingen' : 'Underfloor heating faults' },
        { href: audienceServiceUrl('maintenance', 'climate', locale), label: isNl ? 'Ventilatie en warmtepompen' : 'Ventilation and heat pumps' },
        { href: audienceServiceUrl('maintenance', 'drywall', locale), label: isNl ? 'Gipsplaten en herstel' : 'Drywall and repair' },
        { href: url('maintenanceTiling', locale), label: isNl ? 'Tegel- en wandherstel' : 'Tile and wall repair' },
        { href: url('maintenancePainting', locale), label: isNl ? 'Schilder- en afwerkherstel' : 'Painting and finishing repair' },
      ],
    };
  }

  if (audience === 'private') {
    return {
      heading: isNl ? 'Particuliere diensten' : 'Private services',
      items: [
        { href: audienceServiceUrl('private', 'plumbing', locale), label: isNl ? 'Sanitair en badkamer' : 'Plumbing and bathroom' },
        { href: audienceServiceUrl('private', 'heating', locale), label: isNl ? 'Verwarming' : 'Heating' },
        { href: audienceServiceUrl('private', 'underfloor', locale), label: isNl ? 'Vloerverwarming' : 'Underfloor heating' },
        { href: audienceServiceUrl('private', 'climate', locale), label: isNl ? 'Ventilatie en warmtepompen' : 'Ventilation and heat pumps' },
        { href: audienceServiceUrl('private', 'drywall', locale), label: isNl ? 'Gipsplaten en renovatie' : 'Drywall and renovation' },
        { href: url('tiling', locale), label: isNl ? 'Tegelwerk badkamer' : 'Bathroom tiling' },
        { href: url('painting', locale), label: isNl ? 'Herstel en schilderwerk' : 'Repair and painting' },
        { href: url('parquet', locale), label: isNl ? 'Parket en vloerafwerking' : 'Parquet and floor finishing' },
      ],
    };
  }

  return {
    heading: isNl ? 'Per type aanvraag' : 'By request type',
    items: [
      { href: url('private', locale), label: isNl ? 'Particulier' : 'Private' },
      { href: url('business', locale), label: isNl ? 'Zakelijk / B2B installaties' : 'Business / B2B installations' },
      { href: url('maintenance', locale), label: isNl ? 'Gebouwonderhoud' : 'Building maintenance' },
      { href: url('emergency', locale), label: isNl ? 'Spoed aanvragen' : 'Urgent request' },
    ],
  };
}

export function Footer({ locale, audience = 'general' }: Props) {
  const t = getMessages(locale);
  const other: Locale = locale === 'nl' ? 'en' : 'nl';
  const otherHome = url('home', other);
  const services = footerServices(locale, audience);

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
            <div className="footer-subhead">{services.heading}</div>
            <ul>
              {services.items.map((item) => (
                <li key={`${item.href}-${item.label}`}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
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
                <Link href={url('howWeWork', locale)}>{t.nav.howWeWork}</Link>
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
              <li>
                <Link href={url('contact', locale)}>
                  {COMPANY.tradeName} · {COMPANY.address.city}
                </Link>
              </li>
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
            <button type="button" className="footer-legal-button" data-consent-action="reject">
              {locale === 'nl' ? 'Analytics weigeren/intrekken' : 'Decline/withdraw analytics'}
            </button>
            <Link href={url('terms', locale)}>{t.footer.terms}</Link>
            <Link href={url('termsBusiness', locale)}>{t.footer.termsBusiness}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
