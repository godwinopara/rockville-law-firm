import { ConsultationBanner } from "@/components/consultation-banner";
import { EditorialHero } from "@/components/editorial-hero";
import { FaqSection } from "@/components/faq-section";
import { AboutFirmIntroductionSection } from "@/components/home-about-section";
import { MotionReveal } from "@/components/motion-reveal";
import { ProcessSection } from "@/components/process-section";
import { PracticeAreasCarousel } from "@/components/practice-areas-carousel";
import { TeamSection } from "@/components/team-section";

export const metadata = { title: "About" };

export default function About() {
  return <>
    <div data-about-section="hero"><EditorialHero eyebrow="About Rockville" title="A practice built for clear, consequential decisions." description="We combine professional standards, commercial awareness, and practical thinking to serve the legal and business needs of our clients." image="/images/lagos-office.jpg" imageAlt="Refined contemporary architecture" primaryLabel="Book consultation" secondaryLabel="Our services" /></div>
    <div data-about-section="about"><AboutFirmIntroductionSection /></div>
    <section data-about-section="mission" className="bg-paper"><div className="page-shell section-space space-y-20"><div className="grid gap-12 lg:grid-cols-[.6fr_1.4fr] lg:gap-24"><MotionReveal><p className="eyebrow brand-rule text-stone">Our mission</p></MotionReveal><MotionReveal><h2 className="display max-w-5xl text-5xl leading-[.96] md:text-7xl">Cutting-edge legal service, deliberately delivered.</h2><p className="mt-9 max-w-2xl text-lg leading-8 text-stone">To provide cutting-edge legal services designed to effectively and efficiently meet the legal and business needs of our clients. We are committed to excellence backed by deep expertise across our areas of practice.</p></MotionReveal></div><div className="grid gap-12 border-t border-line pt-16 lg:grid-cols-2 lg:gap-24"><MotionReveal><p className="eyebrow brand-rule text-stone">Our vision</p><h2 className="display mt-8 text-5xl leading-[.96] md:text-7xl">A haven of legal and business solutions.</h2></MotionReveal><MotionReveal className="self-end"><p className="max-w-xl text-lg leading-8 text-stone">To be the trusted haven for legal and business solutions—offering honest counsel, and attaining desired results across every mandate we undertake.</p></MotionReveal></div></div></section>
    <div data-about-section="service"><PracticeAreasCarousel eyebrow="Practice areas" title="Judgment for matters with consequence." description="Explore Rockville LP’s areas of practice and the legal support available for consequential matters." /></div>
    <div data-about-section="process"><ProcessSection /></div>
    <div data-about-section="team"><TeamSection /></div>
    <div data-about-section="consultation"><ConsultationBanner /></div>
    <div data-about-section="faq"><FaqSection /></div>
  </>;
}
