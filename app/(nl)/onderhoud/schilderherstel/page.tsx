import type { Metadata } from 'next';
import { LegacyPage } from '@/components/LegacyPage';
import { buildMetadata } from '@/lib/seo';

const LOCALE = 'nl';
const KEY = 'painting';
const PATH = '/onderhoud/schilderherstel';
const ALT_PATH = '/en/maintenance/painting-repair';

export function generateMetadata(): Metadata {
  return buildMetadata({
    locale: LOCALE,
    title: 'Schilder- en afwerkherstel na technische reparatie regio Utrecht | AZGS',
    description:
      'Schilderwerk, wandherstel en afwerking na lekkage, leidingwerk of technische reparatie voor horeca, hotels, kantoren, winkels en beheerde gebouwen.',
    path: PATH,
    altPath: ALT_PATH,
  });
}

export default function Page() {
  return <LegacyPage pageKey={KEY} locale={LOCALE} altPath={ALT_PATH} audience="maintenance" />;
}
