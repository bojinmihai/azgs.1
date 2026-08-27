import type { Metadata } from 'next';
import { LegacyPage } from '@/components/LegacyPage';
import { buildMetadata } from '@/lib/seo';

const LOCALE = 'en';
const KEY = 'painting';
const PATH = '/en/maintenance/painting-repair';
const ALT_PATH = '/onderhoud/schilderherstel';

export function generateMetadata(): Metadata {
  return buildMetadata({
    locale: LOCALE,
    title: 'Painting and finishing repair after technical work Utrecht Region | AZGS',
    description:
      'Painting, wall repair and finishing after leaks, pipework or technical repair for hospitality, hotels, offices, shops and managed buildings.',
    path: PATH,
    altPath: ALT_PATH,
  });
}

export default function Page() {
  return <LegacyPage pageKey={KEY} locale={LOCALE} altPath={ALT_PATH} audience="maintenance" />;
}
