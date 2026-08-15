import Lenis from "lenis";
import LenisSnap from "lenis/snap";
import { useCallback, useEffect, useRef } from "react";
import { chapterScrollConfig } from "./scroll.config";

const easeOutQuart = (progress) => 1 - Math.pow(1 - progress, 4);

function getCenteredScrollTarget(element) {
  const elementTop = element.getBoundingClientRect().top + window.scrollY;
  return elementTop + element.offsetHeight / 2 - window.innerHeight / 2;
}

function getSnapThreshold(value) {
  if (typeof value === "number") return value;
  return window.innerHeight * Number.parseFloat(value) / 100;
}

export function useChapterScroll(reducedMotion, selector = "[data-chapter-snap]") {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const { smooth, snap } = chapterScrollConfig;
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      syncTouch: false,
      lerp: smooth.lerp,
      wheelMultiplier: smooth.wheelMultiplier,
      stopInertiaOnNavigate: true,
    });
    const chapterSnap = new LenisSnap(lenis, {
      type: "proximity",
      duration: snap.duration,
      easing: easeOutQuart,
      distanceThreshold: snap.distanceThreshold,
      debounce: snap.debounce,
    });

    chapterSnap.addElements([...document.querySelectorAll(selector)], { align: "center" });

    let snapInProgress = false;
    const snapAfterScrollEnd = () => {
      if (snapInProgress) return;

      const nearest = [...document.querySelectorAll(selector)]
        .map((element) => ({ element, target: getCenteredScrollTarget(element) }))
        .sort((a, b) => Math.abs(a.target - window.scrollY) - Math.abs(b.target - window.scrollY))[0];
      if (!nearest) return;

      const distance = Math.abs(nearest.target - window.scrollY);
      if (distance < 1 || distance > getSnapThreshold(snap.distanceThreshold)) return;

      snapInProgress = true;
      lenis.scrollTo(nearest.target, {
        duration: snap.duration,
        easing: easeOutQuart,
        userData: { initiator: "chapter-snap" },
        onComplete: () => {
          requestAnimationFrame(() => { snapInProgress = false; });
        },
      });
    };

    window.addEventListener("scrollend", snapAfterScrollEnd);
    lenisRef.current = lenis;

    return () => {
      lenisRef.current = null;
      window.removeEventListener("scrollend", snapAfterScrollEnd);
      chapterSnap.destroy();
      lenis.destroy();
    };
  }, [reducedMotion, selector]);

  return useCallback((event) => {
    const hash = event.currentTarget.getAttribute("href");
    const target = hash ? document.querySelector(hash) : null;
    if (!target) return;

    event.preventDefault();
    const scrollTarget = getCenteredScrollTarget(target);
    window.history.replaceState(null, "", hash);

    if (!lenisRef.current || reducedMotion) {
      window.scrollTo({ top: scrollTarget, behavior: "auto" });
      return;
    }

    lenisRef.current.scrollTo(scrollTarget, {
      duration: chapterScrollConfig.navigationDuration,
      easing: easeOutQuart,
    });
  }, [reducedMotion]);
}
