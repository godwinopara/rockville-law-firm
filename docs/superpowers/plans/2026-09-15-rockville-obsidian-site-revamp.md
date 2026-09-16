# Rockville Obsidian Site Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild all five Rockville public pages into one responsive, GSAP-enhanced obsidian luxury editorial site.

**Architecture:** A typed content layer continues to provide verified firm data. Shared server-rendered sections compose each route, while a small client-only GSAP reveal component handles entrance, scroll, parallax, and sticky-services behavior with a reduced-motion escape hatch.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, GSAP/ScrollTrigger, next/image, Lucide.

**Spec:** `docs/superpowers/specs/2026-09-15-rockville-obsidian-site-revamp-design.md`

## Global Constraints

- Preserve only verified Rockville details; do not create people, metrics, awards, firm age, cases, prices, or turnaround claims.
- Use Fraunces for display and DM Sans for body/interface copy.
- Use `#121212`, `#F9F9F9`, and `#D4AF37` as the canonical obsidian, off-white, and gold system.
- Every animation must be fully disabled under `prefers-reduced-motion: reduce`.
- Keep the five existing routes and local, replaceable imagery.

---

### Task 1: Install GSAP and establish revamp tokens

**Files:**
- Modify: `package.json`, `package-lock.json`, `app/globals.css`, `DESIGN.md`
- Create: `components/motion-reveal.tsx`, `components/motion-reveal.test.ts`

**Interfaces:**
- Produces `MotionReveal({ children, variant, className })`, where `variant` is `"hero" | "section" | "media"`.

- [ ] **Step 1: Install GSAP**

Run: `npm install gsap`

- [ ] **Step 2: Write the failing motion-component test**

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MotionReveal } from "./motion-reveal";
test("renders revealed content without requiring animation", () => {
  assert.match(renderToStaticMarkup(<MotionReveal variant="section"><p>Rockville</p></MotionReveal>), /Rockville/);
});
```

- [ ] **Step 3: Run it and confirm it fails**

Run: `npm test -- components/motion-reveal.test.ts`

Expected: module-not-found failure for `motion-reveal`.

- [ ] **Step 4: Implement tokens and MotionReveal**

Add obsidian/off-white/gold CSS variables and Tailwind mappings. Implement a `"use client"` wrapper using `gsap.context`, `useLayoutEffect`, and `window.matchMedia("(prefers-reduced-motion: reduce)")`; use clip-path/text translate for hero and section variants and scale/translate for media. Return children unchanged under reduced motion.

- [ ] **Step 5: Verify and commit**

Run: `npm test -- components/motion-reveal.test.ts && npm run lint && npm run build`

```bash
git add package.json package-lock.json app/globals.css DESIGN.md components/motion-reveal.tsx components/motion-reveal.test.ts
git commit -m "feat: add Rockville motion system and obsidian tokens"
```

### Task 2: Rebuild shared chrome and home hero

**Files:**
- Modify: `components/site-header.tsx`, `components/site-footer.tsx`, `app/page.tsx`
- Create: `components/hero-visual.tsx`, `components/practice-grid.tsx`

**Interfaces:**
- Consumes `practiceAreas`, `primaryNavigation`, and `contactDetails` from `lib/content.ts`.
- Produces `HeroVisual` and `PracticeGrid` with semantic links.

- [ ] **Step 1: Write the failing home render test**

Create `app/home-revamp.test.tsx`; assert rendered markup contains `Book consultation`, `Practice areas`, and `Company Secretary / Compliance`.

- [ ] **Step 2: Run the test**

Run: `npm test -- app/home-revamp.test.tsx`

Expected: FAIL because the new hero copy is absent.

- [ ] **Step 3: Implement the home rebuild**

Make the hero edge-to-edge obsidian with one local architecture image, narrow left copy column, massive Fraunces proposition, and only one primary CTA. Render practices as a 1/2/3-column bordered grid; each row uses `MotionReveal` and a directional link. Add a `HeroVisual` media wrapper with a nonessential GSAP scale reveal.

- [ ] **Step 4: Verify and commit**

Run: `npm test -- app/home-revamp.test.tsx && npm run lint && npm run build`

```bash
git add app/page.tsx components/site-header.tsx components/site-footer.tsx components/hero-visual.tsx components/practice-grid.tsx app/home-revamp.test.tsx
git commit -m "feat: rebuild Rockville home and shared chrome"
```

### Task 3: Rebuild About and Team stories

**Files:**
- Modify: `app/about/page.tsx`, `components/founder-section.tsx`, `components/values-section.tsx`, `app/team/page.tsx`

- [ ] **Step 1: Write route-render tests**

Assert About renders `The founding partners`, `Integrity in practice`, and `Request a consultation`; assert Team renders `Team profiles are being prepared`.

- [ ] **Step 2: Run the tests**

Run: `npm test -- app/about-revamp.test.tsx app/team-revamp.test.tsx`

Expected: FAIL before revised output is implemented.

- [ ] **Step 3: Implement editorial content pages**

Restyle the existing founder and value sections with the canonical palette and reveal wrappers. Add a slow media parallax only on desktop. Rebuild Team as an obsidian image-led profile placeholder page without fictional biographies.

- [ ] **Step 4: Verify and commit**

Run: `npm test -- app/about-revamp.test.tsx app/team-revamp.test.tsx && npm run lint && npm run build`

```bash
git add app/about/page.tsx app/team/page.tsx components/founder-section.tsx components/values-section.tsx app/about-revamp.test.tsx app/team-revamp.test.tsx
git commit -m "feat: rebuild Rockville firm story pages"
```

### Task 4: Rebuild Services and Contact with page-specific GSAP

**Files:**
- Modify: `app/services/page.tsx`, `app/contact/page.tsx`, `components/contact-form.tsx`
- Create: `components/sticky-services.tsx`

- [ ] **Step 1: Write failing behavior tests**

Test `StickyServices` static render includes all ten practice titles; test `validateContactForm` still rejects empty name, invalid email, and empty message.

- [ ] **Step 2: Run the tests**

Run: `npm test -- components/sticky-services.test.tsx lib/form.test.ts`

Expected: StickyServices test fails because component does not exist.

- [ ] **Step 3: Implement page rebuilds**

Implement desktop-only `ScrollTrigger` pinning for the service index/media panel and a fully visible stacked mobile fallback. Restyle Contact into obsidian hero, off-white form surface, and correctly labelled fields. Keep `mailto:` handoff and noValidate validation behavior unchanged.

- [ ] **Step 4: Verify and commit**

Run: `npm test -- components/sticky-services.test.tsx lib/form.test.ts && npm run lint && npm run build`

```bash
git add app/services/page.tsx app/contact/page.tsx components/contact-form.tsx components/sticky-services.tsx components/sticky-services.test.tsx lib/form.test.ts
git commit -m "feat: rebuild Rockville services and contact"
```

### Task 5: Browser, motion, and accessibility verification

- [ ] **Step 1: Start the local app**

Run: `npm run dev`

- [ ] **Step 2: Verify each route**

At desktop and narrow mobile widths, visit `/`, `/about`, `/team`, `/services`, and `/contact`; confirm local imagery loads, links resolve, no horizontal overflow occurs, and every important section is readable without motion.

- [ ] **Step 3: Verify motion and accessibility**

Confirm hero masks, section reveals, media parallax, and services pin run on desktop. Enable reduced motion and confirm every section appears immediately. Use keyboard navigation for menu, service controls, CTAs, and form; run `agent-browser a11y --tags wcag2a,wcag2aa` on Home, About, Services, and Contact.

- [ ] **Step 4: Run final suite and commit fixes**

Run: `npm test && npm run lint && npm run build`

```bash
git add app components lib public DESIGN.md
git commit -m "fix: polish Rockville obsidian experience"
```
