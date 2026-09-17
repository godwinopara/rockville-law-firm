import { EditorialHero } from "@/components/editorial-hero";
import { ConsultationBanner } from "@/components/consultation-banner";
import { FaqSection } from "@/components/faq-section";
import { TeamProfiles } from "@/components/team-profiles";

export const metadata = { title: "Our Team" };

export default function Team() {
  return <>
    <EditorialHero eyebrow="Our team" title="Experienced counsel, united by one standard." description="Rockville LP brings together legal professionals who approach each mandate with care, discipline, and a clear understanding of what is at stake." image="/images/lagos-office.jpg" imageAlt="Rockville LP office architecture" primaryLabel="Book consultation" secondaryLabel="Explore services" />
    <TeamProfiles />
    <ConsultationBanner />
    <div data-team-section="faq"><FaqSection /></div>
  </>;
}
