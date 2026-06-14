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
    '@type': 'LocalBusiness',
    name: COMPANY.name,
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
    areaServed: { '@type': 'Country', name: 'Netherlands' },
    slogan: 'Rust, warmte en comfort in uw woning',
    description:
      'Afwerking en installatiewerk voor woningen in Nederland: schilderwerk, gipsplaten, parket, tegelwerk, sanitair, verwarming, vloerverwarming en elektra. 24/7 spoedservice.',
    inLanguage: ['nl-NL', 'en'],
  };
}
