# Rockville Legal Practitioners Obsidian Site Revamp

## Purpose

Rebuild every public Rockville Legal Practitioners route into a responsive international law-firm experience. The site will use Rockville’s verified factual content and identity, while adopting an original luxury editorial system guided by the approved visual direction: deep obsidian, off-white, champagne-gold, Fraunces headings, DM Sans interface/body typography, high-resolution architectural still imagery, and restrained GSAP motion.

## Scope

The rebuild covers `/`, `/about`, `/team`, `/services`, and `/contact`, plus shared navigation, footer, motion primitives, typography, color tokens, and responsive behavior. The existing founder and values compositions are preserved in spirit but restyled to the new system.

## Visual System

- Obsidian: `#121212` for hero and high-contrast panels.
- Off-white: `#F9F9F9` for text and primary light surfaces.
- Champagne gold: `#D4AF37` only for rules, numerical markers, focused controls, and restrained directional details.
- Headings use Fraunces; paragraphs, controls, and labels use DM Sans.
- Content uses grids, dividers, typography, image planes, and negative space—not generic rounded card stacks.
- High-resolution local still images provide the visual anchor; they remain replaceable assets.

## Page Design

### Home

An asymmetrical full-viewport obsidian hero puts an oversized firm proposition and single “Book consultation” CTA beside an architectural still. Practice areas become a minimal numbered grid with border reveals and an active media/story panel. The lower page layers a concise firm statement, values, online-service entry point, and final consultation prompt.

### About

The founder story remains a white editorial spread with a portrait placeholder, signature mark, oversized collective statement, horizontal rule, quotation detail, and general Rockville contact controls. A values section immediately follows it: headline plus visual plane, six-value border grid, and short CTA closing. Mission, vision, and consultation continue the shared editorial cadence.

### Our Team

An image-led team introduction uses explicit profile placeholders until verified biographies are supplied. It does not create names, titles, qualifications, or credentials.

### Services

The service index becomes the page’s central narrative: a sticky desktop layout pairs a number/title rail with an updating architectural image/detail panel; mobile becomes a complete ordered vertical sequence. Online Services is presented separately as a product-oriented section without pricing or turnaround assertions.

### Contact

Contact opens with high-contrast type and image, followed by a quiet form and the verified contact details. The existing safe `mailto:` handoff and accessible client-side validation remain.

## Motion System

GSAP and ScrollTrigger are used globally, through reusable client-side motion components:

- Every page gets a short entrance sequence: clipped text rises, eyebrow/rule fades in, and hero imagery scales from 1.06 to 1.
- Section titles and copy use `ScrollTrigger` staggered fade/translate reveals as they enter the viewport.
- Architectural media panels get low-distance vertical parallax, never interfering with text or controls.
- Services uses one sticky desktop narrative sequence; no nonessential pinning occurs on mobile.
- Hover states on links, practice-area rows, and CTAs use brief directional translation only.
- `prefers-reduced-motion: reduce` removes ScrollTrigger, transforms, and time-based animation while preserving full content and navigation.

## Accessibility and Performance

All interactive controls remain semantic and keyboard-operable, with visible focus and sufficient contrast. Large images use `next/image` dimensions and local optimized assets. GSAP is confined to client motion components, loaded only where interactive behavior is needed. No animation is required to discover or access content.

## Content Constraints

Do not invent attorneys, founders’ names, firm age, awards, metrics, testimonials, case results, clients, fees, turnaround times, office locations, or credentials. Use only existing verified address, telephone numbers, email, service names, mission, vision, and values.
