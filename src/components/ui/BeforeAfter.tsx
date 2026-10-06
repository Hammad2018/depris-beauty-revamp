"use client";

import { useState } from "react";

/**
 * Draggable before/after comparison. A native range input drives the split, so it is
 * mouse-, touch- and keyboard-operable out of the box. Pass real image URLs when
 * available; without them it renders illustrative "dull → luminous" skin panels.
 */
export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeLabel = "Before",
  afterLabel = "After 4 weeks",
  className = "",
}: {
  beforeSrc?: string;
  afterSrc?: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);

  const beforeStyle = beforeSrc
    ? { backgroundImage: `url(${beforeSrc})` }
    : {
        background:
          "radial-gradient(40% 45% at 35% 40%, rgba(120,90,85,0.35), transparent 70%), radial-gradient(35% 40% at 70% 65%, rgba(110,95,110,0.35), transparent 70%), linear-gradient(160deg, #c9b3ab 0%, #b7a39d 50%, #a9958f 100%)",
      };
  const afterStyle = afterSrc
    ? { backgroundImage: `url(${afterSrc})` }
    : {
        background:
          "radial-gradient(45% 50% at 50% 40%, rgba(255,255,255,0.55), transparent 70%), linear-gradient(160deg, #f6dcd3 0%, #f3cfc4 50%, #ecbfb3 100%)",
      };

  return (
    <div className={`relative select-none overflow-hidden rounded-3xl shadow-lift ${className}`}>
      <div className="aspect-[4/3] w-full bg-cover bg-center" style={afterStyle} aria-hidden />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ ...beforeStyle, clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        aria-hidden
      />

      <span className="absolute left-4 top-4 rounded-full glass-strong px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink">
        {beforeLabel}
      </span>
      <span className="absolute right-4 top-4 rounded-full glass-strong px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink">
        {afterLabel}
      </span>

      {/* divider + handle (visual) */}
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }} aria-hidden>
        <div className="h-full w-0.5 -translate-x-1/2 bg-white/90 shadow-[0_0_0_1px_rgba(30,42,68,0.15)]" />
        <div className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-ink shadow-lift backdrop-blur">
          <span className="text-sm">◀▶</span>
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Drag to compare before and after"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
