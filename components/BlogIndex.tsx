import { getAllPosts } from '@/lib/blog';
import type { Locale } from '@/lib/site';
import { BlogCard } from './BlogCard';

const COPY = {
  nl: {
    eyebrow: 'Blog',
    title: 'Praktische gidsen voor uw woning',
    intro:
      'Tips, advies en stap-voor-stap gidsen over afwerking, installaties en onderhoud van uw woning. Geschreven door ons team voor een groter begrip van uw project.',
  },
  en: {
    eyebrow: 'Blog',
    title: 'Practical guides for your home',
    intro:
      'Tips, advice, and step-by-step guides about finishing, installations, and maintenance for your home. Written by our team to help you understand your project better.',
  },
};

type Props = { locale: Locale };

export function BlogIndex({ locale }: Props) {
  const posts = getAllPosts(locale);
  const copy = COPY[locale];
  return (
    <>
      <section className="blog-hero">
        <div className="container">
          <div className="blog-hero-inner">
            <p className="section-eyebrow">{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p className="blog-hero-intro">{copy.intro}</p>
          </div>
        </div>
      </section>

      <section className="blog-grid-section">
        <div className="container">
          <div className="blog-grid">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
