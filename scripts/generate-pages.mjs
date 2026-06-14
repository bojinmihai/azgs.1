#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

// [pageKey, nlPath (relative inside (nl)/), enPath (relative inside (en)/en/), altPathNl, altPathEn]
const PAGES = [
  // pageKey, nlDir, enDir, nlAltPath, enAltPath
  ['home', '', '', '/en', '/'],
  ['services', 'diensten', 'services', '/en/services', '/diensten'],
  ['about', 'over-ons', 'about', '/en/about', '/over-ons'],
  ['emergency', 'spoed', 'emergency', '/en/emergency', '/spoed'],
  ['contact', 'contact', 'contact', '/en/contact', '/contact'],
  ['thankYou', 'bedankt', 'thank-you', '/en/thank-you', '/bedankt'],
  ['drywall', 'gipsplaten', 'drywall', '/en/drywall', '/gipsplaten'],
  ['painting', 'schilderwerk', 'painting', '/en/painting', '/schilderwerk'],
  ['parquet', 'parket', 'parquet', '/en/parquet', '/parket'],
  ['tiling', 'tegelwerk', 'tiling', '/en/tiling', '/tegelwerk'],
  ['plumbing', 'sanitair', 'plumbing', '/en/plumbing', '/sanitair'],
  ['heating', 'verwarming', 'heating', '/en/heating', '/verwarming'],
  [
    'underfloorHeating',
    'vloerverwarming',
    'underfloor-heating',
    '/en/underfloor-heating',
    '/vloerverwarming',
  ],
  ['electrical', 'elektra', 'electrical', '/en/electrical', '/elektra'],
  ['privacy', 'privacybeleid', 'privacy-policy', '/en/privacy-policy', '/privacybeleid'],
  ['cookies', 'cookiebeleid', 'cookie-policy', '/en/cookie-policy', '/cookiebeleid'],
  [
    'terms',
    'algemene-voorwaarden',
    'terms-and-conditions',
    '/en/terms-and-conditions',
    '/algemene-voorwaarden',
  ],
];

const NL_PATH_BY_KEY = {
  home: '/',
  services: '/diensten',
  about: '/over-ons',
  emergency: '/spoed',
  contact: '/contact',
  thankYou: '/bedankt',
  drywall: '/gipsplaten',
  painting: '/schilderwerk',
  parquet: '/parket',
  tiling: '/tegelwerk',
  plumbing: '/sanitair',
  heating: '/verwarming',
  underfloorHeating: '/vloerverwarming',
  electrical: '/elektra',
  privacy: '/privacybeleid',
  cookies: '/cookiebeleid',
  terms: '/algemene-voorwaarden',
};

const EN_PATH_BY_KEY = {
  home: '/en',
  services: '/en/services',
  about: '/en/about',
  emergency: '/en/emergency',
  contact: '/en/contact',
  thankYou: '/en/thank-you',
  drywall: '/en/drywall',
  painting: '/en/painting',
  parquet: '/en/parquet',
  tiling: '/en/tiling',
  plumbing: '/en/plumbing',
  heating: '/en/heating',
  underfloorHeating: '/en/underfloor-heating',
  electrical: '/en/electrical',
  privacy: '/en/privacy-policy',
  cookies: '/en/cookie-policy',
  terms: '/en/terms-and-conditions',
};

const APP_DIR = path.join(process.cwd(), 'app');

function tsx(pageKey, locale, currentPath, altPath) {
  return `import type { Metadata } from 'next';
import { LegacyPage } from '@/components/LegacyPage';
import { buildMetadata } from '@/lib/seo';
import { getPageMeta } from '@/lib/pages';

const LOCALE = '${locale}';
const KEY = '${pageKey}';
const PATH = '${currentPath}';
const ALT_PATH = '${altPath}';

export function generateMetadata(): Metadata {
  const m = getPageMeta(KEY, LOCALE);
  return buildMetadata({
    locale: LOCALE,
    title: m.title,
    description: m.description,
    path: PATH,
    altPath: ALT_PATH,
  });
}

export default function Page() {
  return <LegacyPage pageKey={KEY} locale={LOCALE} altPath={ALT_PATH} />;
}
`;
}

for (const [pageKey, nlDir, enDir, nlAlt, enAlt] of PAGES) {
  // NL
  const nlOutDir = path.join(APP_DIR, '(nl)', nlDir);
  fs.mkdirSync(nlOutDir, { recursive: true });
  const nlPath = NL_PATH_BY_KEY[pageKey];
  fs.writeFileSync(
    path.join(nlOutDir, 'page.tsx'),
    tsx(pageKey, 'nl', nlPath, nlAlt)
  );

  // EN
  const enOutDir = path.join(APP_DIR, '(en)', 'en', enDir);
  fs.mkdirSync(enOutDir, { recursive: true });
  const enPath = EN_PATH_BY_KEY[pageKey];
  fs.writeFileSync(
    path.join(enOutDir, 'page.tsx'),
    tsx(pageKey, 'en', enPath, enAlt)
  );

  console.log(`Wrote ${pageKey}: ${nlPath} & ${enPath}`);
}
