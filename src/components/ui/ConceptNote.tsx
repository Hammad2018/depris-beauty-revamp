import { PlugsConnected } from "@phosphor-icons/react/dist/ssr";

/**
 * Placeholder marker for the pitch: tells the client this form works as a preview
 * and names the system it connects to in the live build.
 */
export function ConceptNote({ connects, tone = "light", className = "" }: { connects: string; tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  return (
    <p
      className={`mt-3 flex items-start gap-2 rounded-2xl border border-dashed px-3.5 py-2.5 text-xs leading-relaxed ${
        dark ? "border-white/30 text-white/70" : "border-camellia/40 bg-camellia/5 text-ink-soft"
      } ${className}`}
    >
      <PlugsConnected size={14} className={`mt-0.5 shrink-0 ${dark ? "text-teal-glow" : "text-camellia"}`} />
      <span>
        <span className={`font-semibold ${dark ? "text-white/90" : "text-ink"}`}>Concept preview.</span> This form works on the page and remembers your entry in this browser. In the live build it connects to {connects}.
      </span>
    </p>
  );
}
