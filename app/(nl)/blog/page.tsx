import type { Metadata } from 'next';
import { SiteShell } from '@/components/SiteShell';
import { BlogIndex } from '@/components/BlogIndex';
import { buildMetadata } from '@/lib/seo';

export function generateMetadata(): Metadata {
  return buildMetadata({
    locale: 'nl',
    title: 'Blog | AZ Grand Solutions',
    description:
      'Praktische gidsen en tips over afwerking, installaties en onderhoud van uw woning. Geschreven door AZ Grand Solutions.',
    path: '/blog',
    altPath: '/en/blog',
  });
}

export default function Page() {
  return (
    <SiteShell locale="nl" altPath="/en/blog">
      <BlogIndex locale="nl" />
    </SiteShell>
  );
}
