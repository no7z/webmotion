import { useEffect, useState } from "react";
import Lenis from "lenis";

export const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
export const smoothstep = (value) => {
  const x = clamp(value);
  return x * x * (3 - 2 * x);
};

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forced = new URLSearchParams(window.location.search).get("reduced") === "1";
    const update = () => {
      const next = forced || query.matches;
      setReduced(next);
      document.documentElement.dataset.reducedMotion = String(next);
    };
    update();
    query.addEventListener("change", update);
    return () => {
      query.removeEventListener("change", update);
      delete document.documentElement.dataset.reducedMotion;
    };
  }, []);
  return reduced;
}

export function useSmoothScroll(enabled = true) {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!enabled || reduced) return undefined;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.085, smoothWheel: true, syncTouch: false });
    return () => lenis.destroy();
  }, [enabled, reduced]);
  return reduced;
}

export function useSectionProgress(ref) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const element = ref.current;
      if (!element) return;
      const top = element.getBoundingClientRect().top + window.scrollY;
      const distance = Math.max(1, element.offsetHeight - window.innerHeight);
      setProgress(clamp((window.scrollY - top) / distance));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref]);
  return progress;
}
