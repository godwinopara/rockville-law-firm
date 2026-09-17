import { ConsultationBanner } from "@/components/consultation-banner";
import { EditorialHero } from "@/components/editorial-hero";
import { FaqSection } from "@/components/faq-section";
import { HomeAboutSection } from "@/components/home-about-section";
import { PracticeAreasCarousel } from "@/components/practice-areas-carousel";
import { ProcessSection } from "@/components/process-section";
import { RockvilleStorySection } from "@/components/rockville-story-section";
import { TeamSection } from "@/components/team-section";
import { ValuesSection } from "@/components/values-section";

export default function Home() {
  return <>
    <div data-home-section="hero"><EditorialHero eyebrow="Commercially grounded legal counsel" title="Clarity for the matters that move you forward." description="A focused legal practice for businesses, institutions, and individuals navigating decisions that demand sound judgment." image="/images/lagos-office.jpg" imageAlt="Contemporary architectural interior" primaryLabel="Book consultation" secondaryLabel="Explore our services" /></div>

    <div data-home-section="about"><HomeAboutSection /></div>

    <div data-home-section="service"><PracticeAreasCarousel eyebrow="Practice areas" title="Confidence, resilience, and strategic precision." description="Rockville LP provides focused legal support for businesses, institutions, and individuals facing consequential decisions." /></div>
    <div data-home-section="process"><ProcessSection /></div>
    <div data-home-section="team"><TeamSection /></div>
    <div data-home-section="story"><RockvilleStorySection /></div>
    <div data-home-section="values"><ValuesSection /></div>
    <div data-home-section="consultation"><ConsultationBanner /></div>
    <div data-home-section="faq"><FaqSection /></div>
  </>;
}
