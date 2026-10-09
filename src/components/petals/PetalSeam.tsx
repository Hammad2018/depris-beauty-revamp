import { Petal, type PetalTone } from "./Petal";

const scatter: { x: number; y: number; r: number; s: number; t: PetalTone; shape: "lotus" | "drop" | "leaf" }[] = [
  { x: 3, y: 10, r: -24, s: 18, t: "blush", shape: "lotus" },
  { x: 9, y: 46, r: 32, s: 12, t: "lilac", shape: "drop" },
  { x: 17, y: 22, r: 8, s: 14, t: "jade", shape: "leaf" },
  { x: 29, y: 58, r: -48, s: 10, t: "periwinkle", shape: "lotus" },
  { x: 38, y: 14, r: 20, s: 16, t: "blush", shape: "drop" },
  { x: 49, y: 40, r: -10, s: 11, t: "gold", shape: "lotus" },
  { x: 58, y: 8, r: 44, s: 13, t: "lilac", shape: "leaf" },
  { x: 67, y: 52, r: -30, s: 17, t: "jade", shape: "lotus" },
  { x: 76, y: 24, r: 14, s: 10, t: "periwinkle", shape: "drop" },
  { x: 86, y: 44, r: -56, s: 15, t: "blush", shape: "lotus" },
  { x: 94, y: 12, r: 26, s: 12, t: "gold", shape: "leaf" },
];

/**
 * A scatter of petals along a section seam, so dark/light transitions read as a
 * drift of blossom rather than a hard horizontal rule. Purely decorative.
 */
export function PetalSeam({ position = "top", className = "" }: { position?: "top" | "bottom"; className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 z-[1] h-20 overflow-hidden ${position === "top" ? "-top-10" : "-bottom-10"} ${className}`}
    >
      {scatter.map((p, i) => (
        <span
          key={i}
          className="absolute animate-float-slow"
          style={{ left: `${p.x}%`, top: `${p.y}%`, transform: `rotate(${p.r}deg)`, animationDelay: `${(i % 5) * -1.7}s` }}
        >
          <Petal tone={p.t} size={p.s} shape={p.shape} opacity={0.75} />
        </span>
      ))}
    </div>
  );
}
