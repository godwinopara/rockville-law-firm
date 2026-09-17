import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { TeamSection } from "./team-section";

test("team section presents the three verified professionals as a team", () => {
  const html = renderToStaticMarkup(<TeamSection />);
  assert.match(html, /Our team/);
  assert.match(html, /Rufus C. Okoli/);
  assert.match(html, /Founder &amp; Principal Partner/);
  assert.match(html, /url=%2Fimages%2Frufus-okoli.jpg/);
  assert.match(html, /Ngozi R. Okoli/);
  assert.match(html, /Dr. Nosike Agokei/);
  assert.match(html, /url=%2Fimages%2Fteam%2Fngozi-okoli-placeholder.jpg/);
  assert.match(html, /url=%2Fimages%2Fteam%2Fnosike-agokei-placeholder.jpg/);
  assert.equal((html.match(/data-team-member-card=/g) ?? []).length, 3);
  assert.doesNotMatch(html, /Meet our partners/);
});
