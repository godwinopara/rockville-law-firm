import { ArrowUpRight } from "lucide-react";
import { practiceAreas } from "@/lib/content";
import { MotionReveal } from "@/components/motion-reveal";

export function StickyServices() {
  return <section className="bg-paper"><div className="page-shell section-space grid gap-14 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
    <div className="self-start lg:sticky lg:top-32"><MotionReveal><p className="eyebrow gold-rule text-stone">Areas of practice</p><h2 className="display mt-7 text-5xl leading-[.96] md:text-6xl">Judgment for matters with consequence.</h2><p className="mt-7 max-w-md leading-7 text-stone">Our work is shaped around business, property, disputes, intellectual assets, and the legal frameworks that support enduring decisions.</p></MotionReveal></div>
    <ol className="border-t border-line">{practiceAreas.map((area) => <li data-practice={area.number} key={area.title} className="group border-b border-line py-8 md:py-10"><MotionReveal className="grid gap-5 md:grid-cols-[4rem_1fr_auto] md:items-start"><span className="font-mono text-xs text-gold-dark">{area.number}</span><div><h3 className="display text-3xl leading-tight md:text-4xl">{area.title}</h3><p className="mt-4 max-w-xl leading-7 text-stone">{area.description}</p></div><ArrowUpRight className="text-gold-dark transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" size={22} strokeWidth={1.5} /></MotionReveal></li>)}</ol>
  </div></section>;
}
