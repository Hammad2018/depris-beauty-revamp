/** Slow-rotating god-ray / light-ray sweep for celestial sections. CSS only. */
export function LightRays({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute left-1/2 top-[-40%] h-[150%] w-[150%] -translate-x-1/2 animate-spin-slow opacity-40 mix-blend-screen"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 0%, transparent 0deg, rgba(255,255,255,0.20) 7deg, transparent 15deg, transparent 38deg, rgba(143,163,255,0.16) 46deg, transparent 54deg, transparent 88deg, rgba(255,255,255,0.14) 96deg, transparent 104deg, transparent 150deg, rgba(92,195,184,0.14) 158deg, transparent 166deg)",
          WebkitMaskImage: "radial-gradient(65% 65% at 50% 0%, #000, transparent 78%)",
          maskImage: "radial-gradient(65% 65% at 50% 0%, #000, transparent 78%)",
        }}
      />
    </div>
  );
}
