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
    eyebrow: 'AZ Grand Solutions · Projectuitvoering en onderhoud vanuit Woerden',
    title: 'Kies de juiste ingang voor uw project',
    intro:
      'AZ Grand Solutions voert installatiewerk uit voor woningen en zakelijke projecten. Gipsplaat- en herstelwerk hoort bij particuliere of onderhoudsopdrachten, niet bij het B2B-installatieaanbod. Elke ingang heeft een eigen scope en werkgebied.',
    privateTitle: 'Particulier',
    privateText:
      'Voor woningen waar comfort, betrouwbaarheid en nette uitvoering belangrijk zijn: sanitair, verwarming, ventilatie, warmtepompen, gipsplaten en noodzakelijke herstelafwerking.',
    privateCta: 'Start particuliere aanvraag',
    privateHover:
      'Badkamer, toilet, keuken, leidingen, verwarming, vloerverwarming, ventilatie, gipsplaten, tegelherstel en afwerking wanneer dit onderdeel is van het technische werk.',
    privateItems: ['Installaties in woningen', 'Comfort en energie', 'Herstelafwerking'],
    businessTitle: 'Business / B2B',
    businessText:
      'Voor aannemers, projectleiders, installatiebedrijven, ventilatiebedrijven en andere zakelijke opdrachtgevers die uitvoering zoeken voor sanitaire, thermische of ventilatie-installaties.',
    businessCta: 'Start zakelijke aanvraag',
    businessHover:
      'B2B-projectuitvoering is beperkt tot sanitair en leidingwerk, thermische installaties — waaronder vloerverwarming — en ventilatie. Een zakelijke spoedvraag wordt alleen beoordeeld voor een project of installatie die AZGS zelf heeft uitgevoerd.',
    businessItems: ['Sanitaire installaties', 'Thermische installaties', 'Ventilatieprojecten'],
    maintenanceTitle: 'Gebouwonderhoud',
    maintenanceText:
      'Voor beheerders van kantoren, horeca, hotels, winkels en vastgoed: onderhoudsmeldingen, planmatig onderhoud en werk voor meerdere locaties na beoordeling en afspraak.',
    maintenanceCta: 'Start onderhoudsaanvraag',
    maintenanceHover:
      'Onderhoud per melding of volgens een schriftelijke afspraak, binnen de bevestigde scope, planning en verantwoordelijkheidsverdeling.',
    maintenanceItems: ['Horeca, hotels, kantoren', 'Storingen & lekkages', 'Techniek + herstel'],
    scopeEyebrow: 'Werkgebied per aanvraag',
    scopeTitle: 'B2B-projecten, onderhoud en spoed zijn duidelijk gescheiden',
    scopeIntro: 'Wij beoordelen iedere locatie vanuit Woerden volgens de grens van het gekozen traject. Reistijd is een gebiedscriterium en geen beloofde aankomsttijd.',
    businessAreaTitle: 'Zakelijke installatieprojecten',
    businessAreaText: 'Alleen sanitair en leidingwerk, thermische installaties — waaronder vloerverwarming — en ventilatie. Oriëntatiepunten: Breda, Tilburg, Eindhoven, Purmerend, Beverwijk, Den Haag, Rotterdam, Leiden, Lelystad en Zwolle. Andere locaties per project beoordeeld.',
    maintenanceAreaTitle: 'Gebouwonderhoud',
    maintenanceAreaText: 'Rond Woerden: maximaal 50 km of ongeveer één uur reistijd, per route en verkeer beoordeeld.',
    emergencyAreaTitle: 'Spoed',
    emergencyAreaText: 'Rond Woerden: maximaal 50 km of ongeveer 40 minuten rijden. Geen SLA. Zakelijke spoed wordt alleen beoordeeld voor een project of installatie die AZGS eerder zelf heeft uitgevoerd.',
    call: `Bel ${COMPANY.phoneDisplay}`,
    trust: ['Installatietechniek centraal', 'Gericht advies per type opdrachtgever', 'KvK 42064891'],
    proofHeading: 'Controleerbare bedrijfsgegevens en duidelijke afspraken',
    proofText:
      'De juridische identiteit is controleerbaar. Scope, materialen, planning en voorwaarden worden per opdracht vastgelegd.',
    proofItems: [
      { value: 'AZ Grand Solutions vof', label: 'Juridische entiteit met handelsnaam A-Z Grand Solutions.' },
      { value: 'KvK 42064891', label: 'AZ Grand Solutions vof, gevestigd aan Alpenstraat 12 in Woerden.' },
      { value: '000053925335', label: 'Vestigingsnummer van de locatie in Woerden.' },
      { value: 'NL / EN', label: 'Nederlandse hoofdinformatie met een informatieve Engelse vertaling.' },
    ],
  },
  en: {
    eyebrow: 'AZ Grand Solutions · Project execution and maintenance from Woerden',
    title: 'Choose the right entry point for your project',
    intro:
      'AZ Grand Solutions carries out installation work for homes and business projects. Drywall and finishing repair belong to private or maintenance assignments, not to the B2B installation offer. Each entry point has its own scope and service area.',
    privateTitle: 'Private clients',
    privateText:
      'For homes where comfort, reliability and clean execution matter: plumbing, heating, ventilation, heat pumps, drywall and required finishing repair.',
    privateCta: 'Start private request',
    privateHover:
      'Bathroom, toilet, kitchen, pipework, heating, underfloor heating, ventilation, drywall, tile repair and finishing when part of the technical work.',
    privateItems: ['Home installations', 'Comfort and energy', 'Finishing repair'],
    businessTitle: 'Business / B2B',
    businessText:
      'For contractors, project managers, installation companies, ventilation companies and other business clients seeking execution of plumbing, thermal or ventilation systems.',
    businessCta: 'Start business request',
    businessHover:
      'B2B project execution is limited to plumbing and pipework, thermal systems — including underfloor heating — and ventilation. A business emergency request is assessed only for a project or installation previously carried out by AZGS.',
    businessItems: ['Plumbing installations', 'Thermal systems', 'Ventilation projects'],
    maintenanceTitle: 'Building maintenance',
    maintenanceText:
      'For offices, hospitality, hotels, shops and property management: maintenance requests, planned maintenance and work across multiple locations after assessment and agreement.',
    maintenanceCta: 'Start maintenance request',
    maintenanceHover:
      'Maintenance per request or under a written agreement, within the confirmed scope, planning and allocation of responsibilities.',
    maintenanceItems: ['Hotels, offices, hospitality', 'Faults & leaks', 'Technical + repair'],
    scopeEyebrow: 'Service area by request',
    scopeTitle: 'B2B projects, maintenance and urgent work are clearly separated',
    scopeIntro: 'We assess each location from Woerden using the boundary for the selected route. Travel time is a service-area criterion, not a promised arrival time.',
    businessAreaTitle: 'Business installation projects',
    businessAreaText: 'Only plumbing and pipework, thermal systems — including underfloor heating — and ventilation. Orientation points: Breda, Tilburg, Eindhoven, Purmerend, Beverwijk, The Hague, Rotterdam, Leiden, Lelystad and Zwolle. Other locations assessed per project.',
    maintenanceAreaTitle: 'Building maintenance',
    maintenanceAreaText: 'Around Woerden: up to 50 km or about one hour of travel, assessed by route and traffic.',
    emergencyAreaTitle: 'Urgent requests',
    emergencyAreaText: 'Around Woerden: up to 50 km or about 40 minutes\' drive. No SLA. Business emergencies are assessed only for a project or installation previously carried out by AZGS.',
    call: `Call ${COMPANY.phoneDisplay}`,
    trust: ['Installation technology first', 'Clear guidance for each type of client', 'KvK 42064891'],
    proofHeading: 'Verifiable company details and clear agreements',
    proofText:
      'The legal identity can be verified. Scope, materials, planning and applicable terms are recorded for each assignment.',
    proofItems: [
      { value: 'AZ Grand Solutions vof', label: 'Legal entity trading as A-Z Grand Solutions.' },
      { value: 'KvK 42064891', label: 'AZ Grand Solutions vof, based at Alpenstraat 12 in Woerden.' },
      { value: '000053925335', label: 'Establishment number for the Woerden location.' },
      { value: 'NL / EN', label: 'Dutch primary information with an informative English translation.' },
    ],
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

      <section className="content-section" aria-labelledby="audience-scope-heading">
        <div className="container">
          <header className="section-head">
            <p className="section-eyebrow">{t.scopeEyebrow}</p>
            <h2 id="audience-scope-heading">{t.scopeTitle}</h2>
            <p>{t.scopeIntro}</p>
          </header>
          <div className="steps-grid audience-scope-grid">
            <article className="step-card">
              <div className="step-number">1</div>
              <h3>{t.businessAreaTitle}</h3>
              <p>{t.businessAreaText}</p>
            </article>
            <article className="step-card">
              <div className="step-number">2</div>
              <h3>{t.maintenanceAreaTitle}</h3>
              <p>{t.maintenanceAreaText}</p>
            </article>
            <article className="step-card">
              <div className="step-number">3</div>
              <h3>{t.emergencyAreaTitle}</h3>
              <p>{t.emergencyAreaText}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="content-section alt" aria-labelledby="proof-heading">
        <div className="container">
          <header className="section-head">
            <p className="section-eyebrow">{locale === 'nl' ? 'Bedrijfsgegevens en afspraken' : 'Company details and agreements'}</p>
            <h2 id="proof-heading">{t.proofHeading}</h2>
            <p>{t.proofText}</p>
          </header>

          <ul className="trust-grid">
            {t.proofItems.map((item) => (
              <li className="trust-item" key={item.value}>
                <span className="trust-item-value">{item.value}</span>
                <span className="trust-item-label">{item.label}</span>
              </li>
            ))}
          </ul>

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
