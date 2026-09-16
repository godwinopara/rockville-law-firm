import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { contactDetails, practiceAreas, primaryNavigation } from "@/lib/content";

export function SiteFooter() {
  return <footer className="overflow-hidden border-t border-paper/10 bg-ink text-paper">
    <div className="page-shell pt-16 md:pt-24">
      <div className="grid gap-14 border-b border-paper/15 pb-16 lg:grid-cols-[1.05fr_.45fr_1.35fr] lg:gap-16">
        <div>
          <p className="eyebrow brand-rule text-paper/55">Rockville Legal Practitioners</p>
          <p className="display mt-8 max-w-xl text-4xl leading-[1.02] md:text-6xl">Clear legal judgment for decisions that shape what comes next.</p>
          <Link className="btn-primary mt-9" href="/contact">Book consultation<ArrowUpRight aria-hidden="true" size={16} /></Link>
          <address className="mt-12 not-italic text-sm leading-7 text-paper/65"><a className="transition-colors hover:text-brand-blue-light" href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a><br /><a className="transition-colors hover:text-brand-blue-light" href="tel:+2348033064300">{contactDetails.phonePrimary}</a><br /><a className="transition-colors hover:text-brand-blue-light" href="tel:+2348034616281">{contactDetails.phoneSecondary}</a><p className="mt-4 max-w-64">{contactDetails.address}</p></address>
        </div>

        <nav aria-label="Footer navigation"><p className="eyebrow text-brand-blue-light">Navigate</p><ul className="mt-6 space-y-3 text-sm text-paper/68">{primaryNavigation.map((item) => <li key={item.href}><Link className="inline-flex items-center gap-2 transition-colors hover:text-brand-blue-light" href={item.href}>{item.label}<ArrowUpRight aria-hidden="true" size={12} /></Link></li>)}</ul></nav>

        <nav aria-label="Practice areas"><p className="eyebrow text-brand-blue-light">Practice areas</p><ol className="mt-6 grid gap-x-8 gap-y-3 text-sm text-paper/68 sm:grid-cols-2">{practiceAreas.map((area) => <li key={area.slug}><Link className="group grid grid-cols-[2rem_1fr] gap-2 transition-colors hover:text-brand-blue-light" href={`/services/${area.slug}`}><span className="font-mono text-[.65rem] text-brand-blue-light">{area.number}</span><span>{area.title}</span></Link></li>)}</ol></nav>
      </div>

      <p aria-hidden="true" className="display -mb-[.11em] mt-7 whitespace-nowrap text-[clamp(4.2rem,12.3vw,11.2rem)] leading-none tracking-[-.065em] text-paper">Rockville Legal</p>
      <div className="relative flex flex-col gap-3 border-t border-paper/15 py-6 text-[.65rem] uppercase tracking-[.12em] text-paper/55 sm:flex-row sm:justify-between"><p>© {new Date().getFullYear()} Rockville Legal Practitioners</p><p>Professionalism · Respect · Efficiency · Practicality · Sincerity</p></div>
    </div>
  </footer>;
}
