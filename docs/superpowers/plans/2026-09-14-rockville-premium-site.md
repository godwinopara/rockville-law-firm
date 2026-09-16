# Rockville Premium Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, accessible five-page Rockville Legal Practitioners website from the approved design specification.

**Architecture:** Use Next.js 16 App Router route files that compose shared shell and focused page-section components. Keep repeated, verified firm content in typed local data modules; restrict client components to menu, hero, service-selection, and contact-form behavior. Use local CSS-generated architectural imagery and Tailwind v4 utilities, avoiding image-host configuration and additional animation dependencies.

**Tech Stack:** Next.js 16.3.5, React 19.2.8, TypeScript, Tailwind CSS v4, ESLint 9.

**Spec:** `docs/superpowers/specs/2026-09-14-rockville-premium-site-design.md`

## Global Constraints

- Use only the five routes `/`, `/about`, `/team`, `/services`, and `/contact`.
- Do not invent attorneys, awards, outcomes, clients, metrics, offices, pricing, turnaround times, or legal credentials.
- Use the verified telephone numbers, address, and email verbatim from the spec.
- Use a typeset wordmark and local architectural placeholder treatment because the supplied logo is broken.
- Respect `prefers-reduced-motion`, maintain keyboard operation, and show visible focus states.
- Keep Online Services in `/services` and Publications as an empty-state preview on `/`.
- Run `npm run lint` and `npm run build` after each route-level deliverable.

---

## File Structure

- `app/layout.tsx` — global metadata, font loading, document shell.
- `app/globals.css` — design tokens, global defaults, CSS architectural texture, reduced-motion behavior.
- `app/page.tsx` — server-rendered home composition.
- `app/about/page.tsx`, `app/team/page.tsx`, `app/services/page.tsx`, `app/contact/page.tsx` — five-route App Router architecture.
- `components/site-header.tsx` — responsive accessible navigation and mobile-menu state.
- `components/site-footer.tsx` — verified details and shared secondary navigation.
- `components/page-hero.tsx` — reusable static inner-page hero.
- `components/home-hero.tsx` — controlled three-state home hero.
- `components/practice-areas.tsx` — keyboard-operable practice-area selector.
- `components/contact-form.tsx` — validated email handoff form.
- `components/section-heading.tsx` — consistent label/title/introduction composition.
- `lib/content.ts` — typed contact, navigation, practice-area, online-service, and value data.
- `lib/form.ts` — pure contact-form validation suitable for unit tests.
- `lib/form.test.ts` — Node test coverage for required contact-form rules.
- `package.json`, `package-lock.json` — `tsx` development test runner and `test` script.

### Task 1: Establish the visual foundation and verified content model

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `lib/content.ts`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces `ContactDetails`, `PracticeArea`, `OnlineServiceGroup`, `NavItem`, `contactDetails`, `practiceAreas`, `onlineServiceGroups`, `coreValues`, and `primaryNavigation` from `lib/content.ts`.
- Consumes no project-local interfaces.

- [ ] **Step 1: Add the test runner and test script**

Run: `npm install --save-dev tsx`

Then add `"test": "tsx --test"` to the `scripts` object in `package.json`.

- [ ] **Step 2: Write the failing type check fixture**

Create `lib/content.test.ts` with a Node test that asserts exactly ten practice areas and the expected verified email:

```ts
import test from "node:test";
import assert from "node:assert/strict";
import { contactDetails, practiceAreas } from "./content";

test("exposes verified firm content", () => {
  assert.equal(practiceAreas.length, 10);
  assert.equal(contactDetails.email, "info@rockvillelp.com");
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npx tsx --test lib/content.test.ts`

Expected: FAIL because `lib/content.ts` does not exist.

- [ ] **Step 4: Add the typed, factual content module**

Define the exported interfaces and values. Preserve each service name exactly as specified; use only supplied positioning, core values, contact details, and online-service names. Give each practice area a short, non-factual UI description such as `"Guidance for governance and compliance obligations."`, not an achievement claim. Export `primaryNavigation` with the five approved route hrefs.

- [ ] **Step 5: Run the content test**

Run: `npx tsx --test lib/content.test.ts`

Expected: PASS.

- [ ] **Step 6: Replace starter styling and metadata**

Set global color custom properties for ivory, ink, moss, brass, and muted ink. Add body typography, selection, focus-visible, image-panel texture, and `@media (prefers-reduced-motion: reduce)` rules. Update metadata title to `Rockville Legal Practitioners` and description to the approved positioning; retain the App Router root layout pattern.

- [ ] **Step 7: Verify foundation quality**

Run: `npm run lint && npm run build`

Expected: both commands exit 0.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json app/globals.css app/layout.tsx lib/content.ts lib/content.test.ts
git commit -m "feat: establish Rockville visual foundation"
```

### Task 2: Build the shared navigation, footer, and inner-page hero

**Files:**
- Create: `components/site-header.tsx`
- Create: `components/site-footer.tsx`
- Create: `components/page-hero.tsx`
- Create: `components/section-heading.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes `primaryNavigation` and `contactDetails` from `lib/content.ts`.
- Produces `SiteHeader`, `SiteFooter`, `PageHero`, and `SectionHeading` React components.

- [ ] **Step 1: Write the failing shared-shell render test**

Create `components/shell.test.tsx` that renders `SiteFooter` with React server rendering and asserts the email and both phone numbers occur in the output. Use `renderToStaticMarkup` from `react-dom/server`.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx tsx --test components/shell.test.tsx`

Expected: FAIL because `components/site-footer.tsx` does not exist.

- [ ] **Step 3: Implement the presentation components**

Implement `SectionHeading({ eyebrow, title, copy })`; `PageHero({ eyebrow, title, summary })`; and `SiteFooter()`. Make the footer expose `tel:` links for both numbers and a `mailto:` link. Implement `SiteHeader` as a `"use client"` component: it toggles an `aria-expanded` menu button, locks the visible menu to the primary links plus “Request consultation”, closes when a navigation link is chosen, and uses `Escape` to close.

- [ ] **Step 4: Add header and footer to the root layout**

Render `<SiteHeader />`, `<main id="main-content">{children}</main>`, and `<SiteFooter />` in `app/layout.tsx`; add a visually-hidden skip link that targets `#main-content`.

- [ ] **Step 5: Run the shared-shell test**

Run: `npx tsx --test components/shell.test.tsx`

Expected: PASS.

- [ ] **Step 6: Verify the shared shell**

Run: `npm run lint && npm run build`

Expected: both commands exit 0.

- [ ] **Step 7: Commit**

```bash
git add app/layout.tsx components/site-header.tsx components/site-footer.tsx components/page-hero.tsx components/section-heading.tsx components/shell.test.tsx
git commit -m "feat: add shared Rockville site shell"
```

### Task 3: Implement the cinematic home page

**Files:**
- Create: `components/home-hero.tsx`
- Create: `components/practice-areas.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes `PracticeArea`, `practiceAreas`, `onlineServiceGroups`, and `coreValues` from `lib/content.ts`.
- Produces `HomeHero` and `PracticeAreas` client components.

- [ ] **Step 1: Write the failing controlled-selection test**

Create `components/practice-areas.test.tsx` that server-renders `PracticeAreas` and asserts its output contains `Company Secretary / Compliance`, `Alternative Dispute Resolution`, and `aria-label="Practice areas"`.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx tsx --test components/practice-areas.test.tsx`

Expected: FAIL because `components/practice-areas.tsx` does not exist.

- [ ] **Step 3: Implement interactive home components**

Implement `HomeHero` as a `"use client"` three-slide region with numbered buttons, `aria-pressed` active state, and previous/next controls. Its slides use only approved positioning statements and local image-panel classes. Implement `PracticeAreas` with `activeIndex` state, numbered buttons, an `aria-live="polite"` detail region, and desktop image-panel transitions; preserve every service as stacked content at narrow widths.

- [ ] **Step 4: Compose the home route**

Replace the starter route with `HomeHero`, editorial introduction, `PracticeAreas`, core-values/approach section, Online Services preview, a clearly empty Publications preview, and final consultation CTA. Use `Link` for internal routes and no credibility statistics.

- [ ] **Step 5: Run the home component test**

Run: `npx tsx --test components/practice-areas.test.tsx`

Expected: PASS.

- [ ] **Step 6: Verify the home route**

Run: `npm run lint && npm run build`

Expected: both commands exit 0.

- [ ] **Step 7: Commit**

```bash
git add app/page.tsx components/home-hero.tsx components/practice-areas.tsx components/practice-areas.test.tsx
git commit -m "feat: build Rockville editorial homepage"
```

### Task 4: Implement About and Our Team routes

**Files:**
- Create: `app/about/page.tsx`
- Create: `app/team/page.tsx`

**Interfaces:**
- Consumes `coreValues` from `lib/content.ts` and `PageHero`, `SectionHeading` from `components`.
- Produces two static App Router pages.

- [ ] **Step 1: Write failing route-presence tests**

Create `app/content-pages.test.tsx` that imports the About and Team page default exports, renders each with `renderToStaticMarkup`, and asserts About includes “Professionalism” and Team includes “Team profiles are being prepared”.

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx tsx --test app/content-pages.test.tsx`

Expected: FAIL because the route files do not exist.

- [ ] **Step 3: Implement the About route**

Build a `PageHero`, mission statement, large typographic vision statement, five-value interactive-looking list using semantic `ol`, and architectural panels. Copy the supplied mission and vision faithfully while reflowing them into headings and paragraphs.

- [ ] **Step 4: Implement the Our Team route**

Build a `PageHero`, a short factual explanation of the firm’s specialist approach, and an explicit “Team profiles are being prepared” empty state. Use anonymous placeholder image panels without names, titles, biographies, or qualifications.

- [ ] **Step 5: Run the route-presence tests**

Run: `npx tsx --test app/content-pages.test.tsx`

Expected: PASS.

- [ ] **Step 6: Verify both routes**

Run: `npm run lint && npm run build`

Expected: both commands exit 0.

- [ ] **Step 7: Commit**

```bash
git add app/about/page.tsx app/team/page.tsx app/content-pages.test.tsx
git commit -m "feat: add About and team pages"
```

### Task 5: Implement the immersive Services route

**Files:**
- Create: `components/services-explorer.tsx`
- Create: `app/services/page.tsx`

**Interfaces:**
- Consumes `practiceAreas` and `onlineServiceGroups` from `lib/content.ts`.
- Produces `ServicesExplorer` client component and the `/services` route.

- [ ] **Step 1: Write the failing service explorer test**

Create `components/services-explorer.test.tsx` that server-renders `ServicesExplorer` and asserts all ten service names, the “Online services” heading, and the “Start a request” link occur in the markup.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx tsx --test components/services-explorer.test.tsx`

Expected: FAIL because the component does not exist.

- [ ] **Step 3: Implement the services explorer**

Implement a `"use client"` numbered list with `activeIndex`, button labels in the form `"View <service title>"`, an `aria-live` description, and a companion local architectural image panel. Below it, map the two Online Services groups to semantic sections and link “Start a request” to `/contact`. Do not include price or service-time claims.

- [ ] **Step 4: Build the Services route composition**

Use `PageHero`, a concise introductory statement, `ServicesExplorer`, and a consultation CTA. Ensure the route has a single `h1` and keeps Online Services embedded.

- [ ] **Step 5: Run the service explorer test**

Run: `npx tsx --test components/services-explorer.test.tsx`

Expected: PASS.

- [ ] **Step 6: Verify the services route**

Run: `npm run lint && npm run build`

Expected: both commands exit 0.

- [ ] **Step 7: Commit**

```bash
git add app/services/page.tsx components/services-explorer.tsx components/services-explorer.test.tsx
git commit -m "feat: add immersive services experience"
```

### Task 6: Implement the Contact route and safe form handoff

**Files:**
- Create: `lib/form.ts`
- Create: `lib/form.test.ts`
- Create: `components/contact-form.tsx`
- Create: `app/contact/page.tsx`

**Interfaces:**
- Consumes `contactDetails` from `lib/content.ts`.
- Produces `validateContactForm(values: ContactFormValues): ContactFormErrors` and `ContactForm`.

- [ ] **Step 1: Write failing validation tests**

Create tests that assert `validateContactForm({ name: "", email: "not-email", message: "" })` returns name, email, and message errors; and `validateContactForm({ name: "Ada", email: "ada@example.com", message: "Please contact me." })` returns `{}`.

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx tsx --test lib/form.test.ts`

Expected: FAIL because `lib/form.ts` does not exist.

- [ ] **Step 3: Implement pure form validation**

Export `ContactFormValues` with `name`, `email`, and `message` strings; return exact error keys for empty trimmed name/message and emails that fail `/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/`.

- [ ] **Step 4: Implement ContactForm**

Use a `"use client"` form with labels, `required` inputs, inline error paragraphs linked using `aria-describedby`, and a live status element. On valid submit, prevent a false success message and set `window.location.href` to a `mailto:info@rockvillelp.com` URL with URI-encoded subject and form body.

- [ ] **Step 5: Implement the Contact page**

Compose `PageHero`, direct email/telephone/address links or text, the `ContactForm`, and an editorial location panel. Do not claim a live map or server-side delivery.

- [ ] **Step 6: Run validation tests**

Run: `npx tsx --test lib/form.test.ts`

Expected: PASS.

- [ ] **Step 7: Verify contact behavior**

Run: `npm run lint && npm run build`

Expected: both commands exit 0.

- [ ] **Step 8: Commit**

```bash
git add app/contact/page.tsx components/contact-form.tsx lib/form.ts lib/form.test.ts
git commit -m "feat: add validated contact experience"
```

### Task 7: Run final responsive and accessibility verification

**Files:**
- Modify: files identified by verification findings only.

**Interfaces:**
- Consumes the complete site.
- Produces an accessible, buildable final implementation.

- [ ] **Step 1: Start the development server**

Run: `npm run dev`

Expected: Next.js reports a local URL and no startup errors.

- [ ] **Step 2: Check each page at desktop and narrow mobile widths**

Visit `/`, `/about`, `/team`, `/services`, and `/contact`. Confirm no horizontal overflow, readable line lengths, and every navigation link resolves.

- [ ] **Step 3: Check keyboard behavior**

Use `Tab`, `Enter`, `Space`, and `Escape` to verify the skip link, mobile menu, hero controls, practice-area controls, services controls, and contact form are operable with visible focus.

- [ ] **Step 4: Check reduced-motion behavior**

Enable reduced motion in the browser and confirm hero/service transitions become immediate while content remains accessible.

- [ ] **Step 5: Fix only observed defects**

Make focused corrections in the component responsible for the observed issue; do not add unsupported content or routes.

- [ ] **Step 6: Run the final verification suite**

Run: `npm run lint && npm run build && npx tsx --test lib/content.test.ts components/shell.test.tsx components/practice-areas.test.tsx app/content-pages.test.tsx components/services-explorer.test.tsx lib/form.test.ts`

Expected: every command exits 0.

- [ ] **Step 7: Commit verification fixes if any were required**

```bash
git add app components lib
git commit -m "fix: polish Rockville responsive experience"
```
