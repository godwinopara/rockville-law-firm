import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "./page";
import Team from "./team/page";

test("home leads with one consultation action and a complete practice index", () => {
  const html = renderToStaticMarkup(<Home />);
  assert.match(html, /Book consultation/);
  assert.match(html, /Company Secretary \/ Compliance/);
  assert.match(html, /Alternative Dispute Resolution/);
});

test("team page is honest when verified profiles are unavailable", () => {
  const html = renderToStaticMarkup(<Team />);
  assert.match(html, /Team profiles are being prepared/);
  assert.doesNotMatch(html, /Legal Practitioners · Lagos/);
});
