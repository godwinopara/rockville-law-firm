import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { TeamSection } from "./team-section";

test("team section uses aligned portrait frames and keeps a consultant frame without a portrait", () => {
  const html = renderToStaticMarkup(<TeamSection />);
  assert.match(html, /Our team/);
  assert.match(html, /Rufus C. Okoli/);
  assert.match(html, /Founder &amp; Principal Partner/);
  assert.match(html, /url=%2Fimages%2Frufus-okoli.jpg/);
  assert.match(html, /Ngozi R. Okoli/);
  assert.match(html, /Dr. Nosike Agokei/);
  assert.match(html, /url=%2Fimages%2Fteam%2Fngozi-okoli.jpg/);
  assert.doesNotMatch(html, /nosike-agokei-placeholder/);
  assert.equal((html.match(/data-team-photo-frame="fixed"/g) ?? []).length, 3);
  assert.match(html, /Portrait forthcoming/);
  assert.equal((html.match(/data-team-member-card=/g) ?? []).length, 3);
  assert.doesNotMatch(html, /Meet our partners/);
});
