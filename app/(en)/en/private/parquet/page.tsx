import type { Metadata } from 'next';
import { LegacyPage } from '@/components/LegacyPage';
import { buildMetadata } from '@/lib/seo';

const LOCALE = 'en';
const KEY = 'parquet';
const PATH = '/en/private/parquet';
const ALT_PATH = '/particulier/parket';

export function generateMetadata(): Metadata {
  return buildMetadata({
    locale: LOCALE,
    title: 'Parquet and floor finishing for homes Utrecht Region | AZGS',
    description:
      'Parquet installation and floor finishing for private homes in the Utrecht region, as part of renovation, repair or home finishing.',
    path: PATH,
    altPath: ALT_PATH,
  });
}

export default function Page() {
  return <LegacyPage pageKey={KEY} locale={LOCALE} altPath={ALT_PATH} audience="private" />;
}
