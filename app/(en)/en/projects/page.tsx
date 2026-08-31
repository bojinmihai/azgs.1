import type { Metadata } from 'next';
import { LegacyPage } from '@/components/LegacyPage';
import { buildMetadata } from '@/lib/seo';

export function generateMetadata(): Metadata {
  return {
    ...buildMetadata({
      locale: 'en',
      title: 'Projects in preparation | AZ Grand Solutions',
      description: 'AZ Grand Solutions project page for future case studies covering installations, renovations, and technical repairs.',
      path: '/en/projects',
      altPath: '/projecten',
    }),
    robots: { index: false, follow: false, nocache: true },
  };
}

export default function Page() {
  return <LegacyPage pageKey="projects" locale="en" altPath="/projecten" />;
}
