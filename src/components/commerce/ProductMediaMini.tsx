import Image from "next/image";
import type { Tone } from "@/lib/commerce/types";

const toneGradient: Record<Tone, string> = {
  blush: "from-[#F4D7D2] to-[#E7E9FA]",
  bronze: "from-[#C7E9E3] to-[#E3EAFB]",
  sage: "from-[#C9EAE3] to-[#E8F4F6]",
  sand: "from-[#DBE4FB] to-[#EFF2FE]",
  ink: "from-[#2E3C9E] to-[#2FA39A]",
};

/** Small product thumbnail: the real photo when there is one, otherwise an on-brand gradient. */
export function ProductMediaMini({ tone, alt, image, size = 64 }: { tone: Tone; alt: string; image?: string; size?: number }) {
  if (image) {
    return (
      <span className="relative block shrink-0 overflow-hidden rounded-xl bg-sand" style={{ width: size, height: size }}>
        <Image src={image} alt={alt} fill sizes={`${size}px`} className="object-cover" />
      </span>
    );
  }
  return (
    <div
      className={`shrink-0 rounded-xl bg-gradient-to-br ${toneGradient[tone]}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={alt}
    />
  );
}
