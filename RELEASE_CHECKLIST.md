# PS ChemLab Version 1.0 Release Checklist

Use this checklist for the final editorial, technical, accessibility, and deployment review. Do not deploy until every blocking item is approved.

## Content approval

- [x] Remove the sample publication record from public content.
- [ ] Add verified publication records with complete bibliographic metadata.
- [ ] Verify every publication title, author list, journal, year, DOI, abstract, and PDF permission.
- [ ] Replace `contact@example.com` and `https://example.com` with approved contact details.
- [ ] Approve the full professional biography for Professor Pornthep Sompornpisut.
- [ ] Approve collaborator names, affiliations, roles, and consent to publish.
- [ ] Verify research summaries and relationships to courses, software, and publications.
- [ ] Verify software descriptions, feature lists, supported platforms, version numbers, and system requirements.
- [ ] Review all English copy for academic accuracy and consistency.
- [ ] Review all Thai copy for encoding, accuracy, and completeness.
- [ ] Confirm the independent-site disclaimer and institutional naming with the appropriate authority.

## Images and branding

- [x] Add the `/public/images` hierarchy and filename conventions.
- [x] Add reusable PS ChemLab logo, mark, favicon, and default Open Graph artwork.
- [ ] Approve the final PS ChemLab logo and brand usage.
- [ ] Add an approved portrait at `/images/portraits/pornthep-sompornpisut.webp`.
- [ ] Add three optimized screenshots for every software slug.
- [ ] Add course thumbnails for all published courses.
- [ ] Add graphical abstracts for publications where permission is available.
- [ ] Confirm image copyright, attribution, and publication consent.
- [ ] Optimize raster images as WebP/AVIF and verify responsive dimensions.
- [ ] Confirm meaningful alternative text for every informative image.

## Software downloads

- [ ] Test every Google Drive download URL in a signed-out browser session.
- [ ] Scan all downloadable packages for malware.
- [ ] Confirm package filenames, versions, checksums, and supported operating systems.
- [ ] Publish installation instructions and release notes.
- [ ] Confirm licensing and redistribution terms for every software package.

## Courses and video

- [ ] Test every YouTube link and remove unavailable or private videos.
- [ ] Review duplicate-video warnings from `npm run import-data`.
- [ ] Verify course codes, chapters, topics, ordering, and lecture counts.
- [ ] Confirm captions or transcripts are available where required.
- [ ] Regenerate catalog data with `npm run import-data` from the approved workbook.
- [ ] Confirm generated JSON changes are intentional before release.

## SEO and social sharing

- [x] Add descriptive titles and metadata for all routes.
- [x] Add Open Graph and Twitter card metadata.
- [x] Add a default social-sharing image.
- [ ] Replace SVG Open Graph artwork with an approved 1200×630 PNG if required by target platforms.
- [ ] Configure the production canonical domain and canonical URLs.
- [ ] Generate and validate `sitemap.xml` against the production hostname.
- [ ] Review `robots.txt` for the production crawling policy.
- [ ] Test representative pages with Google Rich Results, Facebook Sharing Debugger, and LinkedIn Post Inspector.
- [ ] Verify all public pages return appropriate HTTP status codes in production.

## Accessibility

- [ ] Complete keyboard-only testing across every route and interactive control.
- [ ] Test with NVDA or another screen reader.
- [ ] Run automated WCAG checks with axe or Lighthouse.
- [ ] Verify color contrast in light and dark themes.
- [ ] Verify focus visibility, skip navigation, headings, landmarks, and breadcrumbs.
- [ ] Test at 200% and 400% browser zoom.
- [ ] Test reduced-motion mode.
- [ ] Confirm form controls and external/download links have clear accessible names.

## Responsive and browser QA

- [ ] Test layouts at 320, 375, 768, 1024, 1440, and 1920 pixel widths.
- [ ] Test current Chrome, Edge, Firefox, and Safari.
- [ ] Test representative Android and iOS devices.
- [ ] Verify navigation, long titles, Thai text, cards, galleries, and tables do not overflow.
- [ ] Verify screenshot and graphical-abstract fallbacks when image files are missing.
- [ ] Verify all software detail slugs resolve correctly.
- [ ] Verify unknown routes and unknown software slugs show accessible fallback pages.

## Security and privacy

- [ ] Run `npm audit` and review every remaining vulnerability.
- [ ] Review external links and downloads for trusted destinations.
- [ ] Add production security headers: CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy`.
- [ ] Confirm no credentials, private data, draft files, or spreadsheet lock files are included.
- [ ] Confirm analytics, cookies, privacy notice, and consent requirements before enabling tracking.
- [ ] Verify contact email publishing and spam-protection decisions.

## Performance

- [ ] Run Lighthouse on Home, Courses, Software, a software detail page, Research, and Publications.
- [ ] Confirm lazy loading for screenshots, portraits, thumbnails, and graphical abstracts.
- [ ] Review JavaScript chunk sizes and Framer Motion loading impact.
- [ ] Configure long-lived caching for hashed assets and appropriate caching for public images.
- [ ] Confirm compressed Brotli or gzip delivery in production.
- [ ] Test the site on a throttled mobile connection.

## Build and deployment

- [x] Confirm TypeScript compilation passes.
- [x] Confirm automated tests pass.
- [x] Confirm the production Vite build succeeds.
- [ ] Resolve or explicitly accept remaining lint warnings.
- [ ] Set the production base URL and hosting configuration.
- [ ] Configure SPA fallback routing for direct visits to nested routes.
- [ ] Validate environment-specific contact information and URLs.
- [ ] Deploy to a staging environment and complete stakeholder review.
- [ ] Back up the approved workbook and generated content before release.
- [ ] Tag the approved commit as `v1.0.0` and publish release notes.
- [ ] Verify the production deployment, SSL certificate, redirects, and custom domain.

## Post-release

- [ ] Monitor availability, broken links, JavaScript errors, and download failures.
- [ ] Submit the sitemap to search engines.
- [ ] Establish a content correction and software update process.
- [ ] Record the owner and review date for each course, software package, research project, and publication.
- [ ] Schedule the first post-release accessibility, dependency, and content review.
