# Shared Hero Slider Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give every Rockville page hero an automatic, accessible three-image slider while preserving each page's current content hierarchy.

**Architecture:** A focused client `HeroBackgroundSlider` owns automatic cycling, image transitions, pause behavior, reduced-motion behavior, and the passive progress indicator. `EditorialHero` and the service-detail hero remain responsible for their different semantic content structures and each pass page-relevant local image data into the shared slider.

**Tech Stack:** Next.js 16, React, TypeScript, `next/image`, Tailwind CSS v4, Node test runner, GSAP only for existing content reveals.

**Spec:** `docs/superpowers/specs/2026-09-18-shared-hero-slider-design.md`

## Global Constraints

- Use only locally stored images in `public/images`; do not introduce external image requests.
- Use exactly three ordered images for every hero configuration.
- Cycle automatically every 6 seconds with a 700ms crossfade and restrained image scale.
- Do not add manual previous/next controls.
- Keep existing hero copy, CTA destinations, and service-detail back navigation unchanged.
- Pause automatic cycling when hovered or focus is inside the hero.
- Respect `prefers-reduced-motion: reduce` by retaining the first slide with no timer or transform.
- Preserve readable text contrast using the existing dark hero overlay and Rockville blue `#2B3F61` / light-blue accent system.

---

### Task 1: Create the shared background-slider behavior

**Files:**
- Create: `components/hero-background-slider.tsx`
- Create: `components/hero-background-slider.test.tsx`

**Interfaces:**
- Consumes: `HeroSlide = { image: string; alt: string }` from its local module.
- Produces: `HeroBackgroundSlider({ slides, priority? }: { slides: HeroSlide[]; priority?: boolean })` for both hero layouts.

- [ ] **Step 1: Write the failing test**

```tsx
const slides = [
  { image: "/images/lagos-office.jpg", alt: "Office interior" },
  { image: "/images/firm/reception.jpg", alt: "Firm reception" },
  { image: "/images/firm/conference-library.jpg", alt: "Conference library" },
];
const html = renderToStaticMarkup(<HeroBackgroundSlider slides={slides} />);

assert.match(html, /data-hero-slider="automatic"/);
assert.match(html, /aria-label="Hero slide progress"/);
assert.match(html, /01/);
assert.match(html, /03/);
assert.match(html, /lagos-office\.jpg/);
assert.match(html, /reception\.jpg/);
assert.match(html, /conference-library\.jpg/);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/hero-background-slider.test.tsx`

Expected: FAIL because `HeroBackgroundSlider` does not exist.

- [ ] **Step 3: Write minimal implementation**

```tsx
"use client";

export type HeroSlide = { image: string; alt: string };

export function HeroBackgroundSlider({ slides, priority = false }: { slides: HeroSlide[]; priority?: boolean }) {
  // Hold active slide in state, advance every 6000ms unless paused or reduced motion.
  // Render every Image absolutely; only the active slide has opacity 1 and aria-hidden false.
  // Render a non-interactive `01 — 03` indicator and a timed visual bar.
}
```

Use `useEffect` cleanup for the interval, `matchMedia("(prefers-reduced-motion: reduce)")` for motion preference, and `onMouseEnter`, `onMouseLeave`, `onFocusCapture`, and `onBlurCapture` to control pause state. Use `next/image` with `fill`, priority only for the first slide, and empty alt text for inactive decorative images.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- components/hero-background-slider.test.tsx`

Expected: PASS with the rendered three images and progress marker.

- [ ] **Step 5: Commit**

```bash
git add components/hero-background-slider.tsx components/hero-background-slider.test.tsx
git commit -m "feat: add automatic hero background slider"
```

### Task 2: Move shared page heroes onto the slider

**Files:**
- Modify: `components/editorial-hero.tsx`
- Modify: `app/page.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/services/page.tsx`
- Modify: `app/team/page.tsx`
- Modify: `app/contact/page.tsx`
- Test: `components/editorial-hero.test.tsx`

**Interfaces:**
- Consumes: `HeroBackgroundSlider` and `HeroSlide` from `components/hero-background-slider.tsx`.
- Produces: `EditorialHero` with optional `slides?: HeroSlide[]`, maintaining `image` and `imageAlt` fallback support.

- [ ] **Step 1: Write the failing test**

```tsx
const html = renderToStaticMarkup(
  <EditorialHero
    eyebrow="Example"
    title="Example title"
    description="Example description"
    image="/images/lagos-office.jpg"
    imageAlt="Office interior"
    slides={slides}
  />,
);

assert.match(html, /data-hero-slider="automatic"/);
assert.match(html, /aria-label="Hero slide progress"/);
assert.match(html, /Example title/);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/editorial-hero.test.tsx`

Expected: FAIL because `EditorialHero` does not accept `slides` and does not render the slider.

- [ ] **Step 3: Write minimal implementation**

```tsx
type EditorialHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  slides?: HeroSlide[];
  // existing CTA props
};

const resolvedSlides = slides ?? [{ image, alt: imageAlt }];
```

Replace the direct background `Image` and overlay with `<HeroBackgroundSlider slides={resolvedSlides} priority />`. Pass three locally relevant images on each public page: office/reception/library for Home and About; relevant office/library images for Services and Contact; and team/office imagery for Team. Retain each page's current content and CTA props exactly.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- components/editorial-hero.test.tsx`

Expected: PASS, proving the slider backdrop and hero content render together.

- [ ] **Step 5: Commit**

```bash
git add components/editorial-hero.tsx components/editorial-hero.test.tsx app/page.tsx app/about/page.tsx app/services/page.tsx app/team/page.tsx app/contact/page.tsx
git commit -m "feat: add automatic slides to public page heroes"
```

### Task 3: Apply the same slider foundation to service-detail heroes

**Files:**
- Modify: `app/services/[slug]/page.tsx`
- Modify: `app/services/[slug]/page.test.tsx`

**Interfaces:**
- Consumes: `HeroBackgroundSlider` from `components/hero-background-slider.tsx`.
- Produces: Each service route renders a three-slide service-detail hero while retaining the existing service title, summary, consultation CTA, and “All services” link.

- [ ] **Step 1: Write the failing test**

```tsx
const html = await renderServicePage("corporate-law");

assert.match(html, /data-hero-slider="automatic"/);
assert.match(html, /aria-label="Hero slide progress"/);
assert.match(html, /All services/);
assert.match(html, /Corporate Law/);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- 'app/services/[slug]/page.test.tsx'`

Expected: FAIL because the service-detail hero still renders one direct `Image`.

- [ ] **Step 3: Write minimal implementation**

```tsx
<HeroBackgroundSlider
  priority
  slides={[
    { image: area.image, alt: area.imageAlt },
    { image: "/images/firm/conference-library-wide.jpg", alt: "Rockville LP conference room and legal library" },
    { image: "/images/firm/reception.jpg", alt: "Rockville LP reception area" },
  ]}
/>
```

Remove only the current background `MotionReveal` image and its standalone overlay. Keep the wrapper dimensions, content spacing, back link, heading, summary, CTA, and all sections after the hero unchanged.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- 'app/services/[slug]/page.test.tsx'`

Expected: PASS, confirming service-detail hero copy and automatic slider coexist.

- [ ] **Step 5: Commit**

```bash
git add 'app/services/[slug]/page.tsx' 'app/services/[slug]/page.test.tsx'
git commit -m "feat: add automatic slides to service heroes"
```

### Task 4: Verify production behavior and accessibility

**Files:**
- Modify: `app/globals.css`
- Test: `components/hero-background-slider.test.tsx`

**Interfaces:**
- Consumes: slider classes emitted by `HeroBackgroundSlider`.
- Produces: animation duration, paused state, progress treatment, and reduced-motion fallback styles.

- [ ] **Step 1: Write the failing test**

```tsx
assert.match(html, /group-hover\/hero:.*animation-play-state/);
assert.match(html, /motion-reduce:animate-none/);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/hero-background-slider.test.tsx`

Expected: FAIL because slider pause and reduced-motion classes are absent.

- [ ] **Step 3: Write minimal implementation**

Add named CSS keyframes for the 6-second image drift and progress fill, each scoped beneath `[data-hero-slider="automatic"]`. Use the existing global reduced-motion media query to stop the timer-triggered visual effects and keep the first image visible. Keep the overlay dark enough to preserve current AA-readable hero text across all supplied slides.

- [ ] **Step 4: Run complete verification**

Run:

```bash
npm test
npm run lint
npm run build
```

Expected: all tests pass, lint has no errors, and Next.js completes a production build.

Start `npm run dev -- --port 3005`, then inspect Home, About, Contact, and a service detail at desktop and mobile sizes. Confirm: the progress increments after 6 seconds; copy does not move; no controls appear; focus pauses the cycle; console has no errors; and reduced-motion retains the first slide.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css components/hero-background-slider.tsx components/hero-background-slider.test.tsx
git commit -m "feat: refine accessible hero slider motion"
```
