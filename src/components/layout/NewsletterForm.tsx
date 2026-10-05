"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return <p className="text-sm text-sage">You&apos;re on the list — welcome to the glow. ✨</p>;
  }

  return (
    <form
      className="flex max-w-sm gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (email.includes("@")) setDone(true);
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="min-w-0 flex-1 rounded-full border border-sand bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-camellia focus:outline-none"
      />
      <button type="submit" className="btn-primary whitespace-nowrap px-5 py-2.5 text-sm">
        Join
      </button>
    </form>
  );
}
