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

function audienceServiceName(audience: ServiceAudience, service: AudienceServiceKey, locale: Locale): string {
  const nl: Record<ServiceAudience, Record<AudienceServiceKey, string>> = {
    private: {
      plumbing: 'Sanitair en badkamerinstallaties',
      heating: 'Verwarming voor woningen',
      climate: 'Ventilatie, comfort en warmtepompen',
      drywall: 'Gipsplaten en herstelafwerking',
    },
    business: {
      plumbing: 'Installatiewerk voor B2B projecten',
      heating: 'Thermische installaties voor commerciele projecten',
      climate: 'Ventilatie en warmtepompvoorbereiding',
      drywall: 'Gipsplaten en metalstud voor commerciele projecten',
    },
    maintenance: {
      plumbing: 'Lekkage, sanitair herstel en leidingreparatie',
      heating: 'Verwarmingsstoringen en technisch herstel',
      climate: 'Ventilatie- en klimaatherstel',
      drywall: 'Wand-, plafond- en afwerkherstel',
    },
  };

  const en: Record<ServiceAudience, Record<AudienceServiceKey, string>> = {
    private: {
      plumbing: 'Plumbing and bathroom installations',
      heating: 'Heating for homes',
      climate: 'Ventilation, comfort and heat pumps',
      drywall: 'Drywall and finishing repair',
    },
    business: {
      plumbing: 'Installation work for B2B projects',
      heating: 'Thermal systems for commercial projects',
      climate: 'Ventilation and heat pump preparation',
      drywall: 'Drywall and metal stud for commercial projects',
    },
    maintenance: {
      plumbing: 'Leaks, plumbing repair and pipework repair',
      heating: 'Heating faults and technical repair',
      climate: 'Ventilation and climate system repair',
      drywall: 'Wall, ceiling and finishing repair',
    },
  };

  return locale === 'nl' ? nl[audience][service] : en[audience][service];
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
        'Voor zakelijke projecten voeren wij sanitaire installaties, leidingwerk en aansluitingen uit in samenwerking met aannemers, architecten, projectleiders, installatiebedrijven en vastgoedpartijen.',
      heating:
        'Voor B2B-projecten realiseren wij verwarmingsinstallaties, verdelers, leidingtrajecten en technische voorbereidingen met duidelijke planning en afstemming met de andere disciplines op locatie.',
      climate:
        'Voor bedrijven en projectteams voeren wij ventilatie, warmtepompvoorbereiding en energiezuinige installatieoplossingen uit als onderdeel van commerciele bouw, fit-out en technische projecten.',
      drywall:
        'Voor zakelijke projecten leveren en monteren wij complete gipsplaat- en metalstudconstructies, inclusief technische afstemming rond leidingen, schachten, plafonds en planning.',
    },
    maintenance: {
      plumbing:
        'Voor gebouwonderhoud lossen wij lekkages, verstoppingen en sanitaire storingen op en herstellen wij waar nodig de werkzone, zodat het pand snel weer veilig en bruikbaar is.',
      heating:
        'Voor beheerde gebouwen herstellen wij verwarmingsstoringen, lekkages en defecte onderdelen met aandacht voor comfort, veiligheid en minimale onderbreking van het dagelijks gebruik.',
      climate:
        'Voor onderhoud aan gebouwen controleren en herstellen wij ventilatie, warmtepompcomponenten en warmteverdeling met duidelijke diagnose, praktische uitvoering en opvolging.',
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
        'For business projects, we execute plumbing systems, pipework and connections in coordination with contractors, architects, project managers, installation companies and property teams.',
      heating:
        'For B2B projects, we deliver heating systems, manifolds, pipe routes and technical preparations with clear planning and coordination with other trades on site.',
      climate:
        'For companies and project teams, we execute ventilation, heat pump preparation and energy-efficient installation work as part of commercial construction, fit-out and technical projects.',
      drywall:
        'For business projects, we supply and install complete drywall and metal stud systems, coordinated around pipework, shafts, ceilings and project planning.',
    },
    maintenance: {
      plumbing:
        'For building maintenance, we resolve leaks, blockages and plumbing faults and repair the work zone where needed so the property can be used safely again.',
      heating:
        'For managed buildings, we repair heating faults, leaks and defective components with attention to comfort, safety and minimal disruption to daily use.',
      climate:
        'For building maintenance, we inspect and repair ventilation, heat pump components and heat distribution with clear diagnosis, practical execution and follow-up.',
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
          title: `Uitvoering voor commerciele projecten`,
          body:
            'AZ Grand Solutions werkt voor zakelijke opdrachtgevers die een betrouwbare uitvoerende partner nodig hebben. Wij sluiten aan op tekeningen, werkplanning en technische afspraken, en voeren het werk uit met aandacht voor maatvoering, veiligheid en opleverkwaliteit.',
          items: [
            'Samenwerking met aannemers, architecten en projectleiders',
            'B2B-uitvoering voor kantoren, horeca, retail en bedrijfsruimten',
            'Afstemming met installatie-, ventilatie- en afbouwbedrijven',
            'Duidelijke planning, werkafspraken en opleverpunten',
          ],
        },
        {
          title: 'Technische uitvoering zonder ruis',
          body:
            'Bij zakelijke projecten moet de uitvoering passen binnen de planning van het totale werk. Wij zorgen voor een nette werkzone, praktische communicatie en technische oplossingen die aansluiten op de disciplines voor en na ons.',
          items: [
            'Voorbereiding op basis van tekening, opname of werkomschrijving',
            'Montage en uitvoering door een technisch team',
            'Controle op aansluitingen, bereikbaarheid en afwerking',
            'Terugkoppeling aan projectleiding of opdrachtgever',
          ],
        },
      ];
    }

    if (audience === 'maintenance') {
      return [
        {
          title: `Onderhoudsscope voor ${serviceLabel.toLowerCase()}`,
          body:
            'Deze dienst is bedoeld voor gebouwen die al in gebruik zijn: restaurants, hotels, kantoren, winkels, VvE-panden en beheerde locaties. Wij lossen de technische oorzaak op en herstellen waar nodig de directe schade rond de werkzone.',
          items: [
            'Snelle beoordeling van storing of schade',
            'Reparatie van technische oorzaak waar mogelijk',
            'Herstel van wand, plafond, tegelwerk of schilderwerk na de ingreep',
            'Heldere terugkoppeling voor beheerder of eigenaar',
          ],
        },
        {
          title: 'Een aanspreekpunt voor techniek en herstel',
          body:
            'Bij een storing wil een beheerder niet vijf partijen bellen. Wij combineren installatieherstel met praktisch bouwkundig herstel, zodat de ruimte sneller weer netjes, veilig en bruikbaar is.',
          items: [
            'Gebouwen, horeca, hotels, kantoren en winkels',
            'Lekkage, storing, schade en preventieve opvolging',
            'Gips, tegelwerk, kitwerk, schilderwerk en kleine afwerking na herstel',
            'Werkbaar plan voor vervolgonderhoud of grotere reparaties',
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
        title: 'Execution for commercial projects',
        body:
          'AZ Grand Solutions works for business clients that need a reliable execution partner. We align with drawings, planning and technical agreements, and execute the work with attention to measurement, safety and handover quality.',
        items: [
          'Collaboration with contractors, architects and project managers',
          'B2B execution for offices, hospitality, retail and commercial spaces',
          'Coordination with installation, ventilation and finishing companies',
          'Clear planning, working agreements and handover points',
        ],
      },
      {
        title: 'Technical execution without noise',
        body:
          'Commercial projects require execution that fits the overall site planning. We keep the work zone clean, communicate practically and deliver technical solutions that connect with the trades before and after us.',
        items: [
          'Preparation based on drawings, survey or work description',
          'Installation and execution by a technical team',
          'Checks on connections, access and finishing',
          'Feedback to project management or client',
        ],
      },
    ];
  }

  if (audience === 'maintenance') {
    return [
      {
        title: `Maintenance scope for ${serviceLabel.toLowerCase()}`,
        body:
          'This service is for buildings already in use: restaurants, hotels, offices, shops, owners associations and managed properties. We repair the technical cause and, where needed, restore the direct damage around the work zone.',
        items: [
          'Fast assessment of fault or damage',
          'Repair of the technical cause where possible',
          'Repair of wall, ceiling, tiling or painting after the intervention',
          'Clear feedback for manager or owner',
        ],
      },
      {
        title: 'One contact for technical work and repair',
        body:
          'When something fails, a building manager should not have to call five different trades. We combine installation repair with practical building repair so the space becomes clean, safe and usable again faster.',
        items: [
          'Buildings, hospitality, hotels, offices and shops',
          'Leaks, faults, damage and preventive follow-up',
          'Drywall, tiling, sealant, painting and small finishing after repair',
          'Workable plan for follow-up maintenance or larger repairs',
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
  const name = audienceServiceName(audience, service, locale);
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
      ? `${name} voor ${audienceLabel.toLowerCase()} door AZ Grand Solutions. Technische uitvoering, duidelijke planning en nette oplevering in regio Utrecht.`
      : `${name} for ${audienceLabel.toLowerCase()} by AZ Grand Solutions. Technical execution, clear planning and clean handover in the Utrecht region.`;

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
    proofTitle: locale === 'nl' ? 'Onze werkwijze' : 'Our working method',
    proofItems:
      locale === 'nl'
        ? [
            'Wij starten met de technische situatie, de planning en de bereikbaarheid van de werkzone.',
            'Daarna stemmen wij uitvoering, materialen en opleverpunten duidelijk af.',
            'Na uitvoering controleren wij het werk en koppelen wij praktisch terug wat is gedaan.',
          ]
        : [
            'We start with the technical situation, planning and access to the work zone.',
            'We then align execution, materials and handover points clearly.',
            'After execution, we check the work and report back practically on what was done.',
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
