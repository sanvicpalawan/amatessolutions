import { HARDWARE } from "@/lib/site";

const STEPS = [
  {
    n: "01",
    title: "Site survey and energy audit",
    body: "We look at your real consumption, not a guess. Roof or ground condition, shading, cable runs and load profile all get measured before anything is specified.",
  },
  {
    n: "02",
    title: "Technical design",
    body: "A sized system with a written specification: array, inverter, battery capacity, protections and the expected monthly production. No vague promises.",
  },
  {
    n: "03",
    title: "Installation",
    body: "Marine-grade mounting, corrosion-resistant hardware and correct cable management — built for salt air, heat and vibration.",
  },
  {
    n: "04",
    title: "Activation and commissioning",
    body: "We commission the system, verify generation against the design and document the result before handover.",
  },
  {
    n: "05",
    title: "Remote monitoring and support",
    body: "Your system reports in. We can see a failing string or a battery fault before it becomes your problem, and we respond.",
  },
];

const SOLUTIONS = [
  {
    title: "Residential",
    body: "Homes and small offices across Puerto Princesa, El Nido, San Vicente and Coron. Sized to cut the bill and keep the lights on through an outage.",
    tag: "Standard",
  },
  {
    title: "Commercial",
    body: "Resorts, retail and light industry with genuine daytime load. Sized against your load profile so the payback figure is real.",
    tag: "Professional",
  },
  {
    title: "Industrial and marine",
    body: "High-demand sites, off-grid island operations and marine installations where failure is not an option.",
    tag: "Infrastructure",
  },
  {
    title: "Maintenance and repair",
    body: "Diagnosis and repair of existing systems — including systems we did not install. Post-typhoon assessment and restoration.",
    tag: "Service",
  },
];

function EnergyDiagram() {
  return (
    <svg
      viewBox="0 0 620 260"
      role="img"
      aria-label="Energy flow: solar array feeds a hybrid inverter, which charges the battery and supplies site loads, backed up by the grid"
      className="w-full"
    >
      <defs>
        <linearGradient id="panelGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1b2942" />
          <stop offset="100%" stopColor="#121b2e" />
        </linearGradient>
      </defs>

      {/* Array */}
      <g>
        <rect
          x="14"
          y="52"
          width="132"
          height="80"
          rx="8"
          fill="url(#panelGrad)"
          stroke="var(--color-line)"
        />
        <g stroke="var(--color-line)" strokeWidth="1">
          <line x1="14" y1="79" x2="146" y2="79" />
          <line x1="14" y1="105" x2="146" y2="105" />
          <line x1="58" y1="52" x2="58" y2="132" />
          <line x1="102" y1="52" x2="102" y2="132" />
        </g>
        <rect x="14" y="52" width="132" height="80" rx="8" fill="var(--color-solar)" opacity="0.08" />
        <text x="80" y="156" textAnchor="middle" fill="var(--color-dim)" fontSize="12">
          {HARDWARE.panels} array
        </text>
      </g>

      {/* Inverter */}
      <g>
        <rect
          x="228"
          y="62"
          width="146"
          height="60"
          rx="8"
          fill="#121b2e"
          stroke="var(--color-solar)"
        />
        <text x="301" y="89" textAnchor="middle" fill="var(--color-mist)" fontSize="13" fontWeight="600">
          Hybrid inverter
        </text>
        <text x="301" y="107" textAnchor="middle" fill="var(--color-dim-2)" fontSize="11">
          {HARDWARE.inverters} · MPPT
        </text>
      </g>

      {/* Battery */}
      <g>
        <rect
          x="240"
          y="176"
          width="122"
          height="52"
          rx="8"
          fill="#121b2e"
          stroke="var(--color-lagoon)"
        />
        <text x="301" y="199" textAnchor="middle" fill="var(--color-mist)" fontSize="13" fontWeight="600">
          Battery bank
        </text>
        <text x="301" y="216" textAnchor="middle" fill="var(--color-dim-2)" fontSize="11">
          {HARDWARE.battery}
        </text>
      </g>

      {/* Loads */}
      <g>
        <rect
          x="452"
          y="52"
          width="150"
          height="80"
          rx="8"
          fill="#121b2e"
          stroke="var(--color-line)"
        />
        <text x="527" y="84" textAnchor="middle" fill="var(--color-mist)" fontSize="13" fontWeight="600">
          Site loads
        </text>
        <text x="527" y="104" textAnchor="middle" fill="var(--color-dim-2)" fontSize="11">
          Day and night supply
        </text>
      </g>

      {/* Grid */}
      <g>
        <rect
          x="452"
          y="176"
          width="150"
          height="52"
          rx="8"
          fill="#121b2e"
          stroke="var(--color-line)"
          strokeDasharray="5 5"
        />
        <text x="527" y="199" textAnchor="middle" fill="var(--color-dim)" fontSize="13" fontWeight="600">
          Grid
        </text>
        <text x="527" y="216" textAnchor="middle" fill="var(--color-dim-2)" fontSize="11">
          Backup, not dependency
        </text>
      </g>

      {/* Flow paths */}
      <g stroke="var(--color-solar)" strokeWidth="2.5" fill="none" className="flow">
        <path d="M146 92 H228" />
        <path d="M374 92 H452" />
        <path d="M301 122 V176" />
      </g>
      <g stroke="var(--color-line)" strokeWidth="2" fill="none" strokeDasharray="5 5">
        <path d="M527 176 V132" />
      </g>
    </svg>
  );
}

export function Process() {
  return (
    <section id="process" className="scroll-mt-20 border-t hairline bg-ink-2">
      <div className="mx-auto w-full max-w-6xl px-5 py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-solar uppercase">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Five stages, no surprises
          </h2>
          <p className="mt-4 leading-relaxed text-dim">
            You always know what stage your project is at and what happens next.
          </p>
        </div>

        <ol className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.n} className="border-t-2 border-line pt-5">
              <span className="text-xs font-semibold tracking-[0.2em] text-solar tabular-nums">
                {step.n}
              </span>
              <h3 className="mt-2 text-base font-semibold text-mist">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-dim">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-16 rounded-2xl border hairline bg-panel/40 p-6 sm:p-9">
          <h3 className="text-sm font-semibold tracking-[0.2em] text-dim-2 uppercase">
            What that looks like as a system
          </h3>
          <div className="mt-7">
            <EnergyDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Solutions() {
  return (
    <section id="solutions" className="scroll-mt-20 border-t hairline">
      <div className="mx-auto w-full max-w-6xl px-5 py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-solar uppercase">
            Solutions
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Built for your current and future needs
          </h2>
          <p className="mt-4 leading-relaxed text-dim">
            We install only the systems we use ourselves. {HARDWARE.inverters}{" "}
            inverters and {HARDWARE.panels} panels are proven brands, and we
            choose them because they carry the best value to performance ratio —
            not because they are cheap.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {SOLUTIONS.map((item) => (
            <article
              key={item.title}
              className="flex flex-col rounded-2xl border hairline bg-panel/40 p-6 transition-colors hover:border-solar/60"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-mist">
                  {item.title}
                </h3>
                <span className="rounded-full border hairline px-3 py-1 text-[11px] font-medium tracking-wide text-dim">
                  {item.tag}
                </span>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-dim">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Proof() {
  const figures = [
    { k: "System", v: "7.3 kWp hybrid" },
    { k: "Site", v: "Off-grid island resort" },
    { k: "Location", v: "Linapacan, Palawan" },
    { k: "Time to restore", v: "2 days" },
  ];

  return (
    <section id="proof" className="scroll-mt-20 border-t hairline bg-ink-2">
      <div className="mx-auto w-full max-w-6xl px-5 py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-solar uppercase">
            Proof
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            A resort that could not afford to be dark
          </h2>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="leading-relaxed text-dim">
              When typhoon damage took out an off-grid resort&rsquo;s power
              system in Linapacan, the site had no grid to fall back on — and no
              short-term alternative to diesel. Diesel means cost, noise and
              supply runs by boat.
            </p>
            <p className="mt-4 leading-relaxed text-dim">
              We assessed the site, restored the array and battery bank, and had
              the resort generating again within two days. The system runs the
              property off solar and battery with no grid connection at all.
            </p>
            <p className="mt-4 leading-relaxed text-dim">
              It is the clearest example of what we are actually selling: not
              panels on a roof, but power that keeps working when everything
              else has stopped.
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 self-start rounded-2xl border hairline bg-panel/50 p-6 lg:grid-cols-1">
            {figures.map((f) => (
              <div key={f.k}>
                <dt className="text-xs text-dim-2">{f.k}</dt>
                <dd className="mt-1 text-lg font-semibold text-mist">
                  {f.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {[
            {
              t: "25-year performance warranty",
              b: "Panel output guaranteed for 25 years, on top of the manufacturer product warranty.",
            },
            {
              t: "LiFePO4 storage only",
              b: "We do not fit lead-acid. Lithium iron phosphate lasts longer, cycles deeper and is safer in the heat.",
            },
            {
              t: "Marine-grade mounting",
              b: "Corrosion-resistant structures and hardware, specified for coastal and island conditions.",
            },
          ].map((item) => (
            <div
              key={item.t}
              className="rounded-xl border hairline bg-panel/30 p-5"
            >
              <h3 className="text-sm font-semibold text-solar">{item.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-dim">{item.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
