"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { practiceAreas } from "@/lib/content";

export function PracticeAreasCarousel() {
  const railRef = useRef<HTMLDivElement>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(true);

  const updateControls = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    setCanGoBack(rail.scrollLeft > 2);
    setCanGoForward(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 2);
  }, []);

  useEffect(() => {
    updateControls();
    window.addEventListener("resize", updateControls);
    return () => window.removeEventListener("resize", updateControls);
  }, [updateControls]);

  const move = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollBy({ left: direction * rail.clientWidth * 0.82, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return <section className="overflow-hidden bg-ink py-20 text-paper md:py-28" aria-labelledby="practice-carousel-heading">
    <div className="page-shell">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <p className="eyebrow brand-rule text-brand-blue-light">Practice areas</p>
          <h2 id="practice-carousel-heading" className="display mt-7 max-w-4xl text-5xl leading-[.96] md:text-7xl">Confidence, resilience, and strategic precision.</h2>
          <p className="mt-7 max-w-2xl text-base leading-7 text-paper/70 md:text-lg">Legal support grounded in commercial awareness, disciplined preparation, and clear advice for every stage of a consequential matter.</p>
        </div>
        <div className="flex gap-3" aria-label="Practice area carousel controls">
          <button type="button" className="inline-flex h-12 w-12 items-center justify-center border border-paper/25 text-paper transition-colors hover:border-brand-blue-light hover:text-brand-blue-light disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue-light" aria-label="Previous practice areas" disabled={!canGoBack} onClick={() => move(-1)}><ArrowLeft size={19} strokeWidth={1.5} /></button>
          <button type="button" className="inline-flex h-12 w-12 items-center justify-center border border-paper/25 text-paper transition-colors hover:border-brand-blue-light hover:text-brand-blue-light disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue-light" aria-label="Next practice areas" disabled={!canGoForward} onClick={() => move(1)}><ArrowRight size={19} strokeWidth={1.5} /></button>
        </div>
      </div>
    </div>
    <div ref={railRef} onScroll={updateControls} className="mt-14 flex gap-4 overflow-x-auto px-[max(1.5rem,calc((100vw-80rem)/2))] pb-3 pr-6 [scrollbar-width:thin] snap-x snap-mandatory md:mt-16 md:gap-6" aria-label="Rockville LP practice areas">
      {practiceAreas.map((area) => <Link data-practice-carousel-card={area.number} key={area.slug} href={`/services/${area.slug}`} className="group flex min-h-[25rem] w-[min(82vw,26rem)] shrink-0 snap-start flex-col justify-between border border-paper/20 bg-paper/5 p-7 transition-colors hover:border-brand-blue-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue-light md:w-[25rem] md:p-9">
        <div>
          <span className="font-mono text-xs text-brand-blue-light">{area.number}</span>
          <h3 className="display mt-12 text-4xl leading-[.98]">{area.title}</h3>
          <p className="mt-6 leading-7 text-paper/68">{area.description}</p>
        </div>
        <span className="flex items-center gap-3 text-sm uppercase tracking-[.14em] text-brand-blue-light">Explore service <ArrowUpRight size={17} strokeWidth={1.5} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none" /></span>
      </Link>)}
    </div>
  </section>;
}
