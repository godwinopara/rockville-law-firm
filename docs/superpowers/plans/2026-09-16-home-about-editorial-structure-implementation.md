# Home and About Editorial Structure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Rockville LP’s approved Home and About composition with a service carousel, verified team/history content, a separate process and values treatment, and profile-based Help & FAQs.

**Architecture:** Keep route files responsible for section sequence only. Build focused presentation components for the carousel, process, team, Rockville story, and FAQ; put verified reusable content in `lib/content.ts`. Client boundaries are limited to the carousel controls and FAQ disclosure state, while all other sections remain server components.

**Tech Stack:** Next.js 16.3.5 App Router, React 19.2.8, TypeScript, Tailwind CSS 4, Lucide React, Node test runner via `tsx --test`.

**Spec:** `docs/superpowers/specs/2026-09-16-home-about-editorial-structure-design.md`

## Global Constraints

- Use the official Rockville blue `#2B3F61` for solid controls and `#7EA6C4` for readable dark-background accents.
- Home section order is Hero, About, Practice Areas, Process, Team, The Rockville Story, Values, Book Consultation, Help & FAQs.
- About section order is Hero, About, Practice Areas, Process, Team, Book Consultation.
- Rufus C. Okoli is “Founder & Principal Partner”; that title refers to Rufus Okoli & Associates, established in 2004.
- State plainly that Rockville LP was founded in June 2018; never imply it existed in 2004.
- Present Rufus, Ngozi, and Dr. Agokei under “Our Team,” not as a group of partners.
- Do not use generic or unverified portrait imagery as a named team member.
- FAQ copy must remain within firm-profile and user-provided material; no guarantees, fees, case outcomes, or individualized legal advice.
- Preserve the user’s unrelated `app/favicon.ico` worktree change.

---

## File structure

- `lib/content.ts` — team, process, and FAQ data alongside existing practice-area data.
- `components/practice-areas-carousel.tsx` — client-side accessible Home carousel with service links.
- `components/process-section.tsx` — server-rendered four-step process section.
- `components/team-section.tsx` — server-rendered verified three-person roster.
- `components/rockville-story-section.tsx` — server-rendered 2004/2018 timeline narrative.
- `components/faq-section.tsx` — client-side accessible Home FAQ accordion.
- `app/page.tsx` — exact approved Home section composition.
- `app/about/page.tsx` — exact approved About composition.
- `app/team/page.tsx` — use verified roster; remove the inaccurate profile-placeholder claim and generic “team” portrait.
- Component tests and `app/revamp.test.tsx` — semantic and order coverage.

### Task 1: Add verified reusable content and section-order regression coverage

**Files:**
- Modify: `lib/content.ts`
- Modify: `app/revamp.test.tsx`

**Interfaces:**
- Produces `teamMembers`, `processSteps`, and `faqItems` arrays used by tasks 2–5.
- Produces exact expected `data-home-section` and `data-about-section` sequences for tasks 6–7.

- [ ] **Step 1: Write the failing route-order assertions**

```tsx
assert.deepEqual(sectionOrder(html, "home"), [
  "hero", "about", "service", "process", "team", "story", "values", "consultation", "faq",
]);
assert.deepEqual(sectionOrder(html, "about"), [
  "hero", "about", "service", "process", "team", "consultation",
]);
```

- [ ] **Step 2: Run the route test to verify it fails**

Run: `npm test -- app/revamp.test.tsx`

Expected: FAIL because Home does not yet provide `story`, `values`, or `faq` markers.

- [ ] **Step 3: Add typed profile-derived content**

```ts
export const teamMembers = [
  { name: "Rufus C. Okoli", role: "Founder & Principal Partner", summary: "..." },
  { name: "Ngozi R. Okoli", role: "Partner", summary: "..." },
  { name: "Dr. Nosike Agokei", role: "Consultant", summary: "..." },
] as const;

export const processSteps = [
  { number: "01", title: "Initial consultation", body: "..." },
  { number: "02", title: "Matter assessment", body: "..." },
  { number: "03", title: "Tailored strategy", body: "..." },
  { number: "04", title: "Representation & resolution", body: "..." },
] as const;
```

Add six FAQ entries limited to contacting the firm, consultation, services, property, corporate/commercial support, and resolving disputes. Their answers must not promise results or add unsupported commercial terms.

- [ ] **Step 4: Run the route test to verify the expected partial failure remains**

Run: `npm test -- app/revamp.test.tsx`

Expected: FAIL only on missing route markers; content data itself has no runtime regression.

- [ ] **Step 5: Commit the content foundation and regression test**

```bash
git add lib/content.ts app/revamp.test.tsx
git commit -m "test: define revised editorial page order"
```

### Task 2: Create the accessible Practice Areas carousel

**Files:**
- Create: `components/practice-areas-carousel.tsx`
- Create: `components/practice-areas-carousel.test.tsx`

**Interfaces:**
- Consumes: `practiceAreas` from `lib/content.ts`.
- Produces: `PracticeAreasCarousel`, rendered by `app/page.tsx` in Task 6.

- [ ] **Step 1: Write the failing carousel semantics test**

```tsx
const html = renderToStaticMarkup(<PracticeAreasCarousel />);
assert.equal((html.match(/data-practice-carousel-card=/g) ?? []).length, practiceAreas.length);
assert.match(html, /href="\/services\/company-secretary-compliance"/);
assert.match(html, /aria-label="Previous practice areas"/);
assert.match(html, /aria-label="Next practice areas"/);
```

- [ ] **Step 2: Run the component test to verify it fails**

Run: `npm test -- components/practice-areas-carousel.test.tsx`

Expected: FAIL with module-not-found for `practice-areas-carousel`.

- [ ] **Step 3: Implement the minimal client carousel**

```tsx
"use client";

export function PracticeAreasCarousel() {
  const railRef = useRef<HTMLDivElement>(null);
  const move = (direction: -1 | 1) => {
    railRef.current?.scrollBy({ left: direction * railRef.current.clientWidth * 0.82, behavior: "smooth" });
  };
  // Render each area as <Link href={`/services/${area.slug}`}>…</Link>.
}
```

Use a labelled `section`, a horizontally scrollable rail with `snap-x`, semantic links, and previous/next `<button type="button">` controls. Maintain disabled state from measured scroll position using `onScroll`, and honour reduced-motion by using instant scrolling when reduced motion is preferred. Use `text-brand-blue-light` only on dark backgrounds and official blue on paper cards.

- [ ] **Step 4: Run the component test to verify it passes**

Run: `npm test -- components/practice-areas-carousel.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit the carousel**

```bash
git add components/practice-areas-carousel.tsx components/practice-areas-carousel.test.tsx
git commit -m "feat: add practice areas carousel"
```

### Task 3: Build the process, team, and Rockville story sections

**Files:**
- Create: `components/process-section.tsx`
- Create: `components/process-section.test.tsx`
- Create: `components/team-section.tsx`
- Create: `components/team-section.test.tsx`
- Create: `components/rockville-story-section.tsx`
- Create: `components/rockville-story-section.test.tsx`

**Interfaces:**
- Consumes: `processSteps` and `teamMembers` from `lib/content.ts`.
- Produces: `ProcessSection`, `TeamSection`, and `RockvilleStorySection` for the route composition in Tasks 6–7.

- [ ] **Step 1: Write failing section-content tests**

```tsx
assert.match(renderToStaticMarkup(<ProcessSection />), /Initial consultation/);
assert.match(renderToStaticMarkup(<TeamSection />), /Our team/);
assert.match(renderToStaticMarkup(<TeamSection />), /Founder &amp; Principal Partner/);
assert.match(renderToStaticMarkup(<RockvilleStorySection />), /June 2018/);
assert.match(renderToStaticMarkup(<RockvilleStorySection />), /Rufus Okoli &amp; Associates/);
assert.doesNotMatch(renderToStaticMarkup(<RockvilleStorySection />), /founded Rockville LP in 2004/i);
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- components/process-section.test.tsx components/team-section.test.tsx components/rockville-story-section.test.tsx`

Expected: FAIL with module-not-found errors for the new sections.

- [ ] **Step 3: Implement the three server components**

```tsx
export function ProcessSection() {
  return <section aria-labelledby="process-heading">{/* ordered processSteps */}</section>;
}

export function TeamSection() {
  return <section aria-labelledby="team-heading">{/* three textual member profiles; no portrait */}</section>;
}

export function RockvilleStorySection() {
  return <section aria-labelledby="rockville-story-heading">{/* 2004 → June 2018 timeline */}</section>;
}
```

Use a numbered ordered list for the process. Use an editorial three-column roster for Team and a purposeful visual timeline with text labels “2004” and “June 2018” for the Rockville Story. Do not import `next/image` into Team or Story unless an approved, non-person visual is used.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test -- components/process-section.test.tsx components/team-section.test.tsx components/rockville-story-section.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit the server-rendered sections**

```bash
git add components/process-section.tsx components/process-section.test.tsx components/team-section.tsx components/team-section.test.tsx components/rockville-story-section.tsx components/rockville-story-section.test.tsx
git commit -m "feat: add process team and Rockville story sections"
```

### Task 4: Create the accessible profile-based FAQ section

**Files:**
- Create: `components/faq-section.tsx`
- Create: `components/faq-section.test.tsx`

**Interfaces:**
- Consumes: `faqItems` from `lib/content.ts`.
- Produces: `FaqSection`, rendered by `app/page.tsx` in Task 6.

- [ ] **Step 1: Write the failing FAQ semantics test**

```tsx
const html = renderToStaticMarkup(<FaqSection />);
assert.match(html, /Help &amp; FAQs/);
assert.equal((html.match(/aria-expanded=/g) ?? []).length, faqItems.length);
assert.equal((html.match(/aria-controls=/g) ?? []).length, faqItems.length);
assert.match(html, /How do I begin a conversation with Rockville LP\?/);
```

- [ ] **Step 2: Run the FAQ test to verify it fails**

Run: `npm test -- components/faq-section.test.tsx`

Expected: FAIL with module-not-found for `faq-section`.

- [ ] **Step 3: Implement the FAQ client component**

```tsx
"use client";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return <section aria-labelledby="faq-heading">{/* FAQ buttons and controlled panels */}</section>;
}
```

Render each question as a `button` with `aria-expanded` and stable `aria-controls`/panel `id`. Keep the first answer expanded initially. Animate only opacity and grid-row height under `motion-reduce:transition-none`; do not hide answer text from the DOM when it is open. Use an architectural, non-person image only if an existing site image supports the composition.

- [ ] **Step 4: Run the FAQ test to verify it passes**

Run: `npm test -- components/faq-section.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit the FAQ section**

```bash
git add components/faq-section.tsx components/faq-section.test.tsx
git commit -m "feat: add profile-based FAQ section"
```

### Task 5: Update the Team route to verified team content

**Files:**
- Modify: `app/team/page.tsx`
- Modify: `app/revamp.test.tsx`

**Interfaces:**
- Consumes: `TeamSection` from Task 3.
- Produces: `/team` without an inaccurate “profiles are being prepared” claim.

- [ ] **Step 1: Write the failing Team-page assertions**

```tsx
assert.match(html, /Rufus C. Okoli/);
assert.match(html, /Ngozi R. Okoli/);
assert.match(html, /Dr. Nosike Agokei/);
assert.doesNotMatch(html, /Team profiles are being prepared/);
assert.doesNotMatch(html, /Founding partners portrait placeholder/);
```

- [ ] **Step 2: Run the route test to verify it fails**

Run: `npm test -- app/revamp.test.tsx`

Expected: FAIL because the current page says profiles are being prepared.

- [ ] **Step 3: Replace the placeholder section**

```tsx
<EditorialHero ... image="/images/lagos-office.jpg" imageAlt="Rockville LP office architecture" ... />
<TeamSection />
```

Retain an office or architectural visual in the hero, but remove `founders-placeholder.jpg` and its named-team implication. Follow the verified textual roster and offer the existing consultation path.

- [ ] **Step 4: Run the route test to verify it passes**

Run: `npm test -- app/revamp.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit the Team route correction**

```bash
git add app/team/page.tsx app/revamp.test.tsx
git commit -m "feat: publish verified team roster"
```

### Task 6: Compose the approved Home page

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/revamp.test.tsx`

**Interfaces:**
- Consumes: `PracticeAreasCarousel`, `ProcessSection`, `TeamSection`, `RockvilleStorySection`, `ValuesSection`, `FaqSection`, and `ConsultationBanner`.
- Produces: the exact approved nine-section Home sequence.

- [ ] **Step 1: Confirm the failing Home-order test from Task 1**

Run: `npm test -- app/revamp.test.tsx`

Expected: FAIL because Home still ends after the current Team and Consultation sections.

- [ ] **Step 2: Replace Home composition with explicit markers**

```tsx
<div data-home-section="hero"><EditorialHero ... /></div>
<section data-home-section="about">...</section>
<div data-home-section="service"><PracticeAreasCarousel /></div>
<div data-home-section="process"><ProcessSection /></div>
<div data-home-section="team"><TeamSection /></div>
<div data-home-section="story"><RockvilleStorySection /></div>
<div data-home-section="values"><ValuesSection /></div>
<div data-home-section="consultation"><ConsultationBanner /></div>
<div data-home-section="faq"><FaqSection /></div>
```

Adapt the current Home introduction into the approved editorial About section. Remove the embedded “How we work”/core-value block because Process and Values now have dedicated components. Do not render `FounderSection`.

- [ ] **Step 3: Run the route test to verify it passes**

Run: `npm test -- app/revamp.test.tsx`

Expected: PASS with the full nine-marker Home sequence.

- [ ] **Step 4: Commit the Home composition**

```bash
git add app/page.tsx app/revamp.test.tsx
git commit -m "feat: compose revised Rockville homepage"
```

### Task 7: Compose the approved About page

**Files:**
- Modify: `app/about/page.tsx`
- Modify: `app/revamp.test.tsx`

**Interfaces:**
- Consumes: `StickyServices`, `ProcessSection`, `TeamSection`, and `ConsultationBanner`.
- Produces: the exact approved six-section About sequence.

- [ ] **Step 1: Confirm the About-order assertion is present**

Run: `npm test -- app/revamp.test.tsx`

Expected: PASS for its six-marker sequence after replacing its process and team implementations.

- [ ] **Step 2: Replace About’s process and team components**

```tsx
<div data-about-section="service"><StickyServices /></div>
<div data-about-section="process"><ProcessSection /></div>
<div data-about-section="team"><TeamSection /></div>
<div data-about-section="consultation"><ConsultationBanner /></div>
```

Keep the current mission and vision treatment inside the single `about` marker. Do not add Story, Values, or FAQs to About.

- [ ] **Step 3: Run the route test to verify it passes**

Run: `npm test -- app/revamp.test.tsx`

Expected: PASS with exactly Hero, About, Service, Process, Team, Consultation.

- [ ] **Step 4: Commit the About composition**

```bash
git add app/about/page.tsx app/revamp.test.tsx
git commit -m "feat: align About page composition"
```

### Task 8: Run complete verification and visual QA

**Files:**
- Modify only if required by a discovered defect: the component or route that caused it.

**Interfaces:**
- Consumes: the completed Home, About, and Team routes.
- Produces: verified desktop and mobile behavior.

- [ ] **Step 1: Run automated checks**

Run: `npm test && npm run lint && npm run build`

Expected: all tests pass, lint exits zero, and Next production build succeeds.

- [ ] **Step 2: Start the development server**

Run: `npm run dev`

Expected: Next dev server reports a local URL.

- [ ] **Step 3: Check routes in the runtime browser**

Inspect `/`, `/about`, and `/team` at desktop and 390 px wide. Confirm the Home section order, service-card destination links, carousel controls, FAQ toggle behavior, Team labels, and 2004/2018 timeline copy.

- [ ] **Step 4: Run accessibility inspection**

Run an axe scan at desktop and 390 px wide for `/` and `/about`.

Expected: zero accessibility violations; verify keyboard focus is visible on carousel controls, service links, FAQ buttons, and consultation links.

- [ ] **Step 5: Commit any narrowly scoped QA fix**

```bash
git add <only-the-files-fixed>
git commit -m "fix: polish editorial page responsiveness"
```

