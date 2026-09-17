import assert from "node:assert/strict";
import test from "node:test";
import { contactDetails, getPracticeAreaBySlug, getRelatedPracticeAreas, homeAboutVisual, practiceAreas } from "./content";

test("exposes the verified contact channel and complete practice-area index", () => {
  assert.equal(contactDetails.email, "info@rockvillelp.com");
  assert.equal(practiceAreas.length, 10);
  assert.equal(practiceAreas[0]?.title, "Company Secretary / Compliance");
  assert.equal(practiceAreas.at(-1)?.title, "Alternative Dispute Resolution");
});

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

test("practice areas retain their locally stored visuals and Home About uses firm photography", () => {
  assert.equal(practiceAreas.every((area) => area.image.src.startsWith("/images/practice-areas/")), true);
  assert.equal(practiceAreas.every((area) => area.image.sourceUrl.includes("unsplash.com")), true);
  assert.equal(homeAboutVisual.src, "/images/firm/conference-library.jpg");
});

test("looks up a service and returns adjacent related services", () => {
  assert.equal(getPracticeAreaBySlug("corporate-law")?.title, "Corporate Law");
  assert.equal(getPracticeAreaBySlug("not-a-service"), undefined);
  const related = getRelatedPracticeAreas("corporate-law", 3);
  assert.equal(related.length, 3);
  assert.ok(related.every((area) => area.slug !== "corporate-law"));
});
