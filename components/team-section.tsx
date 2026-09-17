import Image from "next/image";
import { MotionReveal } from "@/components/motion-reveal";
import { teamMembers } from "@/lib/content";

export function TeamSection() {
  return <section className="bg-[#fdfcf9]" aria-labelledby="team-heading"><div className="page-shell section-space">
    <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-24"><MotionReveal><p className="eyebrow brand-rule text-stone">Our team</p></MotionReveal><MotionReveal><h2 id="team-heading" className="display max-w-4xl text-5xl leading-[.96] md:text-7xl">Experienced counsel, grounded in collaboration.</h2><p className="mt-7 max-w-2xl text-lg leading-8 text-stone">Rockville LP brings together legal professionals with complementary experience across advocacy, business, property, governance, and commercial matters.</p></MotionReveal></div>
    <div className="mt-16 grid border-t border-line md:grid-cols-3">{teamMembers.map((member, index) => <article data-team-member-card key={member.name} className={`border-b border-line py-9 md:px-8 md:py-12 ${index > 0 ? "md:border-l" : "md:pl-0"}`}><MotionReveal><div className="relative aspect-[4/5] overflow-hidden bg-panel"><Image src={member.image.src} alt={member.image.alt} fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" /></div><span className="mt-8 block font-mono text-xs text-brand-blue">0{index + 1}</span><h3 className="display mt-5 text-3xl leading-[.98]">{member.name}</h3><p className="mt-3 text-sm uppercase tracking-[.13em] text-brand-blue">{member.role}</p><p className="mt-7 leading-7 text-stone">{member.summary}</p></MotionReveal></article>)}</div>
  </div></section>;
}
