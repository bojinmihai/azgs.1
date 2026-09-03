import type { Metadata } from 'next';
import { SiteShell } from '@/components/SiteShell';
import { BlogIndex } from '@/components/BlogIndex';
import { buildMetadata } from '@/lib/seo';

export function generateMetadata(): Metadata {
  return buildMetadata({
    locale: 'en',
    title: 'Installation and renovation blog | AZ Grand Solutions',
    description:
      'Practical guidance on home installations, renovation and maintenance, with tips to help you prepare your project.',
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
