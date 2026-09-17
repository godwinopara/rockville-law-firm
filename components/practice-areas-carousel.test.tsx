import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { practiceAreas } from "@/lib/content";
import { PracticeAreasCarousel } from "./practice-areas-carousel";

test("practice areas carousel exposes every service and its destination", () => {
  const html = renderToStaticMarkup(<PracticeAreasCarousel eyebrow="Other services" title="Continue exploring" description="Explore other services." excludeSlug="litigation" />);

  assert.equal((html.match(/data-practice-carousel-card=/g) ?? []).length, practiceAreas.length - 1);
  assert.doesNotMatch(html, /data-practice-carousel-card="06"/);
  assert.match(html, /href="\/services\/company-secretary-compliance"/);
  assert.match(html, /aria-label="Previous practice areas"/);
  assert.match(html, /aria-label="Next practice areas"/);
  assert.match(html, /role="group" aria-label="Practice area carousel controls"/);
  assert.match(html, /role="region" aria-label="Rockville LP practice areas"/);
  assert.match(html, /data-practice-carousel-layout="split"/);
  assert.match(html, /-translate-y-full/);
  assert.match(html, /group-hover:translate-y-0/);
  assert.match(html, /group-focus-within:translate-y-0/);
  assert.match(html, /lg:justify-between/);
  assert.match(html, /scrollbar-width:none/);
  assert.match(html, /\[&amp;::-webkit-scrollbar\]:hidden/);
});
