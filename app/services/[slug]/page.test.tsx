import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import ServiceDetailPage from "./page";

test("service detail hero uses the shared automatic slider", async () => {
  const page = await ServiceDetailPage({ params: Promise.resolve({ slug: "corporate-law" }) });
  const html = renderToStaticMarkup(page);

  assert.match(html, /data-hero-slider="automatic"/);
  assert.match(html, /data-hero-progress="true"/);
  assert.match(html, /All services/);
  assert.match(html, /Corporate Law/);
});
