import type { Metadata } from 'next';
import { LegacyPage } from '@/components/LegacyPage';
import { buildMetadata } from '@/lib/seo';

const LOCALE = 'en';
const KEY = 'painting';
const PATH = '/en/private/painting';
const ALT_PATH = '/particulier/schilderwerk';

export function generateMetadata(): Metadata {
  return buildMetadata({
    locale: LOCALE,
    title: 'Painting and finishing repair for homes Utrecht Region | AZGS',
    description:
      'Painting, wall repair and finishing for private homes, renovation and repair after technical work in the Utrecht region.',
    path: PATH,
    altPath: ALT_PATH,
  });
}

export default function Page() {
  return <LegacyPage pageKey={KEY} locale={LOCALE} altPath={ALT_PATH} audience="private" />;
}
