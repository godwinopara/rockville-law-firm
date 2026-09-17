import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ConsultationBanner } from "@/components/consultation-banner";
import { EditorialHero } from "@/components/editorial-hero";
import { FaqSection } from "@/components/faq-section";
import { MotionReveal } from "@/components/motion-reveal";
import { PracticeAreaCards } from "@/components/practice-area-cards";
import { onlineServiceGroups } from "@/lib/content";

export const metadata = { title: "Services" };

export default function Services() {
  return <>
    <EditorialHero eyebrow="Practice areas" title="Focused counsel. Practical perspective." description="From business formation and compliance to property, intellectual assets, and disputes, we bring structure and clarity to complex legal work." image="/images/lagos-tower.jpg" imageAlt="High-rise architectural detail" primaryLabel="Book consultation" />

    <section className="bg-paper"><div className="page-shell section-space">
      <MotionReveal className="grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:gap-20"><div><p className="eyebrow brand-rule text-stone">Confidence, resilience, and strategic precision</p><h2 className="display mt-8 max-w-4xl text-5xl leading-[.98] md:text-7xl">We are driven by a clear purpose to protect rights and pursue fair outcomes.</h2></div><p className="max-w-md self-end leading-7 text-stone">We bring careful analysis, direct communication, and determined representation to the legal matters entrusted to us.</p></MotionReveal>
      <div className="mt-16"><PracticeAreaCards /></div>
    </div></section>

    <ConsultationBanner />

    <section className="bg-panel"><div className="page-shell section-space"><MotionReveal className="grid gap-8 lg:grid-cols-2"><div><p className="eyebrow brand-rule text-stone">Online services</p><h2 className="display mt-8 text-5xl leading-[.96] md:text-7xl">Start with what you need.</h2></div><p className="max-w-xl self-end leading-7 text-stone">Our selected online services create a straightforward first step for defined documentation and registration needs.</p></MotionReveal><div className="mt-16 grid border-t border-line md:grid-cols-2">{onlineServiceGroups.map((group, index) => <MotionReveal key={group.title} className={`py-10 md:p-12 ${index === 0 ? "md:border-r md:border-line md:pl-0" : "border-t border-line md:border-t-0 md:pr-0"}`}><p className="font-mono text-xs text-brand-blue">0{index + 1}</p><h3 className="display mt-6 text-4xl md:text-5xl">{group.title}</h3><p className="mt-4 text-stone">{group.intro}</p><ul className="mt-8 space-y-3">{group.services.map((service) => <li className="border-t border-line pt-3 text-sm" key={service}>{service}</li>)}</ul></MotionReveal>)}</div><MotionReveal className="mt-12"><Link className="btn-primary" href="/contact">Start a request<ArrowUpRight aria-hidden="true" size={16} /></Link></MotionReveal></div></section>
    <div data-services-section="faq"><FaqSection /></div>
  </>;
}
