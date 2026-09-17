"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { practiceAreas } from "@/lib/content";

type PracticeAreasCarouselProps = { eyebrow: string; title: string; description: string; excludeSlug?: string; showAllServicesLink?: boolean };

export function PracticeAreasCarousel({ eyebrow, title, description, excludeSlug, showAllServicesLink = false }: PracticeAreasCarouselProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(true);
  const areas = practiceAreas.filter((area) => area.slug !== excludeSlug);

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

  return <section data-practice-carousel-layout="split" className="overflow-hidden bg-ink py-20 text-paper md:py-28" aria-labelledby="practice-carousel-heading">
    <div className="page-shell grid gap-12 lg:grid-cols-[minmax(19rem,.62fr)_minmax(0,1.38fr)] lg:gap-16">
      <div className="flex flex-col lg:h-full lg:justify-between lg:pb-3"><div><p className="eyebrow brand-rule text-brand-blue-light">{eyebrow}</p><h2 id="practice-carousel-heading" className="display mt-7 text-5xl leading-[.96] md:text-6xl">{title}</h2><p className="mt-7 max-w-md leading-7 text-paper/70">{description}</p>{showAllServicesLink && <Link href="/services" className="text-link mt-7 text-paper hover:text-brand-blue-light">View all services <ArrowUpRight aria-hidden="true" size={15} /></Link>}</div>
        <div className="mt-10 flex gap-3 lg:mt-0" role="group" aria-label="Practice area carousel controls">
          <button type="button" className="inline-flex h-12 w-12 items-center justify-center border border-paper/25 text-paper transition-colors hover:border-brand-blue-light hover:text-brand-blue-light disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue-light" aria-label="Previous practice areas" disabled={!canGoBack} onClick={() => move(-1)}><ArrowLeft size={19} strokeWidth={1.5} /></button>
          <button type="button" className="inline-flex h-12 w-12 items-center justify-center border border-paper/25 text-paper transition-colors hover:border-brand-blue-light hover:text-brand-blue-light disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue-light" aria-label="Next practice areas" disabled={!canGoForward} onClick={() => move(1)}><ArrowRight size={19} strokeWidth={1.5} /></button>
        </div>
      </div>
      <div ref={railRef} onScroll={updateControls} className="flex gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory" role="region" aria-label="Rockville LP practice areas">
      {areas.map((area) => <Link data-practice-carousel-card={area.number} key={area.slug} href={`/services/${area.slug}`} className="group relative flex min-h-[31rem] w-[min(78vw,27rem)] shrink-0 snap-start overflow-hidden bg-brand-blue p-8 text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue-light"><Image src={area.image.src} alt={area.image.alt} fill sizes="(min-width:1024px) 28vw, 78vw" className="object-cover" /><span className="absolute inset-0 bg-ink/55" /><span className="absolute inset-x-0 top-0 h-full -translate-y-full bg-brand-blue transition-transform duration-500 group-hover:translate-y-0 group-focus-within:translate-y-0 motion-reduce:transition-none" /><span className="relative z-10 flex h-full flex-1 flex-col"><span className="font-mono text-sm">{area.number}</span><span className="display mt-14 text-4xl leading-[.96]">{area.title}</span><span className="mt-auto leading-7">{area.description}</span><span className="mt-8 flex items-center gap-3 text-sm uppercase tracking-[.14em]">Explore service <ArrowUpRight size={17} /></span></span></Link>)}
      </div>
    </div>
  </section>;
}
