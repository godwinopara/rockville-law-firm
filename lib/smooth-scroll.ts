export const smoothScrollOptions = {
  duration: 1.15,
  wheelMultiplier: 0.78,
  smoothWheel: true,
  syncTouch: false,
  easing: (time: number) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
} as const;

export function shouldEnableSmoothScroll(prefersReducedMotion: boolean) {
  return !prefersReducedMotion;
}
