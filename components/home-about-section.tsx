import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { homeAboutVisual } from "@/lib/content";

type EditorialAboutSectionProps = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  proofPoints: string[];
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
};

const homeProofPoints = [
  "Counsel with discretion, precision, and authority.",
  "Trusted representation for individuals and businesses.",
  "Strategic legal guidance for what matters most.",
];

function EditorialAboutSection({
  eyebrow,
  title,
  paragraphs,
  proofPoints,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: EditorialAboutSectionProps) {
  return <section className="bg-paper"><div className="page-shell section-space grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
    <div className="flex min-w-0 flex-col">
      <div><p className="eyebrow brand-rule text-stone">{eyebrow}</p><h2 className="display mt-7 max-w-3xl text-5xl leading-[.96] md:text-6xl">{title}</h2><div className="mt-9 max-w-xl space-y-6 text-lg leading-8 text-stone">{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div className="mt-9 flex flex-wrap gap-4"><Link href={primaryHref} className="btn-primary">{primaryLabel} <ArrowUpRight aria-hidden="true" size={16} /></Link><Link href={secondaryHref} className="btn-outline">{secondaryLabel}</Link></div></div>
      <ul className="mt-12 border-t border-line md:mt-auto md:pt-20">{proofPoints.map((point) => <li data-home-about-proof key={point} className="flex items-center gap-3 border-b border-line py-4 text-stone"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-panel text-brand-blue"><Check aria-hidden="true" size={14} strokeWidth={2} /></span>{point}</li>)}</ul>
    </div>
    <div className="relative aspect-[4/5] min-h-[28rem] overflow-hidden lg:min-h-[42rem]"><Image src={homeAboutVisual.src} alt={homeAboutVisual.alt} fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" /></div>
  </div></section>;
}

export function HomeAboutSection() {
  return <EditorialAboutSection
    eyebrow="Refined advocacy for complex matters"
    title="Delivering trusted legal services with experience and a pledge to justice."
    paragraphs={["Rockville LP provides trusted legal counsel across complex areas of law, combining strategic insight, refined advocacy, and a longstanding commitment to deliver thoughtful legal solutions tailored to each case.", "We believe effective legal representation begins with trust, careful listening, and a clear understanding of what is at stake."]}
    proofPoints={homeProofPoints}
    primaryHref="/team"
    primaryLabel="Our team"
    secondaryHref="/contact"
    secondaryLabel="Contact us"
  />;
}

export function AboutFirmIntroductionSection() {
  return <EditorialAboutSection
    eyebrow="Who we are"
    title="A full-service practice shaped for evolving legal and business needs."
    paragraphs={["Rockville LP is a full-service firm with over 20 years of combined experience across its areas of practice.", "Founded in June 2018, Rockville LP continues to evolve with the dynamism of the law, a changing business climate, and the needs of its clientele."]}
    proofPoints={["Legal and business solutions grounded in honest counsel.", "Deep expertise across a broad range of practice areas.", "Practical support designed around each mandate."]}
    primaryHref="/team"
    primaryLabel="Meet our team"
    secondaryHref="/contact"
    secondaryLabel="Contact us"
  />;
}
