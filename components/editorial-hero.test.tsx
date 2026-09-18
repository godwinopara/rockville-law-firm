import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { EditorialHero } from "./editorial-hero";

test("editorial hero keeps its content above the automatic slide backdrop", () => {
  const html = renderToStaticMarkup(<EditorialHero
    eyebrow="Example"
    title="Example title"
    description="Example description"
    image="/images/lagos-office.jpg"
    imageAlt="Office interior"
    primaryLabel="Book consultation"
    slides={[
      { image: "/images/lagos-office.jpg", alt: "Office interior" },
      { image: "/images/firm/reception.jpg", alt: "Firm reception" },
      { image: "/images/firm/conference-library.jpg", alt: "Conference library" },
    ]}
  />);

  assert.match(html, /data-hero-slider="automatic"/);
  assert.match(html, /aria-label="Hero slide progress"/);
  assert.match(html, /Example title/);
  assert.match(html, /Book consultation/);
});
