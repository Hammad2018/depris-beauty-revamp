"use client";

/**
 * Animated iridescent aurora — soft blurred color blobs that drift.
 * Pure CSS transforms (GPU), paused for reduced-motion via the global rule.
 */
export function AuroraBackground({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const blobs =
    tone === "dark"
      ? ["bg-camellia/40", "bg-bronze/40", "bg-lavender/30", "bg-coral/30"]
      : ["bg-blush/50", "bg-coral/40", "bg-gold/30", "bg-lavender/40"];
  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`} aria-hidden>
      <div className={`absolute -left-[10%] top-[-15%] h-[42vw] w-[42vw] rounded-full ${blobs[0]} blur-3xl animate-aurora`} />
      <div className={`absolute right-[-8%] top-[5%] h-[38vw] w-[38vw] rounded-full ${blobs[1]} blur-3xl animate-aurora-slow`} />
      <div className={`absolute bottom-[-20%] left-[25%] h-[40vw] w-[40vw] rounded-full ${blobs[2]} blur-3xl animate-aurora`} style={{ animationDelay: "-8s" }} />
      <div className={`absolute right-[20%] bottom-[-10%] h-[30vw] w-[30vw] rounded-full ${blobs[3]} blur-3xl animate-aurora-slow`} style={{ animationDelay: "-5s" }} />
    </div>
  );
}
