import assert from "node:assert/strict";
import test from "node:test";
import { shouldEnableSmoothScroll, smoothScrollOptions } from "./smooth-scroll";

test("uses a controlled medium-speed wheel glide", () => {
  assert.equal(smoothScrollOptions.duration, 1.15);
  assert.equal(smoothScrollOptions.wheelMultiplier, 0.78);
  assert.equal(smoothScrollOptions.smoothWheel, true);
});

test("preserves native scrolling when reduced motion is requested", () => {
  assert.equal(shouldEnableSmoothScroll(true), false);
  assert.equal(shouldEnableSmoothScroll(false), true);
});
