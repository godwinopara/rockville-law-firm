import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { ProcessSection } from "./process-section";

test("process section presents the four stages of engagement", () => {
  const html = renderToStaticMarkup(<ProcessSection />);
  assert.match(html, /data-process-layout="sticky-list"/);
  assert.match(html, /lg:sticky/);
  assert.match(html, /border-t border-line/);
  assert.match(html, /Initial consultation/);
  assert.match(html, /Matter assessment/);
  assert.match(html, /Tailored strategy/);
  assert.match(html, /Representation &amp; resolution/);
  assert.match(html, /images%2Ffirm%2Flibrary-supreme-court-cases\.jpg/);
  assert.match(html, /Rockville LP library of Nigerian Supreme Court cases/);
});
