import { Cormorant_Garamond, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";

/** Display: a high-contrast Garamond that echoes the engraved serif of the real Depris wordmark. */
export const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hanken",
  display: "swap",
});

/** Mono for lab-data micro-labels (lot codes, pH, study n). */
export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
