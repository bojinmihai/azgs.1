import type { Metadata } from 'next';
import { LegacyPage } from '@/components/LegacyPage';
import { buildMetadata } from '@/lib/seo';

const LOCALE = 'en';
const KEY = 'tiling';
const PATH = '/en/private/tiling';
const ALT_PATH = '/particulier/tegelwerk';

export function generateMetadata(): Metadata {
  return buildMetadata({
    locale: LOCALE,
    title: 'Tiling for private bathrooms and homes Utrecht Region | AZGS',
    description:
      'Tiling for private homes: bathroom, toilet, kitchen and repair after installation work. Clean execution in the Utrecht region.',
    path: PATH,
    altPath: ALT_PATH,
  });
}

export default function Page() {
  return <LegacyPage pageKey={KEY} locale={LOCALE} altPath={ALT_PATH} audience="private" />;
}
