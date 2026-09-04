# AZ Grand Solutions — deployment runbook

Last updated: 3 September 2026
Current state: local release candidate; publication and post-deploy verification still required

## Application

- Next.js 15 static export with Dutch at the root and English under `/en`.
- Canonical production host: `https://azgs.nl`.
- Production output: `out/`.
- No application API or database is present in this repository.
- The contact form posts from the visitor's browser to the fixed Formspree endpoint only after client-side validation.
- GA4 is loaded only after affirmative analytics consent. Localhost and `file:` previews never load the Google script.
- Google Maps is available only on the NL/EN contact pages and is not loaded until the visitor requests it.

## Mandatory publication route

Publication is performed through GitHub and the connected hosting build. Do not deploy with Wrangler or another direct Cloudflare CLI command.

At the checkpoint of 3 September 2026 the remotes are:

| Remote | Repository | Role to verify before every release |
|---|---|---|
| `origin` | `https://github.com/bojinmihai/azgs.1.git` | development/source mirror |
| `live` | `https://github.com/bojinmihai/azgs.git` | production-connected repository |

Both remote-tracking `main` branches and local `main` were at `1c63315` before the current release work. Re-read the remote URLs and remote branch heads immediately before pushing; do not rely on this table as permanent configuration.

## Hosting build configuration to confirm

The GitHub-connected hosting project must use:

```text
Production branch: main
Build command: npm run build
Build output directory: out
```

`npm run build` performs these release gates:

1. validates that unapproved reviews cannot be published;
2. creates the Next.js static export;
3. generates common security headers in `out/_headers`;
4. generates route-specific CSP middleware in `functions/_middleware.js`;
5. audits metadata, canonicals, hreflang, sitemap membership, internal links, local assets, JSON-LD, form destination, downloadable PDFs and generated security policies.

`functions/_middleware.js` is deliberately ignored by Git because it is generated. The production build must run the full command above so that the hosting platform receives it. A host that only serves `out/` and ignores the generated function will not enforce the route-specific CSP.

## Local pre-deploy checks

Run from the repository root:

```powershell
npm.cmd install
npm.cmd run lint
npx.cmd tsc --noEmit --incremental false
npm.cmd run build
npm.cmd run audit:export
npm.cmd audit
```

Also run the two PDF verifiers with the configured Python environment:

```powershell
python scripts/verify-legal-pdfs.py
python scripts/verify-b2b-capabilities.py
```

Before committing:

- inspect `git status --short` and `git diff --check`;
- inspect the exact staged list with `git diff --cached --name-status`;
- include only project changes from the approved work groups;
- exclude ZIP files, `tmp/`, caches and unrelated untracked files;
- do not stage a generated `functions/_middleware.js`;
- do not send a real form submission during local testing.

## Files and routes that need explicit release review

- NL and EN website source, components, metadata, sitemap and redirects;
- adaptive B2C/B2B/maintenance/emergency form;
- consent-gated analytics and the analytics event specification;
- B2C and B2B legal pages plus four legal PDFs;
- B2B sector pages and the NL/EN capability statements;
- maintenance and How we work pages;
- unpublished review infrastructure with `publicationEnabled=false`;
- security/build audit scripts and dependency lockfile.

The project pages and photography are outside the current content work. Review infrastructure must remain unpublished until real content and publication permission are available.

## Identity and approved service boundaries

| Field | Current value |
|---|---|
| Legal name | AZ Grand Solutions vof |
| Trade name | A-Z Grand Solutions |
| Presentation name | AZ Grand Solutions / AZGS |
| KvK | 42064891 |
| Establishment number | 000053925335 |
| Address | Alpenstraat 12, 3446 DN Woerden |
| Telephone | +31 6 13636925 |
| General email | info@azgs.nl |
| Request email | aanvragen@azgs.nl |

B2B project execution is limited to plumbing and pipework, thermal systems including underfloor heating, and ventilation. The stated cities are orientation points from Woerden, not an unconditional coverage or acceptance promise. Other locations are assessed per project.

Building maintenance is assessed within a maximum of 50 km or about one hour of travel from Woerden. Urgent requests are assessed within a maximum of 50 km or about 40 minutes' drive. These are service-area criteria, not arrival times or SLAs. A B2B urgent request is assessed only for a plumbing, thermal or ventilation project or installation previously carried out by AZGS.

## External account checks before relying on integrations

Repository code cannot verify provider-dashboard settings. Confirm these in the owning accounts:

### Formspree

- endpoint ownership and intended notification recipients;
- allowed-domain/origin settings, server-side spam controls and rate limits;
- monthly submission quota and retention;
- whether the free plan still covers actual use;
- no file upload is enabled in the current form.
- notification emails display `terms_read_confirmation` and `terms_documents`; if the Formspree account uses a custom template or field allowlist, add both fields there;
- perform at most one explicitly approved production submission to confirm that the checkbox status and referenced B2C/B2B version are visible in the received email.

### Google Analytics 4

- property ownership and measurement ID;
- Google Signals, advertising personalization and Google Ads links disabled;
- Enhanced Measurement form interactions disabled to avoid unintended field/event collection and duplicates;
- data redaction, retention, data sharing and processing terms confirmed;
- one controlled DebugView/Realtime test only after the approved deployment.

### GitHub and hosting

- production repository, `main` branch and commit SHA;
- build command and output directory;
- deploy result and rollback route;
- branch protection and repository access appropriate to the release process.

## Paid plans

No paid plan is required for the current static pages, downloads, build, SEO metadata or consent-gated GA4 implementation.

Consider a paid Formspree plan only when verified usage requires a higher submission quota, file uploads, stronger account-side workflows, retention or support features not available on the actual plan. Do not enable uploads before checking the plan and updating privacy/data-minimisation decisions.

GA4 Standard is sufficient for the current event set. GA4 360 is not justified by any verified AZGS requirement. A paid reviews platform is unnecessary while the review registry is unpublished and the native review-source workflow is adequate.

## Git publication sequence

1. Confirm local branch, commit and both remote URLs.
2. Fetch both GitHub remotes and compare `main`; resolve divergence before publication.
3. Run every local check above on the exact release candidate.
4. Present the exact staged file list and release risks for approval.
5. Create one descriptive commit on `main`.
6. Push the exact commit to the required `main` branches, with `live` treated as the production-connected remote after readback confirms that fact.
7. Wait for the GitHub-connected hosting deployment; do not run Wrangler.
8. Verify the deployed commit/status in the hosting/GitHub UI when available.

## Post-deploy verification

Check at minimum:

- `/`, `/en`, `/zakelijk`, `/en/business`;
- `/contact`, `/en/contact`;
- `/onderhoud`, `/en/maintenance`;
- `/werkwijze`, `/en/how-we-work`;
- both B2C and B2B legal routes;
- all new B2B sector routes;
- `robots.txt`, `sitemap.xml`, `_redirects` behaviour and the six PDF downloads.

For representative HTML responses verify:

- HTTP 200, correct canonical and language content;
- HSTS, nosniff, framing, referrer, permissions and cross-origin headers;
- route-specific Content-Security-Policy;
- no analytics loader/request before consent;
- no review or rating schema while publication is disabled;
- mobile menu, language switch, adaptive form and downloads.

Do not send a real production form merely to test the release unless the company explicitly approves that one transmission and the receiving account is monitored. Provider-dashboard readback is the safer first check.

## Rollback

If the deployed release is faulty, create a normal Git revert of the release commit and push that revert through the same verified GitHub remotes. Do not rewrite `main`, use `git reset --hard`, or deploy a local directory directly.

Record the release commit, deployed routes, checks, remaining dashboard/legal decisions and rollback status in `AZGS-ROADMAP.md`.
