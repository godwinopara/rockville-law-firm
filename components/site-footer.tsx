import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { contactDetails, primaryNavigation } from "@/lib/content";

const footerNavigation = [...primaryNavigation, { label: "Book consultation", href: "/contact" }];

export function SiteFooter() {
  return <footer data-footer-layout="three-panel" className="border-t border-paper/10 bg-ink text-paper">
    <div className="page-shell pt-16 md:pt-24">
      <div className="grid border-paper/15 lg:grid-cols-[1fr_1fr_1.15fr] lg:divide-x">
        <div className="border-b border-paper/15 pb-14 lg:border-b-0 lg:pr-14 xl:pr-20">
          <Link href="/" aria-label="Rockville Legal Practitioners home" className="inline-flex bg-paper px-5 py-4 transition-transform hover:-translate-y-0.5 motion-reduce:transition-none">
            <Image src="/images/logo.png" alt="Rockville Legal Practitioners" width={212} height={65} className="h-auto w-44 sm:w-52" />
          </Link>
          <p className="mt-9 max-w-sm text-lg leading-8 text-paper/60">Rockville LP provides clear, considered legal counsel for individuals, businesses, and institutions navigating consequential decisions.</p>
          <Link className="btn-primary mt-9" href="/contact">Book consultation<ArrowUpRight aria-hidden="true" size={16} /></Link>
        </div>

        <nav aria-label="Footer navigation" className="border-b border-paper/15 py-14 lg:border-b-0 lg:px-14 xl:px-20">
          <p className="eyebrow brand-rule text-paper/55">Navigate</p>
          <ul className="mt-9 grid gap-x-8 gap-y-5 text-sm uppercase tracking-[.04em] text-paper/80 sm:grid-cols-2">
            {footerNavigation.map((item) => <li key={item.label}><Link className="transition-colors hover:text-brand-blue-light" href={item.href}>{item.label}</Link></li>)}
          </ul>
        </nav>

        <div className="py-14 lg:pl-14 xl:pl-20">
          <p className="eyebrow brand-rule text-paper/55">Visit or contact us</p>
          <address className="mt-9 not-italic">
            <p className="display max-w-lg text-3xl leading-[1.06] text-paper md:text-4xl">{contactDetails.address}</p>
            <div className="mt-12 flex flex-col items-start gap-4 text-xl text-paper md:text-2xl">
              <a className="border-b border-paper/65 pb-1 transition-colors hover:border-brand-blue-light hover:text-brand-blue-light" href="tel:+2348033064300">{contactDetails.phonePrimary}</a>
              <a className="border-b border-paper/65 pb-1 transition-colors hover:border-brand-blue-light hover:text-brand-blue-light" href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
            </div>
          </address>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-paper/15 py-6 text-[.65rem] uppercase tracking-[.12em] text-paper/55 sm:flex-row sm:justify-between"><p>© {new Date().getFullYear()} Rockville Legal Practitioners. All rights reserved.</p><p>Professionalism · Respect · Efficiency · Practicality · Sincerity</p></div>
    </div>
  </footer>;
}
