import rawRegistry from '@/content/reviews/reviews.json';

export type ReviewLocale = 'nl' | 'en';

export type VerifiedReview = {
  id: string;
  locale: ReviewLocale;
  text: string;
  displayName: string;
  locality: string;
  workType: string;
  reviewDate: string;
  source: {
    label: string;
    url: string;
    checkedAt: string;
  };
  permission: {
    status: 'confirmed';
    scope: 'website-publication';
    confirmedAt: string;
    evidenceReference: string;
    withdrawalContact: string;
  };
  verification: {
    status: 'verified';
    verifiedAt: string;
  };
  publication: {
    status: 'approved';
  };
};

type ReviewRegistry = {
  schemaVersion: number;
  publicationEnabled: boolean;
  reviews: VerifiedReview[];
};

const registry = rawRegistry as ReviewRegistry;

function isPublishable(review: VerifiedReview) {
  return (
    review.permission.status === 'confirmed' &&
    review.permission.scope === 'website-publication' &&
    review.permission.withdrawalContact === 'info@azgs.nl' &&
    review.verification.status === 'verified' &&
    review.publication.status === 'approved' &&
    review.source.url.startsWith('https://')
  );
}

export function getPublishedReviews(locale: ReviewLocale): VerifiedReview[] {
  if (!registry.publicationEnabled) return [];
  return registry.reviews.filter((review) => review.locale === locale && isPublishable(review));
}

export const REVIEW_PUBLICATION_ENABLED = registry.publicationEnabled;
