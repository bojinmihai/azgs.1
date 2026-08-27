import Link from 'next/link';
import { COMPANY, type Locale, url } from '@/lib/site';
import { AudienceChoiceLink } from './AudienceChoiceLink';
import { SiteShell } from './SiteShell';

type Props = {
  locale: Locale;
  altPath: string;
};

const copy = {
  nl: {
    eyebrow: 'AZ Grand Solutions · Installaties, gipsplaten en onderhoud',
    title: 'Kies de juiste projectlijn',
    intro:
      'AZ Grand Solutions is ingericht voor drie duidelijke opdrachtstromen: particuliere projecten, zakelijke uitvoering en professioneel gebouwonderhoud.',
    privateTitle: 'Particulier',
    privateText:
      'Voor particuliere woningen: technische renovatie rond sanitair, verwarming, ventilatie, warmtepompen, gipsplaten en noodzakelijke herstelafwerking.',
    privateCta: 'Start particuliere aanvraag',
    privateHover:
      'Badkamer, toilet, tegelwerk, sanitair, verwarming, vloerverwarming, ventilatie, gipsplaten, schilderwerk en herstel na installaties.',
    privateItems: ['Sanitair & verwarming', 'Badkamer, tegels, afwerking', 'Gipsplaten & renovatie'],
    businessTitle: 'Zakelijk / B2B',
    businessText:
      'Voor aannemers, bedrijven en projectteams: projectmatige uitvoering van sanitaire installaties, thermische installaties, ventilatie, warmtepompen en gipsplaten.',
    businessCta: 'Start zakelijke aanvraag',
    businessHover:
      'Voor projectmatig werk: sanitaire installaties, thermische installaties, ventilatie, warmtepompen en gipsplaten. Gericht op duidelijke planning en nette oplevering.',
    businessItems: ['Sanitaire installaties', 'Thermisch & ventilatie', 'Gipsplaten / gips-carton'],
    maintenanceTitle: 'Onderhoud gebouwen',
    maintenanceText:
      'Voor beheerders van kantoren, horeca, hotels en bedrijfspanden: technische onderhoudsstructuur, storingsopvolging en herstel na installatiewerk.',
    maintenanceCta: 'Start onderhoudsaanvraag',
    maintenanceHover:
      'Voor gebouwen, horeca, kantoren, hotels en winkels: onderhoud, lekkages, storingen, reparatie van installaties en herstel van wand, tegelwerk, gletwerk en schilderwerk.',
    maintenanceItems: ['Gebouwen, horeca, hotels', 'Storingen & lekkages', 'Reparatie + herstelafwerking'],
    call: `Bel ${COMPANY.phoneDisplay}`,
    trust: ['Technische installaties centraal', 'Particulier, B2B en onderhoud gescheiden', 'KvK 42064891'],
    serviceHeading: 'Drie professionele opdrachtlijnen',
    serviceText:
      'Elke route heeft een eigen scope, toon en aanvraagproces. Zo blijft de communicatie helder voor bewoners, projectteams en gebouwbeheerders.',
  },
  en: {
    eyebrow: 'AZ Grand Solutions · Installations, drywall and maintenance',
    title: 'Choose the right project line',
    intro:
      'AZ Grand Solutions is structured around three clear workstreams: private residential projects, business execution and professional building maintenance.',
    privateTitle: 'Private clients',
    privateText:
      'For private homes: technical renovation around plumbing, heating, ventilation, heat pumps, drywall and required finishing repair.',
    privateCta: 'Start private request',
    privateHover:
      'Bathroom, toilet, tiling, plumbing, heating, underfloor heating, ventilation, drywall, painting and finishing repair after installations.',
    privateItems: ['Plumbing & heating', 'Bathroom, tiles, finishing', 'Drywall & renovation'],
    businessTitle: 'Business / B2B',
    businessText:
      'For contractors, companies and project teams: project-based execution of plumbing installations, thermal installations, ventilation, heat pumps and drywall.',
    businessCta: 'Start business request',
    businessHover:
      'For project-based work: plumbing installations, thermal installations, ventilation, heat pumps and drywall. Built around planning, coordination and clean delivery.',
    businessItems: ['Plumbing installations', 'Heating & ventilation', 'Drywall systems'],
    maintenanceTitle: 'Building maintenance',
    maintenanceText:
      'For offices, hospitality, hotels and commercial buildings: technical maintenance structure, fault follow-up and repair after installation work.',
    maintenanceCta: 'Start maintenance request',
    maintenanceHover:
      'For buildings, hospitality, offices, hotels and shops: maintenance, leaks, technical faults, installation repair and finishing repair for walls, tiles, plastering and painting.',
    maintenanceItems: ['Buildings, hotels, offices', 'Faults & leaks', 'Repair + finishing'],
    call: `Call ${COMPANY.phoneDisplay}`,
    trust: ['Technical installations first', 'Private, B2B and maintenance separated', 'KvK 42064891'],
    serviceHeading: 'Three professional project lines',
    serviceText:
      'Each route has its own scope, tone and request flow. This keeps communication clear for residents, project teams and building managers.',
  },
} as const;

export function AudienceLanding({ locale, altPath }: Props) {
  const t = copy[locale];
  const audiences = [
    {
      id: 'private',
      href: url('private', locale),
      title: t.privateTitle,
      text: t.privateText,
      hover: t.privateHover,
      items: t.privateItems,
      cta: t.privateCta,
      accent: 'warm',
    },
    {
      id: 'business',
      href: url('business', locale),
      title: t.businessTitle,
      text: t.businessText,
      hover: t.businessHover,
      items: t.businessItems,
      cta: t.businessCta,
      accent: 'navy',
    },
    {
      id: 'maintenance',
      href: url('maintenance', locale),
      title: t.maintenanceTitle,
      text: t.maintenanceText,
      hover: t.maintenanceHover,
      items: t.maintenanceItems,
      cta: t.maintenanceCta,
      accent: 'green',
    },
  ] as const;

  return (
    <SiteShell locale={locale} altPath={altPath}>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <p className="hero-eyebrow">{t.eyebrow}</p>
            <h1>{t.title}</h1>
            <p className="hero-subtitle">{t.intro}</p>
            <div className="hero-trust">
              {t.trust.map((item) => (
                <span key={item}>
                  <span className="dot"></span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="audience-selector" aria-label={locale === 'nl' ? 'Kies uw ingang' : 'Choose your entry point'}>
            {audiences.map((audience) => (
              <AudienceChoiceLink
                key={audience.id}
                href={audience.href}
                audience={audience.id}
                locale={locale}
                className={`audience-option audience-option--${audience.accent}`}
              >
                <span className="audience-option__top">
                  <span className="audience-option__label">{audience.title}</span>
                  <span className="audience-option__arrow" aria-hidden="true">
                    →
                  </span>
                </span>
                <span className="audience-option__summary">{audience.text}</span>
                <span className="audience-option__items">
                  {audience.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </span>
                <span className="audience-option__details">{audience.hover}</span>
                <span className="audience-option__cta">{audience.cta}</span>
              </AudienceChoiceLink>
            ))}
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

          <div className="services-grid audience-services-grid">
            <article className="service-card service-card--audience">
              <div className="service-card-image">
                <picture>
                  <source type="image/webp" srcSet="/assets/img/services/service-sanitair-800.webp" />
                  <img
                    src="/assets/img/services/service-sanitair-800.jpg"
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
                  <AudienceChoiceLink href={url('private', locale)} audience="private" locale={locale} className="service-card-link">
                    {t.privateTitle}
                  </AudienceChoiceLink>
                </h3>
                <p>{t.privateText}</p>
              </div>
            </article>

            <article className="service-card service-card--audience">
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
                  <AudienceChoiceLink href={url('business', locale)} audience="business" locale={locale} className="service-card-link">
                    {t.businessTitle}
                  </AudienceChoiceLink>
                </h3>
                <p>{t.businessText}</p>
              </div>
            </article>

            <article className="service-card service-card--audience">
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
                  <AudienceChoiceLink href={url('maintenance', locale)} audience="maintenance" locale={locale} className="service-card-link">
                    {t.maintenanceTitle}
                  </AudienceChoiceLink>
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
