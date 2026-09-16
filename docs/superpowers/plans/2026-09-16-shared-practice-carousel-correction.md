# Shared Practice Carousel Correction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the Process section’s existing sticky-list composition, build the approved image-led shared Practice Areas carousel across Home, About, and service detail pages, and reshape Home’s About section to the approved editorial split layout.

**Architecture:** Keep `ProcessSection` and `PracticeAreasCarousel` as focused reusable components. `PracticeAreasCarousel` receives presentational copy and an optional excluded slug, derives its cards from shared practice-area data, and is the sole carousel used in Home, About, and service-detail “Other Services” contexts. A dedicated `HomeAboutSection` owns the Home-only editorial split structure.

**Tech Stack:** Next.js 16.3.5 App Router, React 19.2.8, TypeScript, Tailwind CSS 4, Next Image, Lucide React, Unsplash image assets, Node test runner via `tsx --test`.

**Spec:** `docs/superpowers/specs/2026-09-16-home-about-editorial-structure-design.md`

## Global Constraints

- Keep the exact approved Home and About section sequences.
- Keep the existing square Previous/Next controls; do not use circular controls.
- Use `#2B3F61` for the card hover/focus panel sweep and off-white text over that panel.
- The carousel desktop layout is left-side editorial copy and controls with the card rail on the right; mobile stacks copy, controls, then touch-scrollable rail.
- Use an Unsplash legal-office image with people only as unlabelled generic editorial imagery; never identify people as Rockville staff.
- Practice-area cards use relevant Unsplash images, local copies in `public/images/practice-areas/`, and source metadata in `lib/content.ts`.
- The image sweep is available on pointer hover and keyboard focus; touch and reduced-motion users do not depend on animation to access content.
- Related Services excludes the active service and retains direct service-page links.
- Preserve the user’s unrelated `app/favicon.ico` and `public/images/logo.png` changes.

---

## File structure

- `lib/content.ts` — extend practice-area image metadata and export generic Home About visual metadata.
- `public/images/practice-areas/*.jpg` — locally stored Unsplash images for each practice area.
- `components/practice-areas-carousel.tsx` — shared configurable carousel; client boundary limited to controls and scroll state.
- `components/process-section.tsx` — sticky intro plus ruled process list.
- `components/home-about-section.tsx` — Home-only editorial About split layout.
- `app/page.tsx` — renders `HomeAboutSection` and the shared carousel.
- `app/about/page.tsx` — uses the shared carousel in its Service section.
- `app/services/[slug]/page.tsx` — replaces local Related Services grid with the shared carousel excluding the active slug.
- `next.config.ts` — only if using remote image URLs rather than downloaded assets; local assets are preferred.
- Tests — carousel contexts/omission, Home About content, and Process structural regression checks.

### Task 1: Add visual asset data and selected Unsplash files

**Files:**
- Modify: `lib/content.ts`
- Create: `public/images/practice-areas/company-secretary-compliance.jpg`
- Create: `public/images/practice-areas/intellectual-property-law.jpg`
- Create: `public/images/practice-areas/real-estate-property-law.jpg`
- Create: `public/images/practice-areas/corporate-law.jpg`
- Create: `public/images/practice-areas/due-diligence.jpg`
- Create: `public/images/practice-areas/litigation.jpg`
- Create: `public/images/practice-areas/legal-opinion.jpg`
- Create: `public/images/practice-areas/general-counsel.jpg`
- Create: `public/images/practice-areas/debt-recovery-restructuring.jpg`
- Create: `public/images/practice-areas/alternative-dispute-resolution.jpg`
- Create: `public/images/home-about-legal-office.jpg`
- Test: `lib/content.test.ts`

**Interfaces:**
- Produces `PracticeArea.image: { src: string; alt: string; sourceUrl: string }` consumed by `PracticeAreasCarousel`.
- Produces `homeAboutVisual` consumed by `HomeAboutSection`.

- [ ] **Step 1: Write a failing content assertion**

```ts
assert.equal(practiceAreas.every((area) => area.image.src.startsWith("/images/practice-areas/")), true);
assert.equal(practiceAreas.every((area) => area.image.sourceUrl.includes("unsplash.com")), true);
assert.match(homeAboutVisual.src, /^\/images\/home-about-legal-office\.jpg$/);
```

- [ ] **Step 2: Run the content test to verify it fails**

Run: `npm test -- lib/content.test.ts`

Expected: FAIL because `PracticeArea` has no `image` field and `homeAboutVisual` is not exported.

- [ ] **Step 3: Source and store image assets**

Use Unsplash search to choose ten practice-area-appropriate images and one generic legal-office image. Download each asset into the listed `public/images` paths; select scene-oriented images without logos, recognisable third-party brands, or named people. Add a concise descriptive `alt` and canonical Unsplash `sourceUrl` to each area’s image object. Add:

```ts
export const homeAboutVisual = {
  src: "/images/home-about-legal-office.jpg",
  alt: "Legal professionals meeting in an office",
  sourceUrl: "https://unsplash.com",
} as const;
```

- [ ] **Step 4: Run the content test to verify it passes**

Run: `npm test -- lib/content.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit the visual assets and metadata**

```bash
git add lib/content.ts lib/content.test.ts public/images/practice-areas public/images/home-about-legal-office.jpg
git commit -m "feat: add practice area image assets"
```

### Task 2: Redesign the shared Practice Areas carousel

**Files:**
- Modify: `components/practice-areas-carousel.tsx`
- Modify: `components/practice-areas-carousel.test.tsx`

**Interfaces:**
- Consumes: `practiceAreas` including image metadata from Task 1.
- Produces:

```ts
type PracticeAreasCarouselProps = {
  eyebrow: string;
  title: string;
  description: string;
  excludeSlug?: string;
};
```

- [ ] **Step 1: Write failing carousel-context and interaction assertions**

```tsx
const html = renderToStaticMarkup(
  <PracticeAreasCarousel eyebrow="Other services" title="Continue exploring" description="Explore other areas of law in which Rockville LP provides considered, practical support." excludeSlug="litigation" />,
);
assert.equal((html.match(/data-practice-carousel-card=/g) ?? []).length, practiceAreas.length - 1);
assert.doesNotMatch(html, /data-practice-carousel-card="06"/);
assert.match(html, /data-practice-carousel-layout="split"/);
assert.match(html, /group-hover:translate-y-full/);
assert.match(html, /group-focus-within:translate-y-full/);
```

- [ ] **Step 2: Run the carousel test to verify it fails**

Run: `npm test -- components/practice-areas-carousel.test.tsx`

Expected: FAIL because the component lacks required props, exclusion, split-layout marker, and blue-sweep classes.

- [ ] **Step 3: Implement the configurable carousel**

```tsx
export function PracticeAreasCarousel({ eyebrow, title, description, excludeSlug }: PracticeAreasCarouselProps) {
  const areas = practiceAreas.filter((area) => area.slug !== excludeSlug);
  return <section data-practice-carousel-layout="split">{/* left copy/controls; right rail */}</section>;
}
```

On desktop use a `lg:grid-cols-[minmax(19rem,.62fr)_minmax(0,1.38fr)]` parent. Keep controls below the left description and preserve their existing square dimensions. Each rail card uses `Image` with the matching area image, a translucent ink overlay, and an absolutely positioned `bg-brand-blue` panel initially translated above the card. Apply `group-hover:translate-y-full` and `group-focus-within:translate-y-full` to move it down on hover/focus, revealing it as the card surface. Add `motion-reduce:transition-none` and a stable blue treatment for non-hover interactions. Keep the existing semantic group/region roles and disabled scroll controls.

- [ ] **Step 4: Run the carousel test to verify it passes**

Run: `npm test -- components/practice-areas-carousel.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit the shared carousel redesign**

```bash
git add components/practice-areas-carousel.tsx components/practice-areas-carousel.test.tsx
git commit -m "feat: redesign shared practice carousel"
```

### Task 3: Restore the Process section’s sticky-list composition

**Files:**
- Modify: `components/process-section.tsx`
- Modify: `components/process-section.test.tsx`

**Interfaces:**
- Consumes: `processSteps` from `lib/content.ts`.
- Produces: unchanged `ProcessSection` component, used by Home and About.

- [ ] **Step 1: Write the failing layout regression assertion**

```tsx
const html = renderToStaticMarkup(<ProcessSection />);
assert.match(html, /data-process-layout="sticky-list"/);
assert.match(html, /lg:sticky/);
assert.match(html, /border-t border-line/);
assert.match(html, /Initial consultation/);
```

- [ ] **Step 2: Run the Process test to verify it fails**

Run: `npm test -- components/process-section.test.tsx`

Expected: FAIL because the current Process component has no sticky-list marker or sticky left column.

- [ ] **Step 3: Implement the original Practice Areas-style structure**

```tsx
<section data-process-layout="sticky-list" className="bg-paper">
  <div className="page-shell section-space grid gap-14 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
    <div className="self-start lg:sticky lg:top-32">{/* process eyebrow, title, intro */}</div>
    <ol className="border-t border-line">{/* numbered ruled processSteps */}</ol>
  </div>
</section>
```

Use the same left/right reading rhythm as `StickyServices`; preserve the process-specific heading and the four approved steps. Do not introduce image panels or carousel behavior here.

- [ ] **Step 4: Run the Process test to verify it passes**

Run: `npm test -- components/process-section.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit the Process layout correction**

```bash
git add components/process-section.tsx components/process-section.test.tsx
git commit -m "fix: restore sticky process layout"
```

### Task 4: Build the Home About editorial split component

**Files:**
- Create: `components/home-about-section.tsx`
- Create: `components/home-about-section.test.tsx`
- Modify: `app/page.tsx`
- Modify: `app/revamp.test.tsx`

**Interfaces:**
- Consumes: `homeAboutVisual` from Task 1.
- Produces: `HomeAboutSection`, rendered only under the Home `data-home-section="about"` marker.

- [ ] **Step 1: Write failing content and structural tests**

```tsx
const html = renderToStaticMarkup(<HomeAboutSection />);
assert.match(html, /Refined advocacy for complex matters/);
assert.match(html, /Our team/);
assert.match(html, /Contact us/);
assert.equal((html.match(/data-home-about-proof=/g) ?? []).length, 3);
assert.match(html, /Legal professionals meeting in an office/);
```

- [ ] **Step 2: Run the Home About test to verify it fails**

Run: `npm test -- components/home-about-section.test.tsx`

Expected: FAIL with module-not-found for `home-about-section`.

- [ ] **Step 3: Implement the Home-only split layout and compose it**

```tsx
export function HomeAboutSection() {
  return <section className="bg-paper">{/* content column; image column; proof point list */}</section>;
}
```

Use a wide desktop grid with left content and a tall image. The content contains an eyebrow, a firm-profile-based editorial heading, two brief paragraphs, `Link href="/team"` primary action, `Link href="/contact"` secondary action, and three semantic list items. On mobile render content, actions, image, then proof points. Replace the inline Home About markup with `<HomeAboutSection />` without changing the `data-home-section="about"` wrapper.

- [ ] **Step 4: Run the Home About and route-order tests to verify they pass**

Run: `npm test -- components/home-about-section.test.tsx app/revamp.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit the Home About redesign**

```bash
git add components/home-about-section.tsx components/home-about-section.test.tsx app/page.tsx app/revamp.test.tsx
git commit -m "feat: redesign homepage About section"
```

### Task 5: Use the shared carousel in all approved contexts

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/services/[slug]/page.tsx`
- Modify: `app/revamp.test.tsx`
- Modify: `app/services/service-detail-page.test.tsx`

**Interfaces:**
- Consumes: `PracticeAreasCarousel` from Task 2.
- Produces: Home and About practice-area rails plus service-detail “Other Services” rail.

- [ ] **Step 1: Write failing shared-usage assertions**

```tsx
assert.match(renderToStaticMarkup(<Home />), /data-practice-carousel-layout="split"/);
assert.match(renderToStaticMarkup(<About />), /data-practice-carousel-layout="split"/);
const html = await renderServiceDetail("litigation");
assert.match(html, /Other services/);
assert.doesNotMatch(html, /data-practice-carousel-card="06"/);
assert.match(html, /href="\/services\/company-secretary-compliance"/);
```

- [ ] **Step 2: Run the route tests to verify they fail**

Run: `npm test -- app/revamp.test.tsx app/services/service-detail-page.test.tsx`

Expected: FAIL because About still renders `StickyServices`, and the detail route still renders its local related-service grid.

- [ ] **Step 3: Replace all local presentations with the shared component**

```tsx
<PracticeAreasCarousel eyebrow="Practice areas" title="Confidence, resilience, and strategic precision." description="Rockville LP provides focused legal support for businesses, institutions, and individuals facing consequential decisions." />
<PracticeAreasCarousel eyebrow="Other services" title="Continue exploring." description="Explore other areas of Rockville LP’s practice." excludeSlug={area.slug} />
```

Use the Home and About copy appropriate to each page. Remove the unused `StickyServices` import from About and `getRelatedPracticeAreas` plus its local card grid from the service detail route. Keep the Service detail page’s section landmark and “View all services” link, but place them in or alongside the carousel’s configured left column rather than duplicating a second header.

- [ ] **Step 4: Run the route tests to verify they pass**

Run: `npm test -- app/revamp.test.tsx app/services/service-detail-page.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit the shared carousel adoption**

```bash
git add app/page.tsx app/about/page.tsx 'app/services/[slug]/page.tsx' app/revamp.test.tsx app/services/service-detail-page.test.tsx
git commit -m "feat: share practice carousel across service pages"
```

### Task 6: Verify visual behavior and accessibility

**Files:**
- Modify only if a verified defect is discovered in the responsible component or route.

**Interfaces:**
- Consumes: completed components and routes.
- Produces: desktop/mobile proof that all three carousel contexts work as designed.

- [ ] **Step 1: Run automated verification**

Run: `npm test && npm run lint && npm run build`

Expected: all tests pass, lint exits zero, and the production build succeeds.

- [ ] **Step 2: Start Next development server and inspect live runtime state**

Run: `npm run dev -- --port 3001`

Use `/ _next/mcp` `get_compilation_issues` and `get_errors` (without the space in the actual path) to confirm empty issue arrays.

- [ ] **Step 3: Verify interactive desktop behavior**

At `/`, `/about`, and `/services/litigation`, verify desktop layout has left copy/controls and a right rail; square controls scroll the rail; card links navigate; service detail omits Litigation; hover and keyboard focus trigger the Rockville-blue vertical sweep; no content becomes unreadable.

- [ ] **Step 4: Verify responsive and accessible behavior**

At 390px width, verify normal page width, content/control/rail stacking, touch scrolling, and natural Home About reading order. Run axe checks at desktop and mobile for `/`, `/about`, and one service detail route. Expected: zero violations; document any image-overlay contrast checks as manual review only when the overlay prevents automated background determination.
