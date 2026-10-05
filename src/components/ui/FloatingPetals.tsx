const petals = [
  { l: "8%", d: "0s", dur: "11s", c: "#EBB7B0", s: 13 },
  { l: "26%", d: "3.2s", dur: "13s", c: "#B9A3DE", s: 10 },
  { l: "44%", d: "6s", dur: "10s", c: "#8E9FE6", s: 12 },
  { l: "63%", d: "1.6s", dur: "14s", c: "#5CC3B8", s: 9 },
  { l: "82%", d: "4.6s", dur: "12s", c: "#E3B34C", s: 8 },
  { l: "93%", d: "7.5s", dur: "15s", c: "#EBB7B0", s: 7 },
];

/** Botanical petals / sparks drifting upward. CSS keyframe (drift-up); hidden under reduced-motion. */
export function FloatingPetals({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden ${className}`}>
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-0 animate-drift-up"
          style={{ left: p.l, animationDelay: p.d, animationDuration: p.dur }}
        >
          <svg width={p.s * 2} height={p.s * 2} viewBox="0 0 20 20" fill="none">
            <path
              d="M10 1C13 5 17 7 19 10C15 12 12 16 10 19C8 16 5 12 1 10C3 7 7 5 10 1Z"
              fill={p.c}
              fillOpacity="0.7"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}
