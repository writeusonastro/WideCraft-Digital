/**
 * Widecraft Digital - Web, Apps & Performance Marketing
 * Mehsana, Gujarat
 * Royal Theme Redesign
 */
import React, { useState, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MarqueeStrip } from './components/MarqueeStrip';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ScrollProgress } from './components/ScrollProgress';

// Lazy-load below-the-fold modules for blazing-fast initial paint
const Services = lazy(() => import('./components/Services').then((m) => ({ default: m.Services })));
const WhyUs = lazy(() => import('./components/WhyUs').then((m) => ({ default: m.WhyUs })));
const LocalSeoHub = lazy(() => import('./components/LocalSeoHub').then((m) => ({ default: m.LocalSeoHub })));
const Calculator = lazy(() => import('./components/Calculator').then((m) => ({ default: m.Calculator })));
const ContactSection = lazy(() => import('./components/ContactSection').then((m) => ({ default: m.ContactSection })));
const FaqSection = lazy(() => import('./components/FaqSection').then((m) => ({ default: m.FaqSection })));
const Footer = lazy(() => import('./components/Footer').then((m) => ({ default: m.Footer })));

function SectionFallback() {
  return (
    <div className="py-20 flex items-center justify-center text-amber-400/40">
      <div className="w-6 h-6 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
    </div>
  );
}

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

        <Suspense fallback={<SectionFallback />}>
          <Services onSelectService={handleSelectService} />
          <WhyUs />
          <LocalSeoHub onKeywordClick={handleKeywordSelect} />
          <Calculator />
          <ContactSection
            selectedService={selectedService}
            onServiceChange={setSelectedService}
          />
          <FaqSection />
          <Footer />
        </Suspense>
      </main>

      {/* Floating Call & WhatsApp Action Buttons */}
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return <MainApp />;
}
