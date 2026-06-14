import Link from 'next/link';
import type { BlogPost } from '@/lib/blog';
import { getPostUrl } from '@/lib/blog';

const MONTHS_NL = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december',
];
const MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function formatDate(date: string, locale: 'nl' | 'en'): string {
  const d = new Date(date);
  const months = locale === 'nl' ? MONTHS_NL : MONTHS_EN;
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function imageSrcSet(src: string): string {
  if (!src.includes('-1600.')) return src;
  return [800, 1200, 1600]
    .map((width) => `${src.replace('-1600.', `-${width}.`)} ${width}w`)
    .join(', ');
}

export function BlogCard({ post }: { post: BlogPost }) {
  const href = getPostUrl(post);
  const minLabel = post.locale === 'nl' ? 'min lezen' : 'min read';

  return (
    <article className="blog-card">
      <Link href={href} className="blog-card-link" aria-label={post.title}>
        <div className="blog-card-image">
          <picture>
            <source
              type="image/webp"
              srcSet={imageSrcSet(post.cover)}
              sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
            />
            <img
              src={post.coverFallback}
              srcSet={imageSrcSet(post.coverFallback)}
              sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
              alt={post.title}
              width={800}
              height={500}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
        <div className="blog-card-body">
          <span className="blog-card-category">{post.category}</span>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <div className="blog-card-meta">
            <span>{formatDate(post.date, post.locale)}</span>
            <span>·</span>
            <span>
              {post.readTime} {minLabel}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
