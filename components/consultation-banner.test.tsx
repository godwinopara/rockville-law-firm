import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { ConsultationBanner } from "./consultation-banner";

test("consultation banner provides one direct consultation action", () => {
  const html = renderToStaticMarkup(<ConsultationBanner />);
  assert.match(html, /We take every matter seriously and respond with considered representation/);
  assert.match(html, /href="\/contact"/);
  assert.match(html, /Book consultation/);
  assert.match(html, /images%2Ffirm%2Freception\.jpg/);
  assert.match(html, /Rockville LP reception area/);
  assert.doesNotMatch(html, /4\.9|reviews|Trusted by/);
});
