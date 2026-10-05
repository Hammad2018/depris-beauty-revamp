import type { Tone } from "@/lib/commerce/types";

const toneGradient: Record<Tone, string> = {
  blush: "from-[#F4D7D2] to-[#E7E9FA]",
  bronze: "from-[#C7E9E3] to-[#E3EAFB]",
  sage: "from-[#C9EAE3] to-[#E8F4F6]",
  sand: "from-[#DBE4FB] to-[#EFF2FE]",
  ink: "from-[#2E3C9E] to-[#2FA39A]",
};

export function ProductMediaMini({ tone, alt }: { tone: Tone; alt: string }) {
  return (
    <div
      className={`h-16 w-16 shrink-0 rounded-xl bg-gradient-to-br ${toneGradient[tone]}`}
      role="img"
      aria-label={alt}
    />
  );
}
