import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AREAS_SERVED, CONTACT, HARDWARE, SITE } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Industrial-grade solar hybrid systems for Palawan homes, resorts and industrial sites. Deye inverters, Jinko panels and LiFePO4 storage, engineered for a 4–6 year payback. Serving Puerto Princesa, El Nido, San Vicente, Coron and the islands between them.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default:
      "Solar Palawan Installation (El Nido, Coron, San Vicente, Puerto Princesa) | Amates Solutions",
    template: `%s | ${SITE.name}`,
  },
  description,
  applicationName: SITE.name,
  keywords: [
    "solar Palawan",
    "solar installation Puerto Princesa",
    "off-grid solar Philippines",
    "hybrid solar system Palawan",
    "solar El Nido",
    "solar Coron",
    "Deye inverter Philippines",
    "LiFePO4 battery Palawan",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: "High-resilience solar hybrid systems — Palawan",
    description,
    locale: SITE.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: "High-resilience solar hybrid systems — Palawan",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Solar Energy Contractor",
};

export const viewport: Viewport = {
  themeColor: "#070b14",
  colorScheme: "dark",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${SITE.url}/#business`,
      name: SITE.name,
      alternateName: "Amates Solar Solutions",
      url: SITE.url,
      description,
      email: CONTACT.email,
      telephone: CONTACT.phoneDisplay,
      priceRange: "₱₱₱",
      address: {
        "@type": "PostalAddress",
        addressLocality: CONTACT.addressLocality,
        addressRegion: CONTACT.addressRegion,
        addressCountry: CONTACT.addressCountry,
      },
      areaServed: AREAS_SERVED.map((name) => ({
        "@type": "City",
        name,
      })),
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          opens: "09:00",
          closes: "17:00",
        },
      ],
      knowsAbout: [
        "Hybrid solar systems",
        "Off-grid solar power",
        "Battery storage",
        "Solar system maintenance",
      ],
      brand: [
        { "@type": "Brand", name: HARDWARE.inverters },
        { "@type": "Brand", name: HARDWARE.panels },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      publisher: { "@id": `${SITE.url}/#business` },
      inLanguage: "en-PH",
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-PH"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <script
          type="application/ld+json"
          // The only untrusted-looking characters are escaped per Next.js guidance.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
