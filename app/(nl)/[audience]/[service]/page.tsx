import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AudienceServicePage } from '@/components/AudienceServicePage';
import { BusinessSectorPage } from '@/components/BusinessSectorPage';
import {
  getAudienceServiceContent,
  getAudienceServiceParams,
  resolveAudienceServiceParams,
} from '@/lib/audience-services';
import { getBusinessSectorBySlug, getBusinessSectorParams } from '@/lib/business-sectors';
import { buildMetadata } from '@/lib/seo';
import { audienceSlug } from '@/lib/site';

type Params = Promise<{ audience: string; service: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...getAudienceServiceParams('nl'),
    ...getBusinessSectorParams('nl').map(({ sector }) => ({
      audience: audienceSlug('business', 'nl'),
      service: sector,
    })),
  ];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { audience, service } = await params;
  const resolved = resolveAudienceServiceParams('nl', audience, service);
  if (resolved) {
    const content = getAudienceServiceContent(resolved.audience, resolved.service, 'nl');
    return buildMetadata({
      locale: 'nl',
      title: content.title,
      description: content.description,
      path: content.path,
      altPath: content.altPath,
      image: content.image,
    });
  }

  const sector =
    audience === audienceSlug('business', 'nl') ? getBusinessSectorBySlug('nl', service) : null;
  if (!sector) notFound();

  return buildMetadata({
    locale: 'nl',
    title: sector.title,
    description: sector.description,
    path: sector.path,
    altPath: sector.altPath,
  });
}

export default async function Page({ params }: { params: Params }) {
  const { audience, service } = await params;
  const resolved = resolveAudienceServiceParams('nl', audience, service);
  if (resolved) {
    return (
      <AudienceServicePage
        content={getAudienceServiceContent(resolved.audience, resolved.service, 'nl')}
      />
    );
  }

  const sector =
    audience === audienceSlug('business', 'nl') ? getBusinessSectorBySlug('nl', service) : null;
  if (!sector) notFound();

  return <BusinessSectorPage content={sector} />;
}
