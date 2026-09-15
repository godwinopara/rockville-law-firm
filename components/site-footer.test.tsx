import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { practiceAreas } from "@/lib/content";
import { SiteFooter } from "./site-footer";

test("footer provides a complete service directory without false affordances", () => {
  const html = renderToStaticMarkup(<SiteFooter />);

  assert.match(html, /Rockville Legal/);
  for (const area of practiceAreas) {
    assert.match(html, new RegExp(`href="/services/${area.slug}"`));
  }
  assert.doesNotMatch(html, /Subscribe|LinkedIn|Instagram|Twitter/);
});
