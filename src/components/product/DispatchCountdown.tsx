"use client";

import { useEffect, useState } from "react";
import { dispatchState, formatLeft } from "@/lib/dispatch";

/** "Order within 2h 14m for same-day cold dispatch", ticks every 30s. */
export function DispatchCountdown({ className = "" }: { className?: string }) {
  // null until mounted: the home page is prerendered, so clock text must not hydrate from build time
  const [s, setS] = useState<ReturnType<typeof dispatchState> | null>(null);
  useEffect(() => {
    setS(dispatchState(new Date()));
    const id = setInterval(() => setS(dispatchState(new Date())), 30_000);
    return () => clearInterval(id);
  }, []);
  if (!s) {
    return (
      <p className={`flex items-center gap-2 text-sm text-ink-soft ${className}`}>
        <span className="h-2 w-2 shrink-0 rounded-full bg-ink-soft/40" />
        <span>Same-day cold dispatch on weekday orders before 3pm MT</span>
      </p>
    );
  }
  return (
    <p className={`flex items-center gap-2 text-sm text-ink-soft ${className}`}>
      <span className={`h-2 w-2 shrink-0 rounded-full ${s.sameDay ? "bg-camellia animate-twinkle" : "bg-ink-soft/40"}`} />
      <span>
        {s.sameDay ? (
          <>Order within <span className="font-mono font-medium tabular-nums text-ink">{formatLeft(s.msLeft)}</span> for same-day cold dispatch</>
        ) : (
          <>Cold dispatch resumes <span className="font-medium text-ink">{s.nextLabel}</span> at 9am MT</>
        )}
      </span>
    </p>
  );
}
