import type { Metadata } from 'next';
import { AudienceLanding } from '@/components/AudienceLanding';
import { buildMetadata } from '@/lib/seo';
import { getPageMeta } from '@/lib/pages';

const LOCALE = 'en';
const KEY = 'home';
const PATH = '/en';
const ALT_PATH = '/';

export function generateMetadata(): Metadata {
  const m = getPageMeta(KEY, LOCALE);
  return buildMetadata({
    locale: LOCALE,
    title: m.title,
    description: m.description,
    path: PATH,
    altPath: ALT_PATH,
  });
}

export default function Page() {
  return <AudienceLanding locale={LOCALE} altPath={ALT_PATH} />;
}
