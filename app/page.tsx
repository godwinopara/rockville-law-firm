import { ConsultationBanner } from "@/components/consultation-banner";
import { EditorialHero } from "@/components/editorial-hero";
import { FounderSection } from "@/components/founder-section";
import { MotionReveal } from "@/components/motion-reveal";
import { StickyServices } from "@/components/sticky-services";
import { coreValues } from "@/lib/content";

export default function Home() {
  return <>
    <div data-home-section="hero"><EditorialHero eyebrow="Commercially grounded legal counsel" title="Clarity for the matters that move you forward." description="A focused legal practice for businesses, institutions, and individuals navigating decisions that demand sound judgment." image="/images/lagos-office.jpg" imageAlt="Contemporary architectural interior" primaryLabel="Book consultation" secondaryLabel="Explore our services" /></div>

    <section data-home-section="about" className="bg-paper"><div className="page-shell section-space grid gap-12 lg:grid-cols-[.58fr_1.42fr] lg:gap-24">
      <MotionReveal><p className="eyebrow brand-rule text-stone">The practice</p></MotionReveal>
      <MotionReveal><h2 className="display max-w-5xl text-[clamp(2.8rem,5.6vw,5.8rem)] leading-[.95]">Legal expertise built around your business, your assets, and your ambitions.</h2><div className="mt-9 grid gap-7 border-t border-line pt-7 sm:grid-cols-2"><p className="leading-7 text-stone">We focus on private-client and private-business matters, bringing commercial perspective to every instruction.</p><p className="leading-7 text-stone">Our role is to make the complex understandable, the options visible, and the way forward considered.</p></div></MotionReveal>
    </div></section>

    <div data-home-section="service"><StickyServices /></div>

    <section data-home-section="process" className="bg-ink text-paper"><div className="page-shell section-space grid gap-14 lg:grid-cols-2 lg:gap-24">
      <MotionReveal><p className="eyebrow brand-rule text-paper/55">How we work</p><h2 className="display mt-8 max-w-xl text-5xl leading-[.96] md:text-7xl">Principle is not a claim. It is a practice.</h2><p className="mt-7 max-w-lg leading-7 text-paper/62">We value honest assessment, direct communication, and advice that remains useful beyond the immediate matter.</p></MotionReveal>
      <ol className="border-t border-paper/15">{coreValues.map((value, index) => <li key={value} className="flex items-center border-b border-paper/15 py-6"><span className="mr-6 font-mono text-xs text-brand-blue-light">0{index + 1}</span><span className="display text-2xl md:text-3xl">{value}</span><span className="ml-auto text-brand-blue-light">—</span></li>)}</ol>
    </div></section>

    <div data-home-section="team"><FounderSection /></div>

    <div data-home-section="consultation"><ConsultationBanner /></div>
  </>;
}
