import type { Metadata } from 'next';
import { HowWeWorkPage } from '@/components/HowWeWorkPage';
import { getPageMeta } from '@/lib/pages';
import { buildMetadata } from '@/lib/seo';
import { url } from '@/lib/site';

const LOCALE = 'nl';

export function generateMetadata(): Metadata {
  const meta = getPageMeta('howWeWork', LOCALE);
  return buildMetadata({
    locale: LOCALE,
    title: meta.title,
    description: meta.description,
    path: url('howWeWork', LOCALE),
    altPath: url('howWeWork', 'en'),
  });
}

export default function Page() {
  return <HowWeWorkPage locale={LOCALE} />;
}
