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

### Practice Areas carousel

Replace the Home-page practice list with `PracticeAreasCarousel`, driven by the existing `practiceAreas` data. Each service has a descriptive card, number, summary, and a semantic link to `/services/[slug]`. On larger screens, several cards are partially or fully visible to communicate horizontal continuation. On compact screens it becomes a touch-scrollable snap row. Previous/next buttons must be keyboard accessible, correctly labelled, disabled at their limits, and hidden only when unnecessary.

The About page can retain the existing long-form, sticky presentation of these practice areas because carousel behavior is only requested for Home.

### Process

Build `ProcessSection` as a four-step numbered flow: initial consultation, assessment, tailored strategy, and representation or resolution. It follows the requested Jurida reference in information design—a clear headline and short introduction followed by disciplined, ordered steps—but uses firm-appropriate copy and Rockville's own visual tokens.

### Team

Build a verified textual roster rather than presenting an unverified stock image as a staff portrait:

- **Rufus C. Okoli** — Founder & Principal Partner; established the practice in 2004.
- **Ngozi R. Okoli** — Partner; co-manages the firm with Rufus.
- **Dr. Nosike Agokei** — Consultant.

Profiles will be concise on Home and may link to the Team page once that route receives the same verified content. No qualifications, biographies, or claims beyond the user-provided material and firm profile will be invented.

### Founder's Story

Separate this from Team. State that Rufus founded the practice (then Rufus Okoli & Associates, now Rockville LP) in 2004. Acknowledge the present co-leadership of Rufus and Ngozi without rewriting the origin story as a joint founding claim. The current generic founders image will be removed from this content unless actual approved portraits are supplied.

### Values

Keep values distinct from process, using the current firm-aligned principles: integrity, commitment, excellence, transparency, advocacy, and justice. This is a standalone Home section after Founder’s Story.

### Help & FAQs

Build `FaqSection` as a quiet editorial accordion inspired by the requested Jurista layout: a supporting image or architectural visual, editorial title and lead, and spacious question rows with plus/minus affordances. Questions and answers will be limited to safe, firm-profile-supported topics: getting in touch, consultation, practice-area coverage, property and corporate/commercial support, dispute resolution, and expectations for engaging counsel. Avoid legal advice, guarantees, pricing claims, or invented service facts. The accordion will use native buttons with `aria-expanded` and `aria-controls`, usable with keyboard and visible focus states. It respects reduced-motion preferences.

## Visual direction

- Continue using official Rockville blue `#2B3F61` for solid controls and `#7EA6C4` for readable dark-background accents.
- Preserve the editorial, high-contrast type scale and paper/ink alternation rather than importing the templates’ brand, colors, images, or copy.
- Use one primary visual gesture per section—horizontal travel for Practice Areas, vertical sequence for Process, typographic roster for Team, and calm disclosure rows for FAQs.
- Ensure no text over image is required for legibility and no generic portrait is attributed to a named employee.

## Implementation boundaries

Likely changes are `app/page.tsx`, `app/about/page.tsx`, `components/founder-section.tsx` (split or replaced), new focused section components, `lib/content.ts`, and render tests. The Team route should be updated in the same change to remove its now-inaccurate “profiles are being prepared” message.

## Verification

- Test both page sequences and the carousel/service links with server-rendered markup tests.
- Test FAQ semantic control attributes and verified team labels.
- Run unit tests, lint, production build, and browser-based desktop/mobile runtime and accessibility checks.
