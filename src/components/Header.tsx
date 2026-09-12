import React, { useState } from 'react';
import { MessageSquare, PhoneCall, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_DETAILS } from '../data';
import { WidecraftLogo } from './WidecraftLogo';

interface HeaderProps {
  onOpenQuoteModal?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Why Widecraft', href: '#why-us' },
    { label: 'Gujarat Hub & SEO', href: '#local-seo' },
    { label: 'ROI Calculator', href: '#calculator' },
    { label: 'FAQs', href: '#faqs' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setMobileMenuOpen(false);
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-200 bg-[#060919] border-b border-amber-500/20 shadow-xl shadow-black/50"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo - Clean Classic Insignia */}
        <a
          href="#"
          id="nav-brand-logo"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center text-left focus:outline-none shrink-0"
        >
          <WidecraftLogo size="md" subtitle="Mehsana, Gujarat" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={`desktop-nav-${link.href}`}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="transition relative py-1 hover:-translate-y-0.5 text-slate-300 hover:text-amber-300 font-semibold tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions: Call CTA & WhatsApp Button */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Quick Call button */}
          <a
            href={`tel:+${COMPANY_DETAILS.phoneRaw}`}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-amber-500/30 bg-[#0c1224] text-amber-200 hover:bg-amber-500/10 hover:border-amber-400 transition shrink-0"
            title="Call Widecraft Digital"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="hidden md:inline">{COMPANY_DETAILS.phone}</span>
          </a>

          {/* Royal Gold Direct Quote CTA */}
          <motion.a
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            href={`${COMPANY_DETAILS.whatsappBaseUrl}?text=Hello%20Widecraft%20Digital,%20I%20want%20to%20discuss%20a%20project`}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-quote-cta"
            className="inline-flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-black text-slate-950 shadow-lg shadow-amber-500/25 transition shrink-0 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:brightness-110 active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950 shrink-0" />
            <span className="whitespace-nowrap">Free Quote</span>
          </motion.a>

          {/* Mobile Drawer Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-amber-500/30 bg-[#0c1224] text-amber-200 hover:bg-amber-500/10 transition flex items-center justify-center shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Dropdown Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden border-b overflow-hidden shadow-2xl bg-[#060919] border-amber-500/20 text-slate-100"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-4">
              {/* Navigation links */}
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <a
                    key={`mobile-nav-${link.href}`}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="px-3 py-2.5 rounded-xl text-sm font-semibold transition hover:bg-slate-800 text-slate-200 hover:text-amber-300"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Mobile Quick Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:+${COMPANY_DETAILS.phoneRaw}`}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold border bg-slate-900 border-amber-500/30 text-amber-200 hover:bg-amber-500/10 transition"
                >
                  <PhoneCall className="w-4 h-4 text-amber-400" />
                  <span>Call {COMPANY_DETAILS.phone}</span>
                </a>
                <a
                  href={`${COMPANY_DETAILS.whatsappBaseUrl}?text=Hello%20Widecraft%20Digital,%20I%20want%20to%20discuss%20a%20project`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 shadow-md shadow-amber-500/20 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
