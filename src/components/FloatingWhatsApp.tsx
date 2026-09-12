import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowUp, X } from 'lucide-react';
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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
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

      {/* WhatsApp Floating Chat */}
      <div className="relative group flex items-center">
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="hidden sm:flex items-center gap-2 absolute right-16 px-3.5 py-1.5 rounded-xl border text-xs shadow-xl whitespace-nowrap z-40 bg-[#0a0f24] border-amber-500/30 text-amber-200"
            >
              <span className="font-bold">Chat with Strategist</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="text-amber-400/60 hover:text-amber-200 ml-1 p-0.5"
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
          }}
          href={`${COMPANY_DETAILS.whatsappBaseUrl}?text=Hello%20Widecraft%20Digital,%20I%20want%20to%20discuss%20a%20project`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-2xl shadow-emerald-500/40 flex items-center justify-center transition-all relative shrink-0 font-black"
        >
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-[#050714] animate-ping" />
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-[#050714]" />
          <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 text-slate-950" />
        </motion.a>
      </div>
    </div>
  );
};
