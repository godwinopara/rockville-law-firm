import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { SiteFooter } from "./site-footer";

test("footer uses the approved three-panel firm, navigation, and contact layout", () => {
  const html = renderToStaticMarkup(<SiteFooter />);

  assert.match(html, /data-footer-layout="three-panel"/);
  assert.match(html, /images%2Flogo\.png/);
  assert.match(html, /bg-brand-surface/);
  assert.doesNotMatch(html, /bg-paper px-5 py-4/);
  assert.match(html, /Footer navigation/);
  assert.match(html, /77, AWOLOWO RD, IKOYI, LAGOS STATE/);
  assert.match(html, /info@rockvillelp\.com/);
  assert.match(html, /sm:grid-cols-2/);
  assert.doesNotMatch(html, /href="\/services\/company-secretary-compliance"/);
  assert.doesNotMatch(html, /text-paper\/35/);
  assert.doesNotMatch(html, /Subscribe|LinkedIn|Instagram|Twitter/);
});
