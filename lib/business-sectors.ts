import type { Locale } from './site';

export type BusinessSectorKey =
  | 'contractors'
  | 'property-managers'
  | 'hospitality-hotels'
  | 'offices-retail'
  | 'owners-associations'
  | 'installation-ventilation';

type ContentItem = { title: string; text: string };
type Responsibility = { party: string; text: string };
type SectorLink = { label: string; href: string };

export type BusinessSectorContent = {
  key: BusinessSectorKey;
  locale: Locale;
  slug: string;
  path: string;
  altPath: string;
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  intro: string;
  needsTitle: string;
  needsIntro: string;
  needs: ContentItem[];
  workTitle: string;
  workIntro: string;
  work: ContentItem[];
  serviceLinks: SectorLink[];
  responsibilitiesTitle: string;
  responsibilitiesIntro: string;
  responsibilities: Responsibility[];
  informationTitle: string;
  informationIntro: string;
  information: string[];
  boundariesTitle: string;
  boundaries: string[];
  ctaTitle: string;
  ctaText: string;
  related: BusinessSectorKey[];
};

type LocalizedSector = Omit<BusinessSectorContent, 'key' | 'locale' | 'slug' | 'path' | 'altPath' | 'related'>;

const SLUGS: Record<BusinessSectorKey, Record<Locale, string>> = {
  contractors: { nl: 'aannemers-bouwbedrijven', en: 'contractors-construction-companies' },
  'property-managers': { nl: 'vastgoedbeheerders', en: 'property-managers' },
  'hospitality-hotels': { nl: 'horeca-hotels', en: 'hospitality-hotels' },
  'offices-retail': { nl: 'kantoren-winkels', en: 'offices-retail' },
  'owners-associations': { nl: 'vve', en: 'owners-associations' },
  'installation-ventilation': { nl: 'installatie-ventilatiebedrijven', en: 'installation-ventilation-companies' },
};

const RELATED: Record<BusinessSectorKey, BusinessSectorKey[]> = {
  contractors: ['installation-ventilation', 'property-managers', 'offices-retail'],
  'property-managers': ['owners-associations', 'offices-retail', 'hospitality-hotels'],
  'hospitality-hotels': ['property-managers', 'offices-retail', 'contractors'],
  'offices-retail': ['property-managers', 'hospitality-hotels', 'contractors'],
  'owners-associations': ['property-managers', 'contractors', 'installation-ventilation'],
  'installation-ventilation': ['contractors', 'property-managers', 'offices-retail'],
};

const NL_B2B_SERVICE_LINKS: SectorLink[] = [
  { label: 'Sanitair en leidingwerk B2B', href: '/zakelijk/sanitair' },
  { label: 'Thermische installaties', href: '/zakelijk/verwarming' },
  { label: 'Vloerverwarming als thermische installatie', href: '/zakelijk/vloerverwarming' },
  { label: 'Ventilatie B2B', href: '/zakelijk/ventilatie' },
];

const EN_B2B_SERVICE_LINKS: SectorLink[] = [
  { label: 'B2B plumbing and pipework', href: '/en/business/plumbing' },
  { label: 'Thermal systems', href: '/en/business/heating' },
  { label: 'Underfloor heating as a thermal system', href: '/en/business/underfloor-heating' },
  { label: 'B2B ventilation', href: '/en/business/ventilation' },
];

const NL_PROJECT_AREA_BOUNDARY = 'B2B-projectlocaties worden vanuit Woerden beoordeeld, met Breda, Tilburg en Eindhoven in het zuiden; Purmerend en Beverwijk in het noorden; Den Haag, Rotterdam en Leiden in het westen; en Lelystad en Zwolle in het oosten als oriëntatiepunten. Genoemde plaatsen zijn geen dekkings- of acceptatiegarantie; andere locaties zijn alleen mogelijk na beoordeling.';
const NL_URGENT_BOUNDARY = 'Zakelijke spoedvragen worden uitsluitend beoordeeld voor installaties die AZGS eerder binnen het betreffende project heeft uitgevoerd. Beschikbaarheid en mogelijke opvolging worden per situatie bevestigd; er geldt geen openbare SLA of gegarandeerde aankomsttijd.';
const EN_PROJECT_AREA_BOUNDARY = 'B2B project locations are assessed from Woerden, with Breda, Tilburg and Eindhoven to the south; Purmerend and Beverwijk to the north; The Hague, Rotterdam and Leiden to the west; and Lelystad and Zwolle to the east as orientation points. Named places do not guarantee coverage or acceptance; other locations are considered only after assessment.';
const EN_URGENT_BOUNDARY = 'Urgent business requests are assessed only for installations previously executed by AZGS within the relevant project. Availability and possible follow-up are confirmed for each situation; no public SLA or guaranteed arrival time applies.';

const NL: Record<BusinessSectorKey, LocalizedSector> = {
  contractors: {
    title: 'Uitvoeringspartner voor aannemers en bouwbedrijven | AZGS',
    description: 'Sanitaire, thermische en ventilatie-installaties voor aannemers en bouwbedrijven, met projectlocatie en scope vooraf beoordeeld vanuit Woerden.',
    eyebrow: 'Zakelijk · Aannemers en bouwbedrijven',
    heading: 'Technische uitvoeringscapaciteit binnen uw bouwplanning',
    intro: 'AZ Grand Solutions kan een afgebakend uitvoeringsdeel verzorgen binnen renovatie, verbouw en zakelijke bouwprojecten. Vooraf leggen we vast welk werk, welke werkzone en welke overdrachtsmomenten onder onze opdracht vallen.',
    needsTitle: 'Waar bouwteams vroeg duidelijkheid over nodig hebben',
    needsIntro: 'De inzet wordt beter beoordeelbaar wanneer scope, volgorde en interfaces vóór de start concreet zijn.',
    needs: [
      { title: 'Afbakening per discipline', text: 'Sanitair, thermische installaties en ventilatie raken andere disciplines. De offerte geeft aan welke installatieonderdelen AZGS uitvoert en welke bij andere partijen blijven.' },
      { title: 'Bouwvolgorde en toegang', text: 'Voorafgaande werkzaamheden, vrije werkzones, materiaalroutes en beschikbare voorzieningen bepalen wanneer een onderdeel uitvoerbaar is.' },
      { title: 'Wijzigingen en opleverpunten', text: 'Afwijkingen van tekeningen of hoeveelheden vragen om een vast beslismoment en een schriftelijke bevestiging voordat aanvullend werk wordt uitgevoerd.' },
    ],
    workTitle: 'Werkpakketten die als projectonderdeel kunnen worden afgesproken',
    workIntro: 'De definitieve inhoud volgt altijd uit de geaccepteerde offerte, tekeningen en projectspecifieke afspraken.',
    work: [
      { title: 'Sanitair en leidingwerk', text: 'Leidingen, aansluitpunten, sanitaire voorzieningen en technische voorbereidingen in afgesproken ruimten.' },
      { title: 'Verwarming en vloerverwarming', text: 'Leidingtracés, radiatoren, verdelers en vloerverwarmingsgroepen afgestemd op vloeropbouw en bouwfase.' },
      { title: 'Ventilatie', text: 'Ventilatiekanalen, doorvoeren en aansluitpunten voor zover deze expliciet in het uitvoeringspakket zijn opgenomen.' },
    ],
    serviceLinks: NL_B2B_SERVICE_LINKS,
    responsibilitiesTitle: 'Verdeling van verantwoordelijkheden',
    responsibilitiesIntro: 'De onderstaande verdeling is een uitgangspunt voor beoordeling; de opdrachtbevestiging bepaalt wat daadwerkelijk is overeengekomen.',
    responsibilities: [
      { party: 'AZGS', text: 'Voert het geaccepteerde werkpakket uit en meldt zichtbare afwijkingen of ontbrekende informatie die de uitvoering beïnvloeden.' },
      { party: 'Opdrachtgever of hoofdaannemer', text: 'Levert actuele tekeningen, beslissingen, planning, veilige toegang en één bevoegd aanspreekpunt voor de werkzone.' },
      { party: 'Ontwerpers en overige disciplines', text: 'Blijven verantwoordelijk voor ontwerp, berekeningen, keuringen, inbedrijfstelling en specialistische onderdelen tenzij schriftelijk anders afgesproken.' },
    ],
    informationTitle: 'Informatie voor een eerste projectbeoordeling',
    informationIntro: 'Deel wat beschikbaar is; ontbrekende gegevens kunnen tijdens de beoordeling worden vastgesteld.',
    information: ['Projectlocatie en type gebouw', 'Tekeningen, werkomschrijving en relevante revisies', 'Hoeveelheden of meetstaat', 'Huidige projectfase en gewenste uitvoeringsperiode', 'Bouwplanning en afhankelijkheden met andere partijen', 'Wie materialen levert en waar deze kunnen worden opgeslagen', 'Toegang, werktijden en contactpersoon op locatie'],
    boundariesTitle: 'Aandachtspunten vóór opdracht',
    boundaries: ['AZGS neemt niet automatisch de rol van hoofdaannemer, ontwerper of installatieverantwoordelijke over.', 'Meerwerk of een gewijzigde bouwvolgorde wordt eerst beoordeeld en schriftelijk vastgelegd.', 'Keuringen, certificaten, berekeningen en inbedrijfstelling blijven bij de daarvoor aangewezen bevoegde partij; de opdracht benoemt alleen de benodigde raakvlakken.', NL_PROJECT_AREA_BOUNDARY, NL_URGENT_BOUNDARY],
    ctaTitle: 'Een afgebakend werkpakket laten beoordelen?',
    ctaText: 'Stuur locatie, tekeningen, scope, planning en gewenste inzet via het zakelijke formulier.',
  },
  'property-managers': {
    title: 'Installatieprojecten voor vastgoedbeheerders | AZGS',
    description: 'Sanitaire, thermische en ventilatie-installaties voor vastgoedbeheerders, met duidelijke toegang, systeemgrenzen en projectplanning.',
    eyebrow: 'Zakelijk · Vastgoedbeheer',
    heading: 'Installatieprojecten binnen beheerd vastgoed',
    intro: 'Bij installatiewerk in beheerd vastgoed moeten toegang, toestemming, systeemgrenzen en communicatie met gebruikers op elkaar aansluiten. AZGS beoordeelt afgebakende projecten voor sanitair en leidingwerk, thermische installaties en ventilatie.',
    needsTitle: 'Wat een installatieproject beoordeelbaar maakt',
    needsIntro: 'Een complete eerste intake voorkomt onduidelijkheid over installatie, werkzone en verantwoordelijkheden.',
    needs: [
      { title: 'Project en bereikbaarheid', text: 'Beschrijf de gewenste installatie, de betrokken ruimten en wie ter plaatse toegang kan geven.' },
      { title: 'Gebouw in gebruik', text: 'Bewoners, huurders of medewerkers kunnen de planning en werkmethode beïnvloeden. De beheerder stemt communicatie en toegang af.' },
      { title: 'Systeemgrens', text: 'Benoem de bestaande installatie, de gewenste aansluiting en welke ontwerp-, keurings- of inbedrijfstellingspartij verantwoordelijk blijft.' },
    ],
    workTitle: 'Installatiewerk voor beheerde locaties',
    workIntro: 'De opdracht kan één project of meerdere locaties betreffen; omvang, planning en capaciteit worden vooraf per aanvraag beoordeeld.',
    work: [
      { title: 'Sanitair en leidingwerk', text: 'Leidingen, aansluitpunten en sanitaire voorzieningen binnen de afgesproken systeem- en ruimtegrens.' },
      { title: 'Thermische installaties', text: 'Verwarmingsleidingen, radiatoren, verdelers en vloerverwarming binnen een afgebakend project.' },
      { title: 'Ventilatie', text: 'Ventilatiekanalen, doorvoeren en aansluitpunten op basis van bevestigde technische uitgangspunten.' },
    ],
    serviceLinks: NL_B2B_SERVICE_LINKS,
    responsibilitiesTitle: 'Wie regelt welk onderdeel',
    responsibilitiesIntro: 'Vooral bij verhuurde of gedeelde gebouwen moet de bevoegdheid om werk te laten uitvoeren vooraf duidelijk zijn.',
    responsibilities: [
      { party: 'AZGS', text: 'Beoordeelt de zichtbare en bereikbare situatie, voert het afgesproken technische werk uit en koppelt relevante bevindingen terug.' },
      { party: 'Vastgoedbeheerder', text: 'Bevestigt opdrachtbevoegdheid, prioriteit, budgetkader, toegang en communicatie met huurders of gebruikers.' },
      { party: 'Eigenaar en specialisten', text: 'Beslissen over constructieve, ontwerp-, verzekerings- of keuringsvraagstukken en werkzaamheden buiten de opdracht van AZGS.' },
    ],
    informationTitle: 'Wat wij per melding of portefeuille nodig hebben',
    informationIntro: 'De eerste aanvraag hoeft geen gevoelige toegangsgegevens of volledige bewonersdossiers te bevatten.',
    information: ['Locatie en type gebouw', 'Aantal locaties waarop de aanvraag betrekking heeft', 'Tekeningen, werkomschrijving of bestaande installatiedocumentatie', 'Projectfase en gewenste uitvoeringsperiode', 'Contactpersoon en toegangsmogelijkheid', 'Bestaande systeemgrens en gewenste installatie', 'Benodigde afstemming met ontwerpers, keurders of andere installatiepartijen'],
    boundariesTitle: 'Aandachtspunten bij vastgoedbeheer',
    boundaries: ['De zakelijke aanvraag betreft alleen sanitair en leidingwerk, thermische installaties of ventilatie.', 'Codes, sleutels en gevoelige bewonersinformatie horen niet in het eerste webformulier.', 'Verborgen gebreken en specialistisch onderzoek worden afzonderlijk beoordeeld.', NL_PROJECT_AREA_BOUNDARY, NL_URGENT_BOUNDARY],
    ctaTitle: 'Een installatieproject of meerdere locaties bespreken?',
    ctaText: 'Gebruik het zakelijke formulier voor een afgebakend sanitair, thermisch of ventilatieproject.',
  },
  'hospitality-hotels': {
    title: 'Technische werkzaamheden voor horeca en hotels | AZGS',
    description: 'Sanitaire, thermische en ventilatie-installaties voor horeca en hotels, afgestemd op gastenruimten, toegang en bedrijfsvoering.',
    eyebrow: 'Zakelijk · Horeca en hotels',
    heading: 'Technisch werk afgestemd op een locatie die gasten ontvangt',
    intro: 'Een restaurant, hotel of andere horecalocatie kent drukke gebruiksmomenten, verschillende werkzones en strikte interne afspraken. Vooraf stemmen we af waar gewerkt kan worden en welke sanitaire, thermische of ventilatieonderdelen in de opdracht vallen.',
    needsTitle: 'Specifieke aandacht voor horeca- en hotellocaties',
    needsIntro: 'Bedrijfsvoering en toegang zijn net zo bepalend voor de planning als de technische omvang.',
    needs: [
      { title: 'Werkvenster per ruimte', text: 'Geef aan wanneer gastentoiletten, kamers, keuken- of publiekszones bereikbaar zijn. Werk buiten normale tijden is alleen mogelijk wanneer dit afzonderlijk wordt overeengekomen.' },
      { title: 'Scheiding van werk- en gebruikszone', text: 'De exploitant bepaalt welke zones buiten gebruik worden gesteld en welke interne veiligheids- of hygiëneprocedures gelden.' },
      { title: 'Installatiegrens en overdracht', text: 'Vooraf moet duidelijk zijn waar de installatiegrens ligt en welke andere partij bouwkundige voorzieningen, apparatuur, regeling of keuring verzorgt.' },
    ],
    workTitle: 'Mogelijke werkpakketten voor hospitality',
    workIntro: 'Wij beloven geen continuïteit of responstijd; omvang, werkvenster en beschikbaarheid worden per aanvraag bevestigd.',
    work: [
      { title: 'Sanitair en toiletruimten', text: 'Leidingwerk, aansluitingen en sanitaire voorzieningen in gast- en personeelsruimten.' },
      { title: 'Pantry- en keukenaansluitingen', text: 'Water- en afvoeraansluitingen en bereikbare leidingtracés, buiten apparatuur of specialistische keukeninstallaties tenzij anders afgesproken.' },
      { title: 'Thermische installaties', text: 'Verwarmingsleidingen, radiatoren, verdelers en vloerverwarming binnen een afgebakend technisch project.' },
      { title: 'Ventilatie', text: 'Ventilatiekanalen, doorvoeren en aansluitpunten volgens bevestigde technische uitgangspunten.' },
    ],
    serviceLinks: NL_B2B_SERVICE_LINKS,
    responsibilitiesTitle: 'Afstemming met exploitant en andere partijen',
    responsibilitiesIntro: 'Een heldere contactlijn voorkomt dat technische uitvoering en operationele beslissingen door elkaar lopen.',
    responsibilities: [
      { party: 'AZGS', text: 'Voert het geaccepteerde installatiepakket uit en meldt omstandigheden die planning, veiligheid of systeemgrenzen beïnvloeden.' },
      { party: 'Exploitant of beheerder', text: 'Regelt toegang, vrijgave van ruimten, interne communicatie, huisregels en contact met gasten of personeel.' },
      { party: 'Leveranciers en specialisten', text: 'Blijven verantwoordelijk voor keukenapparatuur, brandveiligheidsinstallaties, specialistische regeltechniek en keuringen tenzij uitdrukkelijk anders overeengekomen.' },
    ],
    informationTitle: 'Informatie voor de eerste beoordeling',
    informationIntro: 'Een locatiebezoek kan nodig zijn, maar de volgende informatie maakt de eerste triage concreter.',
    information: ['Type locatie en plaats', 'Betrokken ruimte of aantal kamers/zones', 'Gewenste sanitaire, thermische of ventilatie-installatie', 'Beschikbare werkvensters en toegangsprocedure', 'Bekende installatiegegevens en tekeningen', 'Systeemgrens en betrokken specialistische partijen', 'Contactpersoon met beslisbevoegdheid'],
    boundariesTitle: 'Aandachtspunten vóór planning',
    boundaries: ['Werk buiten normale tijden, fasering en tijdelijke voorzieningen worden alleen aangeboden wanneer dit haalbaar en schriftelijk afgesproken is.', 'Keukenapparatuur en specialistische brandveiligheids-, beveiligings- of regelsystemen vallen niet onder dit aanbod.', 'De zakelijke aanvraag betreft alleen sanitair en leidingwerk, thermische installaties of ventilatie.', NL_PROJECT_AREA_BOUNDARY, NL_URGENT_BOUNDARY],
    ctaTitle: 'Een sanitair, thermisch of ventilatieproject op locatie?',
    ctaText: 'Beschrijf de ruimte, impact, toegang en gewenste planning in het zakelijke formulier.',
  },
  'offices-retail': {
    title: 'Technisch werk voor kantoren en winkels | AZGS',
    description: 'Sanitaire, thermische en ventilatie-installaties voor kantoren en winkels, met afstemming over gebruikers, toegang en systeemgrenzen.',
    eyebrow: 'Zakelijk · Kantoren en winkels',
    heading: 'Installatieprojecten binnen gebruikte commerciële ruimten',
    intro: 'Kantoren en winkels vragen om heldere werkzones, bereikbare installaties en afstemming met gebruikers of huurders. AZGS voert alleen overeengekomen sanitaire, thermische en ventilatieonderdelen uit.',
    needsTitle: 'Waar commerciële ruimten om vragen',
    needsIntro: 'De ruimte kan in gebruik, leegstaand of in verbouwing zijn; elke situatie vraagt een andere planning.',
    needs: [
      { title: 'Gebruik en toegankelijkheid', text: 'Openingstijden, kantoorbezetting, laadroutes en toegangsregels bepalen wanneer materialen en gereedschap naar de werkzone kunnen.' },
      { title: 'Huurders- en casco-afbakening', text: 'Maak duidelijk welke delen bij huurder, verhuurder of beheerder horen en wie wijzigingen aan installaties mag goedkeuren.' },
      { title: 'Systeemgrens en overdracht', text: 'Bij pantry’s, toiletten en verkoopruimten moet vooraf duidelijk zijn waar de installatiegrens ligt en welke andere partijen aansluiten.' },
    ],
    workTitle: 'Technische onderdelen voor kantoor en retail',
    workIntro: 'De exacte combinatie hangt af van de bestaande situatie en het overeengekomen projectonderdeel.',
    work: [
      { title: 'Pantry, sanitair en leidingwerk', text: 'Water, afvoer, aansluitpunten en sanitaire voorzieningen in pantry’s, toiletten en personeelsruimten.' },
      { title: 'Thermische installaties', text: 'Verwarmingsleidingen, radiatoren, verdelers en vloerverwarming binnen de afgesproken systeemgrens.' },
      { title: 'Ventilatie', text: 'Ventilatiekanalen, doorvoeren en aansluitpunten binnen een afgebakend projectonderdeel.' },
    ],
    serviceLinks: NL_B2B_SERVICE_LINKS,
    responsibilitiesTitle: 'Afspraken tussen gebruiker, beheer en uitvoering',
    responsibilitiesIntro: 'Voor aanvang moet duidelijk zijn wie bevoegd is om keuzes te maken over ruimte, installatie en systeemgrenzen.',
    responsibilities: [
      { party: 'AZGS', text: 'Voert het afgesproken onderdeel uit, beschermt de overeengekomen werkzone en koppelt relevante afwijkingen terug.' },
      { party: 'Opdrachtgever of beheerder', text: 'Regelt toestemming, toegang, werkvensters, gebruikerscommunicatie en informatie over bestaande installaties.' },
      { party: 'Andere contractpartijen', text: 'Verhuurder, huurder, installateur of ontwerper blijft verantwoordelijk voor eigen goedkeuringen, ontwerp en specialistische systemen.' },
    ],
    informationTitle: 'Wat u bij de aanvraag kunt meesturen',
    informationIntro: 'Stuur geen alarmcodes of persoonlijke gegevens van medewerkers; die worden later via een passend kanaal afgestemd.',
    information: ['Adres en type commerciële ruimte', 'Status: in gebruik, leeg of in verbouwing', 'Plattegrond, foto’s of werkomschrijving indien beschikbaar', 'Gewenste werkzaamheden en oplevergrens', 'Openingstijden of beschikbare werkvensters', 'Toegang, parkeren en materiaalroute', 'Contactpersoon voor technische beslissingen'],
    boundariesTitle: 'Aandachtspunten bij werk in gebruik',
    boundaries: ['Buitenwerktijden en fasering zijn geen standaardbelofte en worden per opdracht beoordeeld.', 'Onbekende leidingen, asbestverdachte materialen of verborgen gebreken kunnen onderzoek door een bevoegde derde vereisen.', 'Verplaatsing van inventaris, beveiliging en communicatie met bezoekers of personeel blijven bij de opdrachtgever tenzij anders overeengekomen.', NL_PROJECT_AREA_BOUNDARY, NL_URGENT_BOUNDARY],
    ctaTitle: 'Een kantoor- of winkelruimte technisch laten beoordelen?',
    ctaText: 'Deel gebruikssituatie, scope, toegang en planning via het zakelijke formulier.',
  },
  'owners-associations': {
    title: 'Technische werkzaamheden voor VvE’s | AZGS',
    description: 'Sanitaire, thermische en ventilatieprojecten voor VvE’s, met duidelijke grenzen tussen gemeenschappelijke delen, privé-zones en toegang.',
    eyebrow: 'Zakelijk · VvE',
    heading: 'Technische uitvoering met duidelijke VvE-besluitvorming en toegang',
    intro: 'Bij een VvE raakt technisch werk vaak gemeenschappelijke delen, privé-gedeelten en meerdere bewoners. Daarom moet vóór uitvoering duidelijk zijn wie opdracht geeft, welke ruimten toegankelijk zijn en waar de verantwoordelijkheid van AZGS eindigt.',
    needsTitle: 'Wat VvE-werk anders maakt',
    needsIntro: 'Technische uitvoering kan pas zorgvuldig worden gepland wanneer mandaat en werkgebied zijn vastgesteld.',
    needs: [
      { title: 'Gemeenschappelijk of privé', text: 'Geef aan welke installatie of bouwdeel betrokken is en of de VvE, een eigenaar of een bewoner opdrachtgever is.' },
      { title: 'Besluit en aanspreekpunt', text: 'Een bestuurder of beheerder bevestigt de opdrachtbevoegdheid en bundelt technische en praktische beslissingen.' },
      { title: 'Toegang tot meerdere ruimten', text: 'Wanneer woningen, bergingen of algemene ruimten nodig zijn, organiseert de VvE de afspraken en bewonerscommunicatie.' },
    ],
    workTitle: 'Mogelijke technische onderdelen voor een VvE',
    workIntro: 'Of een onderdeel voor rekening van de VvE of een individuele eigenaar komt, wordt niet door de webpagina bepaald.',
    work: [
      { title: 'Leidingwerk en sanitair', text: 'Leidingen, aansluitpunten en sanitaire installaties in algemene of overeengekomen privé-zones.' },
      { title: 'Verwarming en verdelers', text: 'Werk aan bereikbare verwarmingsleidingen, radiatoren of verdelers binnen de vastgelegde systeemgrens.' },
      { title: 'Ventilatiezones', text: 'Kanalen, doorvoeren en aansluitpunten voor zover oorzaak, toegang en systeemverantwoordelijkheid zijn vastgesteld.' },
    ],
    serviceLinks: NL_B2B_SERVICE_LINKS,
    responsibilitiesTitle: 'Rollen rond een VvE-opdracht',
    responsibilitiesIntro: 'De opdrachtbevestiging benoemt de feitelijke opdrachtgever en het afgesproken werkgebied.',
    responsibilities: [
      { party: 'AZGS', text: 'Beoordeelt de bereikbare situatie en voert het geaccepteerde werk uit binnen de vastgelegde systeem- en ruimtegrenzen.' },
      { party: 'VvE of beheerder', text: 'Bevestigt mandaat, budget, toegang, bewonerscommunicatie en eventuele besluiten of toestemmingen.' },
      { party: 'Eigenaars en specialisten', text: 'Blijven verantwoordelijk voor privé-inventaris, individuele toestemming en specialistisch onderzoek buiten het werkpakket.' },
    ],
    informationTitle: 'Informatie voor een VvE-aanvraag',
    informationIntro: 'Een eerste aanvraag kan zakelijk en beknopt blijven; persoonsgegevens van bewoners zijn meestal niet nodig.',
    information: ['Naam van VvE of beheerorganisatie', 'Adres en type gebouw', 'Gemeenschappelijk of privé-gedeelte', 'Omschrijving en bekende historie van de melding', 'Aantal betrokken woningen of ruimten', 'Beschikbare tekeningen of installatiedocumentatie', 'Bevoegd aanspreekpunt en gewenste besluittermijn'],
    boundariesTitle: 'Aandachtspunten vóór uitvoering',
    boundaries: ['AZGS bepaalt niet namens de VvE wie intern kosten draagt of welke besluiten volgens splitsingsstukken nodig zijn.', 'Bewonersgegevens, sleutels en toegangscodes worden niet via het eerste webformulier gevraagd.', 'Werk aan collectieve of gereguleerde systemen kan aanvullende ontwerp-, keurings- of specialistische verantwoordelijkheid vereisen.', NL_PROJECT_AREA_BOUNDARY, NL_URGENT_BOUNDARY],
    ctaTitle: 'Een VvE-melding of project laten beoordelen?',
    ctaText: 'Deel het gebouw, betrokken delen, mandaat en beschikbare informatie via het zakelijke formulier.',
  },
  'installation-ventilation': {
    title: 'Partner voor installatie- en ventilatiebedrijven | AZGS',
    description: 'Uitvoeringscapaciteit voor installatie- en ventilatiebedrijven: sanitair leidingwerk, thermische installaties en ventilatie met duidelijke systeemgrenzen.',
    eyebrow: 'Zakelijk · Installatie- en ventilatiebedrijven',
    heading: 'Aanvullende uitvoering met expliciete technische raakvlakken',
    intro: 'AZ Grand Solutions kan een afgebakend sanitair, thermisch of ventilatietechnisch uitvoeringsdeel ondersteunen wanneer een installatie- of ventilatiebedrijf extra capaciteit nodig heeft. Ontwerp, berekeningen, regeling en inbedrijfstelling blijven bij de installatie- of ventilatiepartner of een daarvoor aangewezen specialist.',
    needsTitle: 'Raakvlakken die vóór uitvoering vast moeten staan',
    needsIntro: 'Bij samenwerking tussen technische bedrijven is een duidelijke grens belangrijker dan een brede omschrijving.',
    needs: [
      { title: 'Systeem- en ontwerpverantwoordelijkheid', text: 'Benoem wie dimensioneert, materiaal selecteert, wijzigingen goedkeurt en de installatie uiteindelijk in bedrijf stelt.' },
      { title: 'Materiaal en logistiek', text: 'Leg vast wie onderdelen levert, controleert en opslaat en hoe ontbrekend of afwijkend materiaal wordt behandeld.' },
      { title: 'Doorvoeren en aansluitgrenzen', text: 'Doorvoeren, kanalen, brandwerende afdichting en overige bouwkundige voorzieningen zijn aparte raakvlakken die niet impliciet worden aangenomen.' },
    ],
    workTitle: 'Uitvoeringsdelen die kunnen worden afgestemd',
    workIntro: 'Alleen het sanitaire, thermische of ventilatietechnische installatiewerk dat in de offerte is benoemd behoort tot de opdracht.',
    work: [
      { title: 'Leidingtracés en aansluitpunten', text: 'Montage van overeengekomen leidingdelen, verdelers en aansluitzones op basis van aangeleverde of bevestigde uitgangspunten.' },
      { title: 'Ventilatiekanalen en doorvoeren', text: 'Montage- en voorbereidingswerk binnen een vastgelegde zone, inclusief expliciet benoemde bouwkundige raakvlakken.' },
      { title: 'Thermische installaties', text: 'Montage van overeengekomen verwarmingsleidingen, radiatoren, verdelers en vloerverwarming binnen bevestigde systeemgrenzen.' },
    ],
    serviceLinks: NL_B2B_SERVICE_LINKS,
    responsibilitiesTitle: 'Samenwerking zonder onduidelijke systeemgrenzen',
    responsibilitiesIntro: 'Voor elk raakvlak moet één partij beslis- en controleverantwoordelijkheid houden.',
    responsibilities: [
      { party: 'AZGS', text: 'Voert het overeengekomen installatieonderdeel uit en meldt zichtbare conflicten met aangeleverde informatie.' },
      { party: 'Installatie- of ventilatiepartner', text: 'Levert bevestigde technische uitgangspunten, materiaalverantwoordelijkheid, maatvoering en tijdige inspectie vóór sluiting.' },
      { party: 'Opdrachtgever en specialisten', text: 'Behouden ontwerp-, berekenings-, brandveiligheids-, keurings- en inbedrijfstellingsverantwoordelijkheid voor zover niet expliciet toegewezen.' },
    ],
    informationTitle: 'Informatie voor een capaciteits- of werkpakketvraag',
    informationIntro: 'Hoe scherper de grens, hoe beter inzet en planning kunnen worden beoordeeld.',
    information: ['Projectlocatie en gebouwtype', 'Tekeningen, schema’s en revisiestatus', 'Gevraagde werkzaamheden, aantallen en systeemgrenzen', 'Wie materiaal levert en controleert', 'Projectfase, startmoment en benodigde capaciteit', 'Inspectie-, test- en sluitmomenten', 'Contactpersoon voor technische beslissingen'],
    boundariesTitle: 'Expliciet te bevestigen',
    boundaries: ['Ontwerp, dimensionering, regeling, certificering en inbedrijfstelling zijn geen onderdeel van de hier beschreven uitvoeringsondersteuning.', 'Brandwerende afdichtingen en andere specialistische voorzieningen blijven bij de daarvoor aangewezen specialist; de benodigde aansluiting wordt vooraf vastgelegd.', 'AZGS neemt geen verantwoordelijkheid over voor delen die na een afgesproken controle door andere partijen worden gewijzigd of gesloten.', NL_PROJECT_AREA_BOUNDARY, NL_URGENT_BOUNDARY],
    ctaTitle: 'Extra uitvoeringscapaciteit of een afgebakend werkpakket?',
    ctaText: 'Stuur technische uitgangspunten, materiaalverdeling, planning en raakvlakken via het zakelijke formulier.',
  },
};

const EN: Record<BusinessSectorKey, LocalizedSector> = {
  contractors: {
    title: 'Execution partner for contractors and builders | AZGS',
    description: 'Plumbing, thermal and ventilation systems for contractors and builders, with project location and scope assessed in advance from Woerden.',
    eyebrow: 'Business · Contractors and construction companies',
    heading: 'Technical execution capacity within your construction programme',
    intro: 'AZ Grand Solutions can deliver a defined work package within renovation, fit-out and business construction projects. Before work starts, the assignment records the work, work zone and handover points included in our scope.',
    needsTitle: 'What construction teams need to define early',
    needsIntro: 'Capacity and feasibility can be assessed more reliably when scope, sequence and interfaces are concrete.',
    needs: [
      { title: 'Boundary between trades', text: 'Plumbing, thermal systems and ventilation interface with other trades. The quotation states which system components AZGS executes and which remain with others.' },
      { title: 'Sequence and access', text: 'Preceding work, clear work zones, material routes and available facilities determine when a package can be executed.' },
      { title: 'Changes and handover points', text: 'Departures from drawings or quantities require a decision route and written confirmation before additional work is carried out.' },
    ],
    workTitle: 'Work packages that can be agreed as a project component',
    workIntro: 'The accepted quotation, drawings and project-specific arrangements always determine the final content.',
    work: [
      { title: 'Plumbing and pipework', text: 'Pipework, connection points, plumbing fixtures and technical preparation in agreed areas.' },
      { title: 'Heating and underfloor heating', text: 'Pipe routes, radiators, manifolds and underfloor-heating circuits coordinated with floor build-up and project phase.' },
      { title: 'Ventilation', text: 'Ventilation ducts, penetrations and connection points where explicitly included in the execution package.' },
    ],
    serviceLinks: EN_B2B_SERVICE_LINKS,
    responsibilitiesTitle: 'Allocation of responsibilities',
    responsibilitiesIntro: 'This is an assessment framework; the order confirmation determines what is actually agreed.',
    responsibilities: [
      { party: 'AZGS', text: 'Executes the accepted work package and reports visible conflicts or missing information that affect execution.' },
      { party: 'Client or main contractor', text: 'Provides current drawings, decisions, programme, safe access and one authorised contact for the work zone.' },
      { party: 'Designers and other trades', text: 'Remain responsible for design, calculations, inspections, commissioning and specialist work unless agreed otherwise in writing.' },
    ],
    informationTitle: 'Information for an initial project assessment',
    informationIntro: 'Share what is available; missing details can be identified during assessment.',
    information: ['Project location and building type', 'Drawings, work description and relevant revisions', 'Quantities or bill of quantities', 'Current project phase and preferred execution period', 'Construction programme and dependencies on other parties', 'Who supplies materials and where they can be stored', 'Access, working hours and site contact'],
    boundariesTitle: 'Points to settle before appointment',
    boundaries: ['AZGS does not automatically assume the role of main contractor, designer or responsible system installer.', 'Additional work or a changed site sequence is assessed and recorded before execution.', 'Inspections, certificates, calculations and commissioning remain with the designated competent party; the assignment records only the required interfaces.', EN_PROJECT_AREA_BOUNDARY, EN_URGENT_BOUNDARY],
    ctaTitle: 'Would you like a defined work package assessed?',
    ctaText: 'Send the location, drawings, scope, programme and required capacity through the business form.',
  },
  'property-managers': {
    title: 'Installation projects for property managers | AZGS',
    description: 'Plumbing, thermal and ventilation systems for property managers, with clear access, system boundaries and project planning.',
    eyebrow: 'Business · Property management',
    heading: 'Installation projects within managed property',
    intro: 'For installation work in managed property, access, authority, system boundaries and occupant communication must align. AZGS assesses defined projects for plumbing and pipework, thermal systems and ventilation.',
    needsTitle: 'What makes an installation project assessable',
    needsIntro: 'A complete initial intake avoids uncertainty about the system, work zone and responsibilities.',
    needs: [
      { title: 'Project and local contact', text: 'Describe the required installation, the affected areas and who can provide access on site.' },
      { title: 'Occupied building', text: 'Residents, tenants or staff can affect planning and working methods. The manager coordinates communication and access.' },
      { title: 'System boundary', text: 'Identify the existing system, the required connection and which design, inspection or commissioning party remains responsible.' },
    ],
    workTitle: 'Installation work for managed locations',
    workIntro: 'An assignment may cover one project or several locations; scope, programme and capacity are assessed for each request in advance.',
    work: [
      { title: 'Plumbing and pipework', text: 'Pipes, connection points and plumbing fixtures within the agreed system and spatial boundary.' },
      { title: 'Thermal systems', text: 'Heating pipes, radiators, manifolds and underfloor heating within a defined project.' },
      { title: 'Ventilation', text: 'Ventilation ducts, penetrations and connection points based on confirmed technical inputs.' },
    ],
    serviceLinks: EN_B2B_SERVICE_LINKS,
    responsibilitiesTitle: 'Who arranges which part',
    responsibilitiesIntro: 'For rented or shared buildings, authority to instruct work must be clear in advance.',
    responsibilities: [
      { party: 'AZGS', text: 'Assesses the visible and accessible situation, executes the agreed technical work and reports relevant findings.' },
      { party: 'Property manager', text: 'Confirms authority, priority, budget framework, access and communication with tenants or users.' },
      { party: 'Owner and specialists', text: 'Decide on structural, design, insurance or inspection matters and work outside the AZGS assignment.' },
    ],
    informationTitle: 'What we need per issue or portfolio request',
    informationIntro: 'The initial request should not include sensitive access credentials or complete resident files.',
    information: ['Location and building type', 'Number of locations covered by the request', 'Drawings, work description or existing installation documents', 'Project phase and preferred execution period', 'Contact person and access options', 'Existing system boundary and required installation', 'Coordination required with designers, inspectors or other installation parties'],
    boundariesTitle: 'Points for property management',
    boundaries: ['The business request covers only plumbing and pipework, thermal systems or ventilation.', 'Codes, keys and sensitive resident information do not belong in the initial web form.', 'Hidden defects and specialist investigation are assessed separately.', EN_PROJECT_AREA_BOUNDARY, EN_URGENT_BOUNDARY],
    ctaTitle: 'Discuss an installation project or multiple locations?',
    ctaText: 'Use the business form for a defined plumbing, thermal or ventilation project.',
  },
  'hospitality-hotels': {
    title: 'Technical work for hospitality and hotels | AZGS',
    description: 'Plumbing, thermal and ventilation systems for hospitality and hotels, coordinated around guest areas, access and operations.',
    eyebrow: 'Business · Hospitality and hotels',
    heading: 'Technical work coordinated around a guest-facing location',
    intro: 'A restaurant, hotel or hospitality venue has busy periods, distinct work zones and internal procedures. We define where work can take place and which plumbing, thermal or ventilation elements belong to the assignment.',
    needsTitle: 'Specific considerations for hospitality and hotels',
    needsIntro: 'Operations and access are as important to planning as the technical size of the job.',
    needs: [
      { title: 'Work window per area', text: 'State when guest toilets, rooms, kitchen or public areas are available. Work outside normal hours is possible only when separately agreed.' },
      { title: 'Separation of work and occupied zones', text: 'The operator determines which areas are taken out of use and which internal safety or hygiene procedures apply.' },
      { title: 'System boundary and handover', text: 'Define where the system boundary lies and which other party provides building provisions, equipment, controls or inspections.' },
    ],
    workTitle: 'Possible work packages for hospitality',
    workIntro: 'We do not promise continuity or response times; scope, work window and availability are confirmed per request.',
    work: [
      { title: 'Plumbing and toilet areas', text: 'Pipework, connections and plumbing fixtures in guest and staff areas.' },
      { title: 'Pantry and kitchen connections', text: 'Water and drainage connections and accessible pipe routes, excluding equipment or specialist kitchen systems unless agreed.' },
      { title: 'Thermal systems', text: 'Heating pipes, radiators, manifolds and underfloor heating within a defined technical project.' },
      { title: 'Ventilation', text: 'Ventilation ducts, penetrations and connection points based on confirmed technical inputs.' },
    ],
    serviceLinks: EN_B2B_SERVICE_LINKS,
    responsibilitiesTitle: 'Coordination with the operator and other parties',
    responsibilitiesIntro: 'A clear contact route keeps technical execution and operational decisions separate.',
    responsibilities: [
      { party: 'AZGS', text: 'Executes the accepted installation package and reports conditions that affect planning, safety or system boundaries.' },
      { party: 'Operator or manager', text: 'Arranges access, release of areas, internal communication, house rules and contact with guests or staff.' },
      { party: 'Suppliers and specialists', text: 'Remain responsible for kitchen equipment, fire-safety systems, specialist controls and inspections unless expressly agreed otherwise.' },
    ],
    informationTitle: 'Information for the initial assessment',
    informationIntro: 'A site visit may be needed, but the following makes initial triage more concrete.',
    information: ['Venue type and location', 'Affected room or number of rooms/zones', 'Required plumbing, thermal or ventilation system', 'Available work windows and access procedure', 'Known installation details and drawings', 'System boundary and specialist parties involved', 'Contact with authority to decide'],
    boundariesTitle: 'Points to settle before planning',
    boundaries: ['Work outside normal hours, phasing and temporary provisions are offered only when feasible and agreed in writing.', 'Kitchen equipment and specialist fire-safety, security or control systems are outside this offer.', 'The business request covers only plumbing and pipework, thermal systems or ventilation.', EN_PROJECT_AREA_BOUNDARY, EN_URGENT_BOUNDARY],
    ctaTitle: 'A plumbing, thermal or ventilation project at your location?',
    ctaText: 'Describe the area, impact, access and preferred programme in the business form.',
  },
  'offices-retail': {
    title: 'Technical work for offices and retail | AZGS',
    description: 'Plumbing, thermal and ventilation systems for offices and retail, coordinated around users, access and system boundaries.',
    eyebrow: 'Business · Offices and retail',
    heading: 'Installation projects within occupied commercial spaces',
    intro: 'Offices and shops need clear work zones, accessible systems and coordination with users or tenants. AZGS executes only agreed plumbing, thermal and ventilation components.',
    needsTitle: 'What commercial spaces require',
    needsIntro: 'A space may be occupied, vacant or under fit-out; each situation needs a different plan.',
    needs: [
      { title: 'Use and accessibility', text: 'Opening hours, office occupancy, loading routes and access rules determine when materials and tools can reach the work zone.' },
      { title: 'Tenant and shell boundary', text: 'Clarify which parts belong to the tenant, landlord or manager and who may approve changes to installations.' },
      { title: 'System boundary and handover', text: 'For pantries, toilets and retail areas, define where the installation boundary lies and which other parties connect to it.' },
    ],
    workTitle: 'Technical components for office and retail',
    workIntro: 'The exact combination depends on the existing situation and the agreed project component.',
    work: [
      { title: 'Pantry, plumbing and pipework', text: 'Water, drainage, connection points and plumbing fixtures in pantries, toilets and staff areas.' },
      { title: 'Thermal systems', text: 'Heating pipes, radiators, manifolds and underfloor heating within the agreed system boundary.' },
      { title: 'Ventilation', text: 'Ventilation ducts, penetrations and connection points within a defined project component.' },
    ],
    serviceLinks: EN_B2B_SERVICE_LINKS,
    responsibilitiesTitle: 'Agreements between user, management and execution',
    responsibilitiesIntro: 'Before work starts, it must be clear who can decide about the space, installations and system boundaries.',
    responsibilities: [
      { party: 'AZGS', text: 'Executes the agreed component, protects the agreed work zone and reports relevant deviations.' },
      { party: 'Client or manager', text: 'Arranges permission, access, work windows, user communication and information on existing installations.' },
      { party: 'Other contract parties', text: 'Landlord, tenant, installer or designer remains responsible for its own approvals, design and specialist systems.' },
    ],
    informationTitle: 'What to include with your request',
    informationIntro: 'Do not send alarm codes or staff personal data; these can be coordinated later through an appropriate channel.',
    information: ['Address and type of commercial space', 'Status: occupied, vacant or under fit-out', 'Plan, photos or work description if available', 'Required work and handover boundary', 'Opening hours or available work windows', 'Access, parking and material route', 'Contact for technical decisions'],
    boundariesTitle: 'Points for work in occupied spaces',
    boundaries: ['Out-of-hours work and phasing are not standard promises and are assessed per assignment.', 'Unknown services, suspected asbestos-containing materials or hidden defects may require investigation by a competent third party.', 'Moving inventory, security and communication with visitors or staff remain with the client unless agreed otherwise.', EN_PROJECT_AREA_BOUNDARY, EN_URGENT_BOUNDARY],
    ctaTitle: 'Would you like an office or retail space assessed?',
    ctaText: 'Share the use situation, scope, access and programme through the business form.',
  },
  'owners-associations': {
    title: 'Technical work for owners associations | AZGS',
    description: 'Plumbing, thermal and ventilation projects for owners associations, with clear boundaries between common areas, private zones and access.',
    eyebrow: 'Business · Owners associations',
    heading: 'Technical execution with clear authority and access arrangements',
    intro: 'Work for an owners association can involve common areas, private units and several residents. Before execution, the instructing party, accessible spaces and the limit of AZGS responsibility must be clear.',
    needsTitle: 'What makes owners-association work different',
    needsIntro: 'Technical work can be planned carefully only after authority and the work area are established.',
    needs: [
      { title: 'Common or private area', text: 'State which system or building element is involved and whether the association, an owner or an occupant is the client.' },
      { title: 'Decision and contact', text: 'A board member or manager confirms authority and coordinates technical and practical decisions.' },
      { title: 'Access to several spaces', text: 'Where apartments, storage or common areas are needed, the association arranges appointments and resident communication.' },
    ],
    workTitle: 'Possible technical components for an owners association',
    workIntro: 'This page does not determine whether the association or an individual owner bears a particular cost.',
    work: [
      { title: 'Pipework and plumbing', text: 'Pipes, connection points and plumbing systems in common areas or agreed private zones.' },
      { title: 'Heating and manifolds', text: 'Work on accessible heating pipes, radiators or manifolds within the recorded system boundary.' },
      { title: 'Ventilation zones', text: 'Ducts, penetrations and connections once cause, access and system responsibility are established.' },
    ],
    serviceLinks: EN_B2B_SERVICE_LINKS,
    responsibilitiesTitle: 'Roles around an owners-association assignment',
    responsibilitiesIntro: 'The order confirmation identifies the actual client and agreed work area.',
    responsibilities: [
      { party: 'AZGS', text: 'Assesses the accessible situation and executes the accepted work within the recorded system and spatial boundaries.' },
      { party: 'Association or manager', text: 'Confirms authority, budget, access, resident communication and any required decisions or permissions.' },
      { party: 'Owners and specialists', text: 'Remain responsible for private property, individual permission and specialist investigation outside the work package.' },
    ],
    informationTitle: 'Information for an owners-association request',
    informationIntro: 'An initial request can remain concise and business-like; residents’ personal data is usually unnecessary.',
    information: ['Name of the association or managing organisation', 'Address and building type', 'Common or private area', 'Description and known history of the issue', 'Number of units or spaces involved', 'Available drawings or installation documents', 'Authorised contact and preferred decision period'],
    boundariesTitle: 'Points before execution',
    boundaries: ['AZGS does not decide how costs are allocated internally or which association decisions are required under ownership documents.', 'Resident details, keys and access codes are not requested in the initial web form.', 'Work on collective or regulated systems may require additional design, inspection or specialist responsibility.', EN_PROJECT_AREA_BOUNDARY, EN_URGENT_BOUNDARY],
    ctaTitle: 'Have an owners-association issue or project assessed?',
    ctaText: 'Share the building, affected areas, authority and available information through the business form.',
  },
  'installation-ventilation': {
    title: 'Partner for installation and ventilation companies | AZGS',
    description: 'Execution capacity for installation and ventilation companies: plumbing pipework, thermal systems and ventilation with clear system boundaries.',
    eyebrow: 'Business · Installation and ventilation companies',
    heading: 'Additional execution with explicit technical interfaces',
    intro: 'AZ Grand Solutions can support a defined plumbing, thermal or ventilation execution component when an installation or ventilation company needs additional capacity. Design, calculations, controls and commissioning remain with the installation or ventilation partner or another designated specialist.',
    needsTitle: 'Interfaces to define before execution',
    needsIntro: 'When technical companies collaborate, a precise boundary matters more than a broad description.',
    needs: [
      { title: 'System and design responsibility', text: 'Identify who sizes the system, selects materials, approves changes and commissions the final installation.' },
      { title: 'Materials and logistics', text: 'Record who supplies, checks and stores components and how missing or non-conforming material is handled.' },
      { title: 'Penetrations and connection boundaries', text: 'Penetrations, ducts, fire stopping and other building provisions are separate interfaces and are not assumed implicitly.' },
    ],
    workTitle: 'Execution components that can be coordinated',
    workIntro: 'Only the plumbing, thermal or ventilation installation work named in the quotation belongs to the assignment.',
    work: [
      { title: 'Pipe routes and connection points', text: 'Installation of agreed pipe sections, manifolds and connection zones based on supplied or confirmed inputs.' },
      { title: 'Ventilation ducts and penetrations', text: 'Installation and preparation within a recorded zone, including explicitly named building interfaces.' },
      { title: 'Thermal systems', text: 'Installation of agreed heating pipes, radiators, manifolds and underfloor heating within confirmed system boundaries.' },
    ],
    serviceLinks: EN_B2B_SERVICE_LINKS,
    responsibilitiesTitle: 'Collaboration without unclear system boundaries',
    responsibilitiesIntro: 'Each interface needs one party retaining decision and control responsibility.',
    responsibilities: [
      { party: 'AZGS', text: 'Executes the agreed installation component and reports visible conflicts with supplied information.' },
      { party: 'Installation or ventilation partner', text: 'Provides confirmed technical inputs, material responsibility, dimensions and timely inspection before closing.' },
      { party: 'Client and specialists', text: 'Retain design, calculation, fire-safety, inspection and commissioning responsibility where not explicitly assigned.' },
    ],
    informationTitle: 'Information for a capacity or work-package request',
    informationIntro: 'The clearer the boundary, the better capacity and planning can be assessed.',
    information: ['Project location and building type', 'Drawings, diagrams and revision status', 'Requested work, quantities and system boundaries', 'Who supplies and checks materials', 'Project phase, start and required capacity', 'Inspection, test and closing points', 'Contact for technical decisions'],
    boundariesTitle: 'Items requiring explicit confirmation',
    boundaries: ['Design, sizing, controls, certification and commissioning are not part of the execution support described here.', 'Fire-stopping and other specialist provisions remain with the designated specialist; the required interface is recorded in advance.', 'AZGS does not assume responsibility for work changed or closed by others after an agreed inspection.', EN_PROJECT_AREA_BOUNDARY, EN_URGENT_BOUNDARY],
    ctaTitle: 'Additional execution capacity or a defined work package?',
    ctaText: 'Send technical inputs, material allocation, programme and interfaces through the business form.',
  },
};

export function businessSectorUrl(key: BusinessSectorKey, locale: Locale) {
  return locale === 'nl' ? `/zakelijk/${SLUGS[key].nl}` : `/en/business/${SLUGS[key].en}`;
}

export function getBusinessSectorContent(key: BusinessSectorKey, locale: Locale): BusinessSectorContent {
  const localized = locale === 'nl' ? NL[key] : EN[key];
  const otherLocale: Locale = locale === 'nl' ? 'en' : 'nl';
  return {
    key,
    locale,
    slug: SLUGS[key][locale],
    path: businessSectorUrl(key, locale),
    altPath: businessSectorUrl(key, otherLocale),
    related: RELATED[key],
    ...localized,
  };
}

export function getBusinessSectorBySlug(locale: Locale, slug: string) {
  const key = (Object.keys(SLUGS) as BusinessSectorKey[]).find((candidate) => SLUGS[candidate][locale] === slug);
  return key ? getBusinessSectorContent(key, locale) : null;
}

export function getBusinessSectorParams(locale: Locale) {
  return (Object.keys(SLUGS) as BusinessSectorKey[]).map((key) => ({ sector: SLUGS[key][locale] }));
}

export function getBusinessSectorIndex(locale: Locale) {
  return (Object.keys(SLUGS) as BusinessSectorKey[]).map((key) => {
    const content = getBusinessSectorContent(key, locale);
    return { key, href: content.path, title: content.eyebrow.replace(/^.*?·\s*/, ''), description: content.description };
  });
}
