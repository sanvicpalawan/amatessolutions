/**
 * Tiny external store carrying the estimator result to the quotation form.
 *
 * Two components need to share one value but live in different parts of the
 * page, so neither can own it outright. `useSyncExternalStore` is the correct
 * primitive here: it reads from an external source and subscribes for updates,
 * which is exactly what this is. It also avoids a hydration mismatch, because
 * the server snapshot is always empty.
 *
 * Deliberately not persisted: a stale estimate silently attached to a new
 * enquiry would be worse than no prefill at all.
 */

export type EstimateSummary = {
  /** Monotonic id, so the form can dismiss one prefill without blocking the next. */
  id: number;
  kwp: number;
  tier: string;
  investmentLow: number;
  investmentHigh: number;
  monthlyBill: number;
};

let current: EstimateSummary | null = null;
let nextId = 1;
const listeners = new Set<() => void>();

export function publishEstimate(value: Omit<EstimateSummary, "id">): void {
  current = { ...value, id: nextId };
  nextId += 1;
  for (const listener of listeners) listener();
}

export function subscribeEstimate(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getEstimateSnapshot(): EstimateSummary | null {
  return current;
}

export function getEstimateServerSnapshot(): EstimateSummary | null {
  return null;
}
