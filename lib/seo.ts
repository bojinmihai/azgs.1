import type { Metadata } from 'next';
import { COMPANY, SITE_URL, type AudienceScope, type Locale } from './site';

type SeoArgs = {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  altPath: string;
  image?: string;
};

export function buildMetadata({
  locale,
  title,
  description,
  path,
  altPath,
  image = '/assets/img/hero/home-hero-azgs.webp',
}: SeoArgs): Metadata {
  const canonical = `${SITE_URL}${path}`;
  const nlPath = locale === 'nl' ? path : altPath;
  const enPath = locale === 'en' ? path : altPath;
  const isDefaultSocialImage = image === '/assets/img/hero/home-hero-azgs.webp';

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical,
      languages: {
        nl: `${SITE_URL}${nlPath}`,
        en: `${SITE_URL}${enPath}`,
        'x-default': `${SITE_URL}${nlPath}`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: COMPANY.name,
      url: canonical,
      title,
      description,
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
      alternateLocale: locale === 'nl' ? 'en_US' : 'nl_NL',
      images: [
        {
          url: image,
          ...(isDefaultSocialImage ? { width: 1920, height: 1080 } : {}),
          alt: COMPANY.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    },
    other: {
      'theme-color': '#1E3A5F',
    },
  };
}

export function localBusinessJsonLd(locale: Locale) {
  const isNl = locale === 'nl';
  return {
    '@context': 'https://schema.org',
    '@type': ['HomeAndConstructionBusiness', 'Plumber'],
    '@id': `${SITE_URL}/#business`,
    name: COMPANY.tradeName,
    legalName: COMPANY.legalName,
    alternateName: [COMPANY.name, COMPANY.shortName],
    identifier: [
      { '@type': 'PropertyValue', propertyID: 'KVK', value: COMPANY.kvk },
      { '@type': 'PropertyValue', propertyID: 'Vestigingsnummer', value: COMPANY.establishmentNumber },
    ],
    url: SITE_URL,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    image: `${SITE_URL}/assets/img/logo/logo-primary.svg`,
    logo: `${SITE_URL}/assets/img/logo/logo-primary.svg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.address.street,
      postalCode: COMPANY.address.postalCode,
      addressLocality: COMPANY.address.city,
      addressCountry: COMPANY.address.country,
    },
    // Woerden is the common denominator. Broader B2B project areas and the
    // separate maintenance/urgent-request limits belong to service schemas.
    areaServed: [{ '@type': 'City', name: 'Woerden' }],
    slogan: isNl
      ? 'Technische uitvoering met een duidelijk afgesproken scope'
      : 'Technical execution with a clearly agreed scope',
    description: isNl
      ? 'Sanitaire, thermische en ventilatie-installaties voor particuliere en zakelijke projecten. Gipsplaat- en herstelwerk is beperkt tot particuliere en onderhoudsopdrachten. Werkgebieden verschillen per type aanvraag en worden vanuit Woerden beoordeeld.'
      : 'Plumbing, thermal and ventilation systems for private and business projects. Drywall and finishing repair is limited to private and maintenance assignments. Service areas differ by request type and are assessed from Woerden.',
  };
}

type ServiceJsonLdArgs = {
  locale: Locale;
  name: string;
  description: string;
  path: string;
  audience?: AudienceScope;
};

function serviceArea(locale: Locale, audience: AudienceScope = 'general') {
  if (audience === 'business') {
    return ['Woerden', 'Breda', 'Tilburg', 'Eindhoven', 'Purmerend', 'Beverwijk', 'Den Haag', 'Rotterdam', 'Leiden', 'Lelystad', 'Zwolle'].map(
      (name) => ({ '@type': 'City', name })
    );
  }

  if (audience === 'maintenance') {
    return [
      { '@type': 'City', name: 'Woerden' },
      {
        '@type': 'Place',
        name:
          locale === 'nl'
            ? 'Werkgebied gebouwonderhoud: maximaal 50 km of circa 1 uur reistijd vanaf Woerden'
            : "Building-maintenance area: up to 50 km or about 1 hour's travel from Woerden",
      },
    ];
  }

  if (audience === 'private') {
    return [
      { '@type': 'City', name: 'Woerden' },
      { '@type': 'City', name: 'Utrecht' },
      { '@type': 'AdministrativeArea', name: 'Regio Utrecht' },
    ];
  }

  return [{ '@type': 'City', name: 'Woerden' }];
}

export function serviceJsonLd({ locale, name, description, path, audience = 'general' }: ServiceJsonLdArgs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}${path}#service`,
    name,
    serviceType: name,
    description,
    url: `${SITE_URL}${path}`,
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      '@id': `${SITE_URL}/#business`,
      name: COMPANY.tradeName,
      legalName: COMPANY.legalName,
      telephone: COMPANY.phone,
      url: SITE_URL,
    },
    areaServed: serviceArea(locale, audience),
    inLanguage: locale === 'nl' ? 'nl-NL' : 'en',
  };
}
