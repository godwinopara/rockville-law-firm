import { ConsultationBanner } from "@/components/consultation-banner";
import { EditorialHero } from "@/components/editorial-hero";
import { FaqSection } from "@/components/faq-section";
import { MotionReveal } from "@/components/motion-reveal";
import { PracticeAreasCarousel } from "@/components/practice-areas-carousel";
import { ProcessSection } from "@/components/process-section";
import { RockvilleStorySection } from "@/components/rockville-story-section";
import { TeamSection } from "@/components/team-section";
import { ValuesSection } from "@/components/values-section";

export default function Home() {
  return <>
    <div data-home-section="hero"><EditorialHero eyebrow="Commercially grounded legal counsel" title="Clarity for the matters that move you forward." description="A focused legal practice for businesses, institutions, and individuals navigating decisions that demand sound judgment." image="/images/lagos-office.jpg" imageAlt="Contemporary architectural interior" primaryLabel="Book consultation" secondaryLabel="Explore our services" /></div>

    <section data-home-section="about" className="bg-paper"><div className="page-shell section-space grid gap-12 lg:grid-cols-[.58fr_1.42fr] lg:gap-24">
      <MotionReveal><p className="eyebrow brand-rule text-stone">The practice</p></MotionReveal>
      <MotionReveal><h2 className="display max-w-5xl text-[clamp(2.8rem,5.6vw,5.8rem)] leading-[.95]">Refined advocacy for complex matters and changing business realities.</h2><div className="mt-9 grid gap-7 border-t border-line pt-7 sm:grid-cols-2"><p className="leading-7 text-stone">Rockville LP is a full-service practice providing cutting-edge legal services designed around the legal and business needs of its clients.</p><p className="leading-7 text-stone">Our role is to make the complex understandable, the options visible, and the way forward considered.</p></div></MotionReveal>
    </div></section>

    <div data-home-section="service"><PracticeAreasCarousel /></div>
    <div data-home-section="process"><ProcessSection /></div>
    <div data-home-section="team"><TeamSection /></div>
    <div data-home-section="story"><RockvilleStorySection /></div>
    <div data-home-section="values"><ValuesSection /></div>
    <div data-home-section="consultation"><ConsultationBanner /></div>
    <div data-home-section="faq"><FaqSection /></div>
  </>;
}
