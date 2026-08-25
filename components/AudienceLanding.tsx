import Link from 'next/link';
import { COMPANY, type Locale, url } from '@/lib/site';
import { SiteShell } from './SiteShell';

type Props = {
  locale: Locale;
  altPath: string;
};

const copy = {
  nl: {
    eyebrow: 'AZ Grand Solutions · Kies uw route',
    title: 'Voor wie zoekt u hulp?',
    intro:
      'Wij werken voor particuliere woningen en voor zakelijke opdrachtgevers. Kies de route die bij uw project past, zodat u direct de juiste diensten, uitleg en aanvraag krijgt.',
    privateTitle: 'Particulier',
    privateText:
      'Voor woningen: afwerking, renovatie, installaties en spoedservice. Denk aan gipsplaten, schilderwerk, parket, tegelwerk, sanitair, verwarming, vloerverwarming en elektra.',
    privateCta: 'Ik zoek hulp voor mijn woning',
    businessTitle: 'Zakelijk / B2B',
    businessText:
      'Voor bedrijven, aannemers, beheerders en projecten. Zakelijk werken wij gericht op installaties en gipsplaten/gips-carton: duidelijk, planbaar en geschikt voor samenwerking.',
    businessCta: 'Ik zoek een zakelijke partner',
    call: `Bel ${COMPANY.phoneDisplay}`,
    trust: ['Particulier en zakelijk gescheiden', 'Duidelijke diensten per doelgroep', 'KvK 42064891'],
    serviceHeading: 'Heldere keuze, minder verwarring',
    serviceText:
      'Particulieren zien de volledige woonoplossing. Zakelijke bezoekers zien alleen de werkzaamheden die wij B2B aanbieden: installaties en gipsplaten.',
  },
  en: {
    eyebrow: 'AZ Grand Solutions · Choose your route',
    title: 'Who are you looking for help for?',
    intro:
      'We work for private homes and for business clients. Choose the route that fits your project, so you see the right services, explanation, and quote flow immediately.',
    privateTitle: 'Private homeowner',
    privateText:
      'For homes: finishing, renovation, installations, and emergency service. This includes drywall, painting, parquet, tiling, plumbing, heating, underfloor heating, and electrical work.',
    privateCta: 'I need help for my home',
    businessTitle: 'Business / B2B',
    businessText:
      'For companies, contractors, property managers, and projects. For B2B we focus on installations and drywall: clear, plannable, and suitable for cooperation.',
    businessCta: 'I need a business partner',
    call: `Call ${COMPANY.phoneDisplay}`,
    trust: ['Private and business separated', 'Clear services per audience', 'KvK 42064891'],
    serviceHeading: 'Clear choice, less confusion',
    serviceText:
      'Private visitors see the complete home solution. Business visitors see only the work we offer B2B: installations and drywall.',
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
                <span className="service-category cat-installatii">{t.businessTitle}</span>
                <h3>
                  <Link href={url('business', locale)} className="service-card-link">
                    {t.businessTitle}
                  </Link>
                </h3>
                <p>{t.businessText}</p>
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
