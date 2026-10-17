"use client";

import { useState, useSyncExternalStore } from "react";
import { AREAS_SERVED, CONTACT } from "@/lib/site";
import {
  getEstimateServerSnapshot,
  getEstimateSnapshot,
  subscribeEstimate,
} from "@/lib/estimate-store";

type Errors = Partial<Record<"name" | "email" | "phone" | "message", string>>;

const REASONS = [
  "New residential system",
  "New commercial or industrial system",
  "Off-grid or island site",
  "Repair or maintain an existing system",
  "Something else",
] as const;

export function QuoteForm() {
  const prefillValue = useSyncExternalStore(
    subscribeEstimate,
    getEstimateSnapshot,
    getEstimateServerSnapshot,
  );
  const [dismissedId, setDismissedId] = useState<number | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  // A dismissed prefill stays hidden, but a newer estimate still surfaces.
  const prefill = prefillValue && prefillValue.id !== dismissedId ? prefillValue : null;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const next: Errors = {};
    if (!get("name")) next.name = "Please tell us your name.";
    const email = get("email");
    if (!email) next.email = "We need an email address to reply.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "That email address does not look right.";
    const phone = get("phone");
    if (!phone) next.phone = "A contact number lets us reach you faster.";
    else if (phone.replace(/\D/g, "").length < 7)
      next.phone = "That number looks too short.";
    if (!get("message")) next.message = "Tell us briefly what you need.";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = event.currentTarget.querySelector<HTMLElement>(
        `[name="${Object.keys(next)[0]}"]`,
      );
      first?.focus();
      return;
    }

    // Front-end demo: nothing is transmitted yet. See README (Before publishing).
    setSent(true);
  }

  if (sent) {
    return (
      <section id="quote" className="scroll-mt-20 border-t hairline">
        <div className="mx-auto w-full max-w-3xl px-5 py-24 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-lagoon/50 bg-lagoon/10">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
              <path
                d="M4 12.5l5 5L20 6.5"
                stroke="var(--color-lagoon)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">
            Request received
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-dim">
            This is where the real version takes over: the request is stored as a
            structured lead, you receive an acknowledgement immediately, and a
            follow-up is scheduled. Nothing was transmitted in this demo.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={CONTACT.phoneHref}
              className="rounded-full bg-solar px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-solar-2"
            >
              Call {CONTACT.phoneDisplay}
            </a>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="rounded-full border hairline px-6 py-3 text-sm font-semibold text-mist transition-colors hover:border-solar hover:text-solar"
            >
              Send another
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="scroll-mt-20 border-t hairline">
      <div className="mx-auto w-full max-w-6xl px-5 py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-solar uppercase">
              Free quotation
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Tell us what you need powering
            </h2>
            <p className="mt-4 leading-relaxed text-dim">
              A short description is enough to start. We will come back to you
              with the next step — usually a few clarifying questions, then a
              site survey.
            </p>

            <ul className="mt-8 space-y-3 text-sm text-dim">
              <li className="flex gap-3">
                <span aria-hidden="true" className="text-solar">
                  →
                </span>
                No obligation and no charge for the quotation
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true" className="text-solar">
                  →
                </span>
                We only install {CONTACT.addressLocality}-area projects where we
                can support the system properly
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true" className="text-solar">
                  →
                </span>
                Serving {AREAS_SERVED.join(", ")}
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} noValidate className="rounded-2xl border hairline bg-panel/40 p-6 sm:p-8">
            {prefill && (
              <div className="mb-6 rounded-xl border border-solar/40 bg-solar/5 p-4">
                <p className="text-xs font-semibold tracking-wide text-solar uppercase">
                  Attached from your estimate
                </p>
                <p className="mt-1.5 text-sm text-mist">
                  {prefill.kwp} kWp {prefill.tier} system · ₱
                  {Math.round(prefill.investmentLow / 1000)}k–₱
                  {Math.round(prefill.investmentHigh / 1000)}k estimated
                </p>
                <button
                  type="button"
                  onClick={() => setDismissedId(prefill.id)}
                  className="mt-2 text-xs text-dim underline hover:text-mist"
                >
                  Remove
                </button>
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Your name" name="name" error={errors.name} required autoComplete="name" />
              <Field
                label="Phone or Viber number"
                name="phone"
                type="tel"
                error={errors.phone}
                required
                autoComplete="tel"
              />
              <Field
                label="Email address"
                name="email"
                type="email"
                error={errors.email}
                required
                autoComplete="email"
                className="sm:col-span-2"
              />
              <div className="sm:col-span-2">
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium text-mist"
                >
                  What is this about?
                </label>
                <select
                  id="reason"
                  name="reason"
                  defaultValue={REASONS[0]}
                  className="mt-2 w-full rounded-lg border hairline bg-ink px-3.5 py-2.5 text-sm text-mist outline-none focus:border-solar"
                >
                  {REASONS.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-mist"
                >
                  What do you need powering?{" "}
                  <span className="text-solar" aria-hidden="true">
                    *
                  </span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  placeholder="Location, type of building, what you run, and anything you already know about your electricity bill."
                  className="mt-2 w-full resize-y rounded-lg border hairline bg-ink px-3.5 py-2.5 text-sm text-mist outline-none placeholder:text-dim-2 focus:border-solar"
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 text-xs text-solar-2">
                    {errors.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="mt-7 w-full rounded-full bg-solar px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-solar-2"
            >
              Request my free quotation
            </button>

            <p className="mt-4 text-xs leading-relaxed text-dim-2">
              Fields marked <span aria-hidden="true">*</span> are required. By
              submitting this form you agree to us contacting you about your
              enquiry. We do not sell or share your details. See our{" "}
              <a href="/privacy" className="text-dim underline hover:text-mist">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  required,
  autoComplete,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-mist">
        {label}{" "}
        {required && (
          <span className="text-solar" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className="mt-2 w-full rounded-lg border hairline bg-ink px-3.5 py-2.5 text-sm text-mist outline-none focus:border-solar"
      />
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-xs text-solar-2">
          {error}
        </p>
      )}
    </div>
  );
}
