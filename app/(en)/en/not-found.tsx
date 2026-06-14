import Link from 'next/link';
import { SiteShell } from '@/components/SiteShell';

export default function NotFound() {
  return (
    <SiteShell locale="en" altPath="/">
      <section className="not-found">
        <div className="container">
          <h1>Page not found</h1>
          <p>The page you were looking for does not exist or has been moved.</p>
          <Link href="/en" className="btn btn-primary">
            Back to home
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
