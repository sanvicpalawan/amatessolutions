import { AREAS_SERVED, CONTACT, HARDWARE, NAV, SITE } from "@/lib/site";

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="h-7 w-7 shrink-0"
        fill="none"
      >
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          rx="7"
          stroke="var(--color-line)"
        />
        <path
          d="M6 21l6-10 5 8 3-4 6 6"
          stroke="var(--color-solar)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="23" cy="9" r="3" fill="var(--color-solar)" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-[0.14em] text-mist">
          AMATES
        </span>
        {!compact && (
          <span className="text-[10px] font-medium tracking-[0.3em] text-dim-2">
            SOLUTIONS
          </span>
        )}
      </span>
    </span>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4" fill="none">
      <path
        d="M4 3h3l1.5 4-2 1.5a10 10 0 0 0 5 5L13 11.5l4 1.5v3a1 1 0 0 1-1 1A13 13 0 0 1 3 4a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b hairline bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5">
        <a href="#top" className="shrink-0" aria-label={`${SITE.name} home`}>
          <Wordmark />
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm text-dim">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="transition-colors hover:text-mist"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={CONTACT.phoneHref}
            className="hidden items-center gap-2 rounded-full border hairline px-3.5 py-2 text-sm text-mist transition-colors hover:border-solar hover:text-solar sm:inline-flex"
          >
            <PhoneIcon />
            {CONTACT.phoneDisplay}
          </a>
          <a
            href="#quote"
            className="rounded-full bg-solar px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-solar-2"
          >
            Free quote
          </a>
        </div>
      </div>

      {/* No-JS mobile disclosure for the section links. */}
      <details className="group border-t hairline md:hidden">
        <summary className="mx-auto flex w-full max-w-6xl cursor-pointer list-none items-center justify-between px-5 py-2.5 text-sm text-dim marker:content-none">
          Jump to a section
          <span
            aria-hidden="true"
            className="transition-transform group-open:rotate-180"
          >
            ▾
          </span>
        </summary>
        <ul className="mx-auto w-full max-w-6xl px-5 pb-3 text-sm">
          {NAV.map((item) => (
            <li key={item.href} className="border-t hairline">
              <a
                href={item.href}
                className="block py-2.5 text-dim transition-colors hover:text-mist"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t hairline bg-ink-2">
      <div className="mx-auto w-full max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-dim">
              Industrial-grade solar hybrid systems for Palawan homes, resorts
              and industrial sites. {HARDWARE.inverters} inverters,{" "}
              {HARDWARE.panels} panels, {HARDWARE.battery}.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold tracking-[0.2em] text-dim-2 uppercase">
              Contact
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="flex items-center gap-2 text-mist transition-colors hover:text-solar"
                >
                  <PhoneIcon />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-mist transition-colors hover:text-solar"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.whatsapp}
                  className="text-mist transition-colors hover:text-solar"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.messenger}
                  className="text-mist transition-colors hover:text-solar"
                >
                  Messenger
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-dim-2">
              {CONTACT.hours}
              <br />
              {CONTACT.emergencyNote}
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold tracking-[0.2em] text-dim-2 uppercase">
              Areas served
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-dim">
              {AREAS_SERVED.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-dim-2">
              {CONTACT.addressLocality}, {CONTACT.addressRegion},{" "}
              {CONTACT.addressCountry}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t hairline pt-6 text-xs text-dim-2 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {SITE.copyrightYear} {SITE.legalName}. All rights reserved.
          </p>
          <p>
            Estimates on this site are indicative only and are not a quotation.
          </p>
        </div>
      </div>
    </footer>
  );
}
