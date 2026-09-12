import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowUp, X, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_DETAILS } from '../data';

export const FloatingWhatsApp: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Action Buttons Container */}
      <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="w-10 h-10 rounded-full border shadow-xl flex items-center justify-center transition bg-[#0a0f24] border-amber-500/30 text-amber-200 hover:bg-amber-500/10 hover:border-amber-400"
            >
              <ArrowUp className="w-4 h-4 text-amber-400" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Floating Direct Call Button */}
        <div className="relative group flex items-center">
          {/* Call Tooltip (Desktop) */}
          <div className="hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity duration-200 items-center gap-2 absolute right-16 px-3.5 py-1.5 rounded-xl border text-xs shadow-xl whitespace-nowrap z-40 bg-[#0a0f24] border-amber-500/40 text-amber-200 pointer-events-none">
            <span className="font-bold">Call Now: +91 77376 49405</span>
          </div>

          <motion.a
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            href={`tel:${COMPANY_DETAILS.phoneRaw}`}
            aria-label="Call Widecraft Digital Now"
            title="Call +91 77376 49405"
            className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 shadow-2xl shadow-amber-500/40 flex items-center justify-center transition-all relative shrink-0 font-black border border-yellow-200/50"
          >
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-[#050714] animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-[#050714]" />
            <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 fill-slate-950" />
          </motion.a>
        </div>

        {/* WhatsApp Floating Chat */}
        <div className="relative group flex items-center">
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="hidden sm:flex items-center gap-2 absolute right-16 px-3.5 py-1.5 rounded-xl border text-xs shadow-xl whitespace-nowrap z-40 bg-[#0a0f24] border-emerald-500/30 text-emerald-200"
              >
                <span className="font-bold">WhatsApp Chat</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTooltip(false);
                  }}
                  className="text-emerald-400/60 hover:text-emerald-200 ml-1 p-0.5"
                  aria-label="Dismiss tooltip"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.a
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.4,
            }}
            href={`${COMPANY_DETAILS.whatsappBaseUrl}?text=Hello%20Widecraft%20Digital,%20I%20want%20to%20discuss%20a%20project`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-2xl shadow-emerald-500/40 flex items-center justify-center transition-all relative shrink-0 font-black"
          >
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-[#050714] animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-[#050714]" />
            <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 text-slate-950 fill-slate-950" />
          </motion.a>
        </div>
      </div>

      {/* Mobile Sticky Quick-Action Bottom Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#050714] border-t border-slate-800 px-3 py-2 flex items-center gap-2 shadow-2xl">
        <a
          href={`tel:${COMPANY_DETAILS.phoneRaw}`}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 shadow-md active:scale-95 transition"
        >
          <PhoneCall className="w-4 h-4 fill-slate-950" />
          <span>Call Now</span>
        </a>
        <a
          href={`${COMPANY_DETAILS.whatsappBaseUrl}?text=Hello%20Widecraft%20Digital,%20I%20want%20to%20discuss%20a%20project`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md active:scale-95 transition"
        >
          <MessageSquare className="w-4 h-4 fill-slate-950" />
          <span>WhatsApp</span>
        </a>
      </div>
    </>
  );
};
