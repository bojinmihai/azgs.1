import type { Metadata } from 'next';
import { LegacyPage } from '@/components/LegacyPage';
import { buildMetadata } from '@/lib/seo';
import { getPageMeta } from '@/lib/pages';

const LOCALE = 'nl';
const KEY = 'home';
const CANONICAL_PATH = '/';
const ALT_PATH = '/en';

export function generateMetadata(): Metadata {
  const meta = getPageMeta(KEY, LOCALE);
  return buildMetadata({
    locale: LOCALE,
    title: meta.title,
    description: meta.description,
    path: CANONICAL_PATH,
    altPath: ALT_PATH,
  });
}

export default function Page() {
  return <LegacyPage pageKey={KEY} locale={LOCALE} altPath={ALT_PATH} />;
}
