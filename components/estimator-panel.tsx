"use client";

import { useId, useMemo, useState } from "react";
import {
  ASSUMPTIONS,
  TIERS,
  estimate,
  formatPeso,
  formatPesoShort,
  type TierKey,
} from "@/lib/estimator";
import { publishEstimate } from "@/lib/estimate-store";

const MIN_BILL = 3_000;
const MAX_BILL = 150_000;
const PRESETS = [8_000, 15_000, 30_000, 60_000];

function tierOrder(): TierKey[] {
  return ["standard", "professional", "infrastructure"];
}

export function EstimatorPanel() {
  const [bill, setBill] = useState(15_000);
  const [tariff, setTariff] = useState<number>(ASSUMPTIONS.tariffPhpPerKwh);
  const [offset, setOffset] = useState<number>(ASSUMPTIONS.offsetFactor);
  const [showAssumptions, setShowAssumptions] = useState(false);

  const id = useId();
  const result = useMemo(
    () => estimate(bill, { tariffPhpPerKwh: tariff, offsetFactor: offset }),
    [bill, tariff, offset],
  );

  // Cumulative net position: negative until the system has paid for itself.
  const chart = useMemo(() => {
    const years = ASSUMPTIONS.lifetimeYears;
    const points: { year: number; net: number }[] = [];
    for (let year = 0; year <= years; year += 1) {
      points.push({
        year,
        net: result.annualSavings * year - (result.investmentLow + result.investmentHigh) / 2,
      });
    }
    const yMin = Math.min(...points.map((p) => p.net), 0);
    const yMax = Math.max(...points.map((p) => p.net), 1);
    const w = 640;
    const h = 190;
    const pad = { top: 12, right: 8, bottom: 22, left: 8 };
    const x = (year: number) =>
      pad.left + (year / years) * (w - pad.left - pad.right);
    const y = (net: number) =>
      pad.top +
      (1 - (net - yMin) / (yMax - yMin)) * (h - pad.top - pad.bottom);

    const path = points
      .map((p, i) => `${i === 0 ? "M" : "L"}${x(p.year).toFixed(1)},${y(p.net).toFixed(1)}`)
      .join(" ");
    const zeroY = y(0);
    const breakEvenX = x(Math.min(result.paybackYears, years));

    return { path, zeroY, breakEvenX, w, h, atYears: years };
  }, [result.annualSavings, result.investmentLow, result.investmentHigh, result.paybackYears]);

  function sendToForm() {
    publishEstimate({
      kwp: result.kwp,
      tier: result.tierLabel,
      investmentLow: result.investmentLow,
      investmentHigh: result.investmentHigh,
      monthlyBill: result.monthlyBill,
    });
    document
      .getElementById("quote")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section id="estimator" className="scroll-mt-20 border-t hairline">
      <div className="mx-auto w-full max-w-6xl px-5 py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-solar uppercase">
            Instant sizing
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            What would solar actually cost me?
          </h2>
          <p className="mt-4 leading-relaxed text-dim">
            Most solar sites refuse to answer this. Move the slider and you get
            a system size, an investment band and a payback period — with the
            assumptions shown, not hidden.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          {/* ---------------- Input ---------------- */}
          <div className="rounded-2xl border hairline bg-panel/50 p-6 sm:p-7">
            <label
              htmlFor={`${id}-bill`}
              className="block text-sm font-medium text-mist"
            >
              Your average monthly electricity bill
            </label>
            <p className="mt-1 text-xs text-dim-2">
              Look at a recent bill. An estimate is fine.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <span className="text-xl font-semibold text-solar">₱</span>
              <input
                id={`${id}-bill`}
                type="number"
                inputMode="numeric"
                min={MIN_BILL}
                max={MAX_BILL}
                step={500}
                value={bill}
                onChange={(e) => {
                  const next = Number(e.target.value);
                  setBill(Number.isFinite(next) ? next : MIN_BILL);
                }}
                onBlur={() =>
                  setBill((v) => Math.min(MAX_BILL, Math.max(MIN_BILL, v || MIN_BILL)))
                }
                className="w-full rounded-lg border hairline bg-ink px-3.5 py-2.5 text-lg font-semibold text-mist tabular-nums outline-none focus:border-solar"
              />
            </div>

            <input
              type="range"
              min={MIN_BILL}
              max={MAX_BILL}
              step={500}
              value={Math.min(MAX_BILL, Math.max(MIN_BILL, bill))}
              onChange={(e) => setBill(Number(e.target.value))}
              aria-label="Monthly electricity bill"
              className="mt-5 w-full"
              style={{ accentColor: "var(--color-solar)" }}
            />
            <div className="flex justify-between text-xs text-dim-2 tabular-nums">
              <span>{formatPeso(MIN_BILL)}</span>
              <span>{formatPeso(MAX_BILL)}</span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setBill(preset)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    bill === preset
                      ? "border-solar bg-solar/10 text-solar"
                      : "hairline text-dim hover:border-solar hover:text-mist"
                  }`}
                >
                  {formatPesoShort(preset)}
                </button>
              ))}
            </div>

            <div className="mt-7 border-t hairline pt-5">
              <button
                type="button"
                onClick={() => setShowAssumptions((v) => !v)}
                aria-expanded={showAssumptions}
                className="flex w-full items-center justify-between text-sm font-medium text-mist"
              >
                Assumptions used
                <span
                  aria-hidden="true"
                  className={`transition-transform ${showAssumptions ? "rotate-180" : ""}`}
                >
                  ▾
                </span>
              </button>

              {showAssumptions && (
                <div className="mt-5 space-y-5">
                  <div>
                    <label
                      htmlFor={`${id}-tariff`}
                      className="flex justify-between text-xs text-dim"
                    >
                      <span>Electricity tariff</span>
                      <span className="text-mist tabular-nums">
                        ₱{tariff.toFixed(2)}/kWh
                      </span>
                    </label>
                    <input
                      id={`${id}-tariff`}
                      type="range"
                      min={8}
                      max={22}
                      step={0.25}
                      value={tariff}
                      onChange={(e) => setTariff(Number(e.target.value))}
                      className="mt-2 w-full"
                      style={{ accentColor: "var(--color-lagoon)" }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`${id}-offset`}
                      className="flex justify-between text-xs text-dim"
                    >
                      <span>Share of the bill offset by solar</span>
                      <span className="text-mist tabular-nums">
                        {Math.round(offset * 100)}%
                      </span>
                    </label>
                    <input
                      id={`${id}-offset`}
                      type="range"
                      min={0.2}
                      max={1}
                      step={0.05}
                      value={offset}
                      onChange={(e) => setOffset(Number(e.target.value))}
                      className="mt-2 w-full"
                      style={{ accentColor: "var(--color-lagoon)" }}
                    />
                  </div>

                  <p className="text-xs leading-relaxed text-dim-2">
                    Also assumed: {(ASSUMPTIONS.specificYieldKwhPerKwpPerDay).toFixed(1)}{" "}
                    kWh generated per kWp per day,{" "}
                    {Math.round(ASSUMPTIONS.performanceRatio * 100)}% system
                    efficiency, {ASSUMPTIONS.panelWattPeak} W panels and{" "}
                    {ASSUMPTIONS.batteryKwhPerKwp} kWh of battery per kWp.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ---------------- Result ---------------- */}
          <div
            aria-live="polite"
            className="rounded-2xl border border-line bg-gradient-to-b from-panel-2 to-panel p-6 sm:p-7"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs tracking-[0.2em] text-dim-2 uppercase">
                  Recommended system
                </p>
                <p className="mt-1.5 text-2xl font-semibold text-mist">
                  {result.kwp} kWp solar hybrid
                </p>
              </div>
              <span className="rounded-full border border-solar/50 bg-solar/10 px-3.5 py-1.5 text-xs font-semibold text-solar">
                {result.tierLabel}
              </span>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-y hairline py-5 sm:grid-cols-4">
              {[
                { k: "Panels", v: `${result.panelCount} × ${ASSUMPTIONS.panelWattPeak}W` },
                { k: "Inverter", v: `${result.inverterKw} kW` },
                { k: "Battery", v: `${result.batteryKwh} kWh` },
                { k: "Roof space", v: `~${result.roofAreaM2} m²` },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="text-xs text-dim-2">{s.k}</dt>
                  <dd className="mt-1 text-sm font-semibold text-mist tabular-nums">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              <div className="sm:col-span-3">
                <p className="text-xs text-dim-2">Estimated investment</p>
                <p className="mt-1.5 text-3xl font-semibold text-solar tabular-nums">
                  {formatPesoShort(result.investmentLow)} –{" "}
                  {formatPesoShort(result.investmentHigh)}
                </p>
                <p className="mt-1 text-xs text-dim-2">
                  {formatPeso(result.investmentLow)} –{" "}
                  {formatPeso(result.investmentHigh)}
                </p>
              </div>

              <div>
                <p className="text-xs text-dim-2">Monthly saving</p>
                <p className="mt-1 text-lg font-semibold text-mist tabular-nums">
                  {formatPeso(result.monthlySavings)}
                </p>
              </div>
              <div>
                <p className="text-xs text-dim-2">Pays for itself in</p>
                <p className="mt-1 text-lg font-semibold text-lagoon tabular-nums">
                  {result.paybackYears.toFixed(1)} years
                </p>
              </div>
              <div>
                <p className="text-xs text-dim-2">
                  Net over {ASSUMPTIONS.lifetimeYears} years
                </p>
                <p className="mt-1 text-lg font-semibold text-mist tabular-nums">
                  {formatPesoShort(result.lifetimeSavings)}
                </p>
              </div>
            </div>

            {/* Cumulative net position, crossing zero at break-even. */}
            <svg
              viewBox={`0 0 ${chart.w} ${chart.h}`}
              className="mt-7 w-full"
              role="img"
              aria-label={`Cumulative savings crossing break-even at ${result.paybackYears.toFixed(1)} years`}
            >
              <line
                x1="0"
                x2={chart.w}
                y1={chart.zeroY}
                y2={chart.zeroY}
                stroke="var(--color-line)"
                strokeDasharray="4 5"
              />
              <path
                d={chart.path}
                fill="none"
                stroke="var(--color-solar)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle
                cx={chart.breakEvenX}
                cy={chart.zeroY}
                r="5"
                fill="var(--color-lagoon)"
              />
              <text
                x={chart.breakEvenX + 12}
                y={chart.zeroY - 10}
                fill="var(--color-mist)"
                fontSize="12"
              >
                Break-even · {result.paybackYears.toFixed(1)} yrs
              </text>
            </svg>
            <p className="text-xs text-dim-2">
              Cumulative savings against the investment, over{" "}
              {ASSUMPTIONS.lifetimeYears} years.
            </p>

            <button
              type="button"
              onClick={sendToForm}
              className="mt-7 w-full rounded-full bg-solar px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-solar-2"
            >
              Get this verified with a formal quote
            </button>
          </div>
        </div>

        {/* Tier ladder */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {tierOrder().map((key) => {
            const tier = TIERS[key];
            const active = key === result.tier;
            return (
              <div
                key={key}
                className={`rounded-xl border p-5 transition-colors ${
                  active
                    ? "border-solar bg-solar/5"
                    : "hairline bg-panel/30"
                }`}
              >
                <p
                  className={`text-sm font-semibold ${active ? "text-solar" : "text-mist"}`}
                >
                  {tier.label}
                </p>
                <p className="mt-1 text-xs text-dim-2">{tier.blurb}</p>
              </div>
            );
          })}
        </div>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-dim-2">
          These figures are indicative estimates produced from published
          assumptions, not a quotation. A firm price follows a site survey and a
          review of your actual bills and load profile.
        </p>
      </div>
    </section>
  );
}
