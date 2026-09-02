import type { Metadata } from 'next';
import { LegacyPage } from '@/components/LegacyPage';
import { buildMetadata } from '@/lib/seo';
import { getPageMeta } from '@/lib/pages';

const LOCALE = 'nl';
const KEY = 'thankYou';
const PATH = '/bedankt';
const ALT_PATH = '/en/thank-you';

export function generateMetadata(): Metadata {
  const m = getPageMeta(KEY, LOCALE);
  return {
    ...buildMetadata({
      locale: LOCALE,
      title: m.title,
      description: m.description,
      path: PATH,
      altPath: ALT_PATH,
    }),
    robots: { index: false, follow: false },
  };
}

export default function Page() {
  return <LegacyPage pageKey={KEY} locale={LOCALE} altPath={ALT_PATH} />;
}
