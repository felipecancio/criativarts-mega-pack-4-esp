/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MockupGrid from "./components/MockupGrid";
import DesignGallery from "./components/DesignGallery";
import ClientTestimonials from "./components/ClientTestimonials";
import Benefits from "./components/Benefits";
import HowItWorks from "./components/HowItWorks";
import ExclusiveBonuses from "./components/ExclusiveBonuses";
import PricingCTA from "./components/PricingCTA";
import QualityProof from "./components/QualityProof";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

export default function App() {
  return (
    <div className="min-h-screen bg-black font-sans selection:bg-white selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <MockupGrid />
        <DesignGallery />
        <ClientTestimonials />
        <Benefits />
        <QualityProof />
        <HowItWorks />
        <ExclusiveBonuses />
        <PricingCTA />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
