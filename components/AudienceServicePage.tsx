import Link from 'next/link';
import { COMPANY, audienceServiceUrl, url } from '@/lib/site';
import type { AudienceServiceContent, ServiceAudience } from '@/lib/audience-services';
import { serviceJsonLd } from '@/lib/seo';
import { SiteShell } from './SiteShell';

type Props = {
  content: AudienceServiceContent;
};

const audienceOrder: ServiceAudience[] = ['private', 'business', 'maintenance'];

function audiencesForService(service: AudienceServiceContent['service']) {
  return service === 'drywall'
    ? audienceOrder.filter((audience) => audience !== 'business')
    : audienceOrder;
}

function audienceLabel(audience: ServiceAudience, locale: 'nl' | 'en') {
  const labels = {
    nl: {
      private: 'Particulier',
      business: 'Zakelijk / B2B',
      maintenance: 'Service en onderhoud',
    },
    en: {
      private: 'Private',
      business: 'Business / B2B',
      maintenance: 'Service and maintenance',
    },
  } as const;
  return labels[locale][audience];
}

function audienceText(
  audience: ServiceAudience,
  locale: 'nl' | 'en',
  service: AudienceServiceContent['service'],
) {
  if (service === 'climate') {
    const climateLabels = {
      nl: {
        private: 'Ventilatie en warmtepompwerk voor particuliere woningen.',
        business: 'Voor B2B uitsluitend ventilatieprojecten; geen warmtepompwerk.',
        maintenance: 'Ventilatie en afgesproken klimaatonderhoud voor beheerde gebouwen.',
      },
      en: {
        private: 'Ventilation and heat-pump work for private homes.',
        business: 'For B2B, ventilation projects only; no heat-pump work.',
        maintenance: 'Ventilation and agreed climate maintenance for managed buildings.',
      },
    } as const;
    return climateLabels[locale][audience];
  }

  const labels = {
    nl: {
      private: 'Voor bewoners en particuliere woningen.',
      business: 'Voor aannemers, bedrijven en projectteams.',
      maintenance: 'Voor gebouwen, horeca, hotels, kantoren en beheer.',
    },
    en: {
      private: 'For homeowners and private homes.',
      business: 'For contractors, companies and project teams.',
      maintenance: 'For buildings, hospitality, hotels, offices and managers.',
    },
  } as const;
  return labels[locale][audience];
}

export function AudienceServicePage({ content }: Props) {
  const isNl = content.locale === 'nl';
  const schema = serviceJsonLd({
    locale: content.locale,
    name: content.heading,
    description: content.description,
    path: content.path,
    audience: content.audience,
  });
  const audienceChoices = audiencesForService(content.service);
  const audienceNavTitle = content.service === 'drywall'
    ? (isNl ? 'Werk voor woningen en onderhoudsopdrachten' : 'Work for homes and maintenance assignments')
    : content.service === 'climate'
      ? (isNl ? 'Zakelijk uitsluitend ventilatie; warmtepompwerk alleen particulier of onderhoud' : 'Business: ventilation only; heat-pump work only for private or maintenance requests')
      : (isNl ? 'Werk voor woningen, bedrijven en beheerde gebouwen' : 'Work for homes, businesses and managed buildings');

  return (
    <SiteShell locale={content.locale} altPath={content.altPath} audience={content.audience}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="service-hero">
        <div className="container service-hero-grid">
          <div>
            <p className="service-eyebrow">{content.eyebrow}</p>
            <h1>{content.heading}</h1>
            <p className="service-hero-subtitle">{content.intro}</p>
            <div className="service-hero-ctas">
              <Link href={`${url('contact', content.locale)}?dienst=${content.service}&type=${content.audience}`} className="btn btn-primary btn-large">
                {content.ctaLabel}
              </Link>
              <a href={`tel:${COMPANY.phone}`} className="btn btn-ghost btn-large">
                {isNl ? 'Bel' : 'Call'} {COMPANY.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="service-hero-visual">
            <picture>
              <img
                src={content.image}
                alt={content.imageAlt}
                width="1200"
                height="900"
                fetchPriority="high"
              />
            </picture>
          </div>
        </div>
      </section>

      <section className="audience-nav" aria-label={isNl ? 'Kies projectrichting' : 'Choose project direction'}>
        <div className="container">
          <div className="audience-nav__head">
            <div>
              <p className="audience-nav__eyebrow">{isNl ? 'Kies de juiste aanvraag' : 'Choose the right request'}</p>
              <h2 className="audience-nav__title">{audienceNavTitle}</h2>
            </div>
          </div>
          <nav className="audience-nav__grid" aria-label={isNl ? 'Projectrichtingen' : 'Project directions'}>
            {audienceChoices.map((audience) => (
              <Link
                key={audience}
                className={`audience-nav__card${audience === content.audience ? ' is-active' : ''}`}
                href={audienceServiceUrl(audience, content.service, content.locale)}
                aria-current={audience === content.audience ? 'page' : undefined}
              >
                <span className="audience-nav__label">{audienceLabel(audience, content.locale)}</span>
                <span className="audience-nav__text">{audienceText(audience, content.locale, content.service)}</span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {content.sections.map((section, index) => (
        <section key={section.title} className={`content-section${index % 2 === 0 ? ' alt' : ''}`}>
          <div className="container">
            <div className="content-grid">
              <h2>{section.title}</h2>
              <div className="content-body">
                <p>{section.body}</p>
                <ul className="service-list">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="werkwijze" aria-labelledby="proof-heading">
        <div className="container">
          <header className="section-head">
            <p className="section-eyebrow">AZGS</p>
            <h2 id="proof-heading">{content.proofTitle}</h2>
          </header>
          <div className="steps-grid">
            {content.proofItems.map((item, index) => (
              <article className="step-card" key={item}>
                <div className="step-number">{index + 1}</div>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta" aria-labelledby="audience-service-cta">
        <div className="container final-cta-inner">
          <h2 id="audience-service-cta">{content.ctaTitle}</h2>
          <p>{content.ctaText}</p>
          <div className="final-cta-actions">
            <Link href={`${url('contact', content.locale)}?dienst=${content.service}&type=${content.audience}`} className="btn btn-orange btn-large">
              {content.ctaLabel}
            </Link>
            <a href={`tel:${COMPANY.phone}`} className="btn btn-ghost-inv btn-large">
              {isNl ? 'Bel' : 'Call'} {COMPANY.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
