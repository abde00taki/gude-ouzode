import { useEffect, useState } from "react";

const MIN_PRELOADER_MS = 700;
const MAX_WAIT_MS = 12000;

/**
 * Waits for the hero image and window load before hiding the preloader.
 * @param {string} heroSrc Vite-resolved hero image URL
 */
export function useInitialLoad(heroSrc) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!heroSrc) {
      setIsLoading(false);
      return undefined;
    }

    let cancelled = false;
    let heroReady = false;
    let windowReady = document.readyState === "complete";
    const startedAt = Date.now();

    const tryFinish = () => {
      if (cancelled || !heroReady || !windowReady) return;
      const elapsed = Date.now() - startedAt;
      const delay = Math.max(0, MIN_PRELOADER_MS - elapsed);
      window.setTimeout(() => {
        if (!cancelled) setIsLoading(false);
      }, delay);
    };

    const img = new Image();
    img.decoding = "async";
    const onHeroSettled = () => {
      heroReady = true;
      tryFinish();
    };
    img.onload = onHeroSettled;
    img.onerror = onHeroSettled;
    img.src = heroSrc;

    const onWindowLoad = () => {
      windowReady = true;
      tryFinish();
    };

    if (windowReady) {
      tryFinish();
    } else {
      window.addEventListener("load", onWindowLoad);
    }

    const safety = window.setTimeout(() => {
      if (!cancelled) setIsLoading(false);
    }, MAX_WAIT_MS);

    return () => {
      cancelled = true;
      window.removeEventListener("load", onWindowLoad);
      window.clearTimeout(safety);
    };
  }, [heroSrc]);

  return isLoading;
}
