import Image from "next/image";
import Link from "next/link";

/** The real Depris Beauty lock-up (lotus + silver wordmark). */
export function Logo({ height = 44, className = "", priority = false }: { height?: number; className?: string; priority?: boolean }) {
  const width = Math.round(height * (1000 / 300));
  return (
    <Link href="/" aria-label="Depris Beauty, home" className={`inline-flex items-center ${className}`}>
      <Image src="/brand/depris-logo.png" alt="Depris Beauty" width={width} height={height} priority={priority} className="h-auto w-auto" style={{ height, width: "auto" }} />
    </Link>
  );
}
