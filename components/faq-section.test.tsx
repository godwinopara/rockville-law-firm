import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { faqItems } from "@/lib/content";
import { FaqSection } from "./faq-section";

test("FAQ section provides labelled disclosure controls for every approved question", () => {
  const html = renderToStaticMarkup(<FaqSection />);

  assert.match(html, /Help &amp; FAQs/);
  assert.equal((html.match(/aria-expanded=/g) ?? []).length, faqItems.length);
  assert.equal((html.match(/aria-controls=/g) ?? []).length, faqItems.length);
  assert.match(html, /How do I begin a conversation with Rockville LP\?/);
});
