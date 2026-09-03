import { getPublishedReviews, type ReviewLocale } from '@/lib/reviews';

type Props = {
  locale: ReviewLocale;
};

export default function VerifiedReviewsSection({ locale }: Props) {
  const reviews = getPublishedReviews(locale);

  if (reviews.length === 0) return null;

  const isNl = locale === 'nl';

  return (
    <section className="content-section" aria-labelledby="verified-reviews-heading">
      <div className="container">
        <header className="section-head">
          <p className="section-eyebrow">{isNl ? 'Ervaringen uit echte opdrachten' : 'Feedback from real assignments'}</p>
          <h2 id="verified-reviews-heading">{isNl ? 'Geverifieerde klantreacties' : 'Verified client feedback'}</h2>
          <p>
            {isNl
              ? 'Alleen reacties met een controleerbare bron en vastgelegde toestemming worden hier getoond.'
              : 'Only feedback with a verifiable source and recorded publication permission is shown here.'}
          </p>
        </header>
        <div className="trust-grid">
          {reviews.map((review) => (
            <article className="trust-item" key={review.id}>
              <blockquote>
                <p>{review.text}</p>
              </blockquote>
              <p>
                <strong>{review.displayName}</strong>
                <br />
                {review.locality} · {review.workType} · <time dateTime={review.reviewDate}>{review.reviewDate}</time>
              </p>
              <a href={review.source.url} target="_blank" rel="noopener noreferrer">
                {isNl ? `Bron: ${review.source.label}` : `Source: ${review.source.label}`}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
