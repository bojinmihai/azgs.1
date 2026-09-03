import type { Metadata } from 'next';
import { SiteShell } from '@/components/SiteShell';
import { BlogIndex } from '@/components/BlogIndex';
import { buildMetadata } from '@/lib/seo';

export function generateMetadata(): Metadata {
  return buildMetadata({
    locale: 'nl',
    title: 'Installatie- en renovatieblog | AZ Grand Solutions',
    description:
      'Praktische uitleg over technische installaties, renovatie en onderhoud in huis, met tips om uw project beter voor te bereiden.',
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
