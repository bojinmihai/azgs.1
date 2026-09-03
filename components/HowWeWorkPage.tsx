import Link from 'next/link';
import { COMPANY, SITE_URL, type Locale, url } from '@/lib/site';
import { SiteShell } from './SiteShell';

type WorkflowStep = {
  title: string;
  text: string;
  private: string;
  business: string;
  maintenance: string;
};

type WorkflowContent = {
  breadcrumb: string;
  eyebrow: string;
  title: string;
  intro: string;
  heroPrimary: string;
  heroSecondary: string;
  routesEyebrow: string;
  routesTitle: string;
  routesIntro: string;
  routes: Array<{ title: string; text: string; note: string; href: string; cta: string }>;
  processEyebrow: string;
  processTitle: string;
  processIntro: string;
  labels: { private: string; business: string; maintenance: string };
  steps: WorkflowStep[];
  urgentTitle: string;
  urgentText: string;
  urgentCta: string;
  prepareEyebrow: string;
  prepareTitle: string;
  prepareIntro: string;
  prepare: Array<{ title: string; items: string[] }>;
  ctaTitle: string;
  ctaText: string;
  ctaPrivate: string;
  ctaBusiness: string;
  ctaMaintenance: string;
};

const content: Record<Locale, WorkflowContent> = {
  nl: {
    breadcrumb: 'Werkwijze',
    eyebrow: 'Van aanvraag tot afronding',
    title: 'Zo stemmen we uw werk stap voor stap af',
    intro:
      'Het proces hangt af van de opdrachtgever en het soort werk. Hieronder ziet u welke informatie we beoordelen, wanneer een opname nodig kan zijn en hoe scope, offerte, uitvoering en oplevering op elkaar aansluiten.',
    heroPrimary: 'Start een aanvraag',
    heroSecondary: 'Bekijk de drie routes',
    routesEyebrow: 'Kies de juiste route',
    routesTitle: 'Particulier, zakelijk en onderhoud blijven gescheiden',
    routesIntro:
      'Elke route heeft een eigen dienstenpakket, werkgebied en informatiebehoefte. Een aanvraag is nog geen opdracht en wordt eerst inhoudelijk beoordeeld.',
    routes: [
      {
        title: 'Particulier / B2C',
        text: 'Werk in of rond een woning, met een beknopte aanvraag en consumenteninformatie die past bij de uiteindelijke opdracht.',
        note: 'De offerte omschrijft werkzaamheden, materialen, prijsopbouw, planning en toepasselijke consumentenvoorwaarden.',
        href: '/contact?type=private',
        cta: 'Particuliere aanvraag',
      },
      {
        title: 'Zakelijk / B2B',
        text: 'Projectuitvoering uitsluitend voor sanitair en leidingwerk, thermische installaties inclusief vloerverwarming, en ventilatie.',
        note: 'Projectfase, tekeningen, interfaces, toegang, verantwoordelijkheden en afstemming met andere partijen worden vooraf begrensd.',
        href: '/contact?type=business',
        cta: 'Zakelijke aanvraag',
      },
      {
        title: 'Gebouwonderhoud',
        text: 'Een losse melding, planmatig onderhoud of meerdere locaties, telkens binnen een concreet overeengekomen onderhoudsscope.',
        note: 'Werkgebied: maximaal 50 km of circa één uur reistijd vanuit Woerden, beoordeeld op route en verkeer; dit is geen SLA.',
        href: '/contact?type=maintenance',
        cta: 'Onderhoud aanvragen',
      },
    ],
    processEyebrow: 'Het proces',
    processTitle: 'Elf stappen met ruimte voor projectspecifieke afspraken',
    processIntro:
      'Niet iedere stap is bij iedere aanvraag even uitgebreid. De offerte of opdracht bepaalt uiteindelijk wat daadwerkelijk is afgesproken.',
    labels: { private: 'Particulier', business: 'B2B', maintenance: 'Onderhoud' },
    steps: [
      {
        title: 'Aanvraag',
        text: 'U kiest het juiste aanvraagtype en deelt alleen de informatie die nodig is voor een eerste beoordeling.',
        private: 'Een korte omschrijving van de woning, ruimte, gewenste werkzaamheden en voorkeursperiode.',
        business: 'Bedrijf, contactpersoon, projectlocatie, fase, planning, gebouwtype en beschikbare projectinformatie.',
        maintenance: 'Locatie, type gebouw, urgentie, toegang en of het om een losse of terugkerende behoefte gaat.',
      },
      {
        title: 'Controle van de informatie',
        text: 'We beoordelen of de aanvraag binnen de bevestigde diensten en het toepasselijke werkgebied valt en welke gegevens nog ontbreken.',
        private: 'We controleren de gewenste woningwerkzaamheden en de bestaande situatie op hoofdlijnen.',
        business: 'We toetsen de aanvraag strikt aan sanitair, thermische installaties en ventilatie en bekijken projectafhankelijkheden.',
        maintenance: 'We beoordelen bereikbaarheid, gebruik van het gebouw, aantal locaties en de gewenste onderhoudsvorm.',
      },
      {
        title: 'Technische opname, indien nodig',
        text: 'Wanneer foto’s, maten of documenten niet voldoende zijn, kan eerst een bezoek of aanvullende technische afstemming nodig zijn.',
        private: 'Een opname kan nodig zijn voor maatvoering, aansluitingen, ondergrond of bestaande installaties.',
        business: 'Een projectbezoek kan nodig zijn voor werkzones, interfaces, logistiek, tekeningen en coördinatiepunten.',
        maintenance: 'Een eerste inventarisatie kan nodig zijn voor conditie, toegang, installaties en locatiespecifieke afspraken.',
      },
      {
        title: 'Afbakening van de werkzaamheden',
        text: 'We leggen vast wat wel en niet tot het werk behoort, inclusief uitgangspunten, materialen, toegang en afhankelijkheden.',
        private: 'De woonwerkscope en zichtbare afwerking rond het werk worden concreet beschreven.',
        business: 'Uitvoering, ontwerpverantwoordelijkheid, aansluitpunten en werkzaamheden van andere teams worden van elkaar gescheiden.',
        maintenance: 'Per locatie of melding worden inbegrepen handelingen, uitsluitingen en eventuele vervolgwerkzaamheden vastgelegd.',
      },
      {
        title: 'Offerte en voorwaarden',
        text: 'De offerte vermeldt de scope, prijsbasis, relevante planning en de toepasselijke versie van de voorwaarden voordat een opdracht wordt gesloten.',
        private: 'De B2C-voorwaarden en wettelijk vereiste consumenteninformatie worden passend bij de contractvorm verstrekt.',
        business: 'De Nederlandse B2B-voorwaarden worden vóór contractsluiting meegestuurd; inkoopvoorwaarden worden waar nodig specifiek behandeld.',
        maintenance: 'De offerte of onderhoudsafspraak bepaalt onder meer locaties, frequentie, materialen, rapportage, facturatie en looptijd.',
      },
      {
        title: 'Planning',
        text: 'Na aanvaarding stemmen we een uitvoeringsmoment of werkvenster af op beschikbaarheid, toegang en projectafhankelijkheden.',
        private: 'We bespreken bereikbaarheid van de woning en praktische voorbereiding van de werkruimte.',
        business: 'De planning wordt gekoppeld aan projectfase, vrijgave van werkzones, materiaal en werkzaamheden van andere partijen.',
        maintenance: 'Losse bezoeken of afgesproken vensters worden per locatie gepland; een reactietijd geldt alleen als die schriftelijk is overeengekomen.',
      },
      {
        title: 'Uitvoering en coördinatie',
        text: 'We voeren de overeengekomen werkzaamheden uit en bespreken eerst een wijziging wanneer de feitelijke situatie afwijkt van de uitgangspunten.',
        private: 'Meerwerk of een gewijzigde aanpak wordt vooraf besproken voordat het buiten de afgesproken scope wordt uitgevoerd.',
        business: 'Interfaces met bouwkundige, elektrotechnische of andere installatieteams worden afgestemd binnen de vastgelegde rolverdeling.',
        maintenance: 'Toegang, contactpersonen en eventuele bedrijfscontinuïteit blijven verantwoordelijkheden volgens de onderhoudsafspraak.',
      },
      {
        title: 'Controle',
        text: 'Tijdens en na de uitvoering controleren we de punten die bij de overeengekomen werkzaamheden horen.',
        private: 'De controle sluit aan op het uitgevoerde woningwerk en de afgesproken zichtbare opleverpunten.',
        business: 'Projectcontroles, testen en documentatie volgen alleen de toegewezen scope; specialistische keuringen zijn niet automatisch inbegrepen.',
        maintenance: 'De uitgevoerde handelingen en geconstateerde vervolgpunten kunnen volgens de afgesproken rapportage worden vastgelegd.',
      },
      {
        title: 'Oplevering',
        text: 'We lopen het overeengekomen resultaat en eventuele openstaande punten door volgens het toepasselijke contractuele en wettelijke regime.',
        private: 'Consumentenrechten en de toepasselijke regels voor oplevering blijven gelden; bevindingen worden tijdig gemeld.',
        business: 'Oplevering, inspectietermijn, documentatie en bevoegd contactpersoon volgen de projectafspraken en B2B-voorwaarden.',
        maintenance: 'Een melding of onderhoudsbezoek wordt afgesloten binnen de afgebakende opdracht, met eventuele vervolgactie apart benoemd.',
      },
      {
        title: 'Facturatie',
        text: 'Facturatie volgt de overeengekomen prijsbasis, termijnen en aantoonbaar overeengekomen wijzigingen of aanvullende werkzaamheden.',
        private: 'Bedragen en onvermijdbare kosten worden volgens de consumentregels en offerte gepresenteerd.',
        business: 'Termijnen, opdrachtreferenties en eventueel meerwerk volgen de offerte en projectspecifieke afspraken.',
        maintenance: 'Per bezoek, periode of locatie wordt alleen gefactureerd volgens de gekozen en vastgelegde structuur.',
      },
      {
        title: 'Garantie en onderhoud, waar van toepassing',
        text: 'Na afronding gelden de wettelijke rechten en de garantie- of onderhoudsafspraken die daadwerkelijk voor de opdracht zijn vastgelegd.',
        private: 'Wettelijke consumentenrechten worden niet beperkt; aanvullende garanties worden alleen genoemd als ze concreet zijn overeengekomen.',
        business: 'Garantie, retentie, documentatie of nazorg gelden uitsluitend zoals projectspecifiek en in de toepasselijke voorwaarden bepaald.',
        maintenance: 'Een vervolgbezoek of periodieke voortzetting vindt alleen plaats wanneer dit onderdeel is van de afspraak of opnieuw wordt overeengekomen.',
      },
    ],
    urgentTitle: 'Spoed volgt een aparte beoordeling',
    urgentText:
      'Bel bij een urgente situatie. Het gebiedscriterium is maximaal 50 km of circa 40 minuten rijden vanuit Woerden en is geen aankomstgarantie. Zakelijke spoed wordt alleen beoordeeld voor een sanitair, thermisch of ventilatieproject dat AZGS eerder zelf heeft uitgevoerd.',
    urgentCta: 'Bel voor een spoedbeoordeling',
    prepareEyebrow: 'Een aanvraag voorbereiden',
    prepareTitle: 'Met de juiste basisinformatie kunnen we gerichter beoordelen',
    prepareIntro: 'De benodigde details verschillen per route. Deel nog geen gevoelige persoonsgegevens, toegangscodes of betaalgegevens.',
    prepare: [
      {
        title: 'Particulier',
        items: ['Type woning en ruimte', 'Gewenste werkzaamheden', 'Plaats of postcode', 'Gewenste periode en relevante maten of foto’s'],
      },
      {
        title: 'Zakelijk / B2B',
        items: ['Projectlocatie, gebouwtype en fase', 'Sanitaire, thermische of ventilatiescope', 'Planning en werkzones', 'Beschikbare tekeningen en verdeling van verantwoordelijkheden'],
      },
      {
        title: 'Gebouwonderhoud',
        items: ['Locatie of aantal locaties', 'Melding of gewenste onderhoudsvorm', 'Urgentie zonder SLA-aanname', 'Toegang, gebruikssituatie en contactpersoon'],
      },
    ],
    ctaTitle: 'Klaar om de juiste route te kiezen?',
    ctaText: 'Open het formulier voor uw situatie. U ziet daarna alleen de velden en diensten die voor die aanvraag relevant zijn.',
    ctaPrivate: 'Particuliere aanvraag',
    ctaBusiness: 'Zakelijke aanvraag',
    ctaMaintenance: 'Onderhoud aanvragen',
  },
  en: {
    breadcrumb: 'How we work',
    eyebrow: 'From request to completion',
    title: 'How we coordinate your work step by step',
    intro:
      'The process depends on the client and type of work. Below you can see what information we assess, when a site visit may be needed, and how scope, quotation, execution and completion connect.',
    heroPrimary: 'Start a request',
    heroSecondary: 'View the three routes',
    routesEyebrow: 'Choose the right route',
    routesTitle: 'Private, business and maintenance remain separate',
    routesIntro:
      'Each route has its own services, service area and information needs. A request is not yet an engagement and is assessed first.',
    routes: [
      {
        title: 'Private / B2C',
        text: 'Work in or around a home, with a concise request and consumer information appropriate to the eventual engagement.',
        note: 'The quotation describes the work, materials, price basis, planning and applicable consumer terms.',
        href: '/en/contact?type=private',
        cta: 'Private request',
      },
      {
        title: 'Business / B2B',
        text: 'Project execution only for plumbing and pipework, thermal systems including underfloor heating, and ventilation.',
        note: 'Project phase, drawings, interfaces, access, responsibilities and coordination with other parties are defined in advance.',
        href: '/en/contact?type=business',
        cta: 'Business request',
      },
      {
        title: 'Building maintenance',
        text: 'A one-off report, planned maintenance or multiple locations, always within a specifically agreed maintenance scope.',
        note: 'Service area: up to 50 km or about one hour of travel from Woerden, assessed by route and traffic; this is not an SLA.',
        href: '/en/contact?type=maintenance',
        cta: 'Maintenance request',
      },
    ],
    processEyebrow: 'The process',
    processTitle: 'Eleven steps with room for project-specific agreements',
    processIntro:
      'Not every step is equally extensive for every request. The quotation or engagement ultimately determines what has actually been agreed.',
    labels: { private: 'Private', business: 'B2B', maintenance: 'Maintenance' },
    steps: [
      {
        title: 'Request',
        text: 'Choose the correct request type and share only the information needed for an initial assessment.',
        private: 'A short description of the home, space, desired work and preferred period.',
        business: 'Company, contact, project location, phase, planning, building type and available project information.',
        maintenance: 'Location, building type, urgency, access and whether the need is one-off or recurring.',
      },
      {
        title: 'Information check',
        text: 'We assess whether the request fits the confirmed services and applicable service area and what information is still missing.',
        private: 'We review the requested residential work and existing situation at a high level.',
        business: 'We test the request strictly against plumbing, thermal systems and ventilation and review project dependencies.',
        maintenance: 'We assess access, use of the building, number of locations and the preferred maintenance form.',
      },
      {
        title: 'Technical site visit, if needed',
        text: 'If photos, dimensions or documents are insufficient, a visit or further technical coordination may be needed first.',
        private: 'A visit may be needed for dimensions, connections, substrates or existing installations.',
        business: 'A project visit may be needed for work zones, interfaces, logistics, drawings and coordination points.',
        maintenance: 'An initial survey may be needed for condition, access, installations and location-specific arrangements.',
      },
      {
        title: 'Defining the work',
        text: 'We record what is and is not included, together with assumptions, materials, access and dependencies.',
        private: 'The residential scope and visible finishing around the work are described concretely.',
        business: 'Execution, design responsibility, connection points and other teams’ work are kept separate.',
        maintenance: 'Included actions, exclusions and possible follow-up work are defined per location or report.',
      },
      {
        title: 'Quotation and terms',
        text: 'The quotation states the scope, price basis, relevant planning and applicable version of the terms before an engagement is concluded.',
        private: 'B2C terms and legally required consumer information are supplied in a way appropriate to the contract form.',
        business: 'The Dutch B2B terms are supplied before conclusion; purchasing terms are addressed specifically where necessary.',
        maintenance: 'The quotation or maintenance agreement defines locations, frequency, materials, reporting, invoicing and duration.',
      },
      {
        title: 'Planning',
        text: 'After acceptance, an execution date or work window is coordinated around availability, access and project dependencies.',
        private: 'We discuss access to the home and practical preparation of the work area.',
        business: 'Planning is linked to project phase, release of work zones, materials and work by other parties.',
        maintenance: 'One-off visits or agreed windows are planned per location; a response time applies only if agreed in writing.',
      },
      {
        title: 'Execution and coordination',
        text: 'We carry out the agreed work and discuss a change first if the actual situation differs from the assumptions.',
        private: 'Additional work or a changed approach is discussed before work outside the agreed scope is carried out.',
        business: 'Interfaces with structural, electrical or other installation teams are coordinated within the recorded allocation of roles.',
        maintenance: 'Access, contacts and any business-continuity measures remain governed by the maintenance agreement.',
      },
      {
        title: 'Checks',
        text: 'During and after execution, we check the points that belong to the agreed work.',
        private: 'Checks relate to the residential work performed and the agreed visible completion points.',
        business: 'Project checks, tests and documentation follow only the assigned scope; specialist inspections are not automatically included.',
        maintenance: 'Work performed and identified follow-up points may be recorded according to the agreed reporting method.',
      },
      {
        title: 'Completion',
        text: 'We review the agreed result and any outstanding points under the applicable contractual and statutory regime.',
        private: 'Consumer rights and applicable completion rules remain in force; findings should be reported in good time.',
        business: 'Completion, inspection period, documentation and authorised contact follow the project agreement and B2B terms.',
        maintenance: 'A report or visit is closed within the defined engagement, with any follow-up action identified separately.',
      },
      {
        title: 'Invoicing',
        text: 'Invoicing follows the agreed price basis, instalments and demonstrably agreed changes or additional work.',
        private: 'Amounts and unavoidable costs are presented in line with consumer rules and the quotation.',
        business: 'Instalments, order references and any variations follow the quotation and project-specific agreement.',
        maintenance: 'Per visit, period or location, invoicing follows only the selected and recorded structure.',
      },
      {
        title: 'Warranty and maintenance, where applicable',
        text: 'After completion, statutory rights and the warranty or maintenance arrangements actually recorded for the engagement apply.',
        private: 'Statutory consumer rights are not restricted; additional warranties are stated only when specifically agreed.',
        business: 'Warranty, retention, documentation or aftercare apply only as project-specifically agreed and provided in the applicable terms.',
        maintenance: 'A follow-up visit or periodic continuation occurs only when included in the agreement or agreed again.',
      },
    ],
    urgentTitle: 'Urgent work follows a separate assessment',
    urgentText:
      'Call in an urgent situation. The service-area criterion is up to 50 km or about 40 minutes’ drive from Woerden and is not an arrival guarantee. Business emergencies are assessed only for a plumbing, thermal or ventilation project previously carried out by AZGS itself.',
    urgentCta: 'Call for an urgent assessment',
    prepareEyebrow: 'Prepare a request',
    prepareTitle: 'The right basic information helps us assess more effectively',
    prepareIntro: 'The details needed differ by route. Do not share sensitive personal data, access codes or payment information.',
    prepare: [
      {
        title: 'Private',
        items: ['Type of home and space', 'Desired work', 'Town or postcode', 'Preferred period and relevant dimensions or photos'],
      },
      {
        title: 'Business / B2B',
        items: ['Project location, building type and phase', 'Plumbing, thermal or ventilation scope', 'Planning and work zones', 'Available drawings and allocation of responsibilities'],
      },
      {
        title: 'Building maintenance',
        items: ['Location or number of locations', 'Report or preferred maintenance form', 'Urgency without assuming an SLA', 'Access, use situation and contact person'],
      },
    ],
    ctaTitle: 'Ready to choose the right route?',
    ctaText: 'Open the form for your situation. You will then see only the fields and services relevant to that request.',
    ctaPrivate: 'Private request',
    ctaBusiness: 'Business request',
    ctaMaintenance: 'Maintenance request',
  },
};

export function HowWeWorkPage({ locale }: { locale: Locale }) {
  const copy = content[locale];
  const path = url('howWeWork', locale);
  const altPath = url('howWeWork', locale === 'nl' ? 'en' : 'nl');
  const homeLabel = locale === 'nl' ? 'Home' : 'Home';
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: homeLabel, item: `${SITE_URL}${url('home', locale)}` },
      { '@type': 'ListItem', position: 2, name: copy.breadcrumb, item: `${SITE_URL}${path}` },
    ],
  };

  return (
    <SiteShell locale={locale} altPath={altPath}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="sector-hero workflow-hero">
        <div className="container sector-hero__inner">
          <nav className="sector-breadcrumb" aria-label={locale === 'nl' ? 'Kruimelpad' : 'Breadcrumb'}>
            <Link href={url('home', locale)}>{homeLabel}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{copy.breadcrumb}</span>
          </nav>
          <p className="section-eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p className="sector-hero__intro">{copy.intro}</p>
          <div className="hero-ctas">
            <Link href={url('contact', locale)} className="btn btn-primary btn-large">{copy.heroPrimary}</Link>
            <a href="#routes" className="btn btn-ghost btn-large">{copy.heroSecondary}</a>
          </div>
        </div>
      </section>

      <section className="content-section" id="routes" aria-labelledby="workflow-routes-title">
        <div className="container">
          <header className="section-head workflow-section-head">
            <p className="section-eyebrow">{copy.routesEyebrow}</p>
            <h2 id="workflow-routes-title">{copy.routesTitle}</h2>
            <p>{copy.routesIntro}</p>
          </header>
          <div className="workflow-audience-grid">
            {copy.routes.map((route) => (
              <article className="workflow-audience-card" key={route.title}>
                <h3>{route.title}</h3>
                <p>{route.text}</p>
                <p className="workflow-audience-card__note">{route.note}</p>
                <Link href={route.href}>{route.cta}<span aria-hidden="true"> →</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section alt workflow-process" aria-labelledby="workflow-process-title">
        <div className="container">
          <header className="section-head workflow-section-head">
            <p className="section-eyebrow">{copy.processEyebrow}</p>
            <h2 id="workflow-process-title">{copy.processTitle}</h2>
            <p>{copy.processIntro}</p>
          </header>
          <ol className="workflow-timeline">
            {copy.steps.map((step, index) => (
              <li className="workflow-step" key={step.title}>
                <div className="workflow-step__number" aria-hidden="true">{index + 1}</div>
                <div className="workflow-step__content">
                  <h3>{step.title}</h3>
                  <p className="workflow-step__lead">{step.text}</p>
                  <dl className="workflow-contexts">
                    <div><dt>{copy.labels.private}</dt><dd>{step.private}</dd></div>
                    <div><dt>{copy.labels.business}</dt><dd>{step.business}</dd></div>
                    <div><dt>{copy.labels.maintenance}</dt><dd>{step.maintenance}</dd></div>
                  </dl>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="workflow-urgent" aria-labelledby="workflow-urgent-title">
        <div className="container workflow-urgent__inner">
          <div>
            <p className="section-eyebrow">{locale === 'nl' ? 'Spoed' : 'Urgent work'}</p>
            <h2 id="workflow-urgent-title">{copy.urgentTitle}</h2>
            <p>{copy.urgentText}</p>
          </div>
          <a href={`tel:${COMPANY.phone}`} className="btn btn-orange btn-large">{copy.urgentCta}</a>
        </div>
      </section>

      <section className="content-section" aria-labelledby="workflow-prepare-title">
        <div className="container">
          <header className="section-head workflow-section-head">
            <p className="section-eyebrow">{copy.prepareEyebrow}</p>
            <h2 id="workflow-prepare-title">{copy.prepareTitle}</h2>
            <p>{copy.prepareIntro}</p>
          </header>
          <div className="workflow-prepare-grid">
            {copy.prepare.map((group) => (
              <article className="workflow-prepare-card" key={group.title}>
                <h3>{group.title}</h3>
                <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta" aria-labelledby="workflow-cta-title">
        <div className="container final-cta-inner">
          <h2 id="workflow-cta-title">{copy.ctaTitle}</h2>
          <p>{copy.ctaText}</p>
          <div className="final-cta-actions">
            <Link href={`${url('contact', locale)}?type=private`} className="btn btn-orange btn-large">{copy.ctaPrivate}</Link>
            <Link href={`${url('contact', locale)}?type=business`} className="btn btn-ghost-inv btn-large">{copy.ctaBusiness}</Link>
            <Link href={`${url('contact', locale)}?type=maintenance`} className="btn btn-ghost-inv btn-large">{copy.ctaMaintenance}</Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
