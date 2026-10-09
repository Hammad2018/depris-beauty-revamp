"use client";

import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <div className="rounded-3xl bg-sage/10 p-8">
        <p className="font-display text-xl text-ink">Thanks. Message received.</p>
        <p className="mt-2 text-ink-soft">Our team will get back to you within one business day.</p>
      </div>
    );
  }
  return (
    <form
      className="space-y-4 rounded-3xl bg-porcelain p-6 shadow-soft"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" id="name" />
        <Field label="Email" id="email" type="email" />
      </div>
      <Field label="Subject" id="subject" />
      <div>
        <label htmlFor="message" className="eyebrow mb-1.5 block">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          className="w-full rounded-2xl border border-sand bg-cream px-4 py-3 text-sm text-ink focus:border-camellia focus:outline-none"
        />
      </div>
      <button type="submit" className="btn-primary">
        Send message
      </button>
    </form>
  );
}

function Field({ label, id, type = "text" }: { label: string; id: string; type?: string }) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-1.5 block">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        className="w-full rounded-full border border-sand bg-cream px-4 py-2.5 text-sm text-ink focus:border-camellia focus:outline-none"
      />
    </div>
  );
}
