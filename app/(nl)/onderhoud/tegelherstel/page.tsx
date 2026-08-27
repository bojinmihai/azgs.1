import type { Metadata } from 'next';
import { LegacyPage } from '@/components/LegacyPage';
import { buildMetadata } from '@/lib/seo';

const LOCALE = 'nl';
const KEY = 'tiling';
const PATH = '/onderhoud/tegelherstel';
const ALT_PATH = '/en/maintenance/tile-repair';

export function generateMetadata(): Metadata {
  return buildMetadata({
    locale: LOCALE,
    title: 'Tegel- en wandherstel na technische reparatie regio Utrecht | AZGS',
    description:
      'Tegelwerk, wandherstel en afwerking na lekkage, leidingwerk of technische reparatie voor horeca, hotels, kantoren, winkels en beheerde gebouwen.',
    path: PATH,
    altPath: ALT_PATH,
  });
}

export default function Page() {
  return <LegacyPage pageKey={KEY} locale={LOCALE} altPath={ALT_PATH} audience="maintenance" />;
}
