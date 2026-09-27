# Customer journey and search handoff

Updated: 2026-09-12

## Implemented and verified locally

- Responsive browser QA covered the homepage, product directory, Fuel OS, services, a custom-software detail page, contact form, mobile menu, footer, and FAQ controls at desktop, 390 px, and 360 px.
- Removed a client-side reload rule that incorrectly sent refreshed public routes to the homepage.
- Added concise deliverables and buyer questions to custom software, product engineering, AI automation, and API integration service pages.
- Product and service pages retain distinct titles, descriptions, canonicals, visible breadcrumbs, and matching structured data. Bulk FAQ schema was removed while visible buyer answers remain available.
- The sitemap uses a fixed content-change date only for the two product pages changed in this pass; it does not generate a false fresh date on every request.
- Contact validation has isolated tests for custom and product routing, product context, optional planning fields, invalid email, missing data, and unexpected fields. The UI prevents duplicate submission, retains inputs after failure, uses native accessible required-field validation, and emits success only after a successful response.
- GTM/Vercel Analytics already exist. A privacy-safe event layer now emits CTA, enquiry-start, and enquiry-success context without form contents or contact details. Production collection still depends on the configured analytics accounts and consent policy.
- The recurring `Your account is frozen` console error was traced to the hard-coded SecurePrivacy account script. The script is now disabled unless a valid `NEXT_PUBLIC_SECURE_PRIVACY_ID` is configured. This error was unrelated to the contact API. Duplicate page-level image/ref lint warnings were also resolved.
- A production build completed without TypeScript or lint warnings. Route checks confirmed expected 200 responses and a real 404 for an unknown path.

## Site ownership

- The corporate site owns company credibility, custom engineering services, and product discovery.
- Verified product destinations should own product features, access, onboarding, commercial journeys, and support.
- `/products` remains the corporate portfolio directory. Fuel OS details live at `/products/fuel-os` until a verified destination is supplied.

## Facts still required

- Confirm categories, audiences, capabilities, release stages, and final names for ARTh, Omni Doc AI, and Tripwise.
- Supply verified product-domain/subdomain URLs before changing any corporate CTA or redirect.
- Confirm Fuel OS availability and which published capabilities are currently live versus planned.
- Supply approved customer evidence before publishing outcomes, metrics, testimonials, or case studies.
- Supply an actual support destination or documented support process before describing a portal, dashboard, helpdesk, or knowledge base.

## Account-dependent work

- Verify domain properties and submit the canonical sitemap in Google Search Console and Bing Webmaster Tools.
- Confirm production GTM and Vercel Analytics access. Configure events for product/service CTA, form start, form success, and product intent without capturing field contents.
- Verify the configured GTM container receives `cta_click`, `product_cta`, `service_cta`, `enquiry_start`, and `enquiry_success` events, and map them to approved analytics destinations.
- Provide an active SecurePrivacy account/site ID before re-enabling its consent widget; confirm the production consent configuration covers the selected analytics tools.
- Configure cross-domain measurement only after product destinations are verified. Preserve the original referrer and avoid internal UTM parameters.
- Validate the Notion contact database schema, successful UI, delivery, and retry behaviour with an authorized isolated/staging test record; no external submission was sent during this implementation.

## Measurement

Report qualified enquiries, product enquiries, activations, and customers by landing page and intent. Treat traffic and rankings as diagnostic measures, not the business outcome. Core Web Vitals field targets are LCP at or below 2.5 seconds, INP at or below 200 milliseconds, and CLS at or below 0.1; these are targets, not guarantees.
