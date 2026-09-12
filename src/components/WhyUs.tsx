import React, { useRef, useState } from 'react';
import { Zap, Target, MapPin, Navigation, Phone, Clock, ExternalLink, ShieldCheck, Award, Sparkles, Crown } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { COMPANY_DETAILS } from '../data';
import { WidecraftLogo } from './WidecraftLogo';

export const WhyUs: React.FC = () => {
  const hqCardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const hqX = useMotionValue(0);
  const hqY = useMotionValue(0);
  const springConfig = { damping: 22, stiffness: 220 };
  const hqRotateX = useSpring(useTransform(hqY, [-0.5, 0.5], [8, -8]), springConfig);
  const hqRotateY = useSpring(useTransform(hqX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleHqMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hqCardRef.current) return;
    const rect = hqCardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    hqX.set(xPct);
    hqY.set(yPct);
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleHqMouseLeave = () => {
    hqX.set(0);
    hqY.set(0);
  };
  return (
    <section id="why-us" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#050714] via-[#070b1e] to-[#050714]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Why Choose Us */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border bg-[#0c1228] border-amber-500/30 text-amber-300"
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" /> Measurable Growth & Strategy
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] mb-6 text-white"
            >
              We Don't Just Build Websites, We Engineer{' '}
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
                Revenue Growth
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg leading-relaxed mb-8 text-slate-300"
            >
              Many agencies hand over a basic template and vanish. At{' '}
              <strong className="text-white font-bold">Widecraft Digital</strong>,
              every line of code, UX micro-interaction, and ad rupee is structured around measurable conversions, real inquiries,
              and growing your business balance sheet.
            </motion.p>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
                whileHover={{ x: 6, y: -2, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
                className="flex items-start gap-4 p-5 rounded-2xl border transition-all bg-[#0a0f24]/90 border-amber-500/20 shadow-md hover:border-amber-400/60 hover:shadow-xl hover:shadow-amber-500/10 group backdrop-blur-md"
              >
                <div className="p-3 rounded-xl bg-[#060918] border border-amber-500/30 text-amber-400 shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                    Superfast & Lightweight Code
                  </h4>
                  <p className="text-sm mt-1 leading-relaxed text-slate-300">
                    Optimized asset delivery ensuring your site loads in under 2 seconds across cellular networks, drastically lowering bounce rates.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
                whileHover={{ x: 6, y: -2, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
                className="flex items-start gap-4 p-5 rounded-2xl border transition-all bg-[#0a0f24]/90 border-amber-500/20 shadow-md hover:border-amber-400/60 hover:shadow-xl hover:shadow-amber-500/10 group backdrop-blur-md"
              >
                <div className="p-3 rounded-xl bg-[#060918] border border-amber-500/30 text-amber-400 shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                    Transparent Ad Spend & Analytics
                  </h4>
                  <p className="text-sm mt-1 leading-relaxed text-slate-300">
                    Clear reporting on ad clicks, conversions, and cost per lead so you always know your exact return down to the rupee.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 }}
                whileHover={{ x: 6, y: -2, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
                className="flex items-start gap-4 p-5 rounded-2xl border transition-all bg-[#0a0f24]/90 border-amber-500/20 shadow-md hover:border-amber-400/60 hover:shadow-xl hover:shadow-amber-500/10 group backdrop-blur-md"
              >
                <div className="p-3 rounded-xl bg-[#060918] border border-amber-500/30 text-amber-400 shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                    End-to-End Ownership
                  </h4>
                  <p className="text-sm mt-1 leading-relaxed text-slate-300">
                    We manage the entire pipeline: domain DNS, high-converting ad copy, landing pages, CRM connection, and continuous conversion rate optimization.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Gujarat Headquarters Location Card with 3D Motion */}
          <div style={{ perspective: 1000 }}>
            <motion.div
              ref={hqCardRef}
              onMouseMove={handleHqMouseMove}
              onMouseLeave={handleHqMouseLeave}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                rotateX: hqRotateX,
                rotateY: hqRotateY,
                transformStyle: 'preserve-3d',
              }}
              className="p-6 sm:p-8 rounded-3xl border relative shadow-2xl overflow-hidden bg-[#0a0f24]/95 border-amber-500/25 text-white backdrop-blur-xl hover:border-amber-400/50 transition-colors"
            >
              {/* Dynamic 3D Cursor Spotlight Glow */}
              <div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{
                  background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.15), transparent 70%)`,
                }}
              />

              {/* Header Badge */}
              <div 
                style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 border-b border-amber-500/20 relative z-10"
              >
              <div className="flex items-center gap-3">
                <WidecraftLogo size="md" showText={false} />
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-white">
                    Local Presence, Global Standards
                  </h3>
                  <p className="text-xs text-amber-400 font-semibold">HQ: Mehsana, Gujarat, India</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Open 9am - 8pm
              </span>
            </div>

            {/* Address Details */}
            <div className="py-6 space-y-4 text-sm">
              <div className="p-4 rounded-xl border bg-[#060918] border-amber-500/20">
                <div className="text-xs text-amber-300/80 font-medium mb-1">Physical Office Address:</div>
                <div className="font-semibold leading-relaxed text-slate-200">
                  {COMPANY_DETAILS.address}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border bg-[#060918] border-amber-500/20">
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold mb-1">
                    <Clock className="w-3.5 h-3.5" /> Working Hours
                  </div>
                  <div className="text-xs text-slate-300">
                    {COMPANY_DETAILS.hours}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border bg-[#060918] border-amber-500/20">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold mb-1">
                    <Award className="w-3.5 h-3.5" /> Service Radius
                  </div>
                  <div className="text-xs text-slate-300">
                    Mehsana, Ahmedabad, Pan-India
                  </div>
                </div>
              </div>
            </div>

            {/* Map Direction Buttons */}
            <div className="pt-4 border-t border-amber-500/20 flex flex-col sm:flex-row gap-3">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={COMPANY_DETAILS.mapsQueryUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="get-directions-btn"
                className="w-full py-3.5 rounded-xl text-xs font-black text-slate-950 transition flex items-center justify-center gap-2 shadow-lg bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:brightness-110 shadow-amber-500/25"
              >
                <Navigation className="w-4 h-4 text-slate-950" />
                <span>Get Google Maps Directions</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
              </motion.a>

              <a
                href={`tel:+${COMPANY_DETAILS.phoneRaw}`}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-2 bg-[#060818] border-amber-500/30 text-amber-200 hover:bg-amber-500/10"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Direct Call</span>
              </a>
            </div>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
