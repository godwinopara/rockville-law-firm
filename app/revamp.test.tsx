import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import About from "./about/page";
import Contact from "./contact/page";
import Home from "./page";
import Services from "./services/page";
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

  assert.deepEqual(sectionOrder(html, "about"), ["hero", "about", "mission", "service", "process", "team", "consultation", "faq"]);
  assert.match(html, /Who we are/);
  assert.match(html, /Founded in June 2018/);
  assert.match(html, /over 20 years of combined experience/);
  assert.match(html, /A haven of legal and business solutions/);
  assert.match(html, /Company Secretary \/ Compliance/);
  assert.match(html, /Initial consultation/);
  assert.match(html, /Rufus C. Okoli/);
});

test("every public index page provides Help and FAQs before the footer", () => {
  const pages = [
    ["services", renderToStaticMarkup(<Services />)],
    ["team", renderToStaticMarkup(<Team />)],
    ["contact", renderToStaticMarkup(<Contact />)],
  ] as const;

  for (const [page, html] of pages) {
    assert.match(html, new RegExp(`data-${page}-section="faq"`));
    assert.match(html, /Help &amp; FAQs/);
  }
});

test("team page presents the verified Rockville roster", () => {
  const html = renderToStaticMarkup(<Team />);
  assert.match(html, /Rufus C. Okoli/);
  assert.match(html, /Ngozi R. Okoli/);
  assert.match(html, /Dr. Nosike Agokei/);
  assert.equal((html.match(/data-team-profile=/g) ?? []).length, 3);
  assert.equal((html.match(/data-team-story-layout="founder-story"/g) ?? []).length, 3);
  assert.equal((html.match(/Our team member’s story/g) ?? []).length, 3);
  assert.equal((html.match(/aria-label="Team profile contact details"/g) ?? []).length, 3);
  assert.equal((html.match(/data-team-photo-frame="fixed"/g) ?? []).length, 3);
  assert.match(html, /Portrait forthcoming/);
  assert.match(html, /called to the Nigerian Bar in September, 1999/);
  assert.match(html, /Notary Public of the Supreme Court of Nigeria/);
  assert.match(html, /Fellow Chartered Institute of Bankers/);
  assert.doesNotMatch(html, /Team profiles are being prepared/);
  assert.doesNotMatch(html, /Founding partners portrait placeholder/);
});
