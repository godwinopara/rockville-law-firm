import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Megaphone, MessageSquare, ScrollText, Target, Users } from "lucide-react";
import { MotionReveal } from "@/components/motion-reveal";

const values = [
  { icon: BadgeCheck, title: "Integrity in practice", body: "Our clients trust us to act with responsibility, discretion, and respect for the law." },
  { icon: Users, title: "Commitment to clients", body: "Every client deserves focused attention, genuine care, and strong representation." },
  { icon: Target, title: "Excellence in service", body: "We pursue excellence in every interaction and every outcome we work toward." },
  { icon: ScrollText, title: "Trust & transparency", body: "Setting realistic expectations and building relationships grounded in confidence." },
  { icon: Megaphone, title: "Strength in advocacy", body: "We represent our clients with confidence, resilience, and strategic determination." },
  { icon: MessageSquare, title: "Justice with purpose", body: "Always focused on protecting rights and advancing our clients’ best interests." },
];

export function ValuesSection() {
  return <section className="w-full bg-[#fdfcf9]"><div className="page-shell">
    <div className="grid items-end gap-12 pt-10 lg:grid-cols-[1fr_380px] lg:gap-20 lg:pt-16"><MotionReveal><p className="eyebrow gold-rule text-stone">Trusted representation for what matters most</p><h2 className="display mt-7 max-w-4xl text-5xl leading-[.98] md:text-7xl">We stand on a foundation of principle and practical legal judgment.</h2></MotionReveal><MotionReveal variant="media" className="relative mx-auto h-[320px] w-full max-w-[380px] overflow-hidden lg:translate-y-8"><Image src="/images/lagos-tower.jpg" alt="Architectural placeholder image" fill sizes="(min-width: 1024px) 380px, 100vw" className="object-cover grayscale" /></MotionReveal></div>
    <div className="mt-16 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">{values.map(({ icon: Icon, title, body }, index) => <MotionReveal key={title} className={`border-b border-line p-10 ${index % 3 === 0 ? "lg:border-l-0 lg:pl-0" : "lg:border-l lg:border-line"} ${index % 3 === 2 ? "lg:border-r-0 lg:pr-0" : ""} ${index >= 3 ? "lg:border-b-0" : ""}`}><Icon size={28} strokeWidth={1.3} className="text-gold-dark" /><h3 className="display mt-7 text-2xl">{title}</h3><p className="mt-3 max-w-[33ch] text-[.95rem] leading-6 text-stone">{body}</p></MotionReveal>)}</div>
    <MotionReveal className="flex justify-end py-16 md:py-20"><div className="max-w-xl"><p className="text-lg leading-8 text-stone">We offer trusted legal services for complex matters with an approach defined by justice, precision, and commitment.</p><div className="mt-8 flex flex-wrap gap-4"><Link href="/contact" className="btn-primary">Book consultation<ArrowUpRight size={16} /></Link><Link href="/team" className="btn-outline">Our team</Link></div></div></MotionReveal>
  </div></section>;
}
