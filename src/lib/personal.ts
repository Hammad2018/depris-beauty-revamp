"use client";

import { useEffect, useState } from "react";
import type { Concern, SkinType } from "@/lib/commerce/types";

/** Per-visitor memory kept in the browser: quiz result, shelf history, wishlist, newsletter prefs. */
export interface Personal {
  skinType?: SkinType;
  concerns: Concern[];
  recent: string[]; // product handles, newest first
  wishlist: string[];
  newsletter?: { email: string; prefs: NewsletterPref[]; since: string };
  name?: string;
}

export type NewsletterPref = "skincare" | "pro" | "offers";

const KEY = "depris:personal:v1";
const EVENT = "depris:personal";
const EMPTY: Personal = { concerns: [], recent: [], wishlist: [] };

export function readPersonal(): Personal {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...EMPTY, ...(JSON.parse(raw) as Personal) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function writePersonal(patch: Partial<Personal> | ((p: Personal) => Partial<Personal>)) {
  if (typeof window === "undefined") return;
  const current = readPersonal();
  const next = { ...current, ...(typeof patch === "function" ? patch(current) : patch) };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable: the page still works, it just forgets */
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

/** Hydration-safe: returns null on the server and first client paint, then the stored value. */
export function usePersonal(): Personal | null {
  const [p, setP] = useState<Personal | null>(null);
  useEffect(() => {
    const sync = () => setP(readPersonal());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return p;
}

export function rememberViewed(handle: string) {
  writePersonal((p) => ({ recent: [handle, ...p.recent.filter((h) => h !== handle)].slice(0, 8) }));
}

export function toggleWishlist(handle: string) {
  writePersonal((p) => ({ wishlist: p.wishlist.includes(handle) ? p.wishlist.filter((h) => h !== handle) : [handle, ...p.wishlist] }));
}

export function rememberQuiz(skinType: SkinType | undefined, concerns: Concern[]) {
  writePersonal({ skinType, concerns });
}

/** "Good evening" style greeting from the visitor's clock. */
export function greetingFor(d = new Date()): string {
  const h = d.getHours();
  if (h < 5) return "Still up";
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

/** Which ritual to lead with at this hour. */
export function ritualFor(d = new Date()): "morning" | "night" {
  const h = d.getHours();
  return h >= 5 && h < 17 ? "morning" : "night";
}
