import { EditorialHero } from "@/components/editorial-hero";
import { TeamSection } from "@/components/team-section";
import { ConsultationBanner } from "@/components/consultation-banner";
import { FaqSection } from "@/components/faq-section";

export const metadata = { title: "Our Team" };

export default function Team() {
  return <>
    <EditorialHero eyebrow="Our team" title="Experienced counsel, united by one standard." description="Rockville LP brings together legal professionals who approach each mandate with care, discipline, and a clear understanding of what is at stake." image="/images/lagos-office.jpg" imageAlt="Rockville LP office architecture" primaryLabel="Book consultation" secondaryLabel="Explore services" />
    <TeamSection />
    <ConsultationBanner />
    <div data-team-section="faq"><FaqSection /></div>
  </>;
}
