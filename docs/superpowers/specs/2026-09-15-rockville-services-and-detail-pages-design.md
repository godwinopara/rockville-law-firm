# Rockville Services and Detail Pages Design

## Objective

Redesign Rockville’s Services page using the supplied [Jurista Practice Areas page](https://jurista-tambe.framer.website/practice-areas) as the primary structural reference, while preserving Rockville’s established obsidian, off-white, champagne-gold, Fraunces, DM Sans, and architectural-image identity. Add a complete, dedicated detail page for each of Rockville’s ten practice areas.

## Design intent

The experience should read like an international legal publication: an assured editorial introduction, a disciplined grid of service cards, a cinematic consultation moment, and an oversized closing wordmark. It may borrow the reference’s hierarchy and pacing but must not reproduce its firm name, claims, statistics, testimonial content, or exact copy.

The existing Lenis and GSAP system remains canonical. Cards and detail sections reveal within the same measured motion rhythm, and all motion remains disabled by `prefers-reduced-motion`.

## Information architecture

### Services index: `/services`

1. Existing full-bleed architectural hero with Services-specific copy and Book Consultation action.
2. Practice-area introduction:
   - Eyebrow: “Confidence, resilience, and strategic precision”.
   - Heading: “We are driven by a clear purpose to protect rights and pursue fair outcomes.”
   - Short Rockville-specific supporting statement with no statistics, ratings, or outcome promises.
3. Ten service cards.
4. Image-led consultation section.
5. Existing online-service groups.
6. Redesigned global footer.

### Detail route: `/services/[slug]`

Each practice area receives a statically generated page with:

1. Dark editorial hero showing the service number, title, concise summary, and Book Consultation action.
2. Overview section explaining the practice area in general, non-promissory language.
3. “How we can assist” ruled list containing the matters covered.
4. “Our approach” section describing clarity, diligence, communication, and commercial awareness without implying guaranteed results.
5. Related-services navigation based on the central service order.
6. Shared image-led Book Consultation section.
7. Global footer.

## Routes

The central service model will provide these slugs:

- `/services/company-secretary-compliance`
- `/services/intellectual-property-law`
- `/services/real-estate-property-law`
- `/services/corporate-law`
- `/services/due-diligence`
- `/services/litigation`
- `/services/legal-opinion`
- `/services/general-counsel`
- `/services/debt-recovery-restructuring`
- `/services/alternative-dispute-resolution`

`generateStaticParams` will statically generate all ten pages. `generateMetadata` will provide an honest, service-specific title and description. Unknown slugs will use Next.js `notFound()`.

## Service content model

`lib/content.ts` remains the canonical content owner. `PracticeArea` will be extended with:

- `slug`
- `summary`
- `overview`
- `matters: string[]`
- `approach`
- `icon` or an icon key when needed by the card renderer

Content will explain the general scope of each service. It will not invent Rockville-specific achievements, named clients, lawyers, founders, case results, rankings, years of experience, response times, prices, or guarantees.

## Service-card design

The card grid is three columns on wide screens, two columns on tablets, and one column on mobile. Every card has:

- A quiet top accent rule.
- Service number and title.
- Concise description separated by a hairline.
- A visible “Read more” link with an arrow.
- A low-contrast line icon used as a secondary visual cue.
- Square corners and no drop shadow.

Cards use equal minimum heights within each row. Hover and keyboard focus darken the top rule, move the arrow slightly, and subtly change the surface. Important content never depends on hover. The tenth card becomes a deliberate full-width closing card on three-column desktop layouts, using a horizontal internal composition; it returns to a normal card at tablet and mobile widths.

## Consultation section

The consultation component is a wide architectural still-image composition. A translucent obsidian panel overlaps the right side on desktop and becomes a solid, naturally stacked panel on mobile.

- Heading: “We take every matter seriously and respond with considered representation.”
- Supporting copy focuses on precision, discretion, and tailored legal guidance.
- Primary action: “Book consultation”.
- No star rating, review count, client-logo claim, or unsupported trust badge.

The image remains replaceable through one component prop and uses Next.js image optimization.

## Footer redesign

The footer becomes a spacious editorial close inspired by the reference:

- Left column: firm introduction and direct contact information.
- Navigation columns: About/navigation and all ten Practice Areas.
- Oversized “Rockville Legal” wordmark across the lower section.
- Copyright and core-values line beneath a hairline.

No newsletter form or social icons will be shown until working destinations or subscription behavior are supplied. All practice links point to their actual detail routes.

## Components

- `PracticeAreaCards`: data-driven responsive card grid.
- `PracticeAreaCard`: semantic article containing title, summary, icon, and link.
- `ConsultationBanner`: shared image-led conversion section.
- `ServiceDetailPage`: route composition driven by the canonical content entry.
- `SiteFooter`: expanded global footer with service navigation.

The existing `StickyServices` component will no longer render on the Services index. It may remain available to the Home page if still visually appropriate.

## Responsive behavior

- Desktop: three-column card grid, right-overlaid consultation panel, multi-column footer, full-width wordmark.
- Tablet: two-column grid, reduced type scale, consultation panel with lighter overlap, wrapped footer columns.
- Mobile: one-column cards, stacked consultation content, readable wordmark scale, no horizontal overflow.
- Native touch scrolling remains intact; wheel scrolling continues through Lenis.

## Accessibility

- One `h1` per route and a logical heading hierarchy.
- Card destinations are real links with descriptive accessible text.
- Visible hover and `focus-visible` states.
- Decorative icons are hidden from assistive technology.
- Image alt text describes the visual without implying a real Rockville office or attorney when placeholders are used.
- Reduced-motion users receive immediately visible content and native scrolling.
- All text and controls target WCAG 2.2 AA contrast.

## Verification

- Unit tests confirm every practice area has a unique slug, required detail content, and a valid related route.
- Component tests confirm ten cards and ten “Read more” links render.
- Route/build verification confirms all ten static detail pages compile.
- Browser checks cover the Services index and at least two representative detail pages at desktop and mobile widths.
- Verify consultation navigation, footer practice links, keyboard focus, no horizontal overflow, reduced motion, and accessibility.
- Run the complete test suite, ESLint, production build, Next.js runtime diagnostics, and strict premium design audit.
