import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Mail, Phone } from "lucide-react";
import { ConsultationBanner } from "@/components/consultation-banner";
import { MotionReveal } from "@/components/motion-reveal";
import { PracticeAreasCarousel } from "@/components/practice-areas-carousel";
import {
  getPracticeAreaBySlug,
  contactDetails,
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

  return <>
    <section className="relative isolate min-h-[calc(100svh-79px)] overflow-hidden bg-ink text-paper">
      <MotionReveal variant="media" className="absolute inset-y-0 right-0 -z-20 w-full lg:w-[47%]">
        <Image src="/images/lagos-tower.jpg" alt="Geometric high-rise architecture" fill priority sizes="(min-width: 1024px) 47vw, 100vw" className="object-cover grayscale" />
      </MotionReveal>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#121212_0%,#121212_48%,rgba(18,18,18,.72)_70%,rgba(18,18,18,.42)_100%)]" />
      <div className="page-shell flex min-h-[calc(100svh-79px)] flex-col justify-between py-10 md:py-16">
        <MotionReveal variant="hero"><Link href="/services" className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[.14em] text-paper/65 transition-colors hover:text-brand-blue-light"><ArrowLeft aria-hidden="true" size={15} />All services</Link></MotionReveal>
        <div className="max-w-5xl py-14">
          <MotionReveal variant="hero" delay={.08}><p className="eyebrow brand-rule text-paper/65">Practice area · {area.number}</p></MotionReveal>
          <MotionReveal variant="hero" delay={.16} className="motion-mask mt-7"><h1 className="display max-w-5xl text-[clamp(3.2rem,6vw,6.2rem)] leading-[.9] text-balance">{area.title}</h1></MotionReveal>
          <MotionReveal variant="hero" delay={.28}><p className="mt-8 max-w-2xl text-base leading-7 text-paper/72 md:text-lg">{area.summary}</p><Link href="/contact" className="btn-primary mt-9">Book consultation<ArrowUpRight aria-hidden="true" size={16} /></Link></MotionReveal>
        </div>
      </div>
    </section>

    <section data-service-detail-layout="editorial-sidebar" className="bg-paper"><div className="page-shell section-space grid gap-16 lg:grid-cols-[minmax(17rem,.55fr)_minmax(0,1.45fr)] lg:gap-24">
      <aside className="self-start lg:sticky lg:top-28"><nav aria-label="Service detail practice areas"><p className="eyebrow brand-rule text-stone">Practice areas</p><ol className="mt-8 border-t border-line">{practiceAreas.map((item) => <li key={item.slug} className="border-b border-line"><Link href={`/services/${item.slug}`} aria-current={item.slug === area.slug ? "page" : undefined} className={`group flex items-center gap-4 py-4 text-sm transition-colors ${item.slug === area.slug ? "text-brand-blue" : "text-stone hover:text-ink"}`}><span className="font-mono text-xs">{item.number}</span><span>{item.title}</span><ArrowUpRight aria-hidden="true" size={15} className="ml-auto opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" /></Link></li>)}</ol></nav>
        <div className="mt-12 border-t border-line pt-8"><div className="relative aspect-[4/5] overflow-hidden"><Image src="/images/rufus-okoli.jpg" alt="Rufus Okoli, Founder and Principal Partner" fill sizes="(min-width: 1024px) 28vw, 100vw" className="object-cover" /></div><p className="display mt-6 text-2xl">Rufus C. Okoli</p><p className="mt-1 text-sm text-stone">Founder &amp; Principal Partner</p><address className="mt-6 space-y-3 not-italic text-sm text-stone"><a className="flex items-center gap-3 hover:text-brand-blue" href={`mailto:${contactDetails.email}`}><Mail aria-hidden="true" size={16} />{contactDetails.email}</a><a className="flex items-center gap-3 hover:text-brand-blue" href="tel:+2348033064300"><Phone aria-hidden="true" size={16} />{contactDetails.phonePrimary}</a></address></div>
      </aside>
      <article className="min-w-0"><MotionReveal><p className="eyebrow brand-rule text-stone">Understanding the matter</p><h2 className="display mt-7 max-w-3xl text-4xl leading-[.98] md:text-5xl">Clear perspective before decisive action.</h2><p className="mt-8 max-w-3xl text-lg leading-8 text-stone">{area.overview}</p></MotionReveal>
        <MotionReveal delay={.08} className="mt-16 border-t border-line pt-12"><p className="eyebrow brand-rule text-stone">Scope of work</p><h2 className="display mt-7 text-4xl leading-[.98] md:text-5xl">How we can assist</h2><p className="mt-6 max-w-2xl leading-7 text-stone">Focused legal support shaped around the documents, decisions, and interests involved in your matter.</p><ol className="mt-10 border-t border-line">{area.matters.map((matter, index) => <li key={matter} className="grid gap-4 border-b border-line py-6 sm:grid-cols-[3rem_1fr_auto] sm:items-center"><span className="font-mono text-xs text-brand-blue">0{index + 1}</span><span className="display text-2xl md:text-3xl">{matter}</span><ArrowUpRight aria-hidden="true" className="hidden text-stone sm:block" size={20} strokeWidth={1.25} /></li>)}</ol></MotionReveal>
        <MotionReveal delay={.16} className="mt-16 border-t border-line pt-12"><p className="eyebrow brand-rule text-stone">Our approach</p><h2 className="display mt-7 max-w-3xl text-4xl leading-[.98] md:text-5xl">Advice grounded in context, clarity, and careful judgment.</h2><p className="mt-8 max-w-3xl text-lg leading-8 text-stone">{area.approach}</p></MotionReveal>
      </article>
    </div></section>

    <ConsultationBanner heading="Bring us the matter. We will help you see the way forward." />
    <PracticeAreasCarousel eyebrow="Other services" title="Continue exploring." description="Explore other areas of Rockville LP’s practice." excludeSlug={area.slug} showAllServicesLink />
  </>;
}
