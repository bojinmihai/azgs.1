import {
  audienceServiceSlug,
  audienceServiceUrl,
  audienceSlug,
  type AudienceScope,
  type AudienceServiceKey,
  type Locale,
} from './site';

export type ServiceAudience = Exclude<AudienceScope, 'general'>;

export type AudienceServiceContent = {
  audience: ServiceAudience;
  service: AudienceServiceKey;
  locale: Locale;
  path: string;
  altPath: string;
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  intro: string;
  image: string;
  imageAlt: string;
  sections: Array<{
    title: string;
    body: string;
    items: string[];
  }>;
  proofTitle: string;
  proofItems: string[];
  ctaTitle: string;
  ctaText: string;
  ctaLabel: string;
};

const serviceImages: Record<AudienceServiceKey, { image: string; alt: Record<Locale, string> }> = {
  plumbing: {
    image: '/assets/img/services/service-sanitair-1200.jpg',
    alt: {
      nl: 'Sanitaire leidingen en aansluitingen professioneel voorbereid',
      en: 'Professional plumbing pipework and connections prepared on site',
    },
  },
  heating: {
    image: '/assets/img/services/service-verwarming-1200.jpg',
    alt: {
      nl: 'Verwarmingsinstallatie met nette leidingen en radiatoraansluiting',
      en: 'Heating installation with neat pipework and radiator connection',
    },
  },
  climate: {
    image: '/assets/img/blog/warmtepomp-installatie-1200.jpg',
    alt: {
      nl: 'Technische voorbereiding voor ventilatie en warmtepompinstallatie',
      en: 'Technical preparation for ventilation and heat pump installation',
    },
  },
  drywall: {
    image: '/assets/img/services/service-gipsplaten-1200.jpg',
    alt: {
      nl: 'Gipsplaten en metalstud constructie professioneel gemonteerd',
      en: 'Professional drywall and metal stud construction',
    },
  },
};

const nlServiceNames: Record<AudienceServiceKey, string> = {
  plumbing: 'Sanitair en leidingwerk',
  heating: 'Verwarming en thermische installaties',
  climate: 'Ventilatie en warmtepompen',
  drywall: 'Gipsplaten en metalstud',
};

const enServiceNames: Record<AudienceServiceKey, string> = {
  plumbing: 'Plumbing and pipework',
  heating: 'Heating and thermal systems',
  climate: 'Ventilation and heat pumps',
  drywall: 'Drywall and metal stud',
};

const nlAudienceNames: Record<ServiceAudience, string> = {
  private: 'Particulier',
  business: 'Zakelijk / B2B',
  maintenance: 'Service en onderhoud',
};

const enAudienceNames: Record<ServiceAudience, string> = {
  private: 'Private clients',
  business: 'Business / B2B',
  maintenance: 'Service and maintenance',
};

function serviceName(service: AudienceServiceKey, locale: Locale): string {
  return locale === 'nl' ? nlServiceNames[service] : enServiceNames[service];
}

function audienceName(audience: ServiceAudience, locale: Locale): string {
  return locale === 'nl' ? nlAudienceNames[audience] : enAudienceNames[audience];
}

function serviceSpecificIntro(audience: ServiceAudience, service: AudienceServiceKey, locale: Locale): string {
  const nl: Record<ServiceAudience, Record<AudienceServiceKey, string>> = {
    private: {
      plumbing:
        'Voor woningen gaat sanitair niet alleen over leidingen, maar ook over comfort, dagelijks gebruik en nette oplevering in badkamer, toilet of bijkeuken.',
      heating:
        'Voor particuliere woningen draait verwarming om comfort, stille werking, nette leidingen en een oplossing die past bij de bestaande woning.',
      climate:
        'Voor woningen combineren we vloerverwarming, ventilatie en warmtepompondersteuning met comfort, energiezuinigheid en zo min mogelijk overlast tijdens de uitvoering.',
      drywall:
        'Voor woningen plaatsen we gipsplaten rond renovatie, badkamer, zolder, technische schachten en herstel na installatiewerk, met aandacht voor nette afwerking.',
    },
    business: {
      plumbing:
        'Voor zakelijke projecten gaat sanitair over planning, maatvoering, herhaalbaarheid en overdraagbare kwaliteit voor aannemers, projectteams en bedrijfsruimten.',
      heating:
        'Voor B2B-projecten voeren we thermische installaties uit met focus op planning, technische afstemming en opleverpunten die passen bij professionele projectcontrole.',
      climate:
        'Voor bedrijven en projectteams ondersteunen we ventilatie, warmtepompen en energiezuinige installaties als technisch onderdeel van renovatie, fit-out of nieuwbouw.',
      drywall:
        'Voor zakelijke projecten leveren we gipsplaten en metalstud als bouwkundig-technische discipline: strak, schaalbaar en afgestemd op installaties en planning.',
    },
    maintenance: {
      plumbing:
        'Voor gebouwonderhoud gaat sanitair over snelle diagnose, beperken van schade, bedrijfscontinuiteit en duidelijk herstel na lekkage of storing.',
      heating:
        'Voor beheerde gebouwen draait verwarming om storingsopvolging, comfort voor gebruikers en herstel zonder onnodige verstoring van de bedrijfsvoering.',
      climate:
        'Voor onderhoud aan gebouwen ondersteunen we ventilatie, warmtepompen en warmteverdeling met inspectie, storinganalyse en praktische opvolging.',
      drywall:
        'Voor onderhoud herstellen we wanden, plafonds en technische zones na lekkage, reparatie of aanpassing, zodat de ruimte weer representatief bruikbaar is.',
    },
  };

  const en: Record<ServiceAudience, Record<AudienceServiceKey, string>> = {
    private: {
      plumbing:
        'For homes, plumbing is not only about pipes. It is about comfort, daily use and a clean handover in the bathroom, toilet or utility space.',
      heating:
        'For private homes, heating is about comfort, quiet operation, tidy pipework and a solution that fits the existing house.',
      climate:
        'For homes, we combine underfloor heating, ventilation and heat pump support with comfort, energy efficiency and limited disruption during the work.',
      drywall:
        'For homes, we install drywall around renovation, bathrooms, attics, service shafts and repair after installation work, with attention to clean finishing.',
    },
    business: {
      plumbing:
        'For business projects, plumbing is about planning, measurement, repeatable quality and a handover that works for contractors, project teams and commercial spaces.',
      heating:
        'For B2B projects, thermal installations are executed with focus on planning, technical coordination and handover points that match professional project control.',
      climate:
        'For companies and project teams, we support ventilation, heat pumps and energy-efficient installations as a technical part of renovation, fit-out or new construction.',
      drywall:
        'For business projects, drywall and metal stud are delivered as a technical construction discipline: clean, scalable and aligned with installations and planning.',
    },
    maintenance: {
      plumbing:
        'For building maintenance, plumbing is about fast diagnosis, limiting damage, operational continuity and clear repair after leaks or faults.',
      heating:
        'For managed buildings, heating is about fault follow-up, user comfort and repair without unnecessary disruption to operations.',
      climate:
        'For building maintenance, we support ventilation, heat pumps and heat distribution with inspection, fault analysis and practical follow-up.',
      drywall:
        'For maintenance, we repair walls, ceilings and technical zones after leaks, repairs or adjustments so the space becomes presentable and usable again.',
    },
  };

  return locale === 'nl' ? nl[audience][service] : en[audience][service];
}

function audienceSections(
  audience: ServiceAudience,
  service: AudienceServiceKey,
  locale: Locale
): AudienceServiceContent['sections'] {
  const serviceLabel = serviceName(service, locale);

  if (locale === 'nl') {
    if (audience === 'business') {
      return [
        {
          title: `Zakelijke scope voor ${serviceLabel.toLowerCase()}`,
          body:
            'Wij benaderen dit als projectwerk: duidelijke scope, planning, technische afstemming en controlepunten. De uitvoering is geschikt voor aannemers, vastgoedpartijen, kantoren, retail, horeca en projectteams die een betrouwbare technische partner nodig hebben.',
          items: [
            'Projectmatige uitvoering met duidelijke werkafspraken',
            'Afstemming met andere disciplines op locatie',
            'Oplevering met controlepunten en praktische terugkoppeling',
            'Geen particuliere renovatieverhalen in deze route',
          ],
        },
        {
          title: 'Waar wij op sturen',
          body:
            'B2B vraagt voorspelbaarheid. Daarom draait de communicatie om planning, technische haalbaarheid, toegang tot de werkzone, materiaalkeuze en overdracht. Zo blijft het project beheersbaar voor de opdrachtgever.',
          items: [
            'Planning per fase of werkzone',
            'Technische voorbereiding voor uitvoering',
            'Net werk op locatie met minimale verstoring',
            'Eenduidige communicatie met projectleiding',
          ],
        },
      ];
    }

    if (audience === 'maintenance') {
      return [
        {
          title: `Onderhoudsscope voor ${serviceLabel.toLowerCase()}`,
          body:
            'Deze route is bedoeld voor gebouwen die in gebruik zijn: restaurants, hotels, kantoren, winkels en beheerde panden. De nadruk ligt op storingen oplossen, schade beperken en de ruimte snel weer bruikbaar maken.',
          items: [
            'Snelle beoordeling van storing of schade',
            'Reparatie van technische oorzaak waar mogelijk',
            'Herstel van de werkzone na de technische ingreep',
            'Heldere terugkoppeling voor beheerder of eigenaar',
          ],
        },
        {
          title: 'Geschikt voor terugkerende service',
          body:
            'Bij onderhoud gaat het niet om een eenmalige mooie tekst, maar om betrouwbaarheid. Wij leggen vast wat is gecontroleerd, wat is hersteld en wat eventueel later gepland moet worden.',
          items: [
            'Gebouwen, horeca, hotels, kantoren en winkels',
            'Storing, lekkage, schade en preventieve opvolging',
            'Werkbaar plan voor vervolgonderhoud',
            'Een aanspreekpunt voor techniek en herstel',
          ],
        },
      ];
    }

    return [
      {
        title: `Particuliere scope voor ${serviceLabel.toLowerCase()}`,
        body:
          'Deze route is geschreven voor bewoners en particuliere opdrachtgevers. De nadruk ligt op comfort, duidelijke uitleg, nette uitvoering in huis en een oplevering die past bij dagelijks gebruik.',
        items: [
          'Duidelijke uitleg voor de bewoner',
          'Net werken in bestaande woningen',
          'Aandacht voor comfort, stofbeperking en afwerking',
          'Praktische planning rondom wonen en gezin',
        ],
      },
      {
        title: 'Van opname tot oplevering',
        body:
          'We bekijken de bestaande situatie, bespreken wat technisch verstandig is en stemmen af wat zichtbaar moet worden afgewerkt. Zo weet u vooraf wat wij doen en waar u rekening mee moet houden.',
        items: [
          'Opname van bestaande situatie',
          'Advies passend bij woning en budget',
          'Controle op werking en lekkages',
          'Nette oplevering van de werkruimte',
        ],
      },
    ];
  }

  if (audience === 'business') {
    return [
      {
        title: `Business scope for ${serviceLabel.toLowerCase()}`,
        body:
          'We treat this as project work: clear scope, planning, technical coordination and inspection points. The execution fits contractors, property teams, offices, retail, hospitality and project teams that need a reliable technical partner.',
        items: [
          'Project-based execution with clear working agreements',
          'Coordination with other trades on site',
          'Handover with checkpoints and practical feedback',
          'No private renovation storyline in this route',
        ],
      },
      {
        title: 'What we control',
        body:
          'B2B requires predictability. The communication is focused on planning, technical feasibility, access to the work zone, material choices and handover.',
        items: [
          'Planning per phase or work zone',
          'Technical preparation before execution',
          'Clean work on site with limited disruption',
          'Clear communication with project management',
        ],
      },
    ];
  }

  if (audience === 'maintenance') {
    return [
      {
        title: `Maintenance scope for ${serviceLabel.toLowerCase()}`,
        body:
          'This route is for buildings already in use: restaurants, hotels, offices, shops and managed properties. The focus is solving faults, limiting damage and getting the space usable again.',
        items: [
          'Fast assessment of fault or damage',
          'Repair of the technical cause where possible',
          'Restoration of the work zone after technical repair',
          'Clear feedback for manager or owner',
        ],
      },
      {
        title: 'Built for recurring service',
        body:
          'Maintenance is not a one-off sales text. It is about reliability. We document what was checked, what was repaired and what should be planned later.',
        items: [
          'Buildings, hospitality, hotels, offices and shops',
          'Faults, leaks, damage and preventive follow-up',
          'Workable plan for further maintenance',
          'One contact for technical work and repair',
        ],
      },
    ];
  }

  return [
    {
      title: `Private scope for ${serviceLabel.toLowerCase()}`,
      body:
        'This route is written for residents and private clients. The focus is comfort, clear explanation, clean work inside the home and a handover that works for daily use.',
      items: [
        'Clear explanation for the homeowner',
        'Clean work in existing homes',
        'Attention to comfort, dust control and finishing',
        'Practical planning around family life',
      ],
    },
    {
      title: 'From survey to handover',
      body:
        'We inspect the existing situation, explain what is technically sensible and agree what needs visible finishing. You know what we will do before the work starts.',
      items: [
        'Survey of the existing situation',
        'Advice matched to home and budget',
        'Functional and leak checks',
        'Clean handover of the work zone',
      ],
    },
  ];
}

export function getAudienceServiceContent(
  audience: ServiceAudience,
  service: AudienceServiceKey,
  locale: Locale
): AudienceServiceContent {
  const name = serviceName(service, locale);
  const audienceLabel = audienceName(audience, locale);
  const image = serviceImages[service];
  const path = audienceServiceUrl(audience, service, locale);
  const altLocale = locale === 'nl' ? 'en' : 'nl';
  const altPath = audienceServiceUrl(audience, service, altLocale);

  const heading =
    locale === 'nl'
      ? `${name} voor ${audienceLabel.toLowerCase()}`
      : `${name} for ${audienceLabel.toLowerCase()}`;
  const title =
    locale === 'nl'
      ? `${heading} regio Utrecht | AZGS`
      : `${heading} in the Utrecht region | AZGS`;
  const description =
    locale === 'nl'
      ? `${name} voor ${audienceLabel.toLowerCase()} door AZ Grand Solutions. Duidelijke scope, professionele uitvoering en communicatie per doelgroep.`
      : `${name} for ${audienceLabel.toLowerCase()} by AZ Grand Solutions. Clear scope, professional execution and communication per audience.`;

  return {
    audience,
    service,
    locale,
    path,
    altPath,
    title,
    description,
    eyebrow: `${audienceLabel} · ${name}`,
    heading,
    intro: serviceSpecificIntro(audience, service, locale),
    image: image.image,
    imageAlt: image.alt[locale],
    sections: audienceSections(audience, service, locale),
    proofTitle: locale === 'nl' ? 'Waarom deze route apart is' : 'Why this route is separate',
    proofItems:
      locale === 'nl'
        ? [
            `Tekst en aanbod zijn geschreven voor ${audienceLabel.toLowerCase()}.`,
            'De aanvraag, planning en communicatie sluiten aan op deze doelgroep.',
            'Zo komt een bezoeker niet in een algemene alles-in-een pagina terecht.',
          ]
        : [
            `Copy and offer are written for ${audienceLabel.toLowerCase()}.`,
            'The request flow, planning and communication match this audience.',
            'This prevents visitors from landing on a generic all-in-one page.',
          ],
    ctaTitle: locale === 'nl' ? 'Project bespreken?' : 'Discuss a project?',
    ctaText:
      locale === 'nl'
        ? `Stuur ons de situatie, locatie, planning en foto's. Wij beoordelen de ${audienceLabel.toLowerCase()} scope en reageren gericht.`
        : `Send us the situation, location, planning and photos. We assess the ${audienceLabel.toLowerCase()} scope and respond specifically.`,
    ctaLabel: locale === 'nl' ? 'Aanvraag starten' : 'Start request',
  };
}

export function getAudienceServiceParams(locale: Locale) {
  const audiences: ServiceAudience[] = ['private', 'business', 'maintenance'];
  const services: AudienceServiceKey[] = ['plumbing', 'heating', 'climate', 'drywall'];

  return audiences.flatMap((audience) =>
    services.map((service) => ({
      audience: audienceSlug(audience, locale),
      service: audienceServiceSlug(service, locale),
    }))
  );
}

export function resolveAudienceServiceParams(
  locale: Locale,
  audienceSlugValue: string,
  serviceSlugValue: string
): { audience: ServiceAudience; service: AudienceServiceKey } | null {
  const audiences: ServiceAudience[] = ['private', 'business', 'maintenance'];
  const services: AudienceServiceKey[] = ['plumbing', 'heating', 'climate', 'drywall'];

  const audience = audiences.find((item) => audienceSlug(item, locale) === audienceSlugValue);
  const service = services.find((item) => audienceServiceSlug(item, locale) === serviceSlugValue);

  if (!audience || !service) return null;
  return { audience, service };
}
