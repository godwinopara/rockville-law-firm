# Home and About editorial structure

## Objective

Recompose Rockville LP's Home and About pages around the approved section order, firm-profile content, and the established black, paper, and Rockville-blue visual system. Reference sites inform visual rhythm and interaction patterns only; Rockville content and brand remain original.

## Information architecture

### Home (`/`)

1. Hero
2. About
3. Practice Areas
4. Process
5. Team
6. Founder's Story
7. Values
8. Book Consultation card
9. Help & FAQs

### About (`/about`)

1. Hero
2. About
3. Practice Areas
4. Process
5. Team
6. Book Consultation card

Each page will keep explicit `data-home-section` or `data-about-section` markers, allowing its sequence to be covered by render tests.

## Components and content

### About

Use a two-column editorial lead inspired by the requested “Refined advocacy for complex matters” reference: restrained eyebrow, strong statement, and supporting copy. It will use Rockville's approved mission, vision, and profile-derived positioning; it will not copy the reference's prose.

On the Home page specifically, this section sits directly below the hero in the user-approved split composition: a generous content column at left and a tall, near-half-width image panel at right. The left column contains the eyebrow, a large editorial heading, two short firm-profile-based paragraphs, primary “Our team” and secondary “Contact us” links, then three ruled proof points at its base. The proof points must make only supportable claims about discretion, representation for individuals and businesses, and strategic guidance. Use an Unsplash legal-office image with people for the right panel until Rockville supplies photography; do not identify the people as Rockville employees or team members. On mobile, the reading column comes first, followed by the image and proof points in a natural vertical order.

### Practice Areas carousel

Use one reusable `PracticeAreasCarousel`, driven by the existing `practiceAreas` data. It accepts a section eyebrow, title, description, and an optional excluded service slug so that the same component serves three contexts: all Practice Areas on Home, all Practice Areas on About, and “Other Services” on a service-detail page. Each service has a number, title, summary, and a semantic link to `/services/[slug]`; when a service slug is excluded, that active service does not appear in the rail.

At desktop, use the user-approved two-column composition: an editorial introduction at left, the existing square Previous/Next controls directly below it, and the horizontally scrollable card rail at right. On compact screens, the introduction and controls stack above a touch-scrollable snap row. Previous/next buttons must be keyboard accessible, correctly labelled, and disabled at their scroll limits.

Cards are tall, image-led service panels. Source a relevant Unsplash image for each practice area and preserve the source attribution/license record in project content. Each card uses a dark image overlay for readable white content. On hover and keyboard focus, a `#2B3F61` Rockville-blue panel sweeps from top to bottom and becomes the card surface; the image remains beneath the covered panel. Touch and reduced-motion users receive the stable readable state without relying on hover or animation.

### Process

Keep `ProcessSection` as a reusable component, but return it to the existing Practice Areas layout: a sticky editorial introduction at left and a numbered, ruled process list at right. The steps remain initial consultation, assessment, tailored strategy, and representation or resolution. Do not use a standalone, full-width Process design.

### Team

Build a verified textual roster rather than presenting an unverified stock image as a staff portrait:

- **Rufus C. Okoli** — Founder & Principal Partner; established Rufus Okoli & Associates in 2004.
- **Ngozi R. Okoli** — Partner; co-manages the firm with Rufus.
- **Dr. Nosike Agokei** — Consultant.

The section is titled **Our Team**, presenting these three professionals as a team rather than as a group of partners. Profiles will be concise on Home and may link to the Team page once that route receives the same verified content. No qualifications, biographies, or claims beyond the user-provided material and firm profile will be invented.

### The Rockville Story

Separate this from Team. Establish the timeline accurately: Rufus founded Rufus Okoli & Associates in 2004; Rockville LP, the current full-service firm, was founded in June 2018. His “Founder & Principal Partner” title refers to the firm’s originating practice and must never be used to imply that Rockville LP itself was founded in 2004. Acknowledge the present co-leadership of Rufus and Ngozi without calling either a founder of Rockville LP unless further approved source material says so. The current generic founders image will be removed from this content unless actual approved portraits are supplied.

### Values

Keep values distinct from process, using the current firm-aligned principles: integrity, commitment, excellence, transparency, advocacy, and justice. This is a standalone Home section after Founder’s Story.

### Help & FAQs

Build `FaqSection` as a quiet editorial accordion inspired by the requested Jurista layout: a supporting image or architectural visual, editorial title and lead, and spacious question rows with plus/minus affordances. Questions and answers will be limited to safe, firm-profile-supported topics: getting in touch, consultation, practice-area coverage, property and corporate/commercial support, dispute resolution, and expectations for engaging counsel. Avoid legal advice, guarantees, pricing claims, or invented service facts. The accordion will use native buttons with `aria-expanded` and `aria-controls`, usable with keyboard and visible focus states. It respects reduced-motion preferences.

## Visual direction

- Continue using official Rockville blue `#2B3F61` for solid controls and `#7EA6C4` for readable dark-background accents.
- Preserve the editorial, high-contrast type scale and paper/ink alternation rather than importing the templates’ brand or copy. Unsplash imagery may be used only for the approved Practice Areas cards.
- Use one primary visual gesture per section—the Rockville-blue vertical sweep for Practice Areas, a ruled left/right layout for Process, typographic roster for Team, and calm disclosure rows for FAQs.
- Ensure no text over image is required for legibility and no generic portrait is attributed to a named employee.

## Implementation boundaries

Likely changes are `app/page.tsx`, `app/about/page.tsx`, `app/services/[slug]/page.tsx`, `components/practice-areas-carousel.tsx`, `components/process-section.tsx`, `lib/content.ts`, locally stored Unsplash image assets with source metadata, and render tests. The Team route should be updated in the same change to remove its now-inaccurate “profiles are being prepared” message.

## Verification

- Test both page sequences, all three carousel contexts, excluded current-service behavior, carousel/service links, and hover/focus semantics with server-rendered markup tests.
- Test FAQ semantic control attributes and verified team labels.
- Run unit tests, lint, production build, and browser-based desktop/mobile runtime and accessibility checks.
