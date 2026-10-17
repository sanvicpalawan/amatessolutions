import { AREAS_SERVED, CONTACT, HARDWARE } from "@/lib/site";

const WHY = [
  {
    title: "Active remote monitoring",
    body: "Every install reports in. We see a failing string before you notice a bill creep.",
  },
  {
    title: "Engineered for payback",
    body: "Sized to your real load, not to a brochure. Most systems land inside 4–6 years.",
  },
  {
    title: "Built to survive here",
    body: "Marine-grade mounting and corrosion-resistant hardware for salt, heat and vibration.",
  },
  {
    title: "Technical guarantees",
    body: "25-year panel performance warranty, with commissioning documentation on handover.",
  },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Panel-cell motif, faded out from the top. */}
      <div
        aria-hidden="true"
        className="panel-motif radial-fade pointer-events-none absolute inset-0 opacity-70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-solar/10 blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-20 pb-16 sm:pt-28">
        <p className="inline-flex items-center gap-2 rounded-full border hairline bg-panel/60 px-3.5 py-1.5 text-xs tracking-wide text-dim">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-lagoon"
          />
          {HARDWARE.inverters} inverters · {HARDWARE.panels} panels ·{" "}
          {HARDWARE.battery}
        </p>

        <h1 className="mt-7 max-w-3xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          High-resilience solar hybrid systems
          <span className="text-solar"> — Palawan</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-dim">
          When the grid fails, your system takes over. We design and install
          industrial-grade solar for homes, resorts and industrial sites across{" "}
          {AREAS_SERVED.slice(0, 4).join(", ")} and the islands between them.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#estimator"
            className="rounded-full bg-solar px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-solar-2"
          >
            Size my system
          </a>
          <a
            href={CONTACT.phoneHref}
            className="rounded-full border hairline px-6 py-3 text-sm font-semibold text-mist transition-colors hover:border-solar hover:text-solar"
          >
            Call {CONTACT.phoneDisplay}
          </a>
          <a
            href={CONTACT.whatsapp}
            className="rounded-full border hairline px-6 py-3 text-sm font-semibold text-mist transition-colors hover:border-lagoon hover:text-lagoon"
          >
            WhatsApp
          </a>
        </div>

        <dl className="mt-14 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 border-t hairline pt-8 sm:grid-cols-4">
          {[
            { k: "Off-grid islands served", v: "Linapacan, Coron" },
            { k: "Emergency response", v: "System back up in 2 days" },
            { k: "Typical payback", v: "4–6 years" },
            { k: "Monitoring", v: "Remote, continuous" },
          ].map((item) => (
            <div key={item.k}>
              <dt className="text-xs tracking-wide text-dim-2">{item.k}</dt>
              <dd className="mt-1.5 text-sm font-medium text-mist">
                {item.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative border-t hairline bg-ink-2">
        <div className="mx-auto w-full max-w-6xl px-5 py-14">
          <h2 className="max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">
            When the grid fails, your system takes over
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-dim">
            In the Philippines, grid instability is not an inconvenience — it is
            a direct threat to your operation. Brownouts spoil stock, stall
            bookings and burn generator diesel. Consumer-grade kits fail under
            that pressure. We build for high-demand environments instead.
          </p>

          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {WHY.map((item) => (
              <div key={item.title} className="border-l-2 border-solar/40 pl-4">
                <h3 className="text-sm font-semibold text-mist">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-dim">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
