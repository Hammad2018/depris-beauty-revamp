"use client";

import { useEffect, useState } from "react";

/**
 * Hydration-safe reduced-motion flag: false on the server and first client render
 * (so markup matches), then the real media-query value. Components that change
 * structure for reduced motion must use this, not framer's hook.
 */
export function useReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduce;
}
