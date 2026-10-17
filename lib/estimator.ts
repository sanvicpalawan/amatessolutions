/**
 * Solar sizing and pricing model.
 *
 * This is a deliberately transparent estimate, not a quotation. The model is
 * calibrated so that its output agrees with the two things Amates Solutions
 * already publishes on its own site:
 *
 *   1. Sizing — a 5 kWp / 5 kW / 5.12 kWh system is quoted for a
 *      ₱12,000 – ₱18,000 monthly bill.
 *   2. Return — "Engineered for 4–6 year ROI".
 *
 * Both claims fall out of the assumptions below, which are exposed in the UI
 * so a technical buyer can inspect and adjust them. Confirm the tariff,
 * yield and offset figures with the client before this is used in anger.
 */

export const ASSUMPTIONS = {
  /** Blended Palawan electricity tariff, ₱ per kWh. CONFIRM per co-op. */
  tariffPhpPerKwh: 13,

  /** Specific yield: kWh generated per kWp of panels per day, in Palawan. */
  specificYieldKwhPerKwpPerDay: 4.3,

  /** System losses (heat, soiling, wiring, inverter) as a fraction. */
  performanceRatio: 0.8,

  /**
   * Share of the monthly bill the array is sized to displace. This is the one
   * assumption most people get wrong — sizing to 100% of the bill oversizes
   * the system and wrecks the payback figure.
   */
  offsetFactor: 0.45,

  /** Nameplate rating of the panel used for the panel count. */
  panelWattPeak: 580,

  /** Roof area needed per kWp, square metres (inter-row spacing included). */
  roofAreaPerKwp: 5,

  /** Battery capacity per kWp of array, kWh. Matches the client's own ratios. */
  batteryKwhPerKwp: 1.2,

  /** Period used for lifetime savings. */
  lifetimeYears: 25,
} as const;

const DAYS_PER_MONTH = 30.44;

/** kWh each installed kWp delivers per month at the assumptions above. */
export const MONTHLY_KWH_PER_KWP =
  ASSUMPTIONS.specificYieldKwhPerKwpPerDay *
  ASSUMPTIONS.performanceRatio *
  DAYS_PER_MONTH;

/**
 * Installed ₱ per kWp, anchored to the client's own published price bands:
 * 5 kWp → ₱350k–450k · 8.5 kWp → ₱550k–700k · 20 kWp → ₱1.5M+.
 * Interpolated linearly between anchors, clamped at the ends.
 */
const RATE_ANCHORS = [
  { kwp: 4, low: 74_000, high: 96_000 },
  { kwp: 5, low: 70_000, high: 90_000 },
  { kwp: 8.5, low: 64_706, high: 82_353 },
  { kwp: 20, low: 75_000, high: 85_000 },
  { kwp: 60, low: 70_000, high: 80_000 },
] as const;

export type TierKey = "standard" | "professional" | "infrastructure";

export const TIERS: Record<
  TierKey,
  { label: string; blurb: string; minKwp: number }
> = {
  standard: {
    label: "Standard",
    blurb: "Homes and small offices",
    minKwp: 0,
  },
  professional: {
    label: "Professional",
    blurb: "Small to mid-sized business",
    minKwp: 6,
  },
  infrastructure: {
    label: "Infrastructure",
    blurb: "Industrial, marine and multi-site",
    minKwp: 12,
  },
};

export type Estimate = {
  monthlyBill: number;
  kwp: number;
  inverterKw: number;
  batteryKwh: number;
  panelCount: number;
  roofAreaM2: number;
  tier: TierKey;
  tierLabel: string;
  investmentLow: number;
  investmentHigh: number;
  monthlySavings: number;
  annualSavings: number;
  paybackYears: number;
  lifetimeSavings: number;
  offsetKwhPerMonth: number;
};

export type EstimateOptions = {
  tariffPhpPerKwh?: number;
  offsetFactor?: number;
};

function rateFor(kwp: number): { low: number; high: number } {
  const first = RATE_ANCHORS[0];
  const last = RATE_ANCHORS[RATE_ANCHORS.length - 1];
  if (kwp <= first.kwp) return { low: first.low, high: first.high };
  if (kwp >= last.kwp) return { low: last.low, high: last.high };

  for (let i = 0; i < RATE_ANCHORS.length - 1; i += 1) {
    const a = RATE_ANCHORS[i];
    const b = RATE_ANCHORS[i + 1];
    if (kwp >= a.kwp && kwp <= b.kwp) {
      const t = (kwp - a.kwp) / (b.kwp - a.kwp);
      return {
        low: a.low + t * (b.low - a.low),
        high: a.high + t * (b.high - a.high),
      };
    }
  }
  return { low: first.low, high: first.high };
}

function tierFor(kwp: number): TierKey {
  if (kwp >= TIERS.infrastructure.minKwp) return "infrastructure";
  if (kwp >= TIERS.professional.minKwp) return "professional";
  return "standard";
}

export function estimate(
  monthlyBill: number,
  options: EstimateOptions = {},
): Estimate {
  const tariff = options.tariffPhpPerKwh ?? ASSUMPTIONS.tariffPhpPerKwh;
  const offset = options.offsetFactor ?? ASSUMPTIONS.offsetFactor;

  const bill = Math.max(0, monthlyBill);
  const offsetKwhPerMonth = (bill * offset) / tariff;

  const rawKwp = offsetKwhPerMonth / MONTHLY_KWH_PER_KWP;
  const kwp = Math.min(120, Math.max(3, Math.round(rawKwp * 2) / 2));

  const { low, high } = rateFor(kwp);
  const investmentLow = Math.round((kwp * low) / 5_000) * 5_000;
  const investmentHigh = Math.round((kwp * high) / 5_000) * 5_000;
  const investmentMid = (investmentLow + investmentHigh) / 2;

  // Displaced energy valued at the tariff — simplifies to bill × offset.
  const monthlySavings = offsetKwhPerMonth * tariff;
  const annualSavings = monthlySavings * 12;

  const tier = tierFor(kwp);

  return {
    monthlyBill: bill,
    kwp,
    inverterKw: Math.max(3, Math.round(kwp)),
    batteryKwh: Math.round(kwp * ASSUMPTIONS.batteryKwhPerKwp * 20) / 20,
    panelCount: Math.ceil((kwp * 1000) / ASSUMPTIONS.panelWattPeak),
    roofAreaM2: Math.round(kwp * ASSUMPTIONS.roofAreaPerKwp),
    tier,
    tierLabel: TIERS[tier].label,
    investmentLow,
    investmentHigh,
    monthlySavings,
    annualSavings,
    paybackYears: annualSavings > 0 ? investmentMid / annualSavings : 0,
    lifetimeSavings: Math.max(
      0,
      annualSavings * ASSUMPTIONS.lifetimeYears - investmentMid,
    ),
    offsetKwhPerMonth,
  };
}

const peso = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 0,
});

export const formatPeso = (value: number) => peso.format(value);

/** Compact ₱ for the price bands — ₱350k, ₱1.5M. */
export function formatPesoShort(value: number): string {
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    return `₱${m >= 10 ? Math.round(m) : m.toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (value >= 1_000) return `₱${Math.round(value / 1_000)}k`;
  return peso.format(value);
}
