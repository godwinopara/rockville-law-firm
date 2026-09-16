import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EditorialHero } from "@/components/editorial-hero";
import { MotionReveal } from "@/components/motion-reveal";

export const metadata = { title: "Our Team" };

export default function Team() {
  return <>
    <EditorialHero eyebrow="Our team" title="Specialist counsel, united by one standard." description="Our practice is shaped by legal professionals who approach each mandate with care, discipline, and a clear understanding of what is at stake." image="/images/founders-placeholder.jpg" imageAlt="Legal professionals in a contemporary office" primaryLabel="Book consultation" secondaryLabel="Explore services" />
    <section className="bg-paper"><div className="page-shell section-space grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-24"><MotionReveal variant="media" className="editorial-image min-h-[34rem]"><Image src="/images/lagos-office.jpg" alt="Contemporary professional interior" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover grayscale" /></MotionReveal><MotionReveal className="self-center"><p className="eyebrow gold-rule text-stone">A considered introduction</p><h2 className="display mt-8 text-5xl leading-[.96] md:text-6xl">Team profiles are being prepared.</h2><p className="mt-8 max-w-xl text-lg leading-8 text-stone">Rockville is built around specialised legal talent. Individual biographies will be published when verified profiles and portraits are available.</p><p className="mt-6 max-w-xl leading-7 text-stone">Until then, speak with the firm directly and we will connect your matter with the appropriate counsel.</p><Link href="/contact" className="btn-primary mt-9">Contact the firm<ArrowUpRight size={16} /></Link></MotionReveal></div></section>
  </>;
}
