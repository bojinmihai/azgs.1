import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const registryPath = path.join(root, 'content', 'reviews', 'reviews.json');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function isIsoDate(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

function requiredText(value, field, id) {
  assert(typeof value === 'string' && value.trim().length > 0, `${id}: ${field} is required`);
}

assert(registry.schemaVersion === 1, 'reviews.json: unsupported schemaVersion');
assert(typeof registry.publicationEnabled === 'boolean', 'reviews.json: publicationEnabled must be boolean');
assert(isIsoDate(registry.lastAudited), 'reviews.json: lastAudited must be YYYY-MM-DD');
assert(Array.isArray(registry.sourceAudit), 'reviews.json: sourceAudit must be an array');
assert(Array.isArray(registry.reviews), 'reviews.json: reviews must be an array');

for (const source of registry.sourceAudit) {
  requiredText(source.platform, 'sourceAudit.platform', 'source audit');
  assert(typeof source.profileUrl === 'string' && source.profileUrl.startsWith('https://'), 'source audit: HTTPS profileUrl is required');
  assert(isIsoDate(source.observedAt), 'source audit: observedAt must be YYYY-MM-DD');
  assert(source.republicationPermission !== 'confirmed', 'source audit must not imply publication permission');
}

const ids = new Set();
for (const review of registry.reviews) {
  requiredText(review.id, 'id', 'review');
  assert(!ids.has(review.id), `${review.id}: duplicate id`);
  ids.add(review.id);
  assert(review.locale === 'nl' || review.locale === 'en', `${review.id}: locale must be nl or en`);
  for (const field of ['text', 'displayName', 'locality', 'workType']) requiredText(review[field], field, review.id);
  assert(isIsoDate(review.reviewDate), `${review.id}: reviewDate must be YYYY-MM-DD`);
  requiredText(review.source?.label, 'source.label', review.id);
  assert(typeof review.source?.url === 'string' && review.source.url.startsWith('https://'), `${review.id}: an HTTPS source URL is required`);
  assert(isIsoDate(review.source?.checkedAt), `${review.id}: source.checkedAt must be YYYY-MM-DD`);
  assert(review.permission?.status === 'confirmed', `${review.id}: publication permission is not confirmed`);
  assert(review.permission?.scope === 'website-publication', `${review.id}: permission scope must be website-publication`);
  assert(isIsoDate(review.permission?.confirmedAt), `${review.id}: permission.confirmedAt must be YYYY-MM-DD`);
  requiredText(review.permission?.evidenceReference, 'permission.evidenceReference', review.id);
  assert(review.permission?.withdrawalContact === 'info@azgs.nl', `${review.id}: withdrawalContact must be info@azgs.nl`);
  assert(review.verification?.status === 'verified', `${review.id}: source is not verified`);
  assert(isIsoDate(review.verification?.verifiedAt), `${review.id}: verification.verifiedAt must be YYYY-MM-DD`);
  assert(review.publication?.status === 'approved', `${review.id}: publication status is not approved`);
}

if (registry.publicationEnabled) assert(registry.reviews.length > 0, 'publicationEnabled cannot be true with an empty registry');

const seoSource = fs.readFileSync(path.join(root, 'lib', 'seo.ts'), 'utf8');
assert(!/AggregateRating|reviewRating|aggregateRating/.test(seoSource), 'review or aggregate rating markup must not be added to LocalBusiness schema');

function sourceFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(target);
    return /\.(tsx?|jsx?)$/.test(entry.name) ? [target] : [];
  });
}

if (!registry.publicationEnabled) {
  const activeReferences = [...sourceFiles(path.join(root, 'app')), ...sourceFiles(path.join(root, 'components'))]
    .filter((file) => path.basename(file) !== 'VerifiedReviewsSection.tsx')
    .filter((file) => fs.readFileSync(file, 'utf8').includes('VerifiedReviewsSection'));
  assert(activeReferences.length === 0, 'VerifiedReviewsSection is wired into public pages while publication is disabled');
}

console.log(
  `PASS review registry: ${registry.reviews.length} publishable records, ` +
  `${registry.sourceAudit.length} audited source, publication ${registry.publicationEnabled ? 'enabled' : 'disabled'}.`,
);
