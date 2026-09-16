# Rockville Services and Detail Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Services index with a reference-inspired service-card experience, create ten complete service-detail routes, add an image-led consultation banner, and expand the global footer.

**Architecture:** Keep all service copy and route metadata in `lib/content.ts`, render the overview through shared server components, and statically generate `/services/[slug]` with Next.js 16 promise-based params. Reuse the existing GSAP `MotionReveal`, Lenis provider, image assets, typography, and design tokens; no client state is needed for the new pages.

**Tech Stack:** Next.js 16.3 App Router, React 19, TypeScript, Tailwind CSS v4, GSAP/ScrollTrigger, Lenis, Lucide React, Node test runner with `tsx`.

**Spec:** `docs/superpowers/specs/2026-09-15-rockville-services-and-detail-pages-design.md`

## Global Constraints

- Preserve the established `#121212` obsidian, `#F9F9F9` off-white, and `#D4AF37` champagne-gold system.
- Continue using Fraunces for headings and DM Sans for body/interface text.
- Use the supplied Jurista Practice Areas page only as structural and visual inspiration; do not copy its firm identity, claims, ratings, reviews, testimonials, or exact body copy.
- Do not invent founders, lawyers, clients, awards, case results, rankings, statistics, response times, prices, guarantees, or years of experience.
- Keep the existing Lenis/GSAP integration and disable motion under `prefers-reduced-motion: reduce`.
- Keep touch scrolling native and ensure every viewport has no horizontal overflow.
- The firm address remains operational contact information, not a general brand claim.
- Use Next.js 16 promise-based dynamic params and statically generate all ten service-detail routes.

---

## File Map

- Modify `lib/content.ts`: canonical `PracticeArea` model, ten complete entries, slug lookup, related-service lookup.
- Modify `lib/content.test.ts`: model completeness, unique slug, lookup, and route tests.
- Create `components/practice-area-cards.tsx`: responsive card grid and card markup.
- Create `components/practice-area-cards.test.tsx`: card count, links, labels, and desktop closing-card contract.
- Create `components/consultation-banner.tsx`: reusable image-led consultation section.
- Create `components/consultation-banner.test.tsx`: heading and consultation link contract.
- Modify `app/services/page.tsx`: new editorial heading, card grid, consultation banner, and online services.
- Create `app/services/services-page.test.tsx`: index hierarchy and CTA assertions.
- Create `app/services/[slug]/page.tsx`: static detail page, metadata, not-found handling, related services.
- Create `app/services/[slug]/page.test.tsx`: generated params and representative page rendering.
- Modify `components/site-footer.tsx`: service route columns and oversized wordmark.
- Create `components/site-footer.test.tsx`: complete practice navigation and footer content.
- Modify `DESIGN.md`: record the service-card, consultation-banner, detail-page, and footer patterns.

---

### Task 1: Establish the canonical service content model

**Files:**
- Modify: `lib/content.ts`
- Modify: `lib/content.test.ts`

**Interfaces:**
- Produces: `PracticeArea`, `practiceAreas`, `getPracticeAreaBySlug(slug: string): PracticeArea | undefined`, and `getRelatedPracticeAreas(slug: string, count?: number): PracticeArea[]`.
- Consumed by: card grid, detail route, footer, and existing Home practice list.

- [ ] **Step 1: Write failing content-model tests**

Add assertions that every service includes the detail-page fields and every slug is unique:

```tsx
test("every practice area has complete route and detail content", () => {
  assert.equal(practiceAreas.length, 10);
  assert.equal(new Set(practiceAreas.map((area) => area.slug)).size, 10);
  for (const area of practiceAreas) {
    assert.match(area.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(area.summary.length >= 60);
    assert.ok(area.overview.length >= 120);
    assert.ok(area.matters.length >= 4);
    assert.ok(area.approach.length >= 100);
  }
});

test("looks up a service and returns adjacent related services", () => {
  assert.equal(getPracticeAreaBySlug("corporate-law")?.title, "Corporate Law");
  assert.equal(getPracticeAreaBySlug("not-a-service"), undefined);
  const related = getRelatedPracticeAreas("corporate-law", 3);
  assert.equal(related.length, 3);
  assert.ok(related.every((area) => area.slug !== "corporate-law"));
});
```

- [ ] **Step 2: Run the tests and verify RED**

Run: `npm test -- lib/content.test.ts`

Expected: FAIL because `slug`, `summary`, `overview`, `matters`, `approach`, and lookup helpers do not exist.

- [ ] **Step 3: Extend the model and replace the mapped service list**

Use this exact type:

```ts
export type PracticeArea = {
  number: string;
  slug: string;
  title: string;
  description: string;
  summary: string;
  overview: string;
  matters: string[];
  approach: string;
};
```

Create explicit entries for these title/slug pairs:

```ts
const serviceRoutes = [
  ["Company Secretary / Compliance", "company-secretary-compliance"],
  ["Intellectual Property Law", "intellectual-property-law"],
  ["Real Estate / Property Law", "real-estate-property-law"],
  ["Corporate Law", "corporate-law"],
  ["Due Diligence", "due-diligence"],
  ["Litigation", "litigation"],
  ["Legal Opinion", "legal-opinion"],
  ["General Counsel", "general-counsel"],
  ["Debt Recovery / Restructuring Services", "debt-recovery-restructuring"],
  ["Alternative Dispute Resolution", "alternative-dispute-resolution"],
] as const;
```

For each entry, write one concise `description`, a 60+ character `summary`, a 120+ character general `overview`, at least four concrete `matters`, and a 100+ character `approach`. Keep the copy informational and non-promissory. Examples of matters by service:

```ts
const mattersBySlug = {
  "company-secretary-compliance": ["Governance frameworks", "Statutory filings", "Board and shareholder records", "Ongoing compliance support"],
  "intellectual-property-law": ["Trade mark applications", "Patent applications", "Industrial designs", "Copyright guidance"],
  "real-estate-property-law": ["Property transactions", "Leases and tenancies", "Title review", "Property-related disputes"],
  "corporate-law": ["Business structures", "Commercial agreements", "Corporate governance", "Transactions and reorganisations"],
  "due-diligence": ["Corporate records", "Material contracts", "Property interests", "Legal risk review"],
  litigation: ["Pre-action assessment", "Case strategy", "Court representation", "Settlement evaluation"],
  "legal-opinion": ["Regulatory interpretation", "Contractual questions", "Transaction support", "Risk analysis"],
  "general-counsel": ["Day-to-day legal guidance", "Contract review", "Governance support", "Risk and compliance coordination"],
  "debt-recovery-restructuring": ["Debt assessment", "Recovery strategy", "Negotiated repayment", "Restructuring documentation"],
  "alternative-dispute-resolution": ["Negotiation", "Mediation", "Arbitration", "Settlement documentation"],
} as const;
```

Add deterministic helpers:

```ts
export function getPracticeAreaBySlug(slug: string) {
  return practiceAreas.find((area) => area.slug === slug);
}

export function getRelatedPracticeAreas(slug: string, count = 3) {
  const index = practiceAreas.findIndex((area) => area.slug === slug);
  if (index < 0) return [];
  return Array.from({ length: Math.min(count, practiceAreas.length - 1) }, (_, offset) => practiceAreas[(index + offset + 1) % practiceAreas.length]);
}
```

- [ ] **Step 4: Run tests and verify GREEN**

Run: `npm test -- lib/content.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit the content model**

```bash
git add lib/content.ts lib/content.test.ts
git commit -m "feat: add service detail content model"
```

---

### Task 2: Build the reference-inspired practice-area card grid

**Files:**
- Create: `components/practice-area-cards.tsx`
- Create: `components/practice-area-cards.test.tsx`

**Interfaces:**
- Consumes: `practiceAreas: PracticeArea[]` and `MotionReveal`.
- Produces: `PracticeAreaCards({ areas?: PracticeArea[] }): ReactElement`.

- [ ] **Step 1: Write the failing card-grid test**

```tsx
test("renders ten service cards with working detail links", () => {
  const html = renderToStaticMarkup(<PracticeAreaCards />);
  assert.equal((html.match(/data-service-card=/g) ?? []).length, 10);
  assert.equal((html.match(/>Read more</g) ?? []).length, 10);
  for (const area of practiceAreas) {
    assert.match(html, new RegExp(`href="/services/${area.slug}"`));
  }
  assert.match(html, /data-closing-card="true"/);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- components/practice-area-cards.test.tsx`

Expected: FAIL because `PracticeAreaCards` does not exist.

- [ ] **Step 3: Implement the card grid**

Create a server component that uses a semantic list and one Lucide icon selected by array index. Decorative icons receive `aria-hidden="true"`. Use the exact route and accessible label pattern:

```tsx
import { ArrowUpRight, Building2, FileCheck2, Landmark, Scale, ShieldCheck } from "lucide-react";

const icons = [Building2, ShieldCheck, Landmark, Scale, FileCheck2];

<Link href={`/services/${area.slug}`} aria-label={`Read more about ${area.title}`} className="service-card-link">
  Read more <ArrowUpRight aria-hidden="true" size={15} />
</Link>
```

Use these layout contracts:

```tsx
<ol className="grid border-l border-t border-line md:grid-cols-2 xl:grid-cols-3">
  {areas.map((area, index) => {
    const closingCard = index === areas.length - 1;
    const CardIcon = icons[index % icons.length];
    return <li
      data-service-card={area.slug}
      data-closing-card={closingCard ? "true" : undefined}
      className={`border-b border-r border-line ${closingCard ? "xl:col-span-3" : ""}`}
    >
      <MotionReveal className={`flex min-h-[29rem] flex-col p-8 md:p-10 ${closingCard ? "xl:min-h-0 xl:flex-row xl:items-end xl:justify-between xl:gap-16" : ""}`}>
        <div>
          <p className="font-mono text-xs text-gold-dark">{area.number}</p>
          <h3 className="display mt-6 text-3xl">{area.title}</h3>
          <p className="mt-6 border-t border-line pt-5 leading-7 text-stone">{area.summary}</p>
        </div>
        <div className="mt-12 flex items-end justify-between gap-8">
          <Link href={`/services/${area.slug}`} aria-label={`Read more about ${area.title}`} className="service-card-link">Read more <ArrowUpRight aria-hidden="true" size={15} /></Link>
          <CardIcon aria-hidden="true" className="text-line" size={52} strokeWidth={1} />
        </div>
      </MotionReveal>
    </li>;
  })}
</ol>
```

Add `.service-card-link` hover/focus arrow movement in `app/globals.css`; do not hide any content until hover.

- [ ] **Step 4: Run the component test and full content tests**

Run: `npm test -- components/practice-area-cards.test.tsx lib/content.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit the card grid**

```bash
git add components/practice-area-cards.tsx components/practice-area-cards.test.tsx app/globals.css
git commit -m "feat: add practice area card grid"
```

---

### Task 3: Add the shared image-led consultation banner and rebuild the Services index

**Files:**
- Create: `components/consultation-banner.tsx`
- Create: `components/consultation-banner.test.tsx`
- Modify: `app/services/page.tsx`
- Create: `app/services/services-page.test.tsx`

**Interfaces:**
- Consumes: `MotionReveal`, `PracticeAreaCards`, existing `EditorialHero`, and `/images/founders-placeholder.jpg` or another existing architectural placeholder.
- Produces: `ConsultationBanner({ image?, imageAlt?, heading?, body? }): ReactElement`.

- [ ] **Step 1: Write failing consultation and Services-index tests**

```tsx
test("consultation banner provides one direct consultation action", () => {
  const html = renderToStaticMarkup(<ConsultationBanner />);
  assert.match(html, /We take every matter seriously and respond with considered representation/);
  assert.match(html, /href="\/contact"/);
  assert.match(html, /Book consultation/);
  assert.doesNotMatch(html, /4\.9|reviews|Trusted by/);
});

test("services index uses the editorial card presentation", () => {
  const html = renderToStaticMarkup(<Services />);
  assert.match(html, /Confidence, resilience, and strategic precision/);
  assert.match(html, /protect rights and pursue fair outcomes/);
  assert.equal((html.match(/data-service-card=/g) ?? []).length, 10);
  assert.match(html, /We take every matter seriously/);
});
```

- [ ] **Step 2: Run tests and verify RED**

Run: `npm test -- components/consultation-banner.test.tsx app/services/services-page.test.tsx`

Expected: FAIL because the banner and card-based index do not exist.

- [ ] **Step 3: Implement `ConsultationBanner`**

Use a full-width image container with a right-aligned obsidian panel:

```tsx
const defaults = {
  image: "/images/founders-placeholder.jpg",
  imageAlt: "Professional consultation setting placeholder",
  heading: "We take every matter seriously and respond with considered representation.",
  body: "We approach each instruction with precision, discretion, and close attention to the context, delivering guidance shaped around the matter at hand.",
};
```

The panel must use `bg-ink/88`, `backdrop-blur-md`, paper text, a one-pixel paper border, and the existing `.btn-primary`. At mobile widths it becomes a normal block below the image and drops the blur dependency.

- [ ] **Step 4: Replace `StickyServices` on the Services index**

Preserve `EditorialHero`, then render:

```tsx
<section className="bg-paper">
  <div className="page-shell section-space">
    <MotionReveal className="grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
      <div>
        <p className="eyebrow gold-rule text-stone">Confidence, resilience, and strategic precision</p>
        <h2 className="display mt-8 max-w-4xl text-5xl leading-[.98] md:text-7xl">We are driven by a clear purpose to protect rights and pursue fair outcomes.</h2>
      </div>
      <p className="max-w-md self-end leading-7 text-stone">We bring careful analysis, direct communication, and determined representation to the legal matters entrusted to us.</p>
    </MotionReveal>
    <div className="mt-16"><PracticeAreaCards /></div>
  </div>
</section>
<ConsultationBanner />
```

Keep the existing online-services section after the banner.

- [ ] **Step 5: Run tests and verify GREEN**

Run: `npm test -- components/consultation-banner.test.tsx app/services/services-page.test.tsx components/practice-area-cards.test.tsx`

Expected: PASS.

- [ ] **Step 6: Commit the Services index**

```bash
git add components/consultation-banner.tsx components/consultation-banner.test.tsx app/services/page.tsx app/services/services-page.test.tsx
git commit -m "feat: redesign services index"
```

---

### Task 4: Create all ten statically generated service-detail pages

**Files:**
- Create: `app/services/[slug]/page.tsx`
- Create: `app/services/[slug]/page.test.tsx`

**Interfaces:**
- Consumes: `getPracticeAreaBySlug`, `getRelatedPracticeAreas`, `practiceAreas`, `MotionReveal`, and `ConsultationBanner`.
- Produces: `generateStaticParams(): { slug: string }[]`, `generateMetadata({ params }): Promise<Metadata>`, and the default async page component.

- [ ] **Step 1: Write failing route tests**

```tsx
test("generates one static route for every practice area", () => {
  assert.deepEqual(generateStaticParams(), practiceAreas.map((area) => ({ slug: area.slug })));
});

test("renders a complete representative detail page", async () => {
  const page = await ServiceDetailPage({ params: Promise.resolve({ slug: "corporate-law" }) });
  const html = renderToStaticMarkup(page);
  assert.match(html, /Corporate Law/);
  assert.match(html, /How we can assist/);
  assert.match(html, /Our approach/);
  assert.match(html, /Related services/);
  assert.match(html, /Book consultation/);
});

test("generates service-specific metadata", async () => {
  const metadata = await generateMetadata({ params: Promise.resolve({ slug: "corporate-law" }) });
  assert.equal(metadata.title, "Corporate Law");
  assert.match(String(metadata.description), /corporate/i);
});
```

- [ ] **Step 2: Run test and verify RED**

Run: `npm test -- 'app/services/[slug]/page.test.tsx'`

Expected: FAIL because the dynamic route does not exist.

- [ ] **Step 3: Implement the Next.js 16 dynamic route**

Use promise-based params as required by the installed Next.js documentation:

```tsx
type ServicePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return practiceAreas.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const area = getPracticeAreaBySlug((await params).slug);
  if (!area) return { title: "Service not found" };
  return { title: area.title, description: area.summary };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const area = getPracticeAreaBySlug((await params).slug);
  if (!area) notFound();
  const related = getRelatedPracticeAreas(area.slug, 3);
  // Render service hero, overview, matters, approach, related links, and ConsultationBanner.
}
```

Hero contract: obsidian background, service number/eyebrow, large Fraunces title, summary, Book Consultation link, and a quiet architectural panel using `/images/lagos-tower.jpg` with neutral alt text.

Overview contract: two-column editorial layout with `overview` on the right. Matters contract: bordered list rendered from `area.matters`. Approach contract: dark section with `area.approach`. Related links use `/services/${relatedArea.slug}` and show service number, title, and arrow.

- [ ] **Step 4: Run route and model tests**

Run: `npm test -- 'app/services/[slug]/page.test.tsx' lib/content.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit the detail route**

```bash
git add 'app/services/[slug]/page.tsx' 'app/services/[slug]/page.test.tsx'
git commit -m "feat: add service detail pages"
```

---

### Task 5: Expand the global footer with complete practice navigation

**Files:**
- Modify: `components/site-footer.tsx`
- Create: `components/site-footer.test.tsx`
- Modify: `DESIGN.md`

**Interfaces:**
- Consumes: `contactDetails`, `primaryNavigation`, and `practiceAreas`.
- Produces: the existing `SiteFooter()` interface with expanded content.

- [ ] **Step 1: Write the failing footer test**

```tsx
test("footer links every practice area and closes with the Rockville wordmark", () => {
  const html = renderToStaticMarkup(<SiteFooter />);
  assert.match(html, /Rockville Legal/);
  for (const area of practiceAreas) {
    assert.match(html, new RegExp(`href="/services/${area.slug}"`));
  }
  assert.doesNotMatch(html, /Subscribe|LinkedIn|Instagram|Twitter/);
});
```

- [ ] **Step 2: Run test and verify RED**

Run: `npm test -- components/site-footer.test.tsx`

Expected: FAIL because the footer does not contain service-detail links or the oversized closing wordmark.

- [ ] **Step 3: Implement the footer hierarchy**

Build a responsive top grid:

```tsx
<div className="grid gap-12 border-b border-paper/15 pb-16 lg:grid-cols-[1.2fr_.55fr_1.05fr]">
  <section>
    <p className="display text-4xl">Rockville Legal Practitioners</p>
    <p className="mt-6 max-w-sm text-paper/68">Clear legal judgment for decisions that shape what comes next.</p>
    <address className="mt-8 not-italic text-sm leading-7 text-paper/68">
      <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
      <p>{contactDetails.phonePrimary}</p>
      <p>{contactDetails.address}</p>
    </address>
  </section>
  <nav aria-label="Footer navigation">
    <ul>{primaryNavigation.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul>
  </nav>
  <nav aria-label="Practice areas">
    <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">{practiceAreas.map((area) => <li key={area.slug}><Link href={`/services/${area.slug}`}>{area.title}</Link></li>)}</ul>
  </nav>
</div>
<p aria-hidden="true" className="display overflow-hidden whitespace-nowrap border-b border-paper/15 py-10 text-[clamp(5rem,15vw,14rem)] leading-[.75] tracking-[-.07em] text-paper/95">Rockville Legal</p>
```

Keep the copyright and core-values line after the wordmark. Do not add newsletter or social controls.

Update `DESIGN.md` Components with the ruled service-card pattern, image-led consultation banner, detail-page composition, and editorial wordmark footer.

- [ ] **Step 4: Run footer and regression tests**

Run: `npm test -- components/site-footer.test.tsx app/revamp.test.tsx lib/content.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit the footer and durable design context**

```bash
git add components/site-footer.tsx components/site-footer.test.tsx DESIGN.md
git commit -m "feat: expand editorial site footer"
```

---

### Task 6: Verify routes, responsive layouts, motion, and accessibility

**Files:**
- Modify only if verification reveals a scoped defect.

**Interfaces:**
- Consumes: the complete implementation from Tasks 1–5.
- Produces: verified production-ready behavior; no new public API.

- [ ] **Step 1: Run the complete TS and TSX test suite**

Run:

```bash
npm test -- app/revamp.test.tsx app/services/services-page.test.tsx 'app/services/[slug]/page.test.tsx' components/consultation-banner.test.tsx components/practice-area-cards.test.tsx components/site-footer.test.tsx components/sticky-services.test.tsx lib/content.test.ts lib/form.test.ts lib/smooth-scroll.test.ts
```

Expected: all tests PASS with zero failures.

- [ ] **Step 2: Run static verification**

Run:

```bash
npm run lint
npm run build
python3 /Users/godwinopara/.codex/plugins/cache/openai-curated-remote/frontend-design-premium/1.4.0/skills/frontend-design-premium/scripts/audit_project.py /Users/godwinopara/client-projects/rockville --mode strict
```

Expected: ESLint exit 0; Next.js build exit 0 with `/services/[slug]` generated for ten params; audit reports zero findings.

- [ ] **Step 3: Verify Next.js runtime diagnostics**

Use the existing server at `http://localhost:3000`, query `/_next/mcp` `get_compilation_issues`, `get_routes`, and `get_errors`, and confirm empty issue/error arrays plus the dynamic service route.

- [ ] **Step 4: Verify representative browser flows**

Using one isolated `agent-browser` worktree session:

1. Desktop 1440×1000: open `/services`, wait for network idle and settled animation, capture the heading/cards and consultation banner.
2. Click the Corporate Law “Read more” link, wait for navigation, and verify `/services/corporate-law`, the overview, matters, approach, related services, and consultation link.
3. Open `/services/alternative-dispute-resolution` directly and verify its service-specific title and content.
4. Mobile 390×844: repeat `/services` and `/services/corporate-law`; assert `document.documentElement.scrollWidth === innerWidth`.
5. Enable reduced motion and verify the `lenis` class is absent and all sections are immediately visible.
6. Run WCAG 2 A/AA accessibility audits on the Services index and Corporate Law detail page; resolve automated violations.

- [ ] **Step 5: Verify every footer route**

Extract the `Practice areas` footer links, confirm there are ten unique `/services/` URLs, and open at least the first and last. Confirm neither reaches the app-owned 404 page.

- [ ] **Step 6: Review scope and commit verification fixes**

Run `git diff --check` and inspect `git status --short`. If verification required fixes, rerun the affected checks and commit only the Services-scope paths:

```bash
git add app/services components lib/content.ts lib/content.test.ts DESIGN.md
git commit -m "fix: polish services experience"
```
