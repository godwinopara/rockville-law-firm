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
  assert.match(html, /data-service-detail-layout="editorial-sidebar"/);
  assert.match(html, /data-service-detail-sidebar/);
  assert.match(html, /data-service-detail-spacer/);
  assert.match(html, /data-service-detail-content/);
  assert.match(html, /lg:grid-cols-\[25%_15%_60%\]/);
  assert.doesNotMatch(html, /aria-label="Service detail practice areas"/);
  assert.match(html, /Rufus C. Okoli/);
  assert.match(html, /Founder &amp; Principal Partner/);
  assert.match(html, /Rufus Okoli, Founder and Principal Partner/);
  assert.match(html, /How we can assist/);
  assert.match(html, /Our approach/);
  assert.match(html, /Other services/);
  assert.match(html, /View all services/);
  assert.doesNotMatch(html, /data-practice-carousel-card="04"/);
  assert.match(html, /href="\/services\/company-secretary-compliance"/);
  assert.match(html, /Book consultation/);
  assert.doesNotMatch(html, /<ol[^>]*>\s*<div/);
});

test("service detail pages build metadata from service content", async () => {
  const metadata = await generateMetadata({
    params: Promise.resolve({ slug: "corporate-law" }),
  });

  assert.equal(metadata.title, "Corporate Law");
  assert.match(String(metadata.description), /Commercially grounded/);
});
