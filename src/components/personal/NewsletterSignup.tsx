"use client";

import { useState } from "react";
import { Check } from "@phosphor-icons/react";
import { prefOptions } from "@/lib/newsletter";
import { usePersonal, writePersonal, type NewsletterPref } from "@/lib/personal";

/** Monthly Drop signup with preference chips. Remembers the subscription in the browser. */
export function NewsletterSignup({ tone = "dark", id = "drop" }: { tone?: "dark" | "light"; id?: string }) {
  const personal = usePersonal();
  const [email, setEmail] = useState("");
  const [prefs, setPrefs] = useState<NewsletterPref[]>(["skincare"]);
  const dark = tone === "dark";
  const chip = (on: boolean) =>
    `rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
      on
        ? dark ? "border-teal-glow bg-teal-glow/15 text-white" : "border-camellia bg-camellia/10 text-ink"
        : dark ? "border-white/25 text-white/75 hover:border-white/60" : "border-sand text-ink-soft hover:border-camellia/60"
    }`;

  if (personal?.newsletter) {
    return (
      <div className={`rounded-3xl border p-5 text-left ${dark ? "border-white/15 bg-white/5" : "border-sand bg-porcelain"}`}>
        <p className={`flex items-center gap-2 font-medium ${dark ? "text-teal-glow" : "text-camellia"}`}><Check size={16} weight="bold" /> You are on the Drop.</p>
        <p className={`mt-1 text-sm ${dark ? "text-white/70" : "text-ink-soft"}`}>
          {personal.newsletter.email} · {personal.newsletter.prefs.map((p) => prefOptions.find((o) => o.value === p)?.label).join(", ")}
        </p>
        <button type="button" onClick={() => writePersonal({ newsletter: undefined })} className={`mt-3 text-xs underline-offset-4 hover:underline ${dark ? "text-white/60" : "text-ink-soft"}`}>
          Change preferences
        </button>
      </div>
    );
  }

  return (
    <form
      className="w-full text-left"
      onSubmit={(e) => {
        e.preventDefault();
        if (!email.includes("@") || prefs.length === 0) return;
        writePersonal({ newsletter: { email, prefs, since: new Date().toISOString().slice(0, 10) } });
      }}
    >
      <div className="flex flex-wrap gap-2" role="group" aria-label="What should we send you?">
        {prefOptions.map((o) => {
          const on = prefs.includes(o.value);
          return (
            <button key={o.value} type="button" aria-pressed={on} onClick={() => setPrefs(on ? prefs.filter((p) => p !== o.value) : [...prefs, o.value])} className={chip(on)}>
              {o.label}
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex gap-2">
        <label htmlFor={`${id}-email`} className="sr-only">Email address</label>
        <input
          id={`${id}-email`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className={`min-w-0 flex-1 rounded-full border px-5 py-3 focus:outline-none ${
            dark ? "border-white/30 bg-white/10 text-white placeholder:text-white/50 backdrop-blur-md focus:border-teal-glow" : "border-sand bg-cream text-ink placeholder:text-ink-soft/60 focus:border-camellia"
          }`}
        />
        <button type="submit" className="btn-primary whitespace-nowrap">Join the Drop</button>
      </div>
      <p className={`mt-2 text-xs ${dark ? "text-white/50" : "text-ink-soft/70"}`}>One issue a month. Unsubscribe in one tap.</p>
    </form>
  );
}
