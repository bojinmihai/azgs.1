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
      'klusbedrijf Woerden',
      'afwerkingsbedrijf Woerden',
      'installatiebedrijf Woerden',
      'vloerverwarming Woerden',
      'schilderwerk Woerden',
      'tegelwerk Woerden',
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

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['HomeAndConstructionBusiness', 'Electrician', 'Plumber'],
    name: COMPANY.name,
    legalName: COMPANY.name,
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
    availableService: [
      { '@type': 'Service', name: 'Gipsplaten plaatsen' },
      { '@type': 'Service', name: 'Schilderwerk binnen' },
      { '@type': 'Service', name: 'Parket leggen' },
      { '@type': 'Service', name: 'Tegelwerk' },
      { '@type': 'Service', name: 'Sanitair installeren' },
      { '@type': 'Service', name: 'Verwarming aanleggen' },
      { '@type': 'Service', name: 'Vloerverwarming aanleggen' },
      { '@type': 'Service', name: 'Elektrawerkzaamheden' },
      { '@type': 'Service', name: '24/7 spoedservice' },
    ],
    slogan: 'Rust, warmte en comfort in uw woning',
    description:
      'Afwerking en installatiewerk voor woningen in Nederland: schilderwerk, gipsplaten, parket, tegelwerk, sanitair, verwarming, vloerverwarming en elektra. 24/7 spoedservice.',
    inLanguage: ['nl-NL', 'en'],
  };
}
