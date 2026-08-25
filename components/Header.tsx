import Link from 'next/link';
import Image from 'next/image';
import { COMPANY, type Locale, url } from '@/lib/site';
import { getMessages } from '@/lib/i18n';
import { PhoneIcon } from './icons';
import { LanguageSwitcher } from './LanguageSwitcher';

type Props = { locale: Locale; altPath?: string };

export function Header({ locale, altPath }: Props) {
  const t = getMessages(locale);
  const homeHref = url('home', locale);
  const tel = `tel:${COMPANY.phone}`;
  const callLabel = t.nav.callCta.replace('{phone}', COMPANY.phoneDisplay);

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
            <li className="has-dropdown">
              <Link href={url('services', locale)} aria-haspopup="true" aria-expanded="false">
                {t.nav.services}
              </Link>
              <div className="dropdown" role="menu">
                <div className="dropdown-column">
                  <div className="dropdown-heading">{t.nav.finishing}</div>
                  <Link href={url('drywall', locale)} role="menuitem">
                    {t.nav.drywall}
                  </Link>
                  <Link href={url('painting', locale)} role="menuitem">
                    {t.nav.painting}
                  </Link>
                  <Link href={url('parquet', locale)} role="menuitem">
                    {t.nav.parquet}
                  </Link>
                  <Link href={url('tiling', locale)} role="menuitem">
                    {t.nav.tiling}
                  </Link>
                </div>
                <div className="dropdown-column">
                  <div className="dropdown-heading">{t.nav.installations}</div>
                  <Link href={url('plumbing', locale)} role="menuitem">
                    {t.nav.plumbing}
                  </Link>
                  <Link href={url('heating', locale)} role="menuitem">
                    {t.nav.heating}
                  </Link>
                  <Link href={url('underfloorHeating', locale)} role="menuitem">
                    {t.nav.underfloorHeating}
                  </Link>
                  <Link href={url('electrical', locale)} role="menuitem">
                    {t.nav.electrical}
                  </Link>
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
