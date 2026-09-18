import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { ContactForm } from "./contact-form";

test("contact fields keep their border neutral when focused", () => {
  const html = renderToStaticMarkup(<ContactForm />);

  assert.doesNotMatch(html, /focus:border-brand-blue/);
  assert.match(html, /contact-form-field/);
});
