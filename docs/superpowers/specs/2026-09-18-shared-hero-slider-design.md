# Shared hero slider design

## Goal

Give every public Rockville page that uses the existing `EditorialHero` a quiet, image-led automatic slider inspired by the motion pattern of the Koch reference, while preserving Rockville's editorial layout, typography, content, and `#2B3F61` brand system.

## Scope

- Home, About, Services, Team, Contact, and every service-detail page using `EditorialHero`.
- Three relevant images per page, rendered as a full-bleed backdrop.
- A six-second automatic cadence with a crossfade and subtle image-scale movement.
- A passive `01 — 03` progress treatment. There are no Previous/Next controls.
- Existing hero copy and CTA actions remain fixed in place.

## Architecture

`EditorialHero` remains the only public hero API. Its single `image` and `imageAlt` inputs become an optional backwards-compatible input, while a new `slides` input accepts an ordered array of `{ image, alt }` items.

The image rail is isolated inside a small client component, `HeroBackgroundSlider`. The parent hero remains responsible for the semantic `h1`, page copy, CTA links, contrast overlay, and progress presentation. The client component owns only the active slide timer and exposes its current index to the progress marker through a callback.

Each page passes its own three-image set. Existing locally hosted firm, library, reception, team, office, and practice-area photos are preferred. No external image request is needed for this work. Where an existing page does not have three directly relevant firm images, the supplied, optimized office/library imagery will be selected rather than introducing an unrelated stock image.

## Interaction and accessibility

- The first image is the static server-rendered fallback and has meaningful alternative text.
- Other background slides are decorative (`alt=""`) so a screen reader does not announce background changes.
- The visible copy sits above a consistent dark-to-transparent overlay; every slide retains the current readable text treatment.
- The six-second interval pauses while the hero is hovered or contains keyboard focus.
- `prefers-reduced-motion: reduce` disables automatic cycling and transformation, keeping the first slide visible.
- The passive progress display is marked presentational and does not introduce an unnecessary control.

## Motion and visual direction

The transition is a 700ms opacity dissolve, with the incoming image slowly scaling from 1.04 to 1.00 through its dwell time. The effect is deliberately slower and calmer than a marketing carousel. The indicator sits at the lower edge of the hero, using the light blue brand accent against the dark layer. It shows the active index and a slender elapsed bar, aligning with the page shell.

## Resilience

- Timers are created only in the browser and cleaned up on unmount.
- A single slide, missing image list, or reduced-motion preference never starts a timer.
- The component prevents visual layout shift by retaining the current absolute-fill image structure.
- Existing routes that retain the legacy single-image prop remain valid.

## Testing and verification

- Update the hero rendering test to prove that a three-slide hero exposes the progress semantics and image set.
- Add behavior tests for one-slide and reduced-motion-safe rendering paths where practical in the existing server-rendered test approach.
- Run the full test suite, lint, and production build.
- Verify desktop and mobile hero rendering in a running Next.js preview, including animation progression, fixed readable content, absence of console errors, and keyboard-focus pause behavior.
