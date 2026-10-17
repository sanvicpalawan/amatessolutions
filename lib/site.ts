/**
 * Single source of truth for business facts shown on the site.
 *
 * Everything here was taken from the client's existing public site
 * (amatessolutions.com) unless marked PLACEHOLDER.
 *
 * ⚠️  BEFORE PUBLISHING — confirm each PLACEHOLDER value with the client.
 *     The phone number, WhatsApp and Messenger links do NOT exist on their
 *     current site, and their footer email link points at a third-party
 *     domain (solarisedge.com). These are the gaps this rebuild closes.
 */

export const SITE = {
  name: "Amates Solutions",
  legalName: "Amates Solutions",
  tagline: "High-resilience solar hybrid systems — Palawan",
  url: "https://amatessolutions.com",
  locale: "en_PH",
  /**
   * Static pages are prerendered, so any date rendered into the HTML is frozen
   * at build time. Next.js 16 Cache Components rejects `new Date()` during
   * prerender for exactly that reason — keep these as constants and bump them
   * when the content changes.
   */
  copyrightYear: 2026,
  lastUpdated: "2026-10-17",
} as const;

export const CONTACT = {
  email: "hello@amatessolutions.com",

  /** PLACEHOLDER — the client publishes no phone number anywhere today. */
  phoneDisplay: "+63 917 000 0000",
  phoneHref: "tel:+639170000000",

  /** PLACEHOLDER — confirm the business WhatsApp number. */
  whatsapp: "https://wa.me/639170000000",

  /** PLACEHOLDER — confirm the official Facebook Page handle. */
  messenger: "https://m.me/amatessolutions",

  addressLocality: "Puerto Princesa",
  addressRegion: "Palawan",
  addressCountry: "PH",

  hours: "Mon – Fri, 9:00 AM – 5:00 PM",
  emergencyNote: "Typhoon and outage call-outs — emergency line answered 24/7",
} as const;

export const AREAS_SERVED = [
  "Puerto Princesa",
  "El Nido",
  "San Vicente",
  "Coron",
  "Linapacan",
] as const;

export const HARDWARE = {
  inverters: "Deye",
  panels: "Jinko",
  battery: "LiFePO4 only",
} as const;

export const NAV = [
  { href: "#estimator", label: "Estimate" },
  { href: "#process", label: "How it works" },
  { href: "#solutions", label: "Solutions" },
  { href: "#proof", label: "Projects" },
  { href: "#quote", label: "Contact" },
] as const;
