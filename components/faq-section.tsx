"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { faqItems } from "@/lib/content";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return <section className="bg-paper" aria-labelledby="faq-heading"><div className="page-shell section-space">
    <div className="grid gap-12 lg:grid-cols-[minmax(0,.7fr)_minmax(0,1.3fr)] lg:gap-24">
      <div className="lg:sticky lg:top-32 lg:self-start"><p className="eyebrow brand-rule text-stone">Help &amp; FAQs</p><h2 id="faq-heading" className="display mt-7 text-5xl leading-[.96] md:text-6xl">Answers for a clearer next step.</h2><p className="mt-7 max-w-md leading-7 text-stone">A few practical answers about working with Rockville LP and the areas of legal support we provide.</p><div className="relative mt-12 aspect-[4/3] overflow-hidden bg-panel"><Image src="/images/lagos-tower.jpg" alt="Contemporary Lagos architecture" fill sizes="(min-width: 1024px) 36vw, 100vw" className="object-cover grayscale" /></div></div>
      <div className="border-t border-line">{faqItems.map((item, index) => {
        const isOpen = index === openIndex;
        const panelId = `faq-answer-${index}`;
        return <div key={item.question} className="border-b border-line py-1"><h3><button type="button" className="flex w-full items-center gap-6 py-7 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpenIndex(isOpen ? null : index)}><span className="font-mono text-xs text-brand-blue">0{index + 1}</span><span className="display flex-1 text-2xl leading-tight md:text-3xl">{item.question}</span>{isOpen ? <Minus aria-hidden="true" className="shrink-0 text-brand-blue" size={20} strokeWidth={1.4} /> : <Plus aria-hidden="true" className="shrink-0 text-brand-blue" size={20} strokeWidth={1.4} />}</button></h3><div id={panelId} role="region" aria-label={item.question} className={`grid overflow-hidden transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}><div className="min-h-0"><p className="max-w-2xl pb-8 pl-8 pr-10 leading-7 text-stone md:pl-12">{item.answer}</p></div></div></div>;
      })}</div>
    </div>
  </div></section>;
}
