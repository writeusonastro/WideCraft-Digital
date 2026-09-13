import React from 'react';
import { motion } from 'motion/react';
import { 
  Globe, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Cpu, 
  Smartphone, 
  TrendingUp, 
  Database,
  Flame,
  CheckCircle2,
  Search
} from 'lucide-react';
import { WidecraftLogo } from './WidecraftLogo';

const BADGES = [
  { label: 'Widecraft Prestige', icon: <WidecraftLogo size="xs" showText={false} interactive={false} /> },
  { label: 'SEO Agency Mehsana', icon: <Search className="w-3.5 h-3.5 text-amber-300" /> },
  { label: 'Google Maps 3-Pack', icon: <TrendingUp className="w-3.5 h-3.5 text-amber-400" /> },
  { label: 'Website Design Gujarat', icon: <Globe className="w-3.5 h-3.5 text-indigo-400" /> },
  { label: 'Google Ads Partner', icon: <TrendingUp className="w-3.5 h-3.5 text-amber-400" /> },
  { label: 'Meta Certified Ads', icon: <Globe className="w-3.5 h-3.5 text-indigo-400" /> },
  { label: 'Sub-2s Web Vitals', icon: <Zap className="w-3.5 h-3.5 text-yellow-400" /> },
  { label: 'React 19 & Next.js', icon: <Cpu className="w-3.5 h-3.5 text-cyan-400" /> },
  { label: 'Unjha Exporter SEO', icon: <Search className="w-3.5 h-3.5 text-emerald-400" /> },
  { label: 'Cross-Platform Mobile', icon: <Smartphone className="w-3.5 h-3.5 text-emerald-400" /> },
  { label: 'Kadi & Kalol GIDC B2B', icon: <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> },
  { label: 'High-Converting UX', icon: <Layers className="w-3.5 h-3.5 text-purple-400" /> },
  { label: 'Ahmedabad & SG Highway', icon: <Database className="w-3.5 h-3.5 text-sky-400" /> },
  { label: 'ROAS Maximization', icon: <Flame className="w-3.5 h-3.5 text-rose-400" /> },
  { label: 'Gujarat #1 Tech Agency', icon: <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> },
  { label: 'Full Source Code Rights', icon: <ShieldCheck className="w-3.5 h-3.5 text-amber-300" /> },
];

export const MarqueeStrip: React.FC = () => {
  return (
    <div
      className="relative py-5 overflow-hidden border-y transition-colors duration-300 bg-[#06091c] border-amber-500/20 shadow-inner"
    >
      {/* Left/Right Vignette gradients for seamless fade out */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none bg-gradient-to-r from-[#06091c] to-transparent"
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none bg-gradient-to-l from-[#06091c] to-transparent"
      />

      {/* Infinite Scrolling Track */}
      <div className="flex w-fit select-none">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 25,
            repeat: Infinity,
          }}
          className="flex items-center gap-6 whitespace-nowrap"
        >
          {/* Double items for infinite seamless loop */}
          {[...BADGES, ...BADGES].map((item, idx) => (
            <div
              key={`marquee-badge-${idx}-${item.label}`}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold border transition bg-[#0c1228] border-amber-500/20 text-slate-200 shadow-sm hover:border-amber-400/60"
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
