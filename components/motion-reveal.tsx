"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type MotionRevealProps = { children: ReactNode; className?: string; delay?: number; variant?: "hero" | "section" | "media" };

export function MotionReveal({ children, className = "", delay = 0, variant = "section" }: MotionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const from = variant === "media" ? { opacity: 0, scale: 1.035, y: 18 } : { opacity: 0, y: variant === "hero" ? 34 : 38 };
      const animation = { opacity: 1, scale: 1, y: 0, delay, duration: variant === "hero" ? 1.05 : .85, ease: "power3.out" };
      if (variant === "hero") gsap.fromTo(element, from, animation);
      else gsap.fromTo(element, from, { ...animation, scrollTrigger: { trigger: element, start: "top 88%", once: true } });
    }, ref);
    return () => context.revert();
  }, [delay, variant]);
  return <div ref={ref} className={className}>{children}</div>;
}
