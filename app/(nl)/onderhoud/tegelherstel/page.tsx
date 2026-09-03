import type { Metadata } from 'next';
import { MaintenanceRepairPage } from '@/components/MaintenanceRepairPage';
import { buildMetadata } from '@/lib/seo';

const LOCALE = 'nl';
const PATH = '/onderhoud/tegelherstel';
const ALT_PATH = '/en/maintenance/tile-repair';

export function generateMetadata(): Metadata {
  return buildMetadata({
    locale: LOCALE,
    title: 'Tegel- en wandherstel vanuit Woerden | AZGS',
    description:
      'Tegel- en wandherstel na technische reparatie binnen maximaal 50 km of circa 1 uur reistijd vanaf Woerden. Werkgebiedscriterium, geen SLA.',
    path: PATH,
    altPath: ALT_PATH,
  });
}

export default function Page() {
  return (
    <MaintenanceRepairPage
      locale={LOCALE}
      repairType="tiling"
      path={PATH}
      altPath={ALT_PATH}
    />
  );
}
