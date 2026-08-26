import Link from 'next/link';
import { COMPANY, type Locale, url } from '@/lib/site';
import { SiteShell } from './SiteShell';

type Props = {
  locale: Locale;
  altPath: string;
};

const copy = {
  nl: {
    eyebrow: 'AZ Grand Solutions · Installaties, gipsplaten en onderhoud',
    title: 'Kies de juiste route voor uw project',
    intro:
      'Wij richten ons op sanitair, verwarming, ventilatie, warmtepompen en gipsplaten. Afwerking zoals tegelwerk, schilderwerk, gletwerk en vloeren blijft beschikbaar als aanvullend werk rond installaties en renovatie.',
    privateTitle: 'Particulier',
    privateText:
      'Voor woningen: sanitair, verwarming, vloerverwarming, ventilatie, warmtepompen, gipsplaten en complete herstelafwerking na installatiewerk.',
    privateCta: 'Ik zoek hulp voor mijn woning',
    businessTitle: 'Zakelijk / B2B',
    businessText:
      'Voor aannemers, bedrijven en projectteams: sanitaire installaties, thermische installaties, ventilatie, warmtepompen en gipsplaten/gips-carton.',
    businessCta: 'Ik zoek een zakelijke partner',
    maintenanceTitle: 'Onderhoud gebouwen',
    maintenanceText:
      'Voor beheerders van kantoren, horeca, hotels en bedrijfspanden: onderhoud, lekkages, technische storingen en herstel van wanden, tegels en schilderwerk na reparatie.',
    maintenanceCta: 'Ik zoek onderhoud voor een gebouw',
    call: `Bel ${COMPANY.phoneDisplay}`,
    trust: ['Technische installaties centraal', 'Particulier, B2B en onderhoud gescheiden', 'KvK 42064891'],
    serviceHeading: 'Drie duidelijke ingangen',
    serviceText:
      'Particuliere klanten krijgen woningrenovatie met technische focus. Zakelijke klanten krijgen projectmatige installaties en gipsplaten. Gebouwbeheerders krijgen onderhoud en herstel onder één aanspreekpunt.',
  },
  en: {
    eyebrow: 'AZ Grand Solutions · Installations, drywall and maintenance',
    title: 'Choose the right route for your project',
    intro:
      'We focus on plumbing, heating, ventilation, heat pumps and drywall. Finishing work such as tiling, painting, plastering and floors remains available as supporting work around installations and renovation.',
    privateTitle: 'Private homeowner',
    privateText:
      'For homes: plumbing, heating, underfloor heating, ventilation, heat pumps, drywall and complete finishing repair after installation work.',
    privateCta: 'I need help for my home',
    businessTitle: 'Business / B2B',
    businessText:
      'For contractors, companies and project teams: plumbing installations, thermal installations, ventilation, heat pumps and drywall.',
    businessCta: 'I need a business partner',
    maintenanceTitle: 'Building maintenance',
    maintenanceText:
      'For offices, hospitality, hotels and commercial buildings: maintenance, leaks, technical faults and repair of walls, tiles and painting after the technical repair.',
    maintenanceCta: 'I need building maintenance',
    call: `Call ${COMPANY.phoneDisplay}`,
    trust: ['Technical installations first', 'Private, B2B and maintenance separated', 'KvK 42064891'],
    serviceHeading: 'Three clear entry points',
    serviceText:
      'Private clients get home renovation with a technical focus. Business clients get project-based installations and drywall. Building managers get maintenance and repair under one point of contact.',
  },
} as const;

export function AudienceLanding({ locale, altPath }: Props) {
  const t = copy[locale];

  return (
    <SiteShell locale={locale} altPath={altPath}>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <p className="hero-eyebrow">{t.eyebrow}</p>
            <h1>{t.title}</h1>
            <p className="hero-subtitle">{t.intro}</p>
            <div className="hero-ctas">
              <Link href={url('private', locale)} className="btn btn-primary btn-large">
                {t.privateCta}
              </Link>
              <Link href={url('business', locale)} className="btn btn-ghost btn-large">
                {t.businessCta}
              </Link>
              <Link href={url('maintenance', locale)} className="btn btn-ghost btn-large">
                {t.maintenanceCta}
              </Link>
            </div>
            <div className="hero-trust">
              {t.trust.map((item) => (
                <span key={item}>
                  <span className="dot"></span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <picture>
              <source
                media="(max-width: 768px)"
                type="image/webp"
                srcSet="/assets/img/hero/home-hero-azgs-mobile-680.webp 680w, /assets/img/hero/home-hero-azgs-mobile-720.webp 720w, /assets/img/hero/home-hero-azgs-mobile-900.webp 900w"
                sizes="(max-width: 768px) calc(100vw - 2rem), 720px"
              />
              <source type="image/webp" srcSet="/assets/img/hero/home-hero-azgs.webp" />
              <img
                src="/assets/img/hero/home-hero-azgs.webp"
                alt="AZ Grand Solutions"
                width="1920"
                height="1080"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>
        </div>
      </section>

      <section className="services" aria-labelledby="audience-heading">
        <div className="container">
          <header className="section-head">
            <p className="section-eyebrow">AZGS</p>
            <h2 id="audience-heading">{t.serviceHeading}</h2>
            <p>{t.serviceText}</p>
          </header>

          <div className="services-grid">
            <article className="service-card">
              <div className="service-card-image">
                <picture>
                  <source type="image/webp" srcSet="/assets/img/services/service-parket-800.webp" />
                  <img
                    src="/assets/img/services/service-parket-800.jpg"
                    alt={t.privateTitle}
                    width="800"
                    height="600"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>
              <div className="service-card-body">
                <span className="service-category cat-finisaje">{t.privateTitle}</span>
                <h3>
                  <Link href={url('private', locale)} className="service-card-link">
                    {t.privateTitle}
                  </Link>
                </h3>
                <p>{t.privateText}</p>
              </div>
            </article>

            <article className="service-card">
              <div className="service-card-image">
                <picture>
                  <source type="image/webp" srcSet="/assets/img/services/service-gipsplaten-800.webp" />
                  <img
                    src="/assets/img/services/service-gipsplaten-800.jpg"
                    alt={t.businessTitle}
                    width="800"
                    height="600"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>
              <div className="service-card-body">
                <span className="service-category cat-installaties">{t.businessTitle}</span>
                <h3>
                  <Link href={url('business', locale)} className="service-card-link">
                    {t.businessTitle}
                  </Link>
                </h3>
                <p>{t.businessText}</p>
              </div>
            </article>

            <article className="service-card">
              <div className="service-card-image">
                <picture>
                  <source type="image/webp" srcSet="/assets/img/services/service-verwarming-800.webp" />
                  <img
                    src="/assets/img/services/service-verwarming-800.jpg"
                    alt={t.maintenanceTitle}
                    width="800"
                    height="600"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>
              <div className="service-card-body">
                <span className="service-category cat-installaties">{t.maintenanceTitle}</span>
                <h3>
                  <Link href={url('maintenance', locale)} className="service-card-link">
                    {t.maintenanceTitle}
                  </Link>
                </h3>
                <p>{t.maintenanceText}</p>
              </div>
            </article>
          </div>

          <div className="hero-ctas" style={{ justifyContent: 'center', marginTop: '2rem' }}>
            <a href={`tel:${COMPANY.phone}`} className="btn btn-ghost btn-large">
              {t.call}
            </a>
            <Link href={url('contact', locale)} className="btn btn-primary btn-large">
              {locale === 'nl' ? 'Offerte aanvragen' : 'Request a quote'}
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
