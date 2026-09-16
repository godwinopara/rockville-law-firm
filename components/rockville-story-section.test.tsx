import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { RockvilleStorySection } from "./rockville-story-section";

test("Rockville story distinguishes the originating practice from Rockville LP", () => {
  const html = renderToStaticMarkup(<RockvilleStorySection />);
  assert.match(html, /Rufus Okoli &amp; Associates/);
  assert.match(html, /June 2018/);
  assert.doesNotMatch(html, /founded Rockville LP in 2004/i);
});
