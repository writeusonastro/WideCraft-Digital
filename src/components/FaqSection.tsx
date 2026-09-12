import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS_DATA, COMPANY_DETAILS } from '../data';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#050714] via-[#070b1e] to-[#050714]" id="faqs">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border bg-[#0c1228] border-amber-500/30 text-amber-300"
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" /> Frequently Asked Questions
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white"
          >
            Common Questions &{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
              Transparent Answers
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base mt-2 max-w-xl mx-auto text-slate-300"
          >
            Everything you need to know about our workflow, ad management credentials, and project timelines.
          </motion.p>
        </div>

        {/* Animated Accordion List */}
        <div className="space-y-3.5">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={`faq-item-${idx}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="rounded-2xl border overflow-hidden transition-colors bg-[#0a0f24]/90 border-amber-500/20 shadow-lg hover:border-amber-400/50 backdrop-blur-md"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 transition text-white hover:text-amber-300"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'rotate-180 text-amber-400'
                        : 'text-slate-500'
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-sm leading-relaxed border-t border-amber-500/15 text-slate-300">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA for custom questions */}
        <div className="mt-12 text-center">
          <p className="text-sm mb-3 text-slate-400">
            Have a custom requirement or specialized ad query?
          </p>
          <a
            href={`${COMPANY_DETAILS.whatsappBaseUrl}?text=Hello%20Widecraft%20Digital,%20I%20have%20a%20specific%20question`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold border transition bg-[#0c1228] border-amber-500/30 text-amber-200 hover:bg-amber-500/10 hover:border-amber-400"
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
            <span>Chat Directly With Our Strategists</span>
          </a>
        </div>
      </div>
    </section>
  );
};
