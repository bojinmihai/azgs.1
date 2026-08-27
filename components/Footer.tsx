import Link from 'next/link';
import Image from 'next/image';
import { COMPANY, type AudienceScope, type Locale, url } from '@/lib/site';
import { getMessages } from '@/lib/i18n';
import { MailIcon, PhoneIcon, WhatsAppIcon } from './icons';

type Props = { locale: Locale; audience?: AudienceScope };

function footerServices(locale: Locale, audience: AudienceScope) {
  const isNl = locale === 'nl';

  if (audience === 'business') {
    return {
      heading: isNl ? 'B2B diensten' : 'B2B services',
      items: [
        { href: url('plumbing', locale), label: isNl ? 'Sanitair en leidingwerk' : 'Plumbing and pipework' },
        { href: url('heating', locale), label: isNl ? 'Verwarming en thermisch' : 'Heating and thermal' },
        { href: url('underfloorHeating', locale), label: isNl ? 'Ventilatie en warmtepompen' : 'Ventilation and heat pumps' },
        { href: url('drywall', locale), label: isNl ? 'Gipsplaten en metalstud' : 'Drywall and metal stud' },
      ],
    };
  }

  if (audience === 'maintenance') {
    return {
      heading: isNl ? 'Service en onderhoud' : 'Service and maintenance',
      items: [
        { href: url('maintenance', locale), label: isNl ? 'Gebouwonderhoud' : 'Building maintenance' },
        { href: url('plumbing', locale), label: isNl ? 'Lekkage en sanitair herstel' : 'Leaks and plumbing repair' },
        { href: url('heating', locale), label: isNl ? 'Verwarming en storingen' : 'Heating and faults' },
        { href: url('drywall', locale), label: isNl ? 'Gipsplaten en herstel' : 'Drywall and repair' },
      ],
    };
  }

  if (audience === 'private') {
    return {
      heading: isNl ? 'Particuliere diensten' : 'Private services',
      items: [
        { href: url('plumbing', locale), label: isNl ? 'Sanitair en badkamer' : 'Plumbing and bathroom' },
        { href: url('heating', locale), label: isNl ? 'Verwarming' : 'Heating' },
        { href: url('underfloorHeating', locale), label: isNl ? 'Vloerverwarming' : 'Underfloor heating' },
        { href: url('drywall', locale), label: isNl ? 'Gipsplaten en renovatie' : 'Drywall and renovation' },
        { href: url('tiling', locale), label: isNl ? 'Tegelwerk badkamer' : 'Bathroom tiling' },
        { href: url('painting', locale), label: isNl ? 'Herstel en schilderwerk' : 'Repair and painting' },
      ],
    };
  }

  return {
    heading: isNl ? 'Technische diensten' : 'Technical services',
    items: [
      { href: url('plumbing', locale), label: isNl ? 'Sanitair en leidingwerk' : 'Plumbing and pipework' },
      { href: url('heating', locale), label: isNl ? 'Verwarming' : 'Heating' },
      { href: url('underfloorHeating', locale), label: isNl ? 'Vloerverwarming en warmtepompen' : 'Underfloor heating and heat pumps' },
      { href: url('drywall', locale), label: isNl ? 'Gipsplaten' : 'Drywall' },
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
