import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { ProcessSection } from "./process-section";

test("process section presents the four stages of engagement", () => {
  const html = renderToStaticMarkup(<ProcessSection />);
  assert.match(html, /Initial consultation/);
  assert.match(html, /Matter assessment/);
  assert.match(html, /Tailored strategy/);
  assert.match(html, /Representation &amp; resolution/);
});
