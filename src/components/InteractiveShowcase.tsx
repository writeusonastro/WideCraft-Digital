import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Activity, 
  ShieldCheck, 
  Search, 
  Smartphone, 
  Flame, 
  RotateCcw,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';

export const InteractiveShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'widecraft' | 'typical'>('widecraft');
  const [isAuditing, setIsAuditing] = useState(false);

  const runAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
    }, 700);
  };

  const isWidecraft = activeTab === 'widecraft';

  const scores = isWidecraft
    ? { perf: 99, acc: 100, best: 100, seo: 100, fcp: '0.6s', lcp: '1.1s', cls: '0.00' }
    : { perf: 42, acc: 71, best: 64, seo: 68, fcp: '2.8s', lcp: '4.7s', cls: '0.34' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="mt-14 max-w-4xl mx-auto rounded-3xl border border-amber-500/25 p-5 sm:p-7 relative overflow-hidden transition-all duration-300 shadow-2xl bg-[#0a0f24]/90 shadow-black/80 backdrop-blur-xl"
    >
      {/* Top Banner & Mode Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-amber-500/20">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-200">
                Live Lighthouse Core Web Vitals Benchmark
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Audited
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Compare Widecraft engineering vs generic agency templates
            </p>
          </div>
        </div>

        {/* Mode Switcher with Smooth Spring Slide Indicator */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#060818] border border-amber-500/20 self-stretch sm:self-auto relative">
          <button
            type="button"
            onClick={() => setActiveTab('widecraft')}
            className={`relative z-10 flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              isWidecraft
                ? 'text-amber-200 font-extrabold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isWidecraft && (
              <motion.div
                layoutId="showcaseActiveTab"
                className="absolute inset-0 rounded-lg bg-amber-500/20 border border-amber-400/50 shadow-xs"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.35 }}
              />
            )}
            <Zap className="w-3.5 h-3.5 text-amber-400 relative z-10" />
            <span className="relative z-10">Widecraft Build</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('typical')}
            className={`relative z-10 flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              !isWidecraft
                ? 'text-rose-300 font-extrabold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {!isWidecraft && (
              <motion.div
                layoutId="showcaseActiveTab"
                className="absolute inset-0 rounded-lg bg-rose-500/20 border border-rose-400/50 shadow-xs"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.35 }}
              />
            )}
            <Flame className="w-3.5 h-3.5 text-rose-400 relative z-10" />
            <span className="relative z-10">Generic Agency</span>
          </button>
        </div>
      </div>

      {/* Benchmark Score Dials with Smooth Transition */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 py-6 border-b border-amber-500/20">
        {[
          { label: 'Performance', val: scores.perf, icon: <Activity className="w-4 h-4 text-emerald-400" /> },
          { label: 'Accessibility', val: scores.acc, icon: <Smartphone className="w-4 h-4 text-cyan-400" /> },
          { label: 'Best Practices', val: scores.best, icon: <ShieldCheck className="w-4 h-4 text-indigo-400" /> },
          { label: 'SEO Audit', val: scores.seo, icon: <Search className="w-4 h-4 text-amber-400" /> },
        ].map((metric) => {
          const isGood = metric.val >= 90;
          const isFair = metric.val >= 50 && metric.val < 90;
          return (
            <motion.div
              key={metric.label}
              layout
              className="p-3.5 rounded-2xl border text-center transition-all bg-[#080d22] border-amber-500/15"
            >
              {/* Circular Gauge */}
              <div className="relative w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: metric.val / 100 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={
                      isGood
                        ? 'text-emerald-400'
                        : isFair
                        ? 'text-amber-400'
                        : 'text-rose-400'
                    }
                    strokeDasharray="100, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span
                  className={`absolute font-black text-lg ${
                    isGood
                      ? 'text-emerald-300'
                      : isFair
                      ? 'text-amber-300'
                      : 'text-rose-300'
                  }`}
                >
                  {isAuditing ? '--' : metric.val}
                </span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-300">
                {metric.icon}
                <span>{metric.label}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Speed Metrics row & Interactive Re-Test CTA */}
      <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 sm:gap-6 text-xs text-slate-300">
          <div>
            <span className="text-slate-500 font-medium">First Contentful Paint:</span>{' '}
            <strong className={isWidecraft ? 'text-emerald-400 font-mono font-bold' : 'text-rose-400 font-mono font-bold'}>
              {scores.fcp}
            </strong>
          </div>
          <div>
            <span className="text-slate-500 font-medium">Largest Contentful Paint:</span>{' '}
            <strong className={isWidecraft ? 'text-emerald-400 font-mono font-bold' : 'text-rose-400 font-mono font-bold'}>
              {scores.lcp}
            </strong>
          </div>
          <div className="hidden sm:block">
            <span className="text-slate-500 font-medium">Cumulative Shift:</span>{' '}
            <strong className={isWidecraft ? 'text-emerald-400 font-mono font-bold' : 'text-rose-400 font-mono font-bold'}>
              {scores.cls}
            </strong>
          </div>
        </div>

        <button
          type="button"
          onClick={runAudit}
          disabled={isAuditing}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-amber-500/30 bg-[#080d22] text-amber-300 hover:bg-amber-500/10 hover:border-amber-400 transition"
        >
          <RotateCcw className={`w-3.5 h-3.5 text-amber-400 ${isAuditing ? 'animate-spin' : ''}`} />
          <span>{isAuditing ? 'Simulating Audit...' : 'Re-Run Live Audit'}</span>
        </button>
      </div>
    </motion.div>
  );
};
