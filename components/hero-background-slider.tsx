"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type HeroSlide = { image: string; alt: string };

type HeroBackgroundSliderProps = {
  slides: HeroSlide[];
  priority?: boolean;
};

const SLIDE_DURATION = 6000;

export function HeroBackgroundSlider({ slides, priority = false }: HeroBackgroundSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const activeSlide = slides[activeIndex] ?? slides[0];
  const canCycle = slides.length > 1 && !paused && !reducedMotion;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (!canCycle) return;
    const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % slides.length), SLIDE_DURATION);
    return () => window.clearInterval(timer);
  }, [canCycle, slides.length]);

  function updateFocusPause() {
    window.requestAnimationFrame(() => {
      const containsFocus = containerRef.current?.contains(document.activeElement) ?? false;
      setPaused(containsFocus || containerRef.current?.matches(":hover") === true);
    });
  }

  if (!activeSlide) return null;

  return <div
    ref={containerRef}
    data-hero-slider="automatic"
    data-hero-paused={paused || reducedMotion ? "true" : "false"}
    role="img"
    aria-label={activeSlide.alt}
    className="group/hero absolute inset-0 -z-20 overflow-hidden bg-ink"
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={updateFocusPause}
    onFocusCapture={() => setPaused(true)}
    onBlurCapture={updateFocusPause}
  >
    {slides.map((slide, index) => <Image
      key={slide.image}
      src={slide.image}
      alt=""
      fill
      priority={priority && index === 0}
      sizes="100vw"
      className={`hero-slider-image object-cover ${index === activeIndex ? "hero-slider-image-active" : ""}`}
    />)}
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,18,18,.98)_0%,rgba(18,18,18,.86)_47%,rgba(18,18,18,.2)_100%)]" aria-hidden="true" />
    <div className="pointer-events-none absolute bottom-8 left-0 right-0 z-10" aria-label="Hero slide progress" aria-live="off">
      <div className="page-shell flex items-center gap-4 text-xs font-semibold tracking-[.18em] text-paper/75">
        <span>{String(activeIndex + 1).padStart(2, "0")}</span>
        <span className="relative h-px w-20 overflow-hidden bg-paper/30"><span key={activeIndex} className={`hero-slider-progress ${canCycle ? "hero-slider-progress-active" : ""}`} /></span>
        <span>{String(slides.length).padStart(2, "0")}</span>
      </div>
    </div>
  </div>;
}
