import Image from "next/image";
import { MotionReveal } from "@/components/motion-reveal";
import { teamMembers } from "@/lib/content";

export function TeamProfiles() {
  return <section className="bg-[#fdfcf9]" aria-labelledby="team-profiles-heading"><div className="page-shell section-space">
    <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-24"><MotionReveal><p className="eyebrow brand-rule text-stone">The people behind the practice</p></MotionReveal><MotionReveal><h2 id="team-profiles-heading" className="display max-w-4xl text-5xl leading-[.96] md:text-7xl">Experienced counsel, grounded in collaboration.</h2><p className="mt-7 max-w-2xl text-lg leading-8 text-stone">Meet the professionals who bring complementary legal, commercial, governance, and advocacy experience to every Rockville LP mandate.</p></MotionReveal></div>
    <div className="mt-20 border-t border-line">{teamMembers.map((member, index) => <article data-team-profile key={member.name} className="grid gap-10 border-b border-line py-12 lg:grid-cols-[minmax(0,.82fr)_minmax(0,1.18fr)] lg:gap-24 lg:py-20">
      <MotionReveal className={index % 2 === 1 ? "lg:order-2" : undefined}><div className="relative aspect-[4/5] overflow-hidden bg-panel"><Image src={member.image.src} alt={member.image.alt} fill sizes="(min-width: 1024px) 36vw, 100vw" className="object-cover" /></div></MotionReveal>
      <MotionReveal className="flex flex-col justify-center"><p className="font-mono text-xs text-brand-blue">0{index + 1}</p><h3 className="display mt-7 text-4xl leading-[.96] md:text-5xl">{member.name}</h3><p className="mt-4 text-sm uppercase tracking-[.13em] text-brand-blue">{member.role}</p><div className="mt-10 max-w-2xl space-y-6 border-t border-line pt-8 text-base leading-7 text-stone md:text-lg md:leading-8">{member.profile.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></MotionReveal>
    </article>)}</div>
  </div></section>;
}
