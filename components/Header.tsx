import Link from 'next/link';
import Image from 'next/image';
import { COMPANY, type AudienceScope, type Locale, url } from '@/lib/site';
import { getMessages } from '@/lib/i18n';
import { PhoneIcon } from './icons';
import { LanguageSwitcher } from './LanguageSwitcher';

type Props = { locale: Locale; altPath?: string; audience?: AudienceScope };

type MenuItem = {
  href: string;
  label: string;
};

function serviceMenu(locale: Locale, audience: AudienceScope): { heading: string; items: MenuItem[] } {
  const isNl = locale === 'nl';

  if (audience === 'business') {
    return {
      heading: isNl ? 'B2B diensten' : 'B2B services',
      items: [
        { href: url('plumbing', locale), label: isNl ? 'Sanitair en leidingwerk' : 'Plumbing and pipework' },
        { href: url('heating', locale), label: isNl ? 'Verwarming en thermische installaties' : 'Heating and thermal systems' },
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
        { href: url('underfloorHeating', locale), label: isNl ? 'Ventilatie en warmtepompen' : 'Ventilation and heat pumps' },
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
      { href: url('underfloorHeating', locale), label: isNl ? 'Vloerverwarming, ventilatie en warmtepompen' : 'Underfloor heating, ventilation and heat pumps' },
      { href: url('drywall', locale), label: isNl ? 'Gipsplaten' : 'Drywall' },
    ],
  };
}

export function Header({ locale, altPath, audience = 'general' }: Props) {
  const t = getMessages(locale);
  const homeHref = url('home', locale);
  const tel = `tel:${COMPANY.phone}`;
  const callLabel = t.nav.callCta.replace('{phone}', COMPANY.phoneDisplay);
  const menu = serviceMenu(locale, audience);

  return (
    <header className="site-header" data-menu-open="false">
      <div className="container header-inner">
        <Link href={homeHref} className="site-logo" aria-label={`${COMPANY.name} home`}>
          <Image
            src="/assets/img/logo/logo-primary.svg"
            alt={COMPANY.name}
            width={150}
            height={44}
            style={{ width: 'auto', height: 'auto' }}
          />
        </Link>

        <nav className="main-nav" id="main-nav" aria-label={t.nav.primaryNav}>
          <ul>
            <li>
              <Link href={homeHref}>{t.nav.home}</Link>
            </li>
            <li>
              <Link href={url('private', locale)}>{t.nav.private}</Link>
            </li>
            <li>
              <Link href={url('business', locale)}>{t.nav.business}</Link>
            </li>
            <li>
              <Link href={url('maintenance', locale)}>{t.nav.maintenance}</Link>
            </li>
            <li className="has-dropdown">
              <Link href={url('services', locale)} aria-haspopup="true" aria-expanded="false">
                {t.nav.services}
              </Link>
              <div className="dropdown dropdown--single" role="menu">
                <div className="dropdown-column">
                  <div className="dropdown-heading">{menu.heading}</div>
                  {menu.items.map((item) => (
                    <Link key={`${item.href}-${item.label}`} href={item.href} role="menuitem">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
            <li>
              <Link href={url('emergency', locale)}>{t.nav.emergency}</Link>
            </li>
            <li>
              <Link href={url('about', locale)}>{t.nav.about}</Link>
            </li>
            <li>
              <Link href={url('blog', locale)}>{t.nav.blog}</Link>
            </li>
            <li>
              <Link href={url('contact', locale)}>{t.nav.contact}</Link>
            </li>
          </ul>

          <div className="mobile-menu-extras">
            <a href={tel} className="btn btn-primary">
              {callLabel}
            </a>
          </div>
        </nav>

        <div className="header-actions">
          <LanguageSwitcher locale={locale} altPath={altPath} />
          <a href={tel} className="header-phone" aria-label={callLabel}>
            <PhoneIcon size={16} className="icon" />
            {COMPANY.phoneDisplay}
          </a>
        </div>

        <button
          className="mobile-toggle"
          aria-label={t.nav.menuOpen}
          aria-expanded="false"
          aria-controls="main-nav"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
