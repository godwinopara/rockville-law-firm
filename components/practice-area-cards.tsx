import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  FileCheck2,
  FileSearch,
  Gavel,
  Handshake,
  Landmark,
  Scale,
  ScrollText,
  ShieldCheck,
  Waypoints,
} from "lucide-react";
import { MotionReveal } from "@/components/motion-reveal";
import { practiceAreas, type PracticeArea } from "@/lib/content";

const icons = [Building2, ShieldCheck, Landmark, Waypoints, FileSearch, Gavel, ScrollText, FileCheck2, Scale, Handshake];

export function PracticeAreaCards({ areas = practiceAreas }: { areas?: PracticeArea[] }) {
  return <ol className="grid border-l border-t border-line md:grid-cols-2 xl:grid-cols-3">
    {areas.map((area, index) => {
      const closingCard = index === areas.length - 1;
      const CardIcon = icons[index % icons.length];
      return <li data-service-card={area.slug} data-closing-card={closingCard ? "true" : undefined} key={area.slug} className={`group border-b border-r border-line transition-colors duration-500 hover:bg-panel ${closingCard ? "xl:col-span-3" : ""}`}>
        <MotionReveal className={`flex min-h-[29rem] h-full flex-col p-8 md:p-10 ${closingCard ? "xl:min-h-0 xl:flex-row xl:items-end xl:justify-between xl:gap-16" : ""}`}>
          <article className={closingCard ? "xl:max-w-3xl" : ""}>
            <p className="font-mono text-xs text-brand-blue">{area.number}</p>
            <h3 className="display mt-6 text-3xl leading-tight md:text-[2.1rem]">{area.title}</h3>
            <p className="mt-6 border-t border-line pt-5 leading-7 text-stone">{area.summary}</p>
          </article>
          <div className={`mt-auto flex items-end justify-between gap-8 pt-12 ${closingCard ? "xl:min-w-[24rem] xl:pt-0" : ""}`}>
            <Link href={`/services/${area.slug}`} aria-label={`Read more about ${area.title}`} className="service-card-link">Read more<ArrowUpRight aria-hidden="true" size={15} /></Link>
            <CardIcon aria-hidden="true" className="text-line transition-colors duration-500 group-hover:text-brand-blue" size={54} strokeWidth={1} />
          </div>
        </MotionReveal>
      </li>;
    })}
  </ol>;
}
