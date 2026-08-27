import type { Metadata } from 'next';
import { LegacyPage } from '@/components/LegacyPage';
import { buildMetadata } from '@/lib/seo';

const LOCALE = 'nl';
const KEY = 'painting';
const PATH = '/particulier/schilderwerk';
const ALT_PATH = '/en/private/painting';

export function generateMetadata(): Metadata {
  return buildMetadata({
    locale: LOCALE,
    title: 'Schilderwerk en herstelafwerking voor woningen regio Utrecht | AZGS',
    description:
      'Schilderwerk, wandherstel en afwerking voor particuliere woningen, renovatie en herstel na technische werkzaamheden in regio Utrecht.',
    path: PATH,
    altPath: ALT_PATH,
  });
}

export default function Page() {
  return <LegacyPage pageKey={KEY} locale={LOCALE} altPath={ALT_PATH} audience="private" />;
}
