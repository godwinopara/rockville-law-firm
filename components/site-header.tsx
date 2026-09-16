"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { primaryNavigation } from "@/lib/content";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  useEffect(() => { const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false); window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close); }, []);
  return <header className="sticky top-0 z-50 border-b border-paper/10 bg-ink text-paper">
    <div className="page-shell flex h-[78px] items-center justify-between">
      <Link href="/" aria-label="Rockville Legal Practitioners home"><span className="display block text-[1.65rem] leading-none">ROCKVILLE</span><span className="mt-1 block text-[.48rem] font-semibold tracking-[.29em] text-paper/62">LEGAL PRACTITIONERS</span></Link>
      <nav className="hidden items-center gap-7 text-[.72rem] font-medium uppercase tracking-[.08em] lg:flex" aria-label="Main navigation">{primaryNavigation.map((item) => <Link className="transition-colors hover:text-brand-blue-light" key={item.href} href={item.href}>{item.label}</Link>)}<Link className="btn-primary ml-2" href="/contact">Book consultation<ArrowUpRight size={15} /></Link></nav>
      <button type="button" className="inline-flex h-11 w-11 items-center justify-center border border-paper/20 lg:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? <X size={21} /> : <Menu size={21} />}</button>
    </div>
    {open && <nav id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[79px] overflow-y-auto bg-ink px-5 pb-8 pt-5 text-paper lg:hidden" aria-label="Mobile navigation"><div className="page-shell">{primaryNavigation.map((item, index) => <Link onClick={() => setOpen(false)} className="display flex items-center border-b border-paper/15 py-5 text-4xl" key={item.href} href={item.href}><span className="mr-4 font-mono text-[.6rem] text-brand-blue-light">0{index + 1}</span>{item.label}</Link>)}<Link onClick={() => setOpen(false)} className="btn-primary mt-8" href="/contact">Book consultation<ArrowUpRight size={15} /></Link></div></nav>}
  </header>;
}
