import { renderToStaticMarkup } from "react-dom/server";
import assert from "node:assert/strict";
import test from "node:test";
import ServiceDetailPage, {
  generateMetadata,
  generateStaticParams,
} from "./[slug]/page";
import { practiceAreas } from "@/lib/content";

test("service detail pages pre-render every practice area", async () => {
  assert.deepEqual(
    await generateStaticParams(),
    practiceAreas.map(({ slug }) => ({ slug })),
  );
});

test("service detail pages render the complete narrative", async () => {
  const page = await ServiceDetailPage({
    params: Promise.resolve({ slug: "corporate-law" }),
  });
  const html = renderToStaticMarkup(page);

  assert.match(html, /Corporate Law/);
  assert.match(html, /How we can assist/);
  assert.match(html, /Our approach/);
  assert.match(html, /Related services/);
  assert.match(html, /Book consultation/);
});

test("service detail pages build metadata from service content", async () => {
  const metadata = await generateMetadata({
    params: Promise.resolve({ slug: "corporate-law" }),
  });

  assert.equal(metadata.title, "Corporate Law");
  assert.match(String(metadata.description), /Commercially grounded/);
});
