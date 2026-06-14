import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteShell } from '@/components/SiteShell';
import { BlogPostView } from '@/components/BlogPostView';
import { buildMetadata } from '@/lib/seo';
import { getAllSlugs, getPostBySlug, getAltPath } from '@/lib/blog';

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getAllSlugs('en').map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug('en', slug);
  if (!post) return {};
  const altPath = getAltPath(post) ?? '/blog';
  return buildMetadata({
    locale: 'en',
    title: post.pageTitle || `${post.title} | AZ Grand Solutions`,
    description: post.description,
    path: `/en/blog/${post.slug}`,
    altPath,
    image: post.cover,
  });
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug('en', slug);
  if (!post) notFound();
  const altPath = getAltPath(post) ?? '/blog';

  return (
    <SiteShell locale="en" altPath={altPath}>
      <BlogPostView post={post} />
    </SiteShell>
  );
}
