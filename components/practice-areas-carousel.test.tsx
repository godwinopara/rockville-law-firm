import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { practiceAreas } from "@/lib/content";
import { PracticeAreasCarousel } from "./practice-areas-carousel";

test("practice areas carousel exposes every service and its destination", () => {
  const html = renderToStaticMarkup(<PracticeAreasCarousel />);

  assert.equal((html.match(/data-practice-carousel-card=/g) ?? []).length, practiceAreas.length);
  assert.match(html, /href="\/services\/company-secretary-compliance"/);
  assert.match(html, /aria-label="Previous practice areas"/);
  assert.match(html, /aria-label="Next practice areas"/);
  assert.match(html, /role="group" aria-label="Practice area carousel controls"/);
  assert.match(html, /role="region" aria-label="Rockville LP practice areas"/);
});
