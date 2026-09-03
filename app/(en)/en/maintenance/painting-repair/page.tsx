import type { Metadata } from 'next';
import { MaintenanceRepairPage } from '@/components/MaintenanceRepairPage';
import { buildMetadata } from '@/lib/seo';

const LOCALE = 'en';
const PATH = '/en/maintenance/painting-repair';
const ALT_PATH = '/onderhoud/schilderherstel';

export function generateMetadata(): Metadata {
  return buildMetadata({
    locale: LOCALE,
    title: 'Painting and finishing repair from Woerden | AZGS',
    description:
      "Painting and finishing repair after technical work within a maximum of 50 km or about 1 hour's travel from Woerden. This is an area criterion, not an SLA.",
    path: PATH,
    altPath: ALT_PATH,
  });
}

export default function Page() {
  return (
    <MaintenanceRepairPage
      locale={LOCALE}
      repairType="painting"
      path={PATH}
      altPath={ALT_PATH}
    />
  );
}
