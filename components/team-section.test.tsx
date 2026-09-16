import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { TeamSection } from "./team-section";

test("team section presents the three verified professionals as a team", () => {
  const html = renderToStaticMarkup(<TeamSection />);
  assert.match(html, /Our team/);
  assert.match(html, /Rufus C. Okoli/);
  assert.match(html, /Founder &amp; Principal Partner/);
  assert.match(html, /Ngozi R. Okoli/);
  assert.match(html, /Dr. Nosike Agokei/);
  assert.doesNotMatch(html, /Meet our partners/);
});
