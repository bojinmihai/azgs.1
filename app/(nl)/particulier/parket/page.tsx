import type { Metadata } from 'next';
import { LegacyPage } from '@/components/LegacyPage';
import { buildMetadata } from '@/lib/seo';

const LOCALE = 'nl';
const KEY = 'parquet';
const PATH = '/particulier/parket';
const ALT_PATH = '/en/private/parquet';

export function generateMetadata(): Metadata {
  return buildMetadata({
    locale: LOCALE,
    title: 'Parket en vloerafwerking voor woningen regio Utrecht | AZGS',
    description:
      'Parket leggen en vloerafwerking voor particuliere woningen in regio Utrecht, als onderdeel van renovatie, herstel of woningafwerking.',
    path: PATH,
    altPath: ALT_PATH,
  });
}

export default function Page() {
  return <LegacyPage pageKey={KEY} locale={LOCALE} altPath={ALT_PATH} audience="private" />;
}
