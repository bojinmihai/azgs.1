import type { Metadata } from 'next';
import { LegacyPage } from '@/components/LegacyPage';
import { buildMetadata } from '@/lib/seo';

const LOCALE = 'nl';
const KEY = 'tiling';
const PATH = '/particulier/tegelwerk';
const ALT_PATH = '/en/private/tiling';

export function generateMetadata(): Metadata {
  return buildMetadata({
    locale: LOCALE,
    title: 'Tegelwerk voor particuliere badkamers en woningen regio Utrecht | AZGS',
    description:
      'Tegelwerk voor particuliere woningen: badkamer, toilet, keuken en herstel na installatiewerk. Nette uitvoering in regio Utrecht.',
    path: PATH,
    altPath: ALT_PATH,
  });
}

export default function Page() {
  return <LegacyPage pageKey={KEY} locale={LOCALE} altPath={ALT_PATH} audience="private" />;
}
