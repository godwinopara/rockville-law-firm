import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const stylesheet = readFileSync(new URL("./globals.css", import.meta.url), "utf8");

test("uses Rockville blue as the shared accent system", () => {
  assert.match(stylesheet, /--brand-blue: #2b3f61;/);
  assert.match(stylesheet, /--brand-blue-light: #7ea6c4;/);
  assert.match(stylesheet, /--color-brand-blue: var\(--brand-blue\);/);
  assert.match(stylesheet, /\.brand-rule/);
  assert.doesNotMatch(stylesheet, /--gold:/);
});
