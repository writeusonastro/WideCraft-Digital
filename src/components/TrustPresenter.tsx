import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, CheckCircle2, Star, MessageSquare, ChevronRight, Sparkles } from 'lucide-react';
import { COMPANY_DETAILS } from '../data';

export const TrustPresenter: React.FC = () => {
  const [presenterStyle, setPresenterStyle] = useState<'gesture' | 'portrait'>('gesture');

  const presenterImg = presenterStyle === 'gesture' ? '/presenter_gesture.png' : '/presenter_girl.png';
  const whatsappUrl = `https://wa.me/917737649405?text=${encodeURIComponent('Hello Widecraft, I saw your genuine agency guarantee and want to verify and discuss a project with 7737649405')}`;

  return (
    <div className="relative inline-block my-3 sm:my-5 z-20 w-full max-w-2xl px-2">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.2 }}
        className="relative flex flex-col md:flex-row items-center md:items-end gap-3 sm:gap-5 p-4 sm:p-5 rounded-3xl border bg-gradient-to-r from-[#0b122c]/95 via-[#0e1738]/95 to-[#090f26]/95 border-amber-500/40 shadow-2xl shadow-black/80 backdrop-blur-xl mx-auto overflow-visible"
      >
        {/* Left/Front: Transparent PNG Presenter Girl emerging from side */}
        <motion.div
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative shrink-0 flex flex-col items-center select-none"
        >
          {/* Golden Ambient Glow behind Transparent PNG Cutout */}
          <div className="absolute inset-0 -top-4 rounded-full bg-gradient-to-t from-amber-500/25 via-yellow-400/20 to-transparent blur-xl pointer-events-none" />

          {/* Transparent PNG Cutout Image (No solid box/background) */}
          <div className="relative">
            <img
              src={presenterImg}
              alt="Widecraft Genuine & Reliable Guide"
              className={`object-contain transition-all duration-300 ${
                presenterStyle === 'gesture'
                  ? 'h-40 sm:h-48 md:h-52 drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] drop-shadow-[0_0_18px_rgba(245,158,11,0.35)]'
                  : 'h-36 sm:h-44 md:h-48 drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] drop-shadow-[0_0_18px_rgba(245,158,11,0.35)]'
              }`}
            />

            {/* Animated Gesturing Pointer Indicator */}
            <motion.div
              animate={{
                x: [0, -6, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -left-2 sm:-left-3 top-1/3 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-black shadow-xl flex items-center gap-1 border border-white/60"
            >
              <span className="text-sm">👉</span>
              <span className="tracking-wide">Genuine!</span>
            </motion.div>
          </div>

          {/* Subtle Presenter Switcher Pill */}
          <button
            type="button"
            onClick={() => setPresenterStyle(s => s === 'gesture' ? 'portrait' : 'gesture')}
            className="mt-1 text-[10px] text-amber-400/80 hover:text-amber-300 underline underline-offset-2 transition cursor-pointer"
            title="Toggle presenter style"
          >
            {presenterStyle === 'gesture' ? 'Switch photo ↺' : 'Switch pose ↺'}
          </button>
        </motion.div>

        {/* Right: Speech Bubble & Genuine Brand Guarantee */}
        <div className="text-left space-y-2 flex-1 pr-2 sm:pr-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              100% Genuine & Reliable
            </span>
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Verified Agency Guarantee</span>
            </span>
          </div>

          {/* Endorsement Statement */}
          <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
            "We guarantee <span className="text-amber-300 font-bold underline decoration-amber-400/50 decoration-2">100% genuine transparency, zero hidden charges & real business ROI</span>. Your website or app will be built with verified industry standards!"
          </p>

          {/* Trust Credentials Badges */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1 text-[11px] text-slate-300">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-950/40 px-2 py-0.5 rounded-lg border border-emerald-800/40">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Gujarat Registered (Mehsana HQ)</span>
            </span>
            <span className="inline-flex items-center gap-1 text-amber-300 font-semibold bg-amber-950/40 px-2 py-0.5 rounded-lg border border-amber-800/40">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>WhatsApp: 7737649405</span>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 hover:brightness-110 shadow-lg shadow-amber-500/25 flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4 text-slate-950 shrink-0" />
              <span>Verify on WhatsApp (7737649405)</span>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            </motion.a>

            <span className="text-[11px] text-slate-400 flex items-center justify-center sm:justify-start gap-1">
              <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
              <span>50+ Live Projects Delivered</span>
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
