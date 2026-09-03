import Link from 'next/link';
import Image from 'next/image';
import { COMPANY, type Locale, url } from '@/lib/site';
import { serviceJsonLd } from '@/lib/seo';
import { SiteShell } from './SiteShell';

type RepairType = 'painting' | 'tiling';

type RepairContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  image: string;
  imageAlt: string;
  schemaDescription: string;
  sections: Array<{
    title: string;
    body: string;
    items: string[];
  }>;
  processTitle: string;
  processItems: string[];
  ctaTitle: string;
  ctaText: string;
  ctaLabel: string;
};

const CONTENT: Record<RepairType, Record<Locale, RepairContent>> = {
  painting: {
    nl: {
      eyebrow: 'Gebouwonderhoud · herstelafwerking',
      heading: 'Schilderherstel na lekkage of technische werkzaamheden',
      intro:
        'Gericht herstel van binnenwanden, plafonds en de directe werkzone nadat de technische oorzaak is aangepakt. Vooraf bakenen we het oppervlak, de voorbereiding en de gewenste afwerking af.',
      image: '/assets/img/services/service-schilderwerk-1200.jpg',
      imageAlt: 'Schilder- en afwerkherstel aan een binnenwand',
      schemaDescription:
        'Gericht schilder- en afwerkherstel na technische werkzaamheden binnen maximaal 50 km of circa 1 uur reistijd vanaf Woerden. Dit is een werkgebiedscriterium, geen SLA.',
      sections: [
        {
          title: 'Herstel van de directe werkzone',
          body:
            'Na een reparatie of inspectie kan een wand of plafond plaatselijk opnieuw moeten worden afgewerkt. Per aanvraag beoordelen we of plaatselijk herstel passend is of dat een groter vlak nodig is om een bruikbaar resultaat te bereiken.',
          items: [
            'Vullen en egaliseren van afgesproken kleine openingen of beschadigingen',
            'Schuren en gronden waar dit voor het afgesproken verfsysteem nodig is',
            'Binnenschilderwerk aan het afgebakende deel van wand, plafond of aftimmering',
            'Afstemming van uitvoering en droogtijd op toegang en gebruik van de ruimte',
          ],
        },
        {
          title: 'Wat vooraf duidelijk moet zijn',
          body:
            'De ondergrond, resterend vocht en de bestaande kleur of structuur bepalen wat verantwoord kan worden uitgevoerd. De offerte vermeldt daarom het werkgebied en de zichtbare afwerking die wel en niet is inbegrepen.',
          items: [
            'De oorzaak van lekkage of vocht moet eerst zijn verholpen en de ondergrond moet voldoende droog zijn',
            'Losse, beschadigde of vervuilde ondergronden kunnen aanvullende voorbereiding vragen',
            'Kleur, glansgraad en verfsysteem worden afgestemd; plaatselijk herstel kan zichtbaar afwijken van bestaand werk',
            'Bescherming, verplaatsing van inventaris en bijzondere bereikbaarheid worden vooraf besproken',
          ],
        },
        {
          title: 'Niet automatisch onderdeel van schilderherstel',
          body:
            'Werk buiten de afgesproken herstelzone wordt niet stilzwijgend meegenomen. Als tijdens de voorbereiding een andere technische of bouwkundige oorzaak zichtbaar wordt, koppelen we dat terug voordat aanvullend werk wordt uitgevoerd.',
          items: [
            'Opsporen of herstellen van de oorspronkelijke lekkage, tenzij dit apart is opgedragen',
            'Sanering van schimmel of gevaarlijke stoffen en herstel van constructieve schade',
            'Volledig schilderen van een ruimte wanneer alleen plaatselijk herstel is afgesproken',
            'Extra bezoeken vanwege droogtijd of vervolgschade, tenzij die in de afspraak zijn opgenomen',
          ],
        },
      ],
      processTitle: 'Van melding tot afgebakend herstel',
      processItems: [
        'Stuur de locatie, foto’s, oorzaak van het herstel en informatie over toegang en gebruik van de ruimte.',
        'We beoordelen de zichtbare ondergrond en leggen werkgebied, voorbereiding en afwerking vast in de afspraak.',
        'We voeren het afgesproken herstel uit en bespreken eerst wat nodig is als verborgen schade de scope verandert.',
      ],
      ctaTitle: 'Schilderherstel laten beoordelen?',
      ctaText:
        'Stuur foto’s van de werkzone, de oorzaak van de schade, de locatie en de gewenste planning. Daarmee kunnen we bepalen welke opname of afbakening nodig is.',
      ctaLabel: 'Onderhoudsaanvraag starten',
    },
    en: {
      eyebrow: 'Building maintenance · finishing repair',
      heading: 'Painting repair after leaks or technical work',
      intro:
        'Targeted repair of interior walls, ceilings and the immediate work zone after the technical cause has been addressed. We define the surface, preparation and intended finish before work starts.',
      image: '/assets/img/services/service-schilderwerk-1200.jpg',
      imageAlt: 'Painting and finishing repair to an interior wall',
      schemaDescription:
        "Targeted painting and finishing repair after technical work within a maximum of 50 km or about 1 hour's travel from Woerden. This is an area criterion, not an SLA.",
      sections: [
        {
          title: 'Repair of the immediate work zone',
          body:
            'After a repair or inspection, part of a wall or ceiling may need refinishing. For each request, we assess whether a local repair is appropriate or whether a larger surface is needed to achieve a usable result.',
          items: [
            'Filling and levelling agreed small openings or damaged areas',
            'Sanding and priming where required for the agreed paint system',
            'Interior painting of the defined part of a wall, ceiling or enclosure',
            'Coordination of the work and drying time with access and use of the space',
          ],
        },
        {
          title: 'What needs to be clear beforehand',
          body:
            'The substrate, remaining moisture and the existing colour or texture determine what can responsibly be done. The quotation therefore states the work area and the visible finish that is and is not included.',
          items: [
            'The cause of a leak or moisture issue must be resolved first and the substrate must be sufficiently dry',
            'Loose, damaged or contaminated surfaces may require additional preparation',
            'Colour, sheen and paint system are agreed; a local repair may remain visible against existing work',
            'Protection, moving contents and special access requirements are discussed in advance',
          ],
        },
        {
          title: 'Not automatically included in painting repair',
          body:
            'Work outside the agreed repair zone is not included by default. If preparation reveals a different technical or building-related cause, we report it before carrying out additional work.',
          items: [
            'Tracing or repairing the original leak unless this is commissioned separately',
            'Remediation of mould or hazardous materials, or repair of structural damage',
            'Painting the complete room when only a local repair has been agreed',
            'Additional visits due to drying time or subsequent damage unless included in the agreement',
          ],
        },
      ],
      processTitle: 'From report to a defined repair',
      processItems: [
        'Send the location, photos, cause of the repair and information about access and use of the space.',
        'We assess the visible substrate and record the work area, preparation and finish in the agreement.',
        'We carry out the agreed repair and discuss what is needed first if hidden damage changes the scope.',
      ],
      ctaTitle: 'Have a painting repair assessed?',
      ctaText:
        'Send photos of the work zone, the cause of the damage, the location and preferred planning. This helps us determine what survey or scope definition is needed.',
      ctaLabel: 'Start maintenance request',
    },
  },
  tiling: {
    nl: {
      eyebrow: 'Gebouwonderhoud · tegelherstel',
      heading: 'Tegelherstel na lekkage, leidingwerk of inspectie',
      intro:
        'Plaatselijk herstel van tegelwerk en de directe werkzone na technische werkzaamheden. Eerst beoordelen we de ondergrond, beschikbare vervangende tegels en de grens tussen herstel en aanvullend werk.',
      image: '/assets/img/services/service-tegelwerk-1200.jpg',
      imageAlt: 'Plaatselijk herstel van wandtegels in een werkzone',
      schemaDescription:
        'Plaatselijk tegel- en wandherstel na technische werkzaamheden binnen maximaal 50 km of circa 1 uur reistijd vanaf Woerden. Dit is een werkgebiedscriterium, geen SLA.',
      sections: [
        {
          title: 'Plaatselijk tegel- en wandherstel',
          body:
            'Wanneer tegelwerk is geopend of beschadigd voor een technische reparatie, kan de afgesproken zone opnieuw worden opgebouwd. We bepalen vooraf welke tegels worden vervangen en welke aansluitingen moeten worden afgewerkt.',
          items: [
            'Verwijderen van afgesproken losse of beschadigde tegels in de herstelzone',
            'Voorbereiden van de bereikbare ondergrond voor het overeengekomen herstel',
            'Plaatsen van beschikbare of vooraf gekozen vervangende tegels',
            'Voeg- en kitwerk aan de afgesproken aansluitingen waar dit onderdeel is van de opdracht',
          ],
        },
        {
          title: 'Ondergrond en tegelmatch vooraf beoordelen',
          body:
            'Bij bestaand tegelwerk zijn maat, kleur, structuur en productiebatch niet altijd opnieuw verkrijgbaar. Ook kan pas na opening blijken dat de ondergrond meer herstel vraagt. Deze onzekerheden worden niet als vanzelfsprekend onderdeel van de oorspronkelijke aanvraag behandeld.',
          items: [
            'De technische oorzaak van lekkage of schade moet eerst zijn aangepakt',
            'Een exacte match met bestaande tegels kan niet worden gegarandeerd zonder passend reservemateriaal',
            'Zichtbare stabiliteit en vochtbelasting van de ondergrond worden betrokken bij de afbakening',
            'Demontage van sanitair, panelen of inventaris en bijzondere toegang worden apart afgesproken',
          ],
        },
        {
          title: 'Niet automatisch onderdeel van tegelherstel',
          body:
            'De opdracht blijft beperkt tot de beschreven herstelzone. Wanneer verborgen schade of een ontbrekende waterdichte opbouw zichtbaar wordt, bespreken we eerst onderzoek, een aangepaste werkwijze of inzet van een specialist.',
          items: [
            'Lekdetectie, leidingreparatie of technisch storingsonderzoek zonder afzonderlijke opdracht',
            'Vervanging van een volledig waterdichtingssysteem buiten de afgesproken herstelzone',
            'Volledige wand- of vloervervanging omdat dezelfde tegel niet meer leverbaar is',
            'Sanering van gevaarlijke stoffen, constructief herstel of specialistische beproeving',
          ],
        },
      ],
      processTitle: 'Van werkzone tot afgesproken tegelherstel',
      processItems: [
        'Stuur foto’s, afmetingen, locatie, informatie over de oorzaak en indien beschikbaar gegevens van reservetegels.',
        'We beoordelen bereikbaarheid, zichtbare ondergrond en materiaalbeschikbaarheid en leggen de herstelzone vast.',
        'We voeren het afgesproken herstel uit en stemmen eerst af wanneer verborgen omstandigheden de aanpak veranderen.',
      ],
      ctaTitle: 'Tegelherstel laten beoordelen?',
      ctaText:
        'Stuur duidelijke foto’s, globale maten, de locatie van de schade en informatie over beschikbare reservetegels. Vermeld ook of de technische oorzaak al is verholpen.',
      ctaLabel: 'Onderhoudsaanvraag starten',
    },
    en: {
      eyebrow: 'Building maintenance · tile repair',
      heading: 'Tile repair after leaks, pipework or inspection',
      intro:
        'Local repair of tiling and the immediate work zone after technical work. We first assess the substrate, available replacement tiles and the boundary between the repair and additional work.',
      image: '/assets/img/services/service-tegelwerk-1200.jpg',
      imageAlt: 'Local repair of wall tiles in a work zone',
      schemaDescription:
        "Local tile and wall repair after technical work within a maximum of 50 km or about 1 hour's travel from Woerden. This is an area criterion, not an SLA.",
      sections: [
        {
          title: 'Local tile and wall repair',
          body:
            'When tiling has been opened or damaged for a technical repair, the agreed zone can be rebuilt. We define in advance which tiles are to be replaced and which junctions need finishing.',
          items: [
            'Removal of agreed loose or damaged tiles within the repair zone',
            'Preparation of the accessible substrate for the agreed repair',
            'Installation of available or pre-selected replacement tiles',
            'Grouting and sealant work at agreed junctions where included in the assignment',
          ],
        },
        {
          title: 'Assess the substrate and tile match first',
          body:
            'For existing tiling, the same size, colour, texture and production batch may no longer be available. Opening the area may also reveal that the substrate needs more repair. These uncertainties are not treated as automatically included in the original request.',
          items: [
            'The technical cause of the leak or damage must be addressed first',
            'An exact match with existing tiles cannot be guaranteed without suitable spare material',
            'Visible stability and moisture exposure of the substrate are considered when defining the scope',
            'Removal of sanitary fittings, panels or contents and special access are agreed separately',
          ],
        },
        {
          title: 'Not automatically included in tile repair',
          body:
            'The assignment remains limited to the described repair zone. If hidden damage or a missing waterproof build-up becomes visible, we first discuss investigation, a revised approach or involvement of a specialist.',
          items: [
            'Leak detection, pipe repair or technical fault investigation without a separate assignment',
            'Replacement of a complete waterproofing system outside the agreed repair zone',
            'Replacement of a complete wall or floor because the same tile is no longer available',
            'Hazardous-material remediation, structural repair or specialist testing',
          ],
        },
      ],
      processTitle: 'From work zone to an agreed tile repair',
      processItems: [
        'Send photos, dimensions, the location, information about the cause and details of any spare tiles available.',
        'We assess access, the visible substrate and material availability and record the repair zone.',
        'We carry out the agreed repair and coordinate first if hidden conditions change the approach.',
      ],
      ctaTitle: 'Have a tile repair assessed?',
      ctaText:
        'Send clear photos, approximate dimensions, the damage location and information about any spare tiles. Please also state whether the technical cause has already been resolved.',
      ctaLabel: 'Start maintenance request',
    },
  },
};

type Props = {
  locale: Locale;
  repairType: RepairType;
  path: string;
  altPath: string;
};

export function MaintenanceRepairPage({ locale, repairType, path, altPath }: Props) {
  const content = CONTENT[repairType][locale];
  const isNl = locale === 'nl';
  const contactHref = `${url('contact', locale)}?dienst=${repairType}&type=maintenance`;
  const schema = serviceJsonLd({
    locale,
    name: content.heading,
    description: content.schemaDescription,
    path,
    audience: 'maintenance',
  });

  return (
    <SiteShell locale={locale} altPath={altPath} audience="maintenance">
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
              <Link href={contactHref} className="btn btn-primary btn-large">
                {content.ctaLabel}
              </Link>
              <a href={`tel:${COMPANY.phone}`} className="btn btn-ghost btn-large">
                {isNl ? 'Bel' : 'Call'} {COMPANY.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="service-hero-visual">
            <Image
              src={content.image}
              alt={content.imageAlt}
              width="1200"
              height="900"
              sizes="(max-width: 900px) 100vw, 55vw"
              priority
            />
          </div>
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

      <section className="werkwijze" aria-labelledby="maintenance-repair-process">
        <div className="container">
          <header className="section-head">
            <p className="section-eyebrow">AZGS</p>
            <h2 id="maintenance-repair-process">{content.processTitle}</h2>
          </header>
          <div className="steps-grid">
            {content.processItems.map((item, index) => (
              <article className="step-card" key={item}>
                <div className="step-number">{index + 1}</div>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta" aria-labelledby="maintenance-repair-cta">
        <div className="container final-cta-inner">
          <h2 id="maintenance-repair-cta">{content.ctaTitle}</h2>
          <p>{content.ctaText}</p>
          <div className="final-cta-actions">
            <Link href={contactHref} className="btn btn-orange btn-large">
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
