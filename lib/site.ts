export const SITE_URL = 'https://azgs.nl';

export const COMPANY = {
  name: 'AZ Grand Solutions',
  shortName: 'AZGS',
  phone: '+31613636925',
  phoneDisplay: '+31 6 13636925',
  whatsapp: '31613636925',
  kvk: '42064891',
  email: 'info@azgs.nl',
  emailRequest: 'aanvragen@azgs.nl',
  address: {
    street: 'Alpenstraat 12',
    postalCode: '3446 DN',
    city: 'Woerden',
    country: 'NL',
  },
  ga4: 'G-DK6FZHQRCB',
  formspree: 'https://formspree.io/f/xjgjryzn',
};

export type Locale = 'nl' | 'en';
export type AudienceScope = 'general' | 'private' | 'business' | 'maintenance';

export const LOCALES: Locale[] = ['nl', 'en'];

export const SLUGS = {
  home: { nl: '/', en: '/en' },
  private: { nl: '/particulier', en: '/en/private' },
  business: { nl: '/zakelijk', en: '/en/business' },
  maintenance: { nl: '/onderhoud', en: '/en/maintenance' },
  services: { nl: '/diensten', en: '/en/services' },
  about: { nl: '/over-ons', en: '/en/about' },
  emergency: { nl: '/spoed', en: '/en/emergency' },
  contact: { nl: '/contact', en: '/en/contact' },
  blog: { nl: '/blog', en: '/en/blog' },
  drywall: { nl: '/gipsplaten', en: '/en/drywall' },
  painting: { nl: '/schilderwerk', en: '/en/painting' },
  parquet: { nl: '/parket', en: '/en/parquet' },
  tiling: { nl: '/tegelwerk', en: '/en/tiling' },
  plumbing: { nl: '/sanitair', en: '/en/plumbing' },
  heating: { nl: '/verwarming', en: '/en/heating' },
  underfloorHeating: { nl: '/vloerverwarming', en: '/en/underfloor-heating' },
  electrical: { nl: '/elektra', en: '/en/electrical' },
  privacy: { nl: '/privacybeleid', en: '/en/privacy-policy' },
  cookies: { nl: '/cookiebeleid', en: '/en/cookie-policy' },
  terms: { nl: '/algemene-voorwaarden', en: '/en/terms-and-conditions' },
  thankYou: { nl: '/bedankt', en: '/en/thank-you' },
} as const;

export type RouteKey = keyof typeof SLUGS;

export function url(key: RouteKey, locale: Locale): string {
  return SLUGS[key][locale];
}

export function audienceForPageKey(pageKey: string): AudienceScope {
  if (pageKey === 'private') return 'private';
  if (pageKey === 'business') return 'business';
  if (pageKey === 'maintenance') return 'maintenance';
  return 'general';
}
