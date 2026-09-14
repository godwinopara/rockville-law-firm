# Rockville Legal Practitioners Premium Website

## Purpose

Create an original five-page website for Rockville Legal Practitioners, a Lagos-based Nigerian law firm. The website should present the firm as premium, editorial, confident, human, and technically polished. It may take broad inspiration from sophisticated legal and finance sites, but must not reproduce their layouts, content, typography, color systems, or interactions.

The result will use the supplied Rockville content as the factual source of truth. It must not invent lawyers, awards, outcomes, statistics, clients, offices, pricing, or turnaround times.

## Scope

The initial site has exactly five routes:

- `/` — Home
- `/about` — About
- `/team` — Our Team
- `/services` — Services
- `/contact` — Contact

Online Services is an embedded product-oriented experience within `/services`, with a preview on `/`. Publications is a preview on `/`; it is not a route in this phase. Practice areas do not have individual routes in this phase; a single immersive services page presents all ten verified areas.

## Experience Direction

The visual direction is **editorial architecture**: warm ivory surfaces, near-black text, deep moss accents, and restrained brass details. A custom typographic Rockville wordmark replaces the broken logo asset. Large architectural placeholder-image panels establish atmosphere without generic legal imagery or hotlinked remote assets.

Typography pairs a refined serif for large editorial statements with a precise sans-serif for metadata, navigation, and body content. The design uses generous whitespace, asymmetric image/text compositions, clear information hierarchy, and minimal decorative UI.

## Shared Design System

Every route shares:

- Sticky desktop navigation with a contact/request-consultation CTA.
- An accessible full-screen mobile menu with large navigation labels.
- A concise footer containing the verified address, phone numbers, and email.
- A common section-label, arrow-link, and button language.
- Responsive layouts that intentionally recompose, rather than merely shrink, desktop patterns.
- Keyboard-visible focus states and semantic landmarks.
- A `prefers-reduced-motion` fallback that disables nonessential motion.

Motion is subtle and functional: clipped image reveals, slow crossfades, short text staggers, image scale/position shifts, and restrained link-arrow movement. No dramatic 3D, aggressive parallax, or decorative animation.

## Page Design

### Home

1. A cinematic three-state hero. Each state pairs a large factual positioning statement with an architectural image panel, consultation CTA, service CTA, and accessible slide controls. State changes use calm crossfades and clipped image movement.
2. An editorial introduction presenting legal expertise around business, assets, and ambitions.
3. An interactive numbered practice-area index. On desktop, the active practice area updates a contextual architectural image and concise service description. On mobile, the same content becomes a clearly ordered stacked sequence.
4. A values/approach section that replaces unsupported credibility statistics.
5. An Online Services preview for intellectual-property filings and simple legal documents.
6. A compact Publications preview, labeled as a future/curated content area rather than containing invented articles.
7. A final consultation CTA using the verified contact details.

### About

An editorial presentation of the firm’s stated mission, vision, and five core values: Professionalism, Respect, Efficiency, Practicality, and Sincerity. The page uses typographic hierarchy, architectural imagery, and progressive reveals; it does not claim unverified firm history, metrics, or credentials.

### Our Team

An image-first profile directory. It renders only verified team biographies and photographs when they are supplied. Before then, the design uses explicit profile placeholders and an honest note that team profiles are being prepared; it never invents people or qualifications.

### Services

A full, immersive navigation experience for these ten verified practice areas:

1. Company Secretary / Compliance
2. Intellectual Property Law
3. Real Estate / Property Law
4. Corporate Law
5. Due Diligence
6. Litigation
7. Legal Opinion
8. General Counsel
9. Debt Recovery / Restructuring Services
10. Alternative Dispute Resolution

Selecting an area updates supporting copy and an architectural context panel. The page includes a distinct Online Services section organized into Intellectual Property (Trade Mark Applications, Patent Applications, Industrial Design, Copyright) and Simple Legal Documents (Tenancy Agreement, Hire Purchase Agreement, Partnership Agreement). It explains what a request involves but omits unavailable price and turnaround details. “Start a Request” routes to `/contact`.

### Contact

The page foregrounds the verified contact details:

- +234(0)803 306 4300
- +234(0)803 461 6281
- 77, Awolowo Rd, Ikoyi, Lagos State
- info@rockvillelp.com

It includes a client-side validated enquiry form. Until a delivery integration is explicitly supplied, the submit action must make a safe email handoff and never falsely indicate a transmitted message. The location treatment is visual/editorial and does not claim an embedded live map.

## Technical Architecture

The site uses the existing Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS v4 setup. Route-level pages compose reusable shared shell and content-section components. Content that repeats across views—practice areas, online services, contact data, navigation labels—lives in typed local data rather than duplicated JSX.

Client components are limited to interactive features: navigation state, hero controls, service selection, and form validation. Static page content remains server-rendered. Architectural placeholder imagery is local CSS/image treatment and does not rely on remote hotlinks.

## Error Handling and Accessibility

- Forms use labels, field-level validation messages, `aria-live` status feedback, and safe mailto fallback behavior.
- Hero and practice-area controls have accessible names, selected state, keyboard operation, and non-motion alternatives.
- All routes use semantic heading order, navigation landmarks, descriptive link text, color contrast, and visible focus styles.
- Missing team content is represented transparently rather than hidden behind fabricated profiles.

## Verification

Before handoff, run linting and a production build. Review the working site at desktop and narrow mobile widths. Confirm route navigation, hero controls, services selection, mobile menu focus behavior, form validation, and reduced-motion behavior.
