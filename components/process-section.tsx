import { ArrowDown } from "lucide-react";
import { MotionReveal } from "@/components/motion-reveal";
import { processSteps } from "@/lib/content";

export function ProcessSection() {
  return <section className="bg-paper" aria-labelledby="process-heading"><div className="page-shell section-space">
    <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
      <MotionReveal><p className="eyebrow brand-rule text-stone">Our process</p><h2 id="process-heading" className="display mt-7 max-w-xl text-5xl leading-[.96] md:text-7xl">From consultation to resolution, handled with clarity.</h2></MotionReveal>
      <MotionReveal className="self-end"><p className="max-w-xl text-lg leading-8 text-stone">A thoughtful legal process starts with a clear view of the matter, then moves forward with disciplined preparation and practical direction.</p></MotionReveal>
    </div>
    <ol className="mt-16 border-t border-line">
      {processSteps.map((step, index) => <li key={step.number} className="grid gap-5 border-b border-line py-8 md:grid-cols-[5rem_minmax(0,1fr)_minmax(0,.9fr)_auto] md:items-start md:py-10">
        <span className="font-mono text-xs text-brand-blue">{step.number}</span><h3 className="display text-3xl leading-[.98] md:text-4xl">{step.title}</h3><p className="leading-7 text-stone">{step.body}</p>{index < processSteps.length - 1 && <ArrowDown aria-hidden="true" className="hidden text-brand-blue md:block" size={20} strokeWidth={1.4} />}
      </li>)}
    </ol>
  </div></section>;
}
