import { EstimatorPanel } from "@/components/estimator-panel";
import { Hero } from "@/components/hero";
import { QuoteForm } from "@/components/quote-form";
import { Process, Proof, Solutions } from "@/components/sections";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <EstimatorPanel />
        <Process />
        <Solutions />
        <Proof />
        <QuoteForm />
      </main>
      <SiteFooter />
    </>
  );
}
