import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { MotionReveal } from "@/components/motion-reveal";
import { processSteps } from "@/lib/content";

export function ProcessSection() {
  return <section data-process-layout="sticky-list" className="bg-paper" aria-labelledby="process-heading"><div className="page-shell section-space grid gap-14 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
    <div className="self-start lg:sticky lg:top-32"><MotionReveal><p className="eyebrow brand-rule text-stone">Our process</p><h2 id="process-heading" className="display mt-7 text-5xl leading-[.96] md:text-6xl">From consultation to resolution, handled with clarity.</h2><p className="mt-7 max-w-md leading-7 text-stone">A thoughtful legal process starts with a clear view of the matter, then moves forward with disciplined preparation and practical direction.</p><div className="relative mt-10 aspect-[4/3] max-w-md overflow-hidden bg-panel"><Image src="/images/firm/library-supreme-court-cases.jpg" alt="Rockville LP library of Nigerian Supreme Court cases" fill sizes="(min-width: 1024px) 32vw, 100vw" className="object-cover" /></div></MotionReveal></div>
    <ol className="border-t border-line">{processSteps.map((step) => <li key={step.number} className="group border-b border-line py-8 md:py-10"><MotionReveal className="grid gap-5 md:grid-cols-[4rem_1fr_auto] md:items-start"><span className="font-mono text-xs text-brand-blue">{step.number}</span><div><h3 className="display text-3xl leading-tight md:text-4xl">{step.title}</h3><p className="mt-4 max-w-xl leading-7 text-stone">{step.body}</p></div><ArrowUpRight aria-hidden="true" className="text-brand-blue transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transition-none" size={22} strokeWidth={1.5} /></MotionReveal></li>)}</ol>
  </div></section>;
}
