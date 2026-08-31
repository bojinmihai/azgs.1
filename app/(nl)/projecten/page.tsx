import type { Metadata } from 'next';
import { LegacyPage } from '@/components/LegacyPage';
import { buildMetadata } from '@/lib/seo';

export function generateMetadata(): Metadata {
  return {
    ...buildMetadata({
      locale: 'nl',
      title: 'Projecten in voorbereiding | AZ Grand Solutions',
      description: 'Projectpagina van AZ Grand Solutions met toekomstige praktijkvoorbeelden van installaties, renovaties en technisch herstel.',
      path: '/projecten',
      altPath: '/en/projects',
    }),
    robots: { index: false, follow: false, nocache: true },
  };
}

export default function Page() {
  return <LegacyPage pageKey="projects" locale="nl" altPath="/en/projects" />;
}
