import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EditorialHero } from "@/components/editorial-hero";
import { MotionReveal } from "@/components/motion-reveal";
import { StickyServices } from "@/components/sticky-services";
import { coreValues, onlineServiceGroups } from "@/lib/content";

export default function Home() {
  return <>
    <EditorialHero eyebrow="Commercially grounded legal counsel" title="Clarity for the matters that move you forward." description="A focused legal practice for businesses, institutions, and individuals navigating decisions that demand sound judgment." image="/images/lagos-office.jpg" imageAlt="Contemporary architectural interior" primaryLabel="Book consultation" secondaryLabel="Explore our services" />

    <section className="bg-paper"><div className="page-shell section-space grid gap-12 lg:grid-cols-[.58fr_1.42fr] lg:gap-24">
      <MotionReveal><p className="eyebrow brand-rule text-stone">The practice</p></MotionReveal>
      <MotionReveal><h2 className="display max-w-5xl text-[clamp(2.8rem,5.6vw,5.8rem)] leading-[.95]">Legal expertise built around your business, your assets, and your ambitions.</h2><div className="mt-9 grid gap-7 border-t border-line pt-7 sm:grid-cols-2"><p className="leading-7 text-stone">We focus on private-client and private-business matters, bringing commercial perspective to every instruction.</p><p className="leading-7 text-stone">Our role is to make the complex understandable, the options visible, and the way forward considered.</p></div></MotionReveal>
    </div></section>

    <StickyServices />

    <section className="bg-ink text-paper"><div className="page-shell section-space grid gap-14 lg:grid-cols-2 lg:gap-24">
      <MotionReveal><p className="eyebrow brand-rule text-paper/55">How we work</p><h2 className="display mt-8 max-w-xl text-5xl leading-[.96] md:text-7xl">Principle is not a claim. It is a practice.</h2><p className="mt-7 max-w-lg leading-7 text-paper/62">We value honest assessment, direct communication, and advice that remains useful beyond the immediate matter.</p></MotionReveal>
      <ol className="border-t border-paper/15">{coreValues.map((value, index) => <li key={value} className="flex items-center border-b border-paper/15 py-6"><span className="mr-6 font-mono text-xs text-brand-blue-light">0{index + 1}</span><span className="display text-2xl md:text-3xl">{value}</span><span className="ml-auto text-brand-blue-light">—</span></li>)}</ol>
    </div></section>

    <section className="bg-panel"><div className="page-shell section-space">
      <MotionReveal className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow brand-rule text-stone">Online legal services</p><h2 className="display mt-7 text-5xl leading-[.96] md:text-6xl">A clear place to begin.</h2></div><p className="max-w-xl self-end leading-7 text-stone">Select document and intellectual-property services can begin online. Tell us what you need and we will guide the next step.</p></MotionReveal>
      <div className="mt-16 grid border-t border-line md:grid-cols-2">{onlineServiceGroups.map((group, index) => <MotionReveal key={group.title} className={`py-9 md:p-10 ${index === 0 ? "md:border-r md:border-line md:pl-0" : "border-t border-line md:border-t-0 md:pr-0"}`}><p className="font-mono text-xs text-brand-blue">0{index + 1}</p><h3 className="display mt-5 text-4xl">{group.title}</h3><p className="mt-3 text-stone">{group.intro}</p><ul className="mt-7 space-y-2 text-sm">{group.services.map((service) => <li key={service}>— {service}</li>)}</ul></MotionReveal>)}</div>
      <MotionReveal className="mt-12"><Link className="text-link" href="/contact">Start a request<ArrowUpRight size={15} /></Link></MotionReveal>
    </div></section>
  </>;
}
