import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { CONTACT, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses and protects the information you submit through this website.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

/**
 * Starter privacy notice aligned to the Philippine Data Privacy Act of 2012
 * (RA 10173). It must be reviewed by the business before publication — the
 * retention periods, the named data protection officer and the contact address
 * are placeholders.
 */
export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-3xl px-5 py-20">
          <p className="text-xs font-semibold tracking-[0.2em] text-solar uppercase">
            Legal
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-dim-2">
            Last updated: {/* Set this when the notice is approved. */}draft
          </p>

          <div className="mt-10 space-y-8 text-sm leading-relaxed text-dim">
            <section>
              <h2 className="text-base font-semibold text-mist">
                1. Who we are
              </h2>
              <p className="mt-2">
                {SITE.legalName} provides solar design and installation services
                in Palawan, Philippines. We are the personal information
                controller for the data described in this notice. You can reach
                us at{" "}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-mist underline"
                >
                  {CONTACT.email}
                </a>{" "}
                or {CONTACT.phoneDisplay}.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-mist">
                2. What we collect
              </h2>
              <p className="mt-2">
                When you submit the quotation form we collect the name, contact
                number, email address and the description of your requirement
                that you provide. If you contact us by phone, WhatsApp or
                Messenger we receive whatever you choose to send us.
              </p>
              <p className="mt-2">
                Our hosting provider records standard technical information such
                as your IP address and browser type for security and
                reliability purposes.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-mist">
                3. Why we collect it
              </h2>
              <p className="mt-2">
                We use your information only to respond to your enquiry, prepare
                a quotation, carry out a site survey, deliver and support your
                system, and meet our legal and warranty obligations.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-mist">
                4. Sharing
              </h2>
              <p className="mt-2">
                We do not sell your personal information. We share it only with
                suppliers or contractors who need it to deliver your project,
                and only to the extent necessary.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-mist">
                5. Retention
              </h2>
              <p className="mt-2">
                Enquiries that do not become projects are kept for{" "}
                <span className="text-mist">
                  [retention period — to be confirmed]
                </span>
                . Project records are kept for the life of the warranty and for
                any period required by law.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-mist">
                6. Your rights
              </h2>
              <p className="mt-2">
                Under the Data Privacy Act of 2012 (RA 10173) you may ask to
                access, correct or erase the personal information we hold about
                you, object to its processing, or lodge a complaint with the
                National Privacy Commission. Contact us at{" "}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-mist underline"
                >
                  {CONTACT.email}
                </a>{" "}
                to exercise any of these rights.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-mist">
                7. Data protection officer
              </h2>
              <p className="mt-2">
                <span className="text-mist">
                  [Name and contact details — to be confirmed]
                </span>
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
