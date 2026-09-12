/**
 * Widecraft Digital - Web, Apps & Performance Marketing
 * Mehsana, Gujarat
 * Royal Theme Redesign
 */
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MarqueeStrip } from './components/MarqueeStrip';
import { Services } from './components/Services';
import { WhyUs } from './components/WhyUs';
import { LocalSeoHub } from './components/LocalSeoHub';
import { Calculator } from './components/Calculator';
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ScrollProgress } from './components/ScrollProgress';

function MainApp() {
  const [selectedService, setSelectedService] = useState<string>('Website Development');

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName);
  };

  const handleKeywordSelect = (keyword: string) => {
    if (keyword.toLowerCase().includes('seo') || keyword.toLowerCase().includes('google my business') || keyword.toLowerCase().includes('maps')) {
      setSelectedService('SEO Optimization Expert');
    } else if (keyword.toLowerCase().includes('website') || keyword.toLowerCase().includes('web')) {
      setSelectedService('Website Development');
    } else if (keyword.toLowerCase().includes('google ads') || keyword.toLowerCase().includes('ppc')) {
      setSelectedService('Google Ads Management');
    } else if (keyword.toLowerCase().includes('meta') || keyword.toLowerCase().includes('social') || keyword.toLowerCase().includes('instagram')) {
      setSelectedService('Social Media Ads');
    } else if (keyword.toLowerCase().includes('app')) {
      setSelectedService('Mobile App Development');
    } else {
      setSelectedService('SEO Optimization Expert');
    }
  };

  return (
    <div className="min-h-screen font-sans antialiased selection:bg-amber-400 selection:text-slate-950 bg-[#050714] text-slate-100">
      {/* Scroll-Driven Gradient Top Progress Bar */}
      <ScrollProgress />

      {/* Navigation Header */}
      <Header />

      {/* Main Content */}
      <main id="main-content" className="relative">
        <Hero />
        <MarqueeStrip />
        <Services onSelectService={handleSelectService} />
        <WhyUs />
        <LocalSeoHub onKeywordClick={handleKeywordSelect} />
        <Calculator />
        <ContactSection
          selectedService={selectedService}
          onServiceChange={setSelectedService}
        />
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Button */}
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return <MainApp />;
}
