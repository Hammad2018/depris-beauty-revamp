"use client";

import { useState } from "react";
import { Starfield } from "@/components/ui/Starfield";
import { FloatingPetals } from "@/components/ui/FloatingPetals";
import { LotusMark } from "@/components/ui/LotusMark";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function FinaleCTA() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="celestial relative overflow-hidden text-white">
      <Starfield />
      <FloatingPetals />
      <div className="shell relative z-10 flex flex-col items-center py-24 text-center">
        <LotusMark size={60} className="mb-6 drop-shadow-[0_8px_30px_rgba(92,195,184,0.5)]" />
        <Eyebrow className="justify-center text-teal-glow">Join the glow list</Eyebrow>
        <h2 className="h-display mt-4 font-display">
          <span className="block text-white">Your best skin</span>
          <span className="block italic text-metallic text-metallic-dark">starts tonight.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-lg text-white/75">
          Early access to launches, ritual tips and members-only offers. No spam — just glow.
        </p>

        {done ? (
          <p className="mt-8 text-lg text-teal-glow">You&apos;re on the list — welcome to the glow. ✨</p>
        ) : (
          <form
            className="mt-8 flex w-full max-w-md gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) setDone(true);
            }}
          >
            <label htmlFor="finale-email" className="sr-only">Email address</label>
            <input
              id="finale-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="min-w-0 flex-1 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-white placeholder:text-white/50 backdrop-blur-md focus:border-teal-glow focus:outline-none"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">Join</button>
          </form>
        )}
        <p className="mt-6 text-xs uppercase tracking-[0.15em] text-white/50">
          Authorized retailer · Sourced from Korea · Cruelty-free
        </p>
      </div>
    </section>
  );
}
