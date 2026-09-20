"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { primaryNavigation } from "@/lib/content";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => { const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false); window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close); }, []);
  return <header className="sticky top-0 z-50 border-b border-brand-blue/20 bg-brand-surface text-ink">
    <div className="page-shell flex h-[78px] items-center justify-between">
      <Link href="/" aria-label="Rockville Legal Practitioners home" className="inline-flex transition-transform hover:-translate-y-0.5 motion-reduce:transition-none"><Image src="/images/logo.png" alt="Rockville Legal Practitioners" width={212} height={65} priority className="h-auto w-36 sm:w-40" /></Link>
      <nav className="hidden items-center gap-7 text-[.72rem] font-medium uppercase tracking-[.08em] lg:flex" aria-label="Main navigation">{primaryNavigation.map((item) => { const active = pathname === item.href; return <Link aria-current={active ? "page" : undefined} className={`nav-link${active ? " nav-link-active" : ""}`} key={item.href} href={item.href}>{item.label}</Link>; })}<Link className="btn-primary ml-2" href="/contact">Book consultation<ArrowUpRight size={15} /></Link></nav>
      <button type="button" className="inline-flex h-11 w-11 items-center justify-center border border-brand-blue/25 text-brand-blue lg:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? <X size={21} /> : <Menu size={21} />}</button>
    </div>
    {open && <nav id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[79px] overflow-y-auto bg-brand-surface px-5 pb-8 pt-5 text-ink lg:hidden" aria-label="Mobile navigation"><div className="page-shell">{primaryNavigation.map((item, index) => { const active = pathname === item.href; return <Link aria-current={active ? "page" : undefined} onClick={() => setOpen(false)} className={`nav-link display flex items-center border-b border-brand-blue/20 py-5 text-4xl${active ? " nav-link-active text-brand-blue" : ""}`} key={item.href} href={item.href}><span className="mr-4 font-mono text-[.6rem] text-brand-blue">0{index + 1}</span>{item.label}</Link>; })}<Link onClick={() => setOpen(false)} className="btn-primary mt-8" href="/contact">Book consultation<ArrowUpRight size={15} /></Link></div></nav>}
  </header>;
}
