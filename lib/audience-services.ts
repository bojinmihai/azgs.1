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
  if (locale === 'nl') {
    if (audience === 'business') {
      const technicalOffer: Record<AudienceServiceKey, AudienceServiceContent['sections'][number]> = {
        plumbing: {
          title: 'B2B installatiewerk voor bouw- en afbouwprojecten',
          body:
            'Wij voeren leidingwerk, sanitaire aansluitingen en technische voorbereidingen uit voor commerciele projecten. De samenwerking is gericht op aannemers, architecten, projectleiders, installatiebedrijven, ventilatiebedrijven en vastgoedpartijen die extra uitvoeringscapaciteit of een gespecialiseerde partner nodig hebben.',
          items: [
            'Leidingtrajecten, aansluitpunten, pantry’s, toiletruimtes en technische ruimtes',
            'Uitvoering volgens tekening, werkomschrijving of locatie-opname',
            'Afstemming met projectplanning, bouwvolgorde en andere disciplines',
            'Controleerbare oplevering met duidelijke terugkoppeling',
          ],
        },
        heating: {
          title: 'Thermische installaties voor commerciele gebouwen',
          body:
            'Wij realiseren verwarmingsleidingen, verdelers, radiatoren, vloerverwarming en technische voorbereidingen voor warmtepompen binnen zakelijke projecten. De uitvoering wordt afgestemd op de planning van het totale project en de technische randvoorwaarden van het gebouw.',
          items: [
            'Verwarmingsleidingen, verdelers, radiatoren en aansluitpunten',
            'Voorbereiding voor vloerverwarming en warmtepompcomponenten',
            'Technische afstemming met installatie- en afbouwpartners',
            'Praktische opleverpunten voor projectleiding of opdrachtgever',
          ],
        },
        climate: {
          title: 'Ventilatie en warmtepompvoorbereiding voor projectteams',
          body:
            'Wij voeren montage, aanpassingen en technische voorbereiding uit rond ventilatie, luchtdoorvoeren, warmtepompcomponenten en energiezuinige installaties. De uitvoering sluit aan op bouwkundige en installatietechnische planning.',
          items: [
            'Ventilatiekanalen, doorvoeren, aansluitpunten en technische zones',
            'Voorbereidend werk voor warmtepompen en energiezuinige systemen',
            'Samenwerking met ventilatiebedrijven, installateurs en bouwteams',
            'Nette uitvoering rond plafonds, schachten en technische ruimtes',
          ],
        },
        drywall: {
          title: 'Gipsplaten en metalstud voor professionele projecten',
          body:
            'Wij leveren en monteren complete gipsplaat- en metalstudconstructies voor zakelijke omgevingen. Wanden, plafonds, schachten en technische sparingen worden afgestemd op installaties, ventilatie, brandwerende eisen waar relevant en de planning van het project.',
          items: [
            'Metalstudwanden, plafonds, voorzetwanden en technische schachten',
            'Sparingen en voorbereiding rond leidingen, ventilatie en aansluitpunten',
            'Strakke montage voor kantoren, horeca, retail en bedrijfsruimten',
            'Projectmatige uitvoering met controle op maatvoering en oplevering',
          ],
        },
      };

      return [
        technicalOffer[service],
        {
          title: 'Samenwerking op professioneel projectniveau',
          body:
            'Zakelijke opdrachtgevers hebben geen behoefte aan losse beloftes, maar aan uitvoerders die meedenken, afspraken nakomen en het project niet vertragen. Daarom werken wij met duidelijke werkafspraken, praktische communicatie en een professionele opleverstructuur.',
          items: [
            'Voor aannemers, architecten, projectontwikkelaars en installatiepartners',
            'Geschikt voor kantoren, horeca, retail, zorglocaties en bedrijfsruimten',
            'Heldere afbakening van werkzaamheden, planning en verantwoordelijkheden',
            'Representatieve uitvoering op locaties waar professionele uitstraling telt',
          ],
        },
      ];
    }

    if (audience === 'maintenance') {
      const maintenanceOffer: Record<AudienceServiceKey, AudienceServiceContent['sections'][number]> = {
        plumbing: {
          title: 'Sanitaire storingen, lekkages en leidingherstel',
          body:
            'Voor gebouwen in gebruik draait sanitair onderhoud om snelle diagnose, schadebeperking en betrouwbare reparatie. Wij herstellen de technische oorzaak en zorgen waar nodig voor praktisch herstel van de omgeving na de ingreep.',
          items: [
            'Lekkages, verstoppingen, afvoeren, kranen, toiletten en aansluitingen',
            'Beoordeling van oorzaak, bereikbaarheid en benodigde herstelstappen',
            'Openbreken en dichtmaken van de werkzone waar dat nodig is',
            'Terugkoppeling voor eigenaar, beheerder of facilitair verantwoordelijke',
          ],
        },
        heating: {
          title: 'Verwarmingsstoringen en warmteherstel',
          body:
            'Voor kantoren, horeca, hotels en beheerde gebouwen herstellen wij verwarmingsproblemen met focus op comfort, veiligheid en minimale verstoring van de locatie. Het doel is dat gebruikers zo snel mogelijk weer normaal verder kunnen.',
          items: [
            'Storingen, lekkages, radiatoren, leidingen en verdelers',
            'Praktische diagnose en herstel van bereikbare technische onderdelen',
            'Afstemming rond gebruikstijden, toegang en urgentie',
            'Advies voor vervolgonderhoud wanneer structurele vervanging nodig is',
          ],
        },
        climate: {
          title: 'Ventilatie, warmtepompcomponenten en klimaatherstel',
          body:
            'Bij onderhoud aan ventilatie en klimaattechniek kijken wij naar werking, bereikbaarheid en praktische herstelmogelijkheden. Wij voeren technische opvolging, kleine aanpassingen en herstel rond installaties uit.',
          items: [
            'Controle en herstel rond ventilatie, luchtdoorvoeren en aansluitpunten',
            'Ondersteuning bij warmtepompcomponenten en warmteverdeling',
            'Afstemming met beheerder, installateur of specialist wanneer nodig',
            'Net herstel van plafonds, schachten of technische zones na uitvoering',
          ],
        },
        drywall: {
          title: 'Herstel van wanden, plafonds en technische zones',
          body:
            'Na lekkage, installatieherstel of technische aanpassing blijft vaak bouwkundig herstel achter. Wij maken wanden, plafonds, schachten en zichtbare zones weer representatief en bruikbaar voor de locatie.',
          items: [
            'Gipsplaten, plafonds, voorzetwanden en technische schachten herstellen',
            'Afwerking na leidingwerk, lekkageherstel of inspectie-openingen',
            'Voorbereiding voor schilderwerk, tegelherstel of verdere afwerking',
            'Nette oplevering voor kantoren, horeca, hotels en winkels',
          ],
        },
      };

      return [
        maintenanceOffer[service],
        {
          title: 'Onderhoud voor locaties die moeten blijven functioneren',
          body:
            'Bij onderhoud gaat het om snelheid, betrouwbaarheid en beperking van overlast. Wij combineren technische reparatie met herstel van de directe werkzone, zodat de ruimte sneller weer veilig, netjes en bruikbaar is.',
          items: [
            'Voor gebouwbeheerders, horeca, hotels, kantoren, winkels en VvE’s',
            'Technische reparatie plus gips-, tegel-, kit- of schilderherstel waar nodig',
            'Interventies per melding of afspraken voor terugkerende samenwerking',
            'Een duidelijk aanspreekpunt voor techniek, planning en opvolging',
          ],
        },
      ];
    }

    const privateOffer: Record<AudienceServiceKey, AudienceServiceContent['sections'][number]> = {
      plumbing: {
        title: 'Sanitair werk voor woningen',
        body:
          'Voor particuliere woningen voeren wij sanitair werk uit met aandacht voor comfort, waterdichtheid en een nette afwerking. De techniek moet betrouwbaar zijn, maar het eindresultaat moet ook passen bij dagelijks gebruik in huis.',
        items: [
          'Badkamers, toiletten, keukenaansluitingen en bijkeukens',
          'Leidingwerk verplaatsen, vervangen of opnieuw aansluiten',
          'Controle op lekkages, afvoer, druk en bereikbaarheid',
          'Herstel van wand, vloer of afwerking waar dit bij het werk hoort',
        ],
      },
      heating: {
        title: 'Verwarming en comfort in bestaande woningen',
        body:
          'Wij voeren verwarmingswerk uit voor woningen waar comfort, nette routing van leidingen en betrouwbare werking belangrijk zijn. De oplossing wordt afgestemd op de bestaande situatie en de manier waarop de woning wordt gebruikt.',
        items: [
          'Radiatoren, verwarmingsleidingen, verdelers en aansluitingen',
          'Aanpassingen bij renovatie, verbouwing of herindeling',
          'Vloerverwarming en voorbereiding op energiezuinige installaties',
          'Nette uitvoering met beperkte overlast in bewoonde woningen',
        ],
      },
      climate: {
        title: 'Ventilatie, vloerverwarming en warmtepompvoorbereiding',
        body:
          'Voor woningen combineren wij comfort en energiezuinigheid met praktische uitvoering. Wij kijken naar warmteverdeling, ventilatie, opbouwhoogte, bereikbaarheid en de aansluiting op bestaande installaties.',
        items: [
          'Vloerverwarming, verdelers en voorbereidende werkzaamheden',
          'Ventilatie-aanpassingen en technische doorvoeren',
          'Voorbereiding voor warmtepompen en energiezuinige systemen',
          'Afstemming met vloer, wand, plafond en afwerking',
        ],
      },
      drywall: {
        title: 'Gipsplaten, wanden en herstelafwerking',
        body:
          'Wij plaatsen en herstellen gipsplaten in woningen waar installatiewerk, lekkageherstel of renovatie bouwkundige afwerking vraagt. De uitvoering wordt netjes voorbereid voor verdere afwerking of directe oplevering.',
        items: [
          'Nieuwe wanden, plafonds, voorzetwanden en technische schachten',
          'Herstel na leidingwerk, lekkage of inspectie-openingen',
          'Voorbereiding voor schilderwerk, tegelwerk of verdere afbouw',
          'Strakke oplevering met aandacht voor de bestaande woning',
        ],
      },
    };

    return [
      privateOffer[service],
      {
        title: 'Heldere uitvoering in en rond de woning',
        body:
          'Een woning is geen bouwplaats die eindeloos open kan blijven. Daarom stemmen wij vooraf af wat technisch nodig is, wat zichtbaar wordt afgewerkt en hoe de uitvoering zo gecontroleerd mogelijk plaatsvindt.',
        items: [
          'Opname van bestaande situatie en duidelijke uitleg van de werkzaamheden',
          'Planning die rekening houdt met bewoning, stof en bereikbaarheid',
          'Controle op werking, lekkages, stevigheid en zichtbare afwerking',
          'Nette oplevering van de werkruimte met praktische terugkoppeling',
        ],
      },
    ];
  }

  if (audience === 'business') {
    const technicalOffer: Record<AudienceServiceKey, AudienceServiceContent['sections'][number]> = {
      plumbing: {
        title: 'B2B installation work for construction and fit-out projects',
        body:
          'We execute pipework, plumbing connections and technical preparations for commercial projects. The cooperation is built for contractors, architects, project managers, installation companies, ventilation companies and property teams that need execution capacity or a specialist partner.',
        items: [
          'Pipe routes, connection points, pantries, toilet areas and technical rooms',
          'Execution based on drawings, work descriptions or site surveys',
          'Coordination with project planning, site sequence and other trades',
          'Checkable handover with clear feedback',
        ],
      },
      heating: {
        title: 'Thermal systems for commercial buildings',
        body:
          'We deliver heating pipework, manifolds, radiators, underfloor heating and technical preparation for heat pumps within business projects. The execution is aligned with the overall project planning and technical conditions of the building.',
        items: [
          'Heating pipework, manifolds, radiators and connection points',
          'Preparation for underfloor heating and heat pump components',
          'Technical coordination with installation and finishing partners',
          'Practical handover points for project management or client',
        ],
      },
      climate: {
        title: 'Ventilation and heat pump preparation for project teams',
        body:
          'We support commercial projects with installation, modifications and technical preparation around ventilation, air penetrations, heat pump components and energy-efficient systems. Execution is aligned with construction and MEP planning.',
        items: [
          'Ventilation ducts, penetrations, connection points and technical zones',
          'Preparation for heat pumps and energy-efficient systems',
          'Cooperation with ventilation companies, installers and construction teams',
          'Clean execution around ceilings, shafts and technical rooms',
        ],
      },
      drywall: {
        title: 'Drywall and metal stud for professional projects',
        body:
          'We supply and install complete drywall and metal stud systems for business environments. Walls, ceilings, shafts and technical openings are coordinated with installations, ventilation, relevant fire requirements and project planning.',
        items: [
          'Metal stud walls, ceilings, partition walls and technical shafts',
          'Openings and preparation around pipework, ventilation and connections',
          'Clean installation for offices, hospitality, retail and commercial spaces',
          'Project-based execution with checks on dimensions and handover',
        ],
      },
    };

    return [
      technicalOffer[service],
      {
        title: 'Professional project cooperation',
        body:
          'Business clients need execution partners who think ahead, keep agreements and do not slow the project down. We work with clear agreements, practical communication and a professional handover structure.',
        items: [
          'For contractors, architects, developers and installation partners',
          'Suitable for offices, hospitality, retail, care locations and commercial spaces',
          'Clear boundaries for work, planning and responsibilities',
          'Representative execution on sites where professional appearance matters',
        ],
      },
    ];
  }

  if (audience === 'maintenance') {
    const maintenanceOffer: Record<AudienceServiceKey, AudienceServiceContent['sections'][number]> = {
      plumbing: {
        title: 'Plumbing faults, leaks and pipework repair',
        body:
          'For occupied buildings, plumbing maintenance is about fast diagnosis, damage control and reliable repair. We repair the technical cause and, where needed, handle practical restoration around the work zone.',
        items: [
          'Leaks, blockages, drains, taps, toilets and connections',
          'Assessment of cause, access and required repair steps',
          'Opening and closing the work zone where needed',
          'Feedback for owner, manager or facility responsible',
        ],
      },
      heating: {
        title: 'Heating faults and restoring comfort',
        body:
          'For offices, hospitality, hotels and managed buildings, we repair heating problems with focus on comfort, safety and minimal disruption to the location. The goal is to get users back to normal quickly.',
        items: [
          'Faults, leaks, radiators, pipework and manifolds',
          'Practical diagnosis and repair of accessible technical components',
          'Coordination around opening hours, access and urgency',
          'Advice for follow-up maintenance where structural replacement is needed',
        ],
      },
      climate: {
        title: 'Ventilation, heat pump components and climate repair',
        body:
          'For ventilation and climate maintenance, we look at function, access and practical repair options. We support managers with technical follow-up, small modifications and repair around installations.',
        items: [
          'Checks and repair around ventilation, air penetrations and connections',
          'Support for heat pump components and heat distribution',
          'Coordination with manager, installer or specialist where needed',
          'Clean repair of ceilings, shafts or technical zones after execution',
        ],
      },
      drywall: {
        title: 'Repair of walls, ceilings and technical zones',
        body:
          'After leaks, installation repair or technical modification, building repair is often still needed. We restore walls, ceilings, shafts and visible zones so the location becomes presentable and usable again.',
        items: [
          'Repair drywall, ceilings, partition walls and technical shafts',
          'Finishing after pipework, leak repair or inspection openings',
          'Preparation for painting, tile repair or further finishing',
          'Clean handover for offices, hospitality, hotels and shops',
        ],
      },
    };

    return [
      maintenanceOffer[service],
      {
        title: 'Maintenance for locations that need to keep operating',
        body:
          'Maintenance is about speed, reliability and limiting disruption. We combine technical repair with restoration of the direct work zone so the space becomes safe, clean and usable again faster.',
        items: [
          'For building managers, hospitality, hotels, offices, shops and owners associations',
          'Technical repair plus drywall, tile, sealant or painting repair where needed',
          'Interventions per request or agreements for recurring cooperation',
          'One clear contact for technical work, planning and follow-up',
        ],
      },
    ];
  }

  const privateOffer: Record<AudienceServiceKey, AudienceServiceContent['sections'][number]> = {
    plumbing: {
      title: 'Plumbing work for homes',
      body:
        'For private homes, we execute plumbing work with attention to comfort, waterproofing and clean finishing. The technical system must be reliable, and the result must fit daily use inside the home.',
      items: [
        'Bathrooms, toilets, kitchen connections and utility spaces',
        'Move, replace or reconnect pipework',
        'Checks on leaks, drainage, pressure and access',
        'Repair of wall, floor or finishing where it belongs to the work',
      ],
    },
    heating: {
      title: 'Heating and comfort in existing homes',
      body:
        'We execute heating work for homes where comfort, clean pipe routing and reliable operation matter. The solution is aligned with the existing situation and how the home is used.',
      items: [
        'Radiators, heating pipework, manifolds and connections',
        'Modifications during renovation, remodeling or layout changes',
        'Underfloor heating and preparation for energy-efficient systems',
        'Clean execution with limited disruption in occupied homes',
      ],
    },
    climate: {
      title: 'Ventilation, underfloor heating and heat pump preparation',
      body:
        'For homes, we combine comfort and energy efficiency with practical execution. We look at heat distribution, ventilation, build-up height, access and connection to existing systems.',
      items: [
        'Underfloor heating, manifolds and preparation work',
        'Ventilation modifications and technical penetrations',
        'Preparation for heat pumps and energy-efficient systems',
        'Coordination with floors, walls, ceilings and finishing',
      ],
    },
    drywall: {
      title: 'Drywall, walls and finishing repair',
      body:
        'We install and repair drywall in homes where installation work, leak repair or renovation requires building finishing. The work is prepared neatly for further finishing or clean handover.',
      items: [
        'New walls, ceilings, partition walls and technical shafts',
        'Repair after pipework, leaks or inspection openings',
        'Preparation for painting, tiling or further finishing',
        'Clean handover with attention to the existing home',
      ],
    },
  };

  return [
    privateOffer[service],
    {
      title: 'Clear execution inside the home',
      body:
        'A home cannot stay open like a construction site. We therefore agree in advance what is technically required, what visible finishing is included and how the work can be carried out in a controlled way.',
      items: [
        'Survey of the existing situation and clear explanation of the work',
        'Planning that considers occupancy, dust and access',
        'Checks on function, leaks, strength and visible finishing',
        'Clean handover of the work zone with practical feedback',
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
        ? `Stuur de locatie, planning, foto's, tekeningen of werkomschrijving. Wij beoordelen de technische uitvoering en koppelen duidelijk terug wat mogelijk is.`
        : `Send the location, planning, photos, drawings or work description. We assess the technical execution and respond clearly with what is possible.`,
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
