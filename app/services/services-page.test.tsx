import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import Services from "./page";

test("services index uses the editorial card presentation", () => {
  const html = renderToStaticMarkup(<Services />);
  assert.match(html, /Confidence, resilience, and strategic precision/);
  assert.match(html, /protect rights and pursue fair outcomes/);
  assert.equal((html.match(/data-service-card=/g) ?? []).length, 10);
  assert.match(html, /We take every matter seriously/);
});
