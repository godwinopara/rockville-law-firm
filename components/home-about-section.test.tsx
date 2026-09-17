import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { HomeAboutSection } from "./home-about-section";

test("home About section uses the approved editorial split content", () => {
  const html = renderToStaticMarkup(<HomeAboutSection />);

  assert.match(html, /Refined advocacy for complex matters/);
  assert.match(html, /Our team/);
  assert.match(html, /Contact us/);
  assert.match(html, /Legal professionals meeting in an office/);
  assert.equal((html.match(/data-home-about-proof=/g) ?? []).length, 3);
});
