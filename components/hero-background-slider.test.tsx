import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { HeroBackgroundSlider } from "./hero-background-slider";

const slides = [
  { image: "/images/lagos-office.jpg", alt: "Office interior" },
  { image: "/images/firm/reception.jpg", alt: "Firm reception" },
  { image: "/images/firm/conference-library.jpg", alt: "Conference library" },
];

test("hero background slider renders its automatic three-slide structure", () => {
  const html = renderToStaticMarkup(<HeroBackgroundSlider slides={slides} />);

  assert.match(html, /data-hero-slider="automatic"/);
  assert.match(html, /aria-label="Hero slide progress"/);
  assert.match(html, /01/);
  assert.match(html, /03/);
  assert.match(html, /lagos-office\.jpg/);
  assert.match(html, /reception\.jpg/);
  assert.match(html, /conference-library\.jpg/);
  assert.doesNotMatch(html, /Previous|Next/);
});
