import assert from "node:assert/strict";
import test from "node:test";
import { validateContactForm } from "./form";

test("contact validation identifies every invalid field", () => {
  assert.deepEqual(validateContactForm({ name: "", email: "bad", message: "" }), {
    name: "Enter your name.",
    email: "Enter a valid email address.",
    message: "Tell us how we can help.",
  });
});

test("contact validation accepts a complete enquiry", () => {
  assert.deepEqual(validateContactForm({ name: "Ada", email: "ada@example.com", message: "Please contact me." }), {});
});
