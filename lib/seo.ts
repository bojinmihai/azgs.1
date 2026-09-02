import type { Metadata } from 'next';
import { COMPANY, SITE_URL, type Locale } from './site';

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

  return {
    title,
    description,
    keywords: [
      'AZ Grand Solutions',
      'installatiebedrijf Woerden',
      'loodgieter Woerden',
      'verwarming installateur Utrecht',
      'ventilatie onderhoud Utrecht',
      'warmtepomp voorbereiding',
      'gipsplaten bedrijf Utrecht',
      'gebouw onderhoud Utrecht',
      'vloerverwarming Woerden',
      'regio Utrecht',
    ],
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
          width: 1920,
          height: 1080,
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
    '@type': ['HomeAndConstructionBusiness', 'Electrician', 'Plumber'],
    '@id': `${SITE_URL}/#business`,
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    alternateName: [COMPANY.tradeName, COMPANY.shortName],
    url: SITE_URL,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    image: `${SITE_URL}/assets/img/logo/logo-primary.svg`,
    logo: `${SITE_URL}/assets/img/logo/logo-primary.svg`,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.address.street,
      postalCode: COMPANY.address.postalCode,
      addressLocality: COMPANY.address.city,
      addressCountry: COMPANY.address.country,
    },
    areaServed: [
      { '@type': 'City', name: 'Woerden' },
      { '@type': 'City', name: 'Utrecht' },
      { '@type': 'City', name: 'De Meern' },
      { '@type': 'City', name: 'Maarssen' },
      { '@type': 'City', name: 'Nieuwegein' },
      { '@type': 'City', name: 'Houten' },
      { '@type': 'City', name: 'Zeist' },
      { '@type': 'City', name: 'Gouda' },
      { '@type': 'AdministrativeArea', name: 'Regio Utrecht' },
      { '@type': 'Country', name: 'Netherlands' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    availableService: (isNl
      ? ['Gipsplaten plaatsen', 'Sanitair installeren', 'Verwarming aanleggen', 'Ventilatieondersteuning', 'Warmtepompvoorbereiding', 'Vloerverwarming aanleggen', 'Gebouwonderhoud', 'Herstelafwerking na installatiewerk', '24/7 spoedservice']
      : ['Drywall installation', 'Plumbing installation', 'Heating installation', 'Ventilation support', 'Heat-pump preparation', 'Underfloor heating installation', 'Building maintenance', 'Finishing repair after installation work', '24/7 emergency service']
    ).map((name) => ({ '@type': 'Service', name })),
    slogan: isNl
      ? 'Installaties, gipsplaten en onderhoud met één aanspreekpunt'
      : 'Installations, drywall and maintenance with one point of contact',
    description: isNl
      ? 'Technische installaties, gipsplaten en onderhoud voor woningen, bedrijven en gebouwbeheerders in regio Utrecht: sanitair, verwarming, ventilatie, warmtepompen, vloerverwarming en herstelafwerking na reparatie.'
      : 'Technical installations, drywall and building maintenance for homes, businesses and property managers in the Utrecht region, including plumbing, heating, ventilation, heat pumps and underfloor heating.',
    inLanguage: isNl ? 'nl-NL' : 'en',
  };
}

type ServiceJsonLdArgs = {
  locale: Locale;
  name: string;
  description: string;
  path: string;
};

export function serviceJsonLd({ locale, name, description, path }: ServiceJsonLdArgs) {
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
      name: COMPANY.name,
      legalName: COMPANY.legalName,
      telephone: COMPANY.phone,
      url: SITE_URL,
    },
    areaServed: [
      { '@type': 'City', name: 'Woerden' },
      { '@type': 'City', name: 'Utrecht' },
      { '@type': 'AdministrativeArea', name: 'Regio Utrecht' },
    ],
    inLanguage: locale === 'nl' ? 'nl-NL' : 'en',
  };
}
