import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MotionReveal } from "@/components/motion-reveal";

type EditorialHeroProps = { eyebrow: string; title: string; description: string; image: string; imageAlt: string; primaryLabel?: string; primaryHref?: string; secondaryLabel?: string; secondaryHref?: string };

export function EditorialHero({ eyebrow, title, description, image, imageAlt, primaryLabel, primaryHref = "/contact", secondaryLabel, secondaryHref = "/services" }: EditorialHeroProps) {
  return <section className="relative isolate min-h-[calc(100svh-79px)] overflow-hidden bg-ink text-paper">
    <MotionReveal variant="media" className="absolute inset-0 -z-20"><Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover" /></MotionReveal>
    <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(18,18,18,.98)_0%,rgba(18,18,18,.86)_47%,rgba(18,18,18,.2)_100%)]" />
    <div className="page-shell flex min-h-[calc(100svh-79px)] items-end py-14 md:py-20"><div className="max-w-5xl">
      <MotionReveal variant="hero"><p className="eyebrow gold-rule text-paper/70">{eyebrow}</p></MotionReveal>
      <MotionReveal variant="hero" delay={.12} className="motion-mask mt-7"><h1 className="display text-[clamp(3.5rem,8.2vw,8rem)] leading-[.88] text-balance">{title}</h1></MotionReveal>
      <MotionReveal variant="hero" delay={.25}><p className="mt-8 max-w-xl text-base leading-7 text-paper/72 md:text-lg">{description}</p>{(primaryLabel || secondaryLabel) && <div className="mt-9 flex flex-wrap gap-4">{primaryLabel && <Link className="btn-primary" href={primaryHref}>{primaryLabel}<ArrowUpRight size={16} /></Link>}{secondaryLabel && <Link className="btn-outline" href={secondaryHref}>{secondaryLabel}</Link>}</div>}</MotionReveal>
    </div></div>
  </section>;
}
