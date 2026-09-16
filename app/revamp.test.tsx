import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import About from "./about/page";
import Home from "./page";
import Team from "./team/page";

const sectionOrder = (html: string, page: "home" | "about") =>
  Array.from(html.matchAll(new RegExp(`data-${page}-section="([^"]+)"`, "g")), ([, section]) => section);

test("home leads with one consultation action and a complete practice index", () => {
  const html = renderToStaticMarkup(<Home />);
  assert.match(html, /Book consultation/);
  assert.match(html, /Company Secretary \/ Compliance/);
  assert.match(html, /Alternative Dispute Resolution/);
  assert.deepEqual(sectionOrder(html, "home"), ["hero", "about", "service", "process", "team", "story", "values", "consultation", "faq"]);
});

test("about presents the agreed editorial sequence", () => {
  const html = renderToStaticMarkup(<About />);

  assert.deepEqual(sectionOrder(html, "about"), ["hero", "about", "service", "process", "team", "consultation"]);
  assert.match(html, /A haven of legal and business solutions/);
  assert.match(html, /Company Secretary \/ Compliance/);
  assert.match(html, /Our team/);
});

test("team page presents the verified Rockville roster", () => {
  const html = renderToStaticMarkup(<Team />);
  assert.match(html, /Rufus C. Okoli/);
  assert.match(html, /Ngozi R. Okoli/);
  assert.match(html, /Dr. Nosike Agokei/);
  assert.doesNotMatch(html, /Team profiles are being prepared/);
  assert.doesNotMatch(html, /Founding partners portrait placeholder/);
});
