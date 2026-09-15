import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MotionReveal } from "@/components/motion-reveal";

type ConsultationBannerProps = {
  image?: string;
  imageAlt?: string;
  heading?: string;
  body?: string;
};

export function ConsultationBanner({
  image = "/images/lagos-office.jpg",
  imageAlt = "Contemporary architectural setting",
  heading = "We take every matter seriously and respond with considered representation.",
  body = "We approach each instruction with precision, discretion, and close attention to the context, delivering guidance shaped around the matter at hand.",
}: ConsultationBannerProps) {
  return <section className="bg-paper pb-20 md:pb-28"><div className="page-shell">
    <MotionReveal variant="media" className="relative overflow-hidden bg-ink lg:min-h-[43rem]">
      <div className="relative min-h-[23rem] lg:absolute lg:inset-0"><Image src={image} alt={imageAlt} fill sizes="(min-width: 1024px) 92vw, 100vw" className="object-cover grayscale" /></div>
      <div className="relative bg-ink p-8 text-paper sm:p-10 lg:absolute lg:bottom-12 lg:right-12 lg:top-12 lg:flex lg:w-[31rem] lg:flex-col lg:justify-between lg:border lg:border-paper/25 lg:bg-ink/88 lg:p-12 lg:backdrop-blur-md">
        <div><p className="eyebrow gold-rule text-paper/60">Considered counsel</p><h2 className="display mt-7 text-4xl leading-[1.02] md:text-5xl">{heading}</h2><p className="mt-6 leading-7 text-paper/68">{body}</p><Link className="btn-primary mt-8" href="/contact">Book consultation<ArrowUpRight aria-hidden="true" size={16} /></Link></div>
        <p className="mt-16 border-t border-paper/20 pt-5 text-xs uppercase tracking-[.16em] text-paper/55">Precision · Discretion · Perspective</p>
      </div>
    </MotionReveal>
  </div></section>;
}
