import Image from "next/image";

/** The real Depris lotus mark, cropped from the brand lock-up. */
export function LotusMark({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      src="/brand/depris-mark.png"
      alt="Depris Beauty"
      width={size}
      height={size}
      className={`inline-block select-none ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
