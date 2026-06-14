import Link from 'next/link';
import { SiteShell } from '@/components/SiteShell';

export default function NotFound() {
  return (
    <SiteShell locale="nl" altPath="/en">
      <section className="not-found">
        <div className="container">
          <h1>Pagina niet gevonden</h1>
          <p>De pagina die u zocht bestaat niet of is verplaatst.</p>
          <Link href="/" className="btn btn-primary">
            Terug naar home
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
