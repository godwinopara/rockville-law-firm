import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EditorialHero } from "@/components/editorial-hero";
import { FounderSection } from "@/components/founder-section";
import { MotionReveal } from "@/components/motion-reveal";
import { ValuesSection } from "@/components/values-section";

export const metadata = { title: "About" };

export default function About() {
  return <>
    <EditorialHero eyebrow="About Rockville" title="A practice built for clear, consequential decisions." description="We combine professional standards, commercial awareness, and practical thinking to serve the legal and business needs of our clients." image="/images/lagos-office.jpg" imageAlt="Refined contemporary architecture" primaryLabel="Book consultation" secondaryLabel="Our services" />
    <section className="bg-paper"><div className="page-shell section-space grid gap-12 lg:grid-cols-[.6fr_1.4fr] lg:gap-24"><MotionReveal><p className="eyebrow brand-rule text-stone">Our mission</p></MotionReveal><MotionReveal><h2 className="display max-w-5xl text-5xl leading-[.96] md:text-7xl">Cutting-edge legal service, deliberately delivered.</h2><p className="mt-9 max-w-2xl text-lg leading-8 text-stone">We provide legal services that efficiently and effectively respond to our clients’ business and personal needs. We continuously pursue depth, precision, and dependable service in our chosen areas of practice.</p></MotionReveal></div></section>
    <FounderSection />
    <ValuesSection />
    <section className="bg-paper"><div className="page-shell section-space grid gap-12 lg:grid-cols-2 lg:gap-24"><MotionReveal><p className="eyebrow brand-rule text-stone">Our vision</p><h2 className="display mt-8 text-5xl leading-[.96] md:text-7xl">A haven of legal and business solutions.</h2></MotionReveal><MotionReveal className="self-end"><p className="max-w-xl text-lg leading-8 text-stone">Clients should expect a candid assessment of their position, without empty promises. Our purpose is to deliver considered, practical counsel across every mandate we accept.</p></MotionReveal></div></section>
    <section className="bg-ink text-paper"><div className="page-shell section-space grid gap-12 lg:grid-cols-[1.35fr_.65fr]"><MotionReveal><p className="eyebrow brand-rule text-paper/55">Begin a conversation</p><h2 className="display mt-8 max-w-4xl text-5xl leading-[.94] md:text-7xl">Bring us the matter that needs clear counsel.</h2></MotionReveal><MotionReveal className="flex items-end"><Link href="/contact" className="btn-primary">Book consultation<ArrowUpRight size={16} /></Link></MotionReveal></div></section>
  </>;
}
