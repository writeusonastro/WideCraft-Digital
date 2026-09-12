import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { 
  Zap, 
  Search, 
  TrendingUp, 
  Sparkles, 
  ShieldCheck, 
  Smartphone,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { WidecraftLogo } from './WidecraftLogo';

export const Hero3DMotion: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activePreset, setActivePreset] = useState<'gyro' | 'metrics'>('gyro');

  // Pause 3D animations completely when out of view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Motion values for smooth 3D tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for buttery smooth physics
  const springConfig = { damping: 25, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [16, -16]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isVisible) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div className="relative my-8 py-4 flex flex-col items-center justify-center select-none">
      {/* 3D Stage Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: 1200 }}
        className="w-full max-w-4xl mx-auto px-4 cursor-grab active:cursor-grabbing"
      >
        <motion.div
          style={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
            transformStyle: 'preserve-3d',
          }}
          className="relative rounded-3xl p-6 sm:p-10 border border-amber-500/30 bg-gradient-to-br from-[#0a0f28] via-[#0c1334] to-[#060a1d] shadow-2xl shadow-black/90 overflow-hidden transition-shadow duration-300 hover:border-amber-400/60"
        >
          {/* Dynamic Specular 3D Lighting Layer */}
          <div
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-20 transition-opacity duration-300"
            style={{
              background: isHovered
                ? 'radial-gradient(500px circle at 50% 30%, rgba(245, 158, 11, 0.2), transparent 70%)'
                : 'radial-gradient(400px circle at 50% 50%, rgba(245, 158, 11, 0.08), transparent 70%)',
            }}
          />

          {/* Ambient Corner Flare */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Stage Controls & Mode Switcher */}
          <div
            style={{ transform: 'translateZ(35px)', transformStyle: 'preserve-3d' }}
            className="flex items-center justify-between gap-4 pb-6 border-b border-amber-500/20"
          >
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
              </span>
              <span className="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-amber-200">
                Widecraft 3D Performance Matrix
              </span>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Interactive 3D
              </span>
            </div>

            <div className="text-[11px] text-slate-400 hidden sm:flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Hover & move mouse to tilt in 3D</span>
            </div>
          </div>

          {/* Center 3D Holographic Core & Orbital Rings */}
          <div
            style={{ transform: 'translateZ(45px)', transformStyle: 'preserve-3d' }}
            className="py-6 sm:py-14 flex items-center justify-center relative min-h-[220px] sm:min-h-[340px]"
          >
            {/* 3D Gyroscopic Orbital Ring 1 - Gold X/Z axis */}
            <motion.div
              animate={{ rotateZ: [0, 360], rotateX: [65, 75, 65] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute w-44 sm:w-72 h-44 sm:h-72 rounded-full border border-dashed border-amber-400/40 pointer-events-none"
              style={{
                transformStyle: 'preserve-3d',
                boxShadow: '0 0 25px rgba(245, 158, 11, 0.15)',
              }}
            >
              {/* Satellite Dot 1 */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-amber-400 shadow-md shadow-amber-400 animate-pulse" />
            </motion.div>

            {/* 3D Gyroscopic Orbital Ring 2 - Sapphire Y/Z axis */}
            <motion.div
              animate={{ rotateZ: [360, 0], rotateY: [60, 70, 60] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              className="absolute w-52 sm:w-80 h-52 sm:h-80 rounded-full border border-indigo-400/35 pointer-events-none"
              style={{
                transformStyle: 'preserve-3d',
                boxShadow: '0 0 30px rgba(99, 102, 241, 0.12)',
              }}
            >
              {/* Satellite Dot 2 */}
              <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-md shadow-cyan-400" />
            </motion.div>

            {/* 3D Gyroscopic Orbital Ring 3 - Outer Thin Gold Accent */}
            <motion.div
              animate={{ rotateZ: [0, -360], rotateX: [35, 45, 35] }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
              className="absolute w-60 sm:w-96 h-60 sm:h-96 rounded-full border border-amber-500/20 pointer-events-none"
              style={{ transformStyle: 'preserve-3d' }}
            />

            {/* Glowing 3D Center Core / Widecraft Crystal */}
            <motion.div
              animate={{
                scale: [1, 1.06, 1],
                rotateZ: [0, 5, -5, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transform: 'translateZ(65px)', transformStyle: 'preserve-3d' }}
              className="relative z-20 flex flex-col items-center justify-center"
            >
              {/* Core Hex Glow Backing */}
              <div className="absolute w-24 sm:w-36 h-24 sm:h-36 rounded-3xl bg-gradient-to-tr from-amber-500/30 via-yellow-400/20 to-indigo-600/30 blur-2xl pointer-events-none animate-pulse" />

              {/* Raised 3D Glass Platform */}
              <div className="w-22 sm:w-28 h-22 sm:h-28 rounded-3xl border border-amber-400/60 bg-gradient-to-b from-[#121a42] to-[#080d24] flex flex-col items-center justify-center shadow-2xl shadow-amber-500/20 relative group hover:border-amber-300 transition-colors">
                <WidecraftLogo size="md" showText={false} interactive={false} />
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest mt-1.5 bg-gradient-to-r from-amber-200 to-yellow-400 bg-clip-text text-transparent">
                  CORE ENGINE
                </span>
              </div>
            </motion.div>

            {/* Desktop & Tablet: Elevated 3D Floating Capability Satellites */}
            {/* Top Left: Sub-2s Speed */}
            <motion.div
              animate={isVisible ? { y: [-4, 4, -4] } : {}}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transform: 'translateZ(55px)' }}
              className="hidden sm:block absolute top-4 left-4 lg:top-6 lg:left-6 z-20"
            >
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl border bg-[#060a1d] border-amber-500/30 shadow-lg shadow-black/50">
                <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Speed Benchmark</div>
                  <div className="text-xs sm:text-sm font-black text-amber-300">&lt; 1.2s Vitals</div>
                </div>
              </div>
            </motion.div>

            {/* Top Right: SEO Rank #1 */}
            <motion.div
              animate={isVisible ? { y: [4, -4, 4] } : {}}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              style={{ transform: 'translateZ(55px)' }}
              className="hidden sm:block absolute top-4 right-4 lg:top-6 lg:right-6 z-20"
            >
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl border bg-[#060a1d] border-amber-500/30 shadow-lg shadow-black/50">
                <div className="p-1.5 rounded-lg bg-yellow-500/20 text-yellow-400">
                  <Search className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">SEO Authority</div>
                  <div className="text-xs sm:text-sm font-black text-yellow-300">#1 Google Rank</div>
                </div>
              </div>
            </motion.div>

            {/* Bottom Left: ROAS Multiplier */}
            <motion.div
              animate={isVisible ? { y: [5, -5, 5] } : {}}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              style={{ transform: 'translateZ(55px)' }}
              className="hidden sm:block absolute bottom-4 left-4 lg:bottom-6 lg:left-6 z-20"
            >
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl border bg-[#060a1d] border-emerald-500/30 shadow-lg shadow-black/50">
                <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Target ROAS</div>
                  <div className="text-xs sm:text-sm font-black text-emerald-400">4.6x Return</div>
                </div>
              </div>
            </motion.div>

            {/* Bottom Right: Native Apps */}
            <motion.div
              animate={isVisible ? { y: [-5, 5, -5] } : {}}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              style={{ transform: 'translateZ(55px)' }}
              className="hidden sm:block absolute bottom-4 right-4 lg:bottom-6 lg:right-6 z-20"
            >
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl border bg-[#060a1d] border-indigo-500/30 shadow-lg shadow-black/50">
                <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Architecture</div>
                  <div className="text-xs sm:text-sm font-black text-indigo-300">iOS & Android</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile-Only Non-Overlapping 2x2 Grid (Separated cleanly below the rotating 3D core) */}
          <div
            style={{ transform: 'translateZ(35px)', transformStyle: 'preserve-3d' }}
            className="sm:hidden grid grid-cols-2 gap-2.5 pb-6 border-b border-amber-500/15"
          >
            <div className="flex items-center gap-2 p-2.5 rounded-xl border bg-[#060a1d]/90 border-amber-500/30 shadow-md">
              <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <div className="text-left overflow-hidden">
                <div className="text-[9px] text-slate-400 uppercase font-semibold truncate">Speed Vitals</div>
                <div className="text-xs font-black text-amber-300 truncate">&lt; 1.2s Vitals</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl border bg-[#060a1d]/90 border-amber-500/30 shadow-md">
              <div className="p-1.5 rounded-lg bg-yellow-500/20 text-yellow-400 shrink-0">
                <Search className="w-3.5 h-3.5" />
              </div>
              <div className="text-left overflow-hidden">
                <div className="text-[9px] text-slate-400 uppercase font-semibold truncate">SEO Authority</div>
                <div className="text-xs font-black text-yellow-300 truncate">#1 Google Rank</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl border bg-[#060a1d]/90 border-emerald-500/30 shadow-md">
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <div className="text-left overflow-hidden">
                <div className="text-[9px] text-slate-400 uppercase font-semibold truncate">Target ROAS</div>
                <div className="text-xs font-black text-emerald-400 truncate">4.6x Return</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl border bg-[#060a1d]/90 border-indigo-500/30 shadow-md">
              <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 shrink-0">
                <Smartphone className="w-3.5 h-3.5" />
              </div>
              <div className="text-left overflow-hidden">
                <div className="text-[9px] text-slate-400 uppercase font-semibold truncate">Architecture</div>
                <div className="text-xs font-black text-indigo-300 truncate">iOS & Android</div>
              </div>
            </div>
          </div>

          {/* Bottom Interactive Feature Bar in 3D Depth */}
          <div
            style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
            className="pt-6 border-t border-amber-500/20 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center"
          >
            <div className="p-2.5 rounded-xl bg-[#060919]/80 border border-amber-500/15">
              <span className="text-[10px] text-slate-400 block">Frame Rate</span>
              <span className="text-xs sm:text-sm font-black text-white">Smooth 60 FPS</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#060919]/80 border border-amber-500/15">
              <span className="text-[10px] text-slate-400 block">Lighthouse Score</span>
              <span className="text-xs sm:text-sm font-black text-emerald-400">99/100 Flawless</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#060919]/80 border border-amber-500/15">
              <span className="text-[10px] text-slate-400 block">Code Delivery</span>
              <span className="text-xs sm:text-sm font-black text-amber-300">100% Client Owned</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#060919]/80 border border-amber-500/15">
              <span className="text-[10px] text-slate-400 block">Inquiry Response</span>
              <span className="text-xs sm:text-sm font-black text-cyan-300">&lt; 30 Mins</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
