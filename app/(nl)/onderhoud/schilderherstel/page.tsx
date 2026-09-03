import type { Metadata } from 'next';
import { MaintenanceRepairPage } from '@/components/MaintenanceRepairPage';
import { buildMetadata } from '@/lib/seo';

const LOCALE = 'nl';
const PATH = '/onderhoud/schilderherstel';
const ALT_PATH = '/en/maintenance/painting-repair';

export function generateMetadata(): Metadata {
  return buildMetadata({
    locale: LOCALE,
    title: 'Schilder- en afwerkherstel vanuit Woerden | AZGS',
    description:
      'Schilder- en afwerkherstel na technische reparatie binnen maximaal 50 km of circa 1 uur reistijd vanaf Woerden. Werkgebiedscriterium, geen SLA.',
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
