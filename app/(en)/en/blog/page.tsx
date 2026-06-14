import type { Metadata } from 'next';
import { SiteShell } from '@/components/SiteShell';
import { BlogIndex } from '@/components/BlogIndex';
import { buildMetadata } from '@/lib/seo';

export function generateMetadata(): Metadata {
  return buildMetadata({
    locale: 'en',
    title: 'Blog | AZ Grand Solutions',
    description:
      'Practical guides and tips on finishing, installations, and maintenance for your home. Written by AZ Grand Solutions.',
    path: '/en/blog',
    altPath: '/blog',
  });
}

export default function Page() {
  return (
    <SiteShell locale="en" altPath="/blog">
      <BlogIndex locale="en" />
    </SiteShell>
  );
}
