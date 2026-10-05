import type { ReactNode } from "react";

/** Infinite CSS marquee. Animation stops for reduced-motion users. */
export function Marquee({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <div className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-12 motion-reduce:animate-none">
        {children}
      </div>
      <div
        aria-hidden
        className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-12 motion-reduce:hidden"
      >
        {children}
      </div>
    </div>
  );
}
