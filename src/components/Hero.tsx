import React, { useState, useEffect } from 'react';
import { ArrowRight, PhoneCall, CheckCircle2, Zap, ShieldCheck, Sparkles, TrendingUp, Award, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_DETAILS } from '../data';
import { InteractiveCanvas } from './InteractiveCanvas';
import { AnimatedCounter } from './AnimatedCounter';
import { InteractiveShowcase } from './InteractiveShowcase';
import { WidecraftLogo } from './WidecraftLogo';
import { TrustPresenter } from './TrustPresenter';
import { Hero3DMotion } from './Hero3DMotion';

const RECENT_WINS = [
  '⚡ 34 WhatsApp inquiries delivered for Ahmedabad Healthcare client',
  '📈 4.6x Google Ads ROAS achieved for Mehsana Manufacturing brand',
  '🚀 99/100 PageSpeed score achieved for Gujarat E-Commerce store',
  '📱 Custom cross-platform booking app launched with sub-second API sync',
];

export const Hero: React.FC = () => {
  const [winIndex, setWinIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWinIndex((prev) => (prev + 1) % RECENT_WINS.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const keyMetrics = [
    { label: 'Avg ROI Improvement', val: '3.4x', icon: <TrendingUp className="w-4 h-4 text-amber-400" /> },
    { label: 'Site Speed Score', val: '< 2.0s', icon: <Zap className="w-4 h-4 text-cyan-400" /> },
    { label: 'Client Retention', val: '98.5%', icon: <ShieldCheck className="w-4 h-4 text-indigo-400" /> },
    { label: 'Active Ad Budgets Managed', val: '₹5M+', icon: <Sparkles className="w-4 h-4 text-amber-300" /> },
  ];

  return (
    <section
      className="relative pt-32 sm:pt-36 lg:pt-44 pb-20 lg:pb-28 overflow-hidden transition-colors duration-300 bg-gradient-to-b from-[#050714] via-[#080d22] to-[#050714]"
      id="hero"
    >
      {/* Interactive Fluid Particle Network Canvas */}
      <InteractiveCanvas />

      {/* Static Royal Ambient Glowing Backdrops (Optimized for 0% scroll repainting) */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[380px] rounded-full pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.35),_transparent_70%)]"
      />
      <div
        className="absolute top-1/3 right-4 sm:right-10 w-[300px] sm:w-[420px] h-[300px] rounded-full pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.35),_transparent_70%)]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        {/* Royal Gold Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border shadow-lg select-none bg-[#0c1224] border-amber-500/30 text-amber-200 hover:border-amber-400 transition-colors"
        >
          <div className="inline-flex items-center gap-1.5 text-amber-400 font-bold">
            <Crown className="w-3.5 h-3.5" />
            <span>Widecraft Prestige</span>
          </div>
          <span className="h-3 w-px bg-amber-500/30" />
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
          </span>
          <span className="text-slate-300">Performance Digital Agency &bull; Mehsana & Pan-India</span>
        </motion.div>

        {/* Live Client Win Rotating Ticker */}
        <div className="h-7 mb-4 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={winIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-[#0b1022] border border-amber-500/20 text-amber-100 shadow-sm"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{RECENT_WINS[winIndex]}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hero Headline with Royal Gold & Diamond Flow */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight max-w-5xl mx-auto leading-[1.18] sm:leading-[1.12] text-white"
        >
          High-Converting Websites, Apps &{' '}
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
            ROI-Driven Marketing
          </span>
        </motion.h1>

        {/* Animated Brand Presenter: Emerges from side gesturing that Widecraft is Genuine & Reliable */}
        <div className="flex justify-center mt-4 mb-2">
          <TrustPresenter />
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mt-6 text-base sm:text-lg md:text-xl max-w-3xl mx-auto font-normal leading-relaxed text-slate-300"
        >
          At <strong className="text-white font-bold">{COMPANY_DETAILS.name}</strong>, we engineer
          lightning-fast websites, scalable cross-platform mobile apps, and precision advertising campaigns
          that turn clicks into loyal, paying customers.
        </motion.p>

        {/* CTA Action Buttons with Royal Styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="mt-10 flex flex-wrap justify-center items-center gap-4"
        >
          {/* Primary Royal Gold Button */}
          <motion.a
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            href="#services"
            id="hero-explore-services-btn"
            className="px-7 sm:px-9 py-4 rounded-xl font-black text-slate-950 shadow-xl shadow-amber-500/25 flex items-center gap-2.5 transition bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:brightness-110 group"
          >
            <span>Explore Capabilities</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>

          {/* Secondary Royal Obsidian Button */}
          <motion.a
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            href={`tel:+${COMPANY_DETAILS.phoneRaw}`}
            id="hero-phone-call-btn"
            className="px-7 sm:px-8 py-4 rounded-xl font-bold border transition flex items-center gap-2.5 bg-[#0c1224] border-amber-500/40 text-amber-200 hover:bg-amber-500/10 hover:border-amber-300 shadow-md"
          >
            <PhoneCall className="w-5 h-5 text-amber-400" />
            <span>{COMPANY_DETAILS.phone}</span>
          </motion.a>

          {/* ROI Calculator Button */}
          <motion.a
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            href="#calculator"
            id="hero-calc-btn"
            className="px-6 py-4 rounded-xl font-semibold border transition text-sm flex items-center gap-2 bg-[#080d20] border-slate-700 text-slate-300 hover:text-white hover:border-slate-500"
          >
            <span>Calculate ROI &rarr;</span>
          </motion.a>
        </motion.div>

        {/* Key Credibility Badges & Checklist */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-8 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs font-semibold"
        >
          <div className="flex items-center gap-2 text-amber-400">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-slate-300">Meta & Google Certified</span>
          </div>
          <div className="flex items-center gap-2 text-amber-400">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-slate-300">Sub-2s Page Speed Guarantee</span>
          </div>
          <div className="flex items-center gap-2 text-amber-400">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-slate-300">Dedicated Account Manager</span>
          </div>
        </motion.div>

        {/* Interactive 3D Performance Matrix Core */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <Hero3DMotion />
        </motion.div>

        {/* Royal Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-14 max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-6 rounded-2xl border transition-all bg-[#0a0f24] border-amber-500/25 shadow-2xl shadow-black/80"
        >
          {keyMetrics.map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              className="p-3 sm:p-4 rounded-xl text-center transition-all hover:bg-amber-500/10 border border-transparent hover:border-amber-500/20"
            >
              <div className="flex items-center justify-center gap-1.5 mb-1 text-xs">
                {item.icon}
                <span className="font-semibold text-slate-400">
                  {item.label}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                <AnimatedCounter value={item.val} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Live Interactive Benchmark & Core Web Vitals Showcase */}
        <InteractiveShowcase />
      </div>
    </section>
  );
};
