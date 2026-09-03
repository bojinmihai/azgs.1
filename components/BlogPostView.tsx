import Link from 'next/link';
import type { BlogPostFull } from '@/lib/blog';
import { COMPANY, SITE_URL, type Locale, url } from '@/lib/site';

const MONTHS_NL = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december',
];
const MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function formatMonthYear(date: string, locale: Locale): string {
  const d = new Date(date);
  const months = locale === 'nl' ? MONTHS_NL : MONTHS_EN;
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

function imageSrcSet(src: string): string {
  if (!src.includes('-1600.')) return src;
  return [800, 1200, 1600]
    .map((width) => `${src.replace('-1600.', `-${width}.`)} ${width}w`)
    .join(', ');
}

const COPY = {
  nl: {
    home: 'Home',
    blog: 'Blog',
    breadcrumb: 'Broodkruimel',
    inThisArticle: 'In dit artikel',
    minRead: 'min lezen',
    region: 'werkgebied per aanvraagtype',
    relatedHeading: 'Plant u een renovatie?',
    relatedSubheading: 'Onze diensten kunnen helpen bij uw project.',
    ctaTitle: 'Vragen over uw project?',
    ctaText:
      'Vertel ons over uw plannen — wij denken graag met u mee en maken een vrijblijvende offerte op maat.',
    ctaButton: 'Offerte aanvragen',
    ctaContact: 'Of neem direct contact op:',
  },
  en: {
    home: 'Home',
    blog: 'Blog',
    breadcrumb: 'Breadcrumb',
    inThisArticle: 'In this article',
    minRead: 'min read',
    region: 'service area by request type',
    relatedHeading: 'Planning a renovation?',
    relatedSubheading: 'Our services can help with your project.',
    ctaTitle: 'Questions about your project?',
    ctaText:
      "Tell us about your plans — we'll think along with you and prepare a no-obligation custom quote.",
    ctaButton: 'Request a quote',
    ctaContact: 'Or get in touch directly:',
  },
} as const;

function articleJsonLd(post: BlogPostFull) {
  const path =
    post.locale === 'nl'
      ? `/blog/${post.slug}`
      : `/en/blog/${post.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: `${SITE_URL}${post.coverFallback}`,
    datePublished: post.date,
    author: { '@type': 'Organization', name: COMPANY.name },
    publisher: {
      '@type': 'Organization',
      name: COMPANY.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/assets/img/logo/logo-primary.svg`,
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${path}` },
    inLanguage: post.locale === 'nl' ? 'nl-NL' : 'en',
  };
}

function breadcrumbJsonLd(post: BlogPostFull) {
  const home = url('home', post.locale);
  const blog = url('blog', post.locale);
  const post_url =
    post.locale === 'nl'
      ? `/blog/${post.slug}`
      : `/en/blog/${post.slug}`;
  const t = COPY[post.locale];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.home, item: `${SITE_URL}${home}` },
      { '@type': 'ListItem', position: 2, name: t.blog, item: `${SITE_URL}${blog}` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}${post_url}` },
    ],
  };
}

export function BlogPostView({ post }: { post: BlogPostFull }) {
  const t = COPY[post.locale];
  const homeHref = url('home', post.locale);
  const blogHref = url('blog', post.locale);
  const contactHref = url('contact', post.locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(post)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(post)) }}
      />

      <nav className="breadcrumb" aria-label={t.breadcrumb}>
        <div className="container">
          <ol>
            <li>
              <Link href={homeHref}>{t.home}</Link>
            </li>
            <li>
              <Link href={blogHref}>{t.blog}</Link>
            </li>
            <li aria-current="page">{post.title}</li>
          </ol>
        </div>
      </nav>

      <section className="article-hero">
        <div className="container">
          <div className="article-hero-inner">
            <span className="article-category">{post.category}</span>
            <h1>{post.title}</h1>
            <div className="article-meta">
              <span className="article-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {post.readTime} {t.minRead}
              </span>
              <span className="article-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {formatMonthYear(post.date, post.locale)}
              </span>
              <span className="article-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {t.region}
              </span>
            </div>
            {post.intro && (
              <p
                className="article-intro"
                dangerouslySetInnerHTML={{ __html: post.intro }}
              />
            )}
          </div>
        </div>
      </section>

      <section className="article-featured">
        <div className="container">
          <div className="article-featured-inner">
            <picture>
              <source
                type="image/webp"
                srcSet={imageSrcSet(post.cover)}
                sizes="(max-width: 1200px) 100vw, 1100px"
              />
              <img
                src={post.coverFallback}
                srcSet={imageSrcSet(post.coverFallback)}
                sizes="(max-width: 1200px) 100vw, 1100px"
                alt={post.title}
                width={1600}
                height={900}
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>
        </div>
      </section>

      <section className="article-content">
        <div className="container">
          <div className="article-layout">
            {post.toc && (
              <aside className="article-toc" aria-label={t.inThisArticle}>
                <div className="article-toc-title">{t.inThisArticle}</div>
                <div dangerouslySetInnerHTML={{ __html: post.toc }} />
              </aside>
            )}
            <article
              className="article-text"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          </div>
        </div>
      </section>

      <section className="final-cta" aria-labelledby="cta-heading">
        <div className="container final-cta-inner">
          <h2 id="cta-heading">{t.ctaTitle}</h2>
          <p>{t.ctaText}</p>
          <Link href={contactHref} className="btn btn-primary btn-large">
            {t.ctaButton}
          </Link>
          <div className="final-cta-contact">
            {t.ctaContact}{' '}
            <a href={`tel:${COMPANY.phone}`}>{COMPANY.phoneDisplay}</a>
            {' · '}
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          </div>
        </div>
      </section>
    </>
  );
}
