---
version: alpha
name: "Rockville Legal Practitioners"
description: "A premium international law-firm website built around obsidian contrast, editorial typography, architectural imagery, and measured motion."
colors:
  paper: "#F9F9F9"
  ink: "#121212"
  brand-blue: "#294A73"
  brand-blue-light: "#7EA6C4"
  stone: "#706F68"
  line: "#DEDDD7"
  panel: "#F0EFEA"
typography:
  display:
    fontFamily: "Fraunces, Fraunces Placeholder, serif"
  sans:
    fontFamily: "DM Sans, DM Sans Placeholder, sans-serif"
  mono:
    fontFamily: "var(--font-geist-mono), monospace"
rounded:
  DEFAULT: "0px"
spacing:
  page-max: "90rem"
  page-gutter: "clamp(1.25rem, 4vw, 2.5rem)"
  section-gap: "clamp(5rem, 9vw, 9rem)"
components:
  button: {}
  navigation: {}
  form: {}
  editorial-hero: {}
  practice-index: {}
  practice-card-grid: {}
  service-detail: {}
  consultation-banner: {}
  editorial-footer: {}
---

# Rockville Legal Practitioners Design System

## Overview

### Creative north star

Rockville feels like a precise international legal publication placed inside a dark architectural gallery. Obsidian grounds the site, off-white gives the content room to breathe, and the slate-blue drawn from its logo appears only as a directional signal. Large Fraunces headlines carry the voice; disciplined rules, image crops, and long pauses create authority without decoration.

### Product context and register

- **Audience:** Businesses, institutions, private clients, and prospective legal-service clients seeking clear, commercially aware counsel.
- **Market:** International-facing. The firm’s physical location is factual contact information and appears only where operationally useful, such as the footer and Contact page.
- **Language:** Clear international English.
- **Register:** Premium public brand and service website. Expression leads in hero composition; navigation, forms, and consultation actions remain familiar and accessible.
- **Signature:** Massive editorial type set against cinematic architectural stills, with restrained blue rules and staggered reveal motion.
- **Anti-references:** Gavels, fake awards or figures, rounded dashboard cards, default corporate blue, noisy gradients, invented people, and aggressive scroll effects.
- **Runtime ownership:** `app/globals.css` is canonical. This document mirrors its variables and patterns.

## Colors

`ink` is the primary immersive surface and text color. `paper` is the reading surface and dark-section text. `brand-blue` is reserved for primary actions, fine rules, numbering, and focus; `brand-blue-light` provides the accessible accent on ink surfaces. Neither is used for long passages. `stone` supports secondary copy, `line` divides editorial content, and `panel` distinguishes quiet service and form surfaces. There is no theme toggle.

## Typography

Headings use Fraunces with tight editorial tracking and responsive, fluid sizes. Paragraphs, navigation, labels, and controls use DM Sans. Geist Mono is restricted to numbering and compact metadata. Display headings stay in sentence case; uppercase is used only for short labels and navigation.

## Layout

The site uses a `90rem` maximum width, generous responsive gutters, and large vertical intervals. Full-height heroes pair asymmetrical copy with full-bleed still imagery. Service and value layouts use rules rather than floating cards. Sticky behavior is confined to the desktop service introduction; mobile remains a natural reading flow.

## Components

### Heroes

Heroes use a single architectural or professional still with a dark directional overlay. Eyebrow, headline, support copy, and actions enter in a calm staged sequence. The headline remains the dominant object and never competes with multiple calls to action.

### Buttons and links

Primary consultation actions use brand blue with off-white text. Secondary actions use a one-pixel border. Text links use a restrained underline and directional arrow. All states retain visible keyboard focus.

### Practice index and values

Practice areas are presented as a numbered, ruled editorial list. The Services page keeps its explanatory heading sticky on wide screens while the complete list scrolls naturally. Values use a strict three-column ruled layout at desktop and a single-column reading order on mobile.

### Services system

The Services index uses a ruled three-column card grid at wide viewports, two columns at tablet widths, and a single reading column on mobile. Cards pair one line icon, a service number, concise context, and an explicit “Read more” action. The tenth item closes the grid at full width. Every card routes to a statically generated editorial detail page with a dark image-led hero, overview, matter list, approach statement, related services, and consultation action.

### Consultation banner

Consultation prompts use one large architectural still and a translucent obsidian content panel anchored over the right side on desktop. On small screens the image and panel stack without overlap. The component contains one primary action and never includes ratings, review counts, fabricated outcomes, or urgency claims.

### Editorial footer

The footer is a complete orientation layer: firm proposition and operational contact details, primary navigation, all practice-area routes, one consultation action, and an oversized Rockville Legal wordmark. It does not expose placeholder social links, newsletter fields, or other non-functional controls.

### Forms and navigation

Inputs use explicit labels and bottom rules, with text validation errors. Submission opens a pre-composed email only after validation. Mobile navigation is a full-screen obsidian index, supports Escape, and uses a semantic button with an accessible label.

## Motion and accessibility

Motion follows a measured editorial rhythm inspired by the supplied reference: hero elements enter separately with opacity and vertical easing, content sections reveal once as they reach the viewport, and images add only subtle depth. Desktop wheel input uses a shared Lenis layer with medium-duration easing and light input damping, synchronized to GSAP ScrollTrigger; touch remains native. There is no scroll-jacking or perpetual motion. `prefers-reduced-motion: reduce` disables Lenis, immediately presents content, and suppresses transitions. Contrast, keyboard focus, semantic landmarks, alt text, and responsive reading order are required on every route.

## Content rules

- Keep claims specific, direct, and supportable.
- Do not invent founders’ names, biographies, lawyers, awards, case results, statistics, clients, prices, or response times.
- Use the firm’s address only in operational contact contexts—not as the central brand identity.
- Maintain “we” language in the two-founder story.
