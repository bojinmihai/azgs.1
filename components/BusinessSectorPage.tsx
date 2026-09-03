import Link from 'next/link';
import { COMPANY, SITE_URL, url } from '@/lib/site';
import {
  businessSectorUrl,
  getBusinessSectorContent,
  getBusinessSectorIndex,
  type BusinessSectorContent,
} from '@/lib/business-sectors';
import { SiteShell } from './SiteShell';

type Props = { content: BusinessSectorContent };

export function BusinessSectorPage({ content }: Props) {
  const isNl = content.locale === 'nl';
  const contactHref = `${url('contact', content.locale)}?type=business&sector=${content.key}`;
  const sectorIndex = getBusinessSectorIndex(content.locale);
  const related = content.related.map((key) => getBusinessSectorContent(key, content.locale));
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isNl ? 'Zakelijk' : 'Business', item: `${SITE_URL}${url('business', content.locale)}` },
      { '@type': 'ListItem', position: 2, name: content.eyebrow.replace(/^.*?·\s*/, ''), item: `${SITE_URL}${content.path}` },
    ],
  };

  return (
    <SiteShell locale={content.locale} altPath={content.altPath} audience="business">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="sector-hero">
        <div className="container sector-hero__inner">
          <nav className="sector-breadcrumb" aria-label={isNl ? 'Kruimelpad' : 'Breadcrumb'}>
            <Link href={url('business', content.locale)}>{isNl ? 'Zakelijk' : 'Business'}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{content.eyebrow.replace(/^.*?·\s*/, '')}</span>
          </nav>
          <p className="section-eyebrow">{content.eyebrow}</p>
          <h1>{content.heading}</h1>
          <p className="sector-hero__intro">{content.intro}</p>
          <div className="hero-ctas">
            <Link href={contactHref} className="btn btn-primary btn-large">
              {isNl ? 'Zakelijke aanvraag starten' : 'Start a business request'}
            </Link>
            <a href={`tel:${COMPANY.phone}`} className="btn btn-ghost btn-large">
              {isNl ? 'Bel' : 'Call'} {COMPANY.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <nav className="sector-index" aria-label={isNl ? 'Zakelijke sectoren' : 'Business sectors'}>
        <div className="container sector-index__inner">
          {sectorIndex.map((sector) => (
            <Link
              key={sector.key}
              href={sector.href}
              className={sector.key === content.key ? 'is-active' : undefined}
              aria-current={sector.key === content.key ? 'page' : undefined}
            >
              {sector.title}
            </Link>
          ))}
        </div>
      </nav>

      <section className="content-section" aria-labelledby="sector-needs-title">
        <div className="container">
          <header className="section-head sector-section-head">
            <p className="section-eyebrow">{isNl ? 'Sectorbehoefte' : 'Sector needs'}</p>
            <h2 id="sector-needs-title">{content.needsTitle}</h2>
            <p>{content.needsIntro}</p>
          </header>
          <div className="sector-card-grid sector-card-grid--three">
            {content.needs.map((item) => (
              <article className="sector-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section alt" aria-labelledby="sector-work-title">
        <div className="container">
          <header className="section-head sector-section-head">
            <p className="section-eyebrow">{isNl ? 'Werkpakket' : 'Work package'}</p>
            <h2 id="sector-work-title">{content.workTitle}</h2>
            <p>{content.workIntro}</p>
          </header>
          <div className="sector-card-grid">
            {content.work.map((item) => (
              <article className="sector-card sector-card--work" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="sector-service-links" aria-label={isNl ? 'Gerelateerde diensten' : 'Related services'}>
            {content.serviceLinks.map((item) => <Link href={item.href} key={item.href}>{item.label}<span aria-hidden="true"> →</span></Link>)}
          </div>
        </div>
      </section>

      <section className="content-section" aria-labelledby="sector-responsibilities-title">
        <div className="container sector-split">
          <div>
            <p className="section-eyebrow">{isNl ? 'Samenwerking' : 'Cooperation'}</p>
            <h2 id="sector-responsibilities-title">{content.responsibilitiesTitle}</h2>
            <p className="sector-lead">{content.responsibilitiesIntro}</p>
          </div>
          <dl className="responsibility-list">
            {content.responsibilities.map((item) => (
              <div key={item.party}>
                <dt>{item.party}</dt>
                <dd>{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="content-section alt" aria-labelledby="sector-information-title">
        <div className="container sector-split">
          <div>
            <p className="section-eyebrow">{isNl ? 'Aanvraag voorbereiden' : 'Prepare your request'}</p>
            <h2 id="sector-information-title">{content.informationTitle}</h2>
            <p className="sector-lead">{content.informationIntro}</p>
          </div>
          <ul className="sector-checklist">
            {content.information.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="content-section sector-boundaries" aria-labelledby="sector-boundaries-title">
        <div className="container">
          <div className="sector-boundaries__box">
            <div>
              <p className="section-eyebrow">{isNl ? 'Scope en grenzen' : 'Scope and boundaries'}</p>
              <h2 id="sector-boundaries-title">{content.boundariesTitle}</h2>
            </div>
            <ul>
              {content.boundaries.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="content-section alt" aria-labelledby="related-sectors-title">
        <div className="container">
          <header className="section-head sector-section-head">
            <p className="section-eyebrow">{isNl ? 'Ook relevant' : 'Also relevant'}</p>
            <h2 id="related-sectors-title">{isNl ? 'Andere zakelijke sectoren' : 'Other business sectors'}</h2>
          </header>
          <div className="sector-card-grid sector-card-grid--three">
            {related.map((sector) => (
              <article className="sector-card sector-card--link" key={sector.key}>
                <h3><Link href={businessSectorUrl(sector.key, content.locale)}>{sector.eyebrow.replace(/^.*?·\s*/, '')}</Link></h3>
                <p>{sector.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta" aria-labelledby="sector-cta-title">
        <div className="container final-cta-inner">
          <h2 id="sector-cta-title">{content.ctaTitle}</h2>
          <p>{content.ctaText}</p>
          <div className="final-cta-actions">
            <Link href={contactHref} className="btn btn-orange btn-large">
              {isNl ? 'Open het zakelijke formulier' : 'Open the business form'}
            </Link>
            <Link href={url('termsBusiness', content.locale)} className="btn btn-ghost-inv btn-large">
              {isNl ? 'Bekijk zakelijke voorwaarden' : 'View business terms'}
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
