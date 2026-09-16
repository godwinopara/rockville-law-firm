import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { StickyServices } from "./sticky-services";

test("sticky services exposes every practice without requiring animation", () => {
  const html = renderToStaticMarkup(<StickyServices />);
  assert.equal((html.match(/data-practice=/g) ?? []).length, 10);
  assert.match(html, /Company Secretary \/ Compliance/);
  assert.match(html, /Alternative Dispute Resolution/);
});
