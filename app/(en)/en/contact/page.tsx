import type { Metadata } from 'next';
import { ContactPage } from '@/components/ContactPage';
import { buildMetadata } from '@/lib/seo';
import { getPageMeta } from '@/lib/pages';

const LOCALE = 'en';
const KEY = 'contact';
const PATH = '/en/contact';
const ALT_PATH = '/contact';

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
  return <ContactPage locale={LOCALE} altPath={ALT_PATH} />;
}
