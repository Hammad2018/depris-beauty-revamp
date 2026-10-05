"use client";

import { useEffect, useState } from "react";
import { announcements } from "@/lib/content";

export function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % announcements.length), 4500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-ink text-porcelain">
      <p className="shell flex items-center justify-center py-2 text-center text-xs font-medium tracking-wide">
        <span aria-live="polite">{announcements[i]}</span>
      </p>
    </div>
  );
}
