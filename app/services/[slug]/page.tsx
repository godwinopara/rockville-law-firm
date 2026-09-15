import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ConsultationBanner } from "@/components/consultation-banner";
import { MotionReveal } from "@/components/motion-reveal";
import {
  getPracticeAreaBySlug,
  getRelatedPracticeAreas,
  practiceAreas,
} from "@/lib/content";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return practiceAreas.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = getPracticeAreaBySlug(slug);

  if (!area) return { title: "Service not found" };
  return { title: area.title, description: area.summary };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const area = getPracticeAreaBySlug(slug);
  if (!area) notFound();

  const related = getRelatedPracticeAreas(slug);

  return <>
    <section className="relative isolate min-h-[calc(100svh-79px)] overflow-hidden bg-ink text-paper">
      <MotionReveal variant="media" className="absolute inset-y-0 right-0 -z-20 w-full lg:w-[47%]">
        <Image src="/images/lagos-tower.jpg" alt="Geometric high-rise architecture" fill priority sizes="(min-width: 1024px) 47vw, 100vw" className="object-cover grayscale" />
      </MotionReveal>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#121212_0%,#121212_48%,rgba(18,18,18,.72)_70%,rgba(18,18,18,.42)_100%)]" />
      <div className="page-shell flex min-h-[calc(100svh-79px)] flex-col justify-between py-10 md:py-16">
        <MotionReveal variant="hero"><Link href="/services" className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[.14em] text-paper/65 transition-colors hover:text-gold"><ArrowLeft aria-hidden="true" size={15} />All services</Link></MotionReveal>
        <div className="max-w-5xl py-14">
          <MotionReveal variant="hero" delay={.08}><p className="eyebrow gold-rule text-paper/65">Practice area · {area.number}</p></MotionReveal>
          <MotionReveal variant="hero" delay={.16} className="motion-mask mt-7"><h1 className="display max-w-5xl text-[clamp(3.6rem,8vw,7.7rem)] leading-[.88] text-balance">{area.title}</h1></MotionReveal>
          <MotionReveal variant="hero" delay={.28}><p className="mt-8 max-w-2xl text-base leading-7 text-paper/72 md:text-lg">{area.summary}</p><Link href="/contact" className="btn-primary mt-9">Book consultation<ArrowUpRight aria-hidden="true" size={16} /></Link></MotionReveal>
        </div>
      </div>
    </section>

    <section className="bg-paper"><div className="page-shell section-space grid gap-12 lg:grid-cols-[.55fr_1.45fr] lg:gap-24">
      <MotionReveal><p className="eyebrow gold-rule text-stone">Understanding the matter</p></MotionReveal>
      <MotionReveal delay={.08}><h2 className="display max-w-4xl text-5xl leading-[.98] md:text-7xl">Clear perspective before decisive action.</h2><p className="mt-9 max-w-3xl text-lg leading-8 text-stone">{area.overview}</p></MotionReveal>
    </div></section>

    <section className="border-y border-line bg-panel"><div className="page-shell section-space">
      <MotionReveal className="grid gap-8 lg:grid-cols-2"><div><p className="eyebrow gold-rule text-stone">Scope of work</p><h2 className="display mt-7 text-5xl leading-none md:text-7xl">How we can assist</h2></div><p className="max-w-md self-end leading-7 text-stone">Focused legal support shaped around the documents, decisions, and interests involved in your matter.</p></MotionReveal>
      <ol className="mt-16 border-t border-line">{area.matters.map((matter, index) => <MotionReveal key={matter}><li className="grid gap-4 border-b border-line py-7 sm:grid-cols-[5rem_1fr_auto] sm:items-center md:py-9"><span className="font-mono text-xs text-gold-dark">0{index + 1}</span><span className="display text-3xl md:text-4xl">{matter}</span><ArrowUpRight aria-hidden="true" className="hidden text-stone sm:block" strokeWidth={1.25} /></li></MotionReveal>)}</ol>
    </div></section>

    <section className="bg-ink text-paper"><div className="page-shell section-space grid gap-14 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
      <MotionReveal><p className="eyebrow gold-rule text-paper/55">Our approach</p><span aria-hidden="true" className="display mt-10 block text-[7rem] leading-none text-gold">“</span></MotionReveal>
      <MotionReveal delay={.08}><h2 className="display text-5xl leading-[1.02] md:text-7xl">Advice grounded in context, clarity, and careful judgment.</h2><p className="mt-9 max-w-3xl text-lg leading-8 text-paper/68">{area.approach}</p></MotionReveal>
    </div></section>

    <section className="bg-paper"><div className="page-shell section-space">
      <MotionReveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="eyebrow gold-rule text-stone">Continue exploring</p><h2 className="display mt-7 text-5xl leading-none md:text-7xl">Related services</h2></div><Link href="/services" className="text-link">View all services<ArrowUpRight aria-hidden="true" size={15} /></Link></MotionReveal>
      <div className="mt-14 grid border-t border-line md:grid-cols-3">{related.map((item, index) => <MotionReveal key={item.slug} className={`py-9 md:px-9 ${index > 0 ? "border-t border-line md:border-l md:border-t-0" : "md:pl-0"} ${index === related.length - 1 ? "md:pr-0" : ""}`}><p className="font-mono text-xs text-gold-dark">{item.number}</p><h3 className="display mt-6 text-3xl leading-tight md:text-4xl">{item.title}</h3><Link href={`/services/${item.slug}`} className="text-link mt-8">Read more<ArrowUpRight aria-hidden="true" size={15} /></Link></MotionReveal>)}</div>
    </div></section>

    <ConsultationBanner heading="Bring us the matter. We will help you see the way forward." />
  </>;
}
