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
    eyebrow: 'AZ Grand Solutions · Technische uitvoering in regio Utrecht',
    title: 'Kies de juiste ingang voor uw project',
    intro:
      'AZ Grand Solutions levert technische installaties, gipsplaten en onderhoud voor woningen, commerciele projecten en beheerde gebouwen. Elke ingang is ingericht op een andere manier van werken.',
    privateTitle: 'Particulier',
    privateText:
      'Voor woningen waar comfort, betrouwbaarheid en nette uitvoering belangrijk zijn: sanitair, verwarming, ventilatie, warmtepompen, gipsplaten en noodzakelijke herstelafwerking.',
    privateCta: 'Start particuliere aanvraag',
    privateHover:
      'Badkamer, toilet, keuken, leidingen, verwarming, vloerverwarming, ventilatie, gipsplaten, tegelherstel en afwerking wanneer dit onderdeel is van het technische werk.',
    privateItems: ['Installaties in woningen', 'Comfort en energie', 'Herstelafwerking'],
    businessTitle: 'Business / B2B',
    businessText:
      'Voor aannemers, architecten, projectleiders, installatiebedrijven, ventilatiebedrijven en vastgoedpartijen die een professionele uitvoeringspartner zoeken.',
    businessCta: 'Start zakelijke aanvraag',
    businessHover:
      'B2B-uitvoering voor installatiewerk, thermische systemen, vloerverwarming, ventilatie, warmtepompvoorbereiding, gipsplaten en metalstud binnen commerciele projecten.',
    businessItems: ['B2B installaties', 'Vloerverwarming & ventilatie', 'Gipsplaten & metalstud'],
    maintenanceTitle: 'Gebouwonderhoud',
    maintenanceText:
      'Voor beheerders van kantoren, horeca, hotels, winkels en vastgoed: storingen oplossen, technische reparaties uitvoeren en de locatie weer bruikbaar opleveren.',
    maintenanceCta: 'Start onderhoudsaanvraag',
    maintenanceHover:
      'Onderhoud per melding of samenwerking: lekkage, verwarming, ventilatie, sanitair, gipsherstel, tegelherstel, kitwerk, schilderwerk en afwerking na technische reparatie.',
    maintenanceItems: ['Horeca, hotels, kantoren', 'Storingen & lekkages', 'Techniek + herstel'],
    call: `Bel ${COMPANY.phoneDisplay}`,
    trust: ['Installatietechniek centraal', 'Gericht advies per type opdrachtgever', 'KvK 42064891'],
    proofHeading: 'Een controleerbare basis voor professionele uitvoering',
    proofText:
      'Nog vóór de praktijkprojecten en klantfoto’s worden toegevoegd, zijn deze bedrijfsgegevens en werkafspraken al controleerbaar.',
    proofItems: [
      { value: '35+ jaar', label: 'Internationale vakpraktijk in installatietechniek, renovatie en technische uitvoering.' },
      { value: '2 VCA-diploma’s', label: 'Beide vennoten beschikken over een persoonlijk VCA-diploma; bewijs is op verzoek beschikbaar.' },
      { value: 'KvK 42064891', label: 'AZ Grand Solutions vof, gevestigd aan Alpenstraat 12 in Woerden.' },
      { value: '24/7 bereikbaar', label: 'Voor urgente lekkages, verstoppingen en storingen binnen het werkgebied.' },
    ],
  },
  en: {
    eyebrow: 'AZ Grand Solutions · Technical execution in the Utrecht region',
    title: 'Choose the right entry point for your project',
    intro:
      'AZ Grand Solutions delivers technical installations, drywall and maintenance for homes, commercial projects and managed buildings. Each entry point is structured around a different way of working.',
    privateTitle: 'Private clients',
    privateText:
      'For homes where comfort, reliability and clean execution matter: plumbing, heating, ventilation, heat pumps, drywall and required finishing repair.',
    privateCta: 'Start private request',
    privateHover:
      'Bathroom, toilet, kitchen, pipework, heating, underfloor heating, ventilation, drywall, tile repair and finishing when part of the technical work.',
    privateItems: ['Home installations', 'Comfort and energy', 'Finishing repair'],
    businessTitle: 'Business / B2B',
    businessText:
      'For contractors, architects, project managers, installation companies, ventilation companies and property teams looking for a professional execution partner.',
    businessCta: 'Start business request',
    businessHover:
      'B2B execution for installation work, thermal systems, underfloor heating, ventilation, heat pump preparation, drywall and metal stud within commercial projects.',
    businessItems: ['B2B installations', 'Underfloor heating & ventilation', 'Drywall & metal stud'],
    maintenanceTitle: 'Building maintenance',
    maintenanceText:
      'For offices, hospitality, hotels, shops and property management: resolve faults, execute technical repairs and return the location to usable condition.',
    maintenanceCta: 'Start maintenance request',
    maintenanceHover:
      'Maintenance per request or cooperation: leaks, heating, ventilation, plumbing, drywall repair, tile repair, sealant, painting and finishing after technical repair.',
    maintenanceItems: ['Hotels, offices, hospitality', 'Faults & leaks', 'Technical + repair'],
    call: `Call ${COMPANY.phoneDisplay}`,
    trust: ['Installation technology first', 'Clear guidance for each type of client', 'KvK 42064891'],
    proofHeading: 'A verifiable basis for professional execution',
    proofText:
      'Even before real project cases and client photography are added, these company details and working commitments can already be verified.',
    proofItems: [
      { value: '35+ years', label: 'International trade practice in installation technology, renovation and technical execution.' },
      { value: '2 VCA diplomas', label: 'Both partners hold a personal VCA diploma; evidence is available on request.' },
      { value: 'KvK 42064891', label: 'AZ Grand Solutions vof, based at Alpenstraat 12 in Woerden.' },
      { value: 'Available 24/7', label: 'For urgent leaks, blockages and faults within the service area.' },
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

      <section className="content-section alt" aria-labelledby="proof-heading">
        <div className="container">
          <header className="section-head">
            <p className="section-eyebrow">{locale === 'nl' ? 'Ervaring en zekerheid' : 'Experience and assurance'}</p>
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
