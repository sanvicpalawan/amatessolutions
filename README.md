# Amates Solutions — website

Proposal rebuild of the Amates Solutions marketing site (Puerto Princesa, Palawan —
residential, commercial, industrial and marine solar).

Built by MerQato Digital. Prepared for review with the client; not yet approved by them.

## Why this exists

The client's current site runs on Hostinger Website Builder (Zyro). That platform is
closed: no server-side logic, no webhooks, no integrations, so nothing on it can become
the entry point of an automated business process. Separately, the live site has defects
that are actively costing leads — the footer email link points at a third-party domain
(`solarisedge.com`) on every page, there is no phone number anywhere, and the contact
form has no field names, no `action` and no `method`.

This rebuild is a working demonstration that the front end can be rebuilt properly, and
that the sizing conversation can be automated rather than handled by hand.

## Stack

Next.js 16.4 (App Router, Turbopack) · React 19.3 · TypeScript 5 · Tailwind CSS 4 ·
Geist via `next/font` · deployed target: Vercel.

No database, no third-party service, no runtime dependency beyond Next and React. The
estimator is pure arithmetic; the form is client-side only.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run verify     # lint + typecheck + build
```

## Structure

```
app/
  layout.tsx        metadata, fonts, LocalBusiness + WebSite JSON-LD
  page.tsx          composes the single-page site
  privacy/page.tsx  privacy notice (RA 10173 starter — needs review)
  sitemap.ts        /sitemap.xml
  robots.ts         /robots.txt
components/
  site-chrome.tsx   header (with no-JS mobile disclosure) and footer
  hero.tsx          hero, positioning, four differentiators
  estimator-panel.tsx  the interactive sizing tool (client component)
  sections.tsx      process + energy-flow diagram, solutions, case study
  quote-form.tsx    validated quotation form (client component)
lib/
  site.ts           every business fact used on the site, in one place
  estimator.ts      the sizing and pricing model, with its assumptions
```

## The estimator

`lib/estimator.ts` is deliberately transparent. It is calibrated so that its output
agrees with the two claims the client already publishes on their own site:

- a 5 kWp / 5 kW / 5.12 kWh system is quoted against a ₱12,000–₱18,000 monthly bill, and
- "Engineered for 4–6 year ROI".

Both fall out of the assumptions in `ASSUMPTIONS`, which are surfaced in the UI and
adjustable by the visitor:

| Assumption | Default |
|---|---|
| Blended electricity tariff | ₱13.00 / kWh |
| Specific yield | 4.3 kWh per kWp per day |
| System efficiency | 80% |
| Share of bill offset by solar | 45% |
| Panel rating | 580 Wp |
| Battery per kWp | 1.2 kWh |
| Lifetime | 25 years |

Price bands per kWp are anchored to the client's own published figures (₱350–450k at
5 kWp, ₱550–700k at 8.5 kWp, ₱1.5M+ at 20 kWp) and interpolated between them.

**The offset factor is the assumption that matters.** Sizing to 100% of a bill oversizes
the system and destroys the payback figure. Confirm the real figure with the client.

## Before this goes live — required

1. **Phone number.** `CONTACT.phoneDisplay` / `phoneHref` in `lib/site.ts` are
   placeholders (`+63 917 000 0000`). The client publishes no phone number today.
2. **WhatsApp and Messenger links.** `CONTACT.whatsapp` and `CONTACT.messenger` are
   placeholders. Both need the client's real business accounts.
3. **The form does not submit anywhere.** It validates and shows a success state, then
   stops. Nothing is transmitted. Making it capture leads is the next piece of work —
   see "Next" below.
4. **Privacy notice.** `app/privacy/page.tsx` is a starter aligned to RA 10173. The
   retention period and the data protection officer are placeholders and the whole
   notice needs the client's review.
5. **Claims to confirm.** The Linapacan case study (7.3 kWp, 2-day restoration), the
   25-year panel performance warranty and the "we use these systems ourselves" statement
   are taken from the client's own published copy. Confirm they are still accurate.
6. **Testimonial.** The live site carries a customer testimonial; it was not copied here
   verbatim. Add it back with the client's exact words and consent.
7. **Analytics.** Deliberately absent. Add GA4 and the Meta Pixel once the client has a
   measurement plan — the current site has neither, and its cookie banner therefore
   collects consent for nothing.

## Next: what the form becomes

The rebuild shows the capture problem is solvable. The automation work is:

1. Form posts to an owned store, with spam protection and a real acknowledgement email.
2. Each submission becomes a structured lead record (site, load profile, tariff, stage).
3. Quotation generation with the real tariff and 12% VAT applied.
4. A follow-up cadence, so no enquiry goes cold.
5. Job tracking across survey → design → install → commissioning, plus warranty and
   monitoring renewals.

## Status

Built 2026-10-17. Front end complete and verified (lint, typecheck, production build).
Not deployed. Not yet shown to the client.
