import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { PracticeAreaCards } from "./practice-area-cards";
import { practiceAreas } from "@/lib/content";

test("renders ten service cards with working detail links", () => {
  const html = renderToStaticMarkup(<PracticeAreaCards />);
  assert.equal((html.match(/data-service-card=/g) ?? []).length, 10);
  assert.equal((html.match(/>Read more</g) ?? []).length, 10);
  for (const area of practiceAreas) assert.match(html, new RegExp(`href="/services/${area.slug}"`));
  assert.match(html, /data-closing-card="true"/);
});
