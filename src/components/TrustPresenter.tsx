import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, CheckCircle2, Star, MessageSquare, ChevronRight, Sparkles, UserCheck, Maximize2, X } from 'lucide-react';
import { COMPANY_DETAILS } from '../data';
import gestureImg from '../assets/images/presenter_gesture.png';
import girlImg from '../assets/images/presenter_girl.png';

export const TrustPresenter: React.FC = () => {
  const [presenterStyle, setPresenterStyle] = useState<'gesture' | 'portrait'>('gesture');
  const [imgError, setImgError] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  const currentImgSrc = presenterStyle === 'gesture' ? gestureImg : girlImg;
  const whatsappUrl = `https://wa.me/917737649405?text=${encodeURIComponent('Hello Widecraft, I saw your genuine agency guarantee and want to verify and discuss a project with 7737649405')}`;

  return (
    <div className="relative inline-block my-3 sm:my-5 z-20 w-full max-w-2xl px-2">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.2 }}
        className="relative flex flex-col md:flex-row items-center md:items-end gap-3 sm:gap-5 p-4 sm:p-5 rounded-3xl border bg-gradient-to-r from-[#0b122c] via-[#0e1738] to-[#090f26] border-amber-500/40 shadow-2xl shadow-black/80 mx-auto overflow-visible"
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
          <div
            className="relative cursor-pointer group"
            onClick={() => setIsPhotoModalOpen(true)}
            title="Click to view full photo"
          >
            {!imgError ? (
              <div className="relative">
                <img
                  src={currentImgSrc}
                  alt="Widecraft Genuine & Reliable Guide"
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className={`object-contain transition-all duration-300 group-hover:scale-105 ${
                    presenterStyle === 'gesture'
                      ? 'h-40 sm:h-48 md:h-52 drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] drop-shadow-[0_0_18px_rgba(245,158,11,0.35)]'
                      : 'h-36 sm:h-44 md:h-48 drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] drop-shadow-[0_0_18px_rgba(245,158,11,0.35)]'
                  }`}
                />
                <span className="absolute bottom-1 right-1 bg-black/70 backdrop-blur-md text-amber-300 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-[10px] flex items-center gap-1 border border-amber-500/30">
                  <Maximize2 className="w-3 h-3" />
                </span>
              </div>
            ) : (
              <div className="h-40 sm:h-48 md:h-52 w-32 flex flex-col items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 p-3 text-center">
                <UserCheck className="w-12 h-12 text-amber-400 mb-2" />
                <span className="text-[11px] font-bold text-amber-300">Widecraft Verified</span>
              </div>
            )}

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

      {/* High-Resolution Photo Lightbox Modal */}
      <AnimatePresence>
        {isPhotoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPhotoModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-[#0a0f28] border border-amber-500/40 rounded-3xl p-6 shadow-2xl overflow-hidden text-center"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsPhotoModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo Display */}
              <div className="flex justify-center py-4">
                <img
                  src={currentImgSrc}
                  alt="Widecraft Brand Ambassador"
                  className="max-h-80 object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] drop-shadow-[0_0_25px_rgba(245,158,11,0.4)]"
                />
              </div>

              {/* Caption & Guarantee */}
              <div className="mt-2 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>100% Verified Widecraft Digital Official</span>
                </div>
                <h4 className="text-lg font-bold text-white">Widecraft Trust & Reliability Guide</h4>
                <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                  Registered in Mehsana, Gujarat. Fast delivery, transparent pricing, and 24/7 dedicated support on WhatsApp.
                </p>

                <div className="pt-3 flex justify-center gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-300 hover:brightness-110 transition shadow-lg"
                  >
                    Direct Chat on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setPresenterStyle((s) => (s === 'gesture' ? 'portrait' : 'gesture'));
                    }}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-amber-300 bg-[#0c1334] border border-amber-500/30 hover:bg-amber-500/10 transition"
                  >
                    Change Pose
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
