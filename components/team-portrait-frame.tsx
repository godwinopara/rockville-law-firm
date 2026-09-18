import Image from "next/image";
import type { TeamMember } from "@/lib/content";

type TeamPortraitFrameProps = {
  member: TeamMember;
  variant: "card" | "profile";
};

export function TeamPortraitFrame({ member, variant }: TeamPortraitFrameProps) {
  const frameClass = variant === "card"
    ? "h-[25rem] sm:h-[30rem] md:h-[25rem]"
    : "h-[30rem] sm:h-[36rem] lg:h-[32rem]";

  return <div data-team-photo-frame="fixed" className={`relative w-full overflow-hidden bg-panel ${frameClass}`}>
    {member.image ? <Image src={member.image.src} alt={member.image.alt} fill sizes={variant === "card" ? "(min-width: 768px) 30vw, 100vw" : "(min-width: 1024px) 360px, 100vw"} className="object-cover object-[50%_25%]" /> : <div role="img" aria-label={`Portrait of ${member.name} forthcoming`} className="flex h-full items-end bg-[linear-gradient(145deg,#e9e8e2_0%,#d7d8d4_100%)] p-7 text-stone"><div className="border-t border-stone/25 pt-4"><span className="font-mono text-[.65rem] uppercase tracking-[.18em]">Portrait forthcoming</span><p className="mt-2 max-w-48 text-sm leading-5">A profile image for {member.name} will be added here.</p></div></div>}
  </div>;
}
