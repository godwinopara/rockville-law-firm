import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { SiteHeader } from "./site-header";

test("header identifies Rockville with the supplied firm logo", () => {
  const html = renderToStaticMarkup(<SiteHeader />);

  assert.match(html, /images%2Flogo\.png/);
  assert.match(html, /alt="Rockville Legal Practitioners"/);
  assert.match(html, /bg-brand-surface/);
  assert.doesNotMatch(html, /bg-paper px-3 py-2/);
  assert.doesNotMatch(html, />ROCKVILLE</);
});
