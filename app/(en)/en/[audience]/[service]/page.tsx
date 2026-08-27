import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AudienceServicePage } from '@/components/AudienceServicePage';
import {
  getAudienceServiceContent,
  getAudienceServiceParams,
  resolveAudienceServiceParams,
} from '@/lib/audience-services';
import { buildMetadata } from '@/lib/seo';

type Params = Promise<{ audience: string; service: string }>;

export function generateStaticParams() {
  return getAudienceServiceParams('en');
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { audience, service } = await params;
  const resolved = resolveAudienceServiceParams('en', audience, service);
  if (!resolved) notFound();

  const content = getAudienceServiceContent(resolved.audience, resolved.service, 'en');
  return buildMetadata({
    locale: 'en',
    title: content.title,
    description: content.description,
    path: content.path,
    altPath: content.altPath,
    image: content.image,
  });
}

export default async function Page({ params }: { params: Params }) {
  const { audience, service } = await params;
  const resolved = resolveAudienceServiceParams('en', audience, service);
  if (!resolved) notFound();

  return (
    <AudienceServicePage
      content={getAudienceServiceContent(resolved.audience, resolved.service, 'en')}
    />
  );
}
