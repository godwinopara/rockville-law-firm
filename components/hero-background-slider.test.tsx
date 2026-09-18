import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { getHeroSlideDirection, HeroBackgroundSlider } from "./hero-background-slider";

const slides = [
  { image: "/images/lagos-office.jpg", alt: "Office interior" },
  { image: "/images/firm/reception.jpg", alt: "Firm reception" },
  { image: "/images/firm/conference-library.jpg", alt: "Conference library" },
];

test("hero background slider renders its automatic three-slide structure", () => {
  const html = renderToStaticMarkup(<HeroBackgroundSlider slides={slides} />);

  assert.match(html, /data-hero-slider="automatic"/);
  assert.match(html, /data-hero-transition="horizontal"/);
  assert.match(html, /z-10 bg-\[linear-gradient/);
  assert.match(html, /data-hero-progress="true"/);
  assert.match(html, /01/);
  assert.match(html, /03/);
  assert.match(html, /lagos-office\.jpg/);
  assert.match(html, /reception\.jpg/);
  assert.match(html, /conference-library\.jpg/);
  assert.doesNotMatch(html, /Previous|Next/);
});

test("hero slider alternates horizontal entrance direction", () => {
  assert.equal(getHeroSlideDirection(0), "from-right");
  assert.equal(getHeroSlideDirection(1), "from-left");
  assert.equal(getHeroSlideDirection(2), "from-right");
});
