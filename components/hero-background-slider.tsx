"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type HeroSlide = { image: string; alt: string };

type HeroBackgroundSliderProps = {
  slides: HeroSlide[];
  priority?: boolean;
};

const SLIDE_DURATION = 4000;
const TRANSITION_DURATION = 900;

export function getHeroSlideDirection(index: number) {
  return index % 2 === 0 ? "from-right" : "from-left";
}

export function HeroBackgroundSlider({ slides, priority = false }: HeroBackgroundSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
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
    const timer = window.setInterval(() => setActiveIndex((index) => {
      setPreviousIndex(index);
      return (index + 1) % slides.length;
    }), SLIDE_DURATION);
    return () => window.clearInterval(timer);
  }, [canCycle, slides.length]);

  useEffect(() => {
    if (previousIndex === null) return;
    const timer = window.setTimeout(() => setPreviousIndex(null), TRANSITION_DURATION);
    return () => window.clearTimeout(timer);
  }, [previousIndex]);

  useEffect(() => {
    const hero = containerRef.current?.parentElement;
    if (!hero) return;
    const updatePauseState = () => window.requestAnimationFrame(() => setPaused(hero.matches(":hover") || hero.contains(document.activeElement)));
    hero.addEventListener("mouseenter", updatePauseState);
    hero.addEventListener("mouseleave", updatePauseState);
    hero.addEventListener("focusin", updatePauseState);
    hero.addEventListener("focusout", updatePauseState);
    return () => {
      hero.removeEventListener("mouseenter", updatePauseState);
      hero.removeEventListener("mouseleave", updatePauseState);
      hero.removeEventListener("focusin", updatePauseState);
      hero.removeEventListener("focusout", updatePauseState);
    };
  }, []);

  if (!activeSlide) return null;

  return <div
    ref={containerRef}
    data-hero-slider="automatic"
    data-hero-transition="horizontal"
    data-hero-paused={paused || reducedMotion ? "true" : "false"}
    role="img"
    aria-label={activeSlide.alt}
    className="group/hero absolute inset-0 -z-20 overflow-hidden bg-ink"
  >
    {slides.map((slide, index) => {
      const isActive = index === activeIndex;
      const isLeaving = index === previousIndex;
      const direction = getHeroSlideDirection(activeIndex);
      return <Image
        key={slide.image}
        src={slide.image}
        alt=""
        fill
        priority={priority && index === 0}
        sizes="100vw"
        className={`hero-slider-image object-cover ${isActive ? `hero-slider-image-entering hero-slider-image-${direction}` : ""} ${isLeaving ? `hero-slider-image-leaving hero-slider-image-${direction}` : ""}`}
      />;
    })}
    <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(18,18,18,.98)_0%,rgba(18,18,18,.86)_47%,rgba(18,18,18,.2)_100%)]" aria-hidden="true" />
    <div data-hero-progress="true" className="pointer-events-none absolute bottom-8 left-0 right-0 z-10" aria-hidden="true">
      <div className="page-shell flex items-center gap-4 text-xs font-semibold tracking-[.18em] text-paper/75">
        <span>{String(activeIndex + 1).padStart(2, "0")}</span>
        <span className="relative h-px w-20 overflow-hidden bg-paper/30"><span key={activeIndex} className={`hero-slider-progress ${canCycle ? "hero-slider-progress-active" : ""}`} /></span>
        <span>{String(slides.length).padStart(2, "0")}</span>
      </div>
    </div>
  </div>;
}
