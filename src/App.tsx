/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const MockupGrid = lazy(() => import("./components/MockupGrid"));

const DesignGallery = lazy(() => import("./components/DesignGallery"));
const ClientTestimonials = lazy(() => import("./components/ClientTestimonials"));
const Benefits = lazy(() => import("./components/Benefits"));
const ExclusiveBonuses = lazy(() => import("./components/ExclusiveBonuses"));
const PurchaseGuarantee = lazy(() => import("./components/PurchaseGuarantee"));
const PricingCTA = lazy(() => import("./components/PricingCTA"));
const FAQ = lazy(() => import("./components/FAQ"));
const Footer = lazy(() => import("./components/Footer"));
const WhatsAppFloat = lazy(() => import("./components/WhatsAppFloat"));

function SectionFallback({ minHeight = "1px" }: { minHeight?: string }) {
  return <div className="min-h-px" style={{ minHeight }} aria-hidden />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-black font-sans selection:bg-white selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback minHeight="520px" />}>
          <MockupGrid />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <DesignGallery />
          <ClientTestimonials />
          <Benefits />
          <ExclusiveBonuses />
          <PurchaseGuarantee />
          <PricingCTA />
          <FAQ />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <WhatsAppFloat />
      </Suspense>
    </div>
  );
}
