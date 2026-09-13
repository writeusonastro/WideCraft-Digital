import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { 
  Zap, 
  Search, 
  TrendingUp, 
  Sparkles, 
  Smartphone,
  Compass,
  Vibrate,
  RotateCw
} from 'lucide-react';
import { WidecraftLogo } from './WidecraftLogo';

export const Hero3DMotion: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileTiltActive, setIsMobileTiltActive] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);
  const [showShakeAlert, setShowShakeAlert] = useState(false);
  const [iosPermissionNeeded, setIosPermissionNeeded] = useState(false);

  // References for shake physics calculation
  const lastAcc = useRef({ x: 0, y: 0, z: 0 });
  const lastMotionTime = useRef<number>(0);
  const lastShakeTrigger = useRef<number>(0);

  // Pause 3D animations completely when out of view to maintain 60-120 FPS
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

  // Motion values for smooth 3D tilt tracking (normalized [-1, 1])
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // High-sensitivity responsive springs for snappy physics
  const springConfig = { damping: 18, stiffness: 220 };
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [22, -22]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-24, 24]), springConfig);

  // Parallax translation for the center core
  const coreParallaxX = useSpring(useTransform(mouseX, [-1, 1], [-14, 14]), springConfig);
  const coreParallaxY = useSpring(useTransform(mouseY, [-1, 1], [-14, 14]), springConfig);

  // Trigger shake animation & haptics
  const triggerShake = useCallback(() => {
    const now = Date.now();
    if (now - lastShakeTrigger.current < 800) return; // Prevent overlapping triggers
    lastShakeTrigger.current = now;

    setIsShaking(true);
    setShakeCount(prev => prev + 1);
    setShowShakeAlert(true);

    // Haptic vibration feedback on supported mobile devices
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([50, 40, 80, 40, 100]);
      } catch {
        // Safe fallback if unsupported
      }
    }

    setTimeout(() => {
      setIsShaking(false);
    }, 750);

    setTimeout(() => {
      setShowShakeAlert(false);
    }, 2200);
  }, []);

  // Gyroscope & Mobile Orientation Listener
  useEffect(() => {
    // Check if iOS 13+ permission is required
    if (
      typeof window !== 'undefined' &&
      typeof (window as unknown as { DeviceOrientationEvent?: { requestPermission?: () => Promise<string> } }).DeviceOrientationEvent?.requestPermission === 'function'
    ) {
      setIosPermissionNeeded(true);
    }

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (!isVisible) return;
      const gamma = e.gamma; // [-90, 90] Left to Right tilt
      const beta = e.beta;   // [-180, 180] Front to Back tilt

      if (gamma !== null && beta !== null) {
        setIsMobileTiltActive(true);

        // Standard hand-holding angle for mobile is around 38-42 degrees beta
        const relativeBeta = beta - 40;

        // High sensitivity: a gentle 20-degree tilt creates full 3D deflection
        const normX = Math.max(-1, Math.min(1, gamma / 22));
        const normY = Math.max(-1, Math.min(1, relativeBeta / 22));

        mouseX.set(normX);
        mouseY.set(normY);
      }
    };

    // Sensitive Shake detection via device accelerometer
    const handleMotion = (e: DeviceMotionEvent) => {
      if (!isVisible) return;
      const acc = e.acceleration || e.accelerationIncludingGravity;
      if (!acc) return;

      const x = acc.x ?? 0;
      const y = acc.y ?? 0;
      const z = acc.z ?? 0;

      const now = Date.now();
      if (lastMotionTime.current === 0) {
        lastMotionTime.current = now;
        lastAcc.current = { x, y, z };
        return;
      }

      const diffTime = now - lastMotionTime.current;
      if (diffTime > 90) {
        const deltaX = Math.abs(x - lastAcc.current.x);
        const deltaY = Math.abs(y - lastAcc.current.y);
        const deltaZ = Math.abs(z - lastAcc.current.z);
        const speed = deltaX + deltaY + deltaZ;

        // Sensitive shake threshold
        if (speed > 13.5) {
          triggerShake();
        }

        lastMotionTime.current = now;
        lastAcc.current = { x, y, z };
      }
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    window.addEventListener('devicemotion', handleMotion, true);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
      window.removeEventListener('devicemotion', handleMotion, true);
    };
  }, [isVisible, mouseX, mouseY, triggerShake]);

  // Request iOS permission if needed on tap
  const enableSensors = async () => {
    const DeviceOrientation = (window as unknown as { DeviceOrientationEvent?: { requestPermission?: () => Promise<string> } }).DeviceOrientationEvent;
    const DeviceMotion = (window as unknown as { DeviceMotionEvent?: { requestPermission?: () => Promise<string> } }).DeviceMotionEvent;

    if (typeof DeviceOrientation?.requestPermission === 'function') {
      try {
        const state = await DeviceOrientation.requestPermission();
        if (state === 'granted') {
          setIosPermissionNeeded(false);
          setIsMobileTiltActive(true);
        }
      } catch {
        // Handle error silently
      }
    }
    if (typeof DeviceMotion?.requestPermission === 'function') {
      try {
        await DeviceMotion.requestPermission();
      } catch {
        // Handle error silently
      }
    }
  };

  // Mouse tilt tracking (Desktop)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isVisible) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mouseX.set(Math.max(-1, Math.min(1, x)));
    mouseY.set(Math.max(-1, Math.min(1, y)));
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isMobileTiltActive) {
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Touch screen dragging (Mobile touch sensitivity)
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((touch.clientY - rect.top) / rect.height - 0.5) * 2;
    setIsMobileTiltActive(true);
    mouseX.set(Math.max(-1, Math.min(1, x * 1.25)));
    mouseY.set(Math.max(-1, Math.min(1, y * 1.25)));
  };

  const handleTouchEnd = () => {
    // Keep subtle tilt alive or let gyro continue
  };

  return (
    <div className="relative my-8 py-4 flex flex-col items-center justify-center select-none">
      {/* 3D Stage Container with Perspective */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={iosPermissionNeeded ? enableSensors : undefined}
        style={{ perspective: 1100 }}
        className="w-full max-w-4xl mx-auto px-4 cursor-grab active:cursor-grabbing"
      >
        <motion.div
          animate={
            isShaking
              ? {
                  x: [-14, 16, -14, 12, -8, 8, 0],
                  y: [-8, 10, -10, 8, -4, 4, 0],
                  rotateZ: [-3, 3.5, -3, 2.5, -1, 0],
                  scale: [1, 1.04, 0.98, 1.02, 1],
                }
              : { x: 0, y: 0, rotateZ: 0, scale: 1 }
          }
          transition={{ duration: 0.75, ease: 'easeOut' }}
          style={{
            rotateX: isHovered || isMobileTiltActive ? rotateX : 0,
            rotateY: isHovered || isMobileTiltActive ? rotateY : 0,
            transformStyle: 'preserve-3d',
          }}
          className={`relative rounded-3xl p-6 sm:p-10 border transition-all duration-300 shadow-2xl shadow-black/90 overflow-hidden ${
            isShaking
              ? 'border-amber-400 bg-gradient-to-br from-[#161c46] via-[#10183d] to-[#0a0f26] shadow-amber-500/30 ring-2 ring-amber-400/50'
              : 'border-amber-500/30 bg-gradient-to-br from-[#0a0f28] via-[#0c1334] to-[#060a1d] hover:border-amber-400/60'
          }`}
        >
          {/* Dynamic Specular 3D Lighting Layer */}
          <div
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-25 transition-opacity duration-300"
            style={{
              background: isShaking
                ? 'radial-gradient(600px circle at 50% 50%, rgba(245, 158, 11, 0.4), transparent 75%)'
                : isHovered || isMobileTiltActive
                ? 'radial-gradient(500px circle at 50% 30%, rgba(245, 158, 11, 0.25), transparent 70%)'
                : 'radial-gradient(400px circle at 50% 50%, rgba(245, 158, 11, 0.08), transparent 70%)',
            }}
          />

          {/* Ambient Corner Flares */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Shake Notification Pill */}
          {showShakeAlert && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="absolute top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/50 border border-yellow-300 pointer-events-none"
            >
              <Zap className="w-3.5 h-3.5 fill-slate-950 animate-bounce" />
              <span>SHAKE DETECTED! Core Hyper-Drive Active</span>
            </motion.div>
          )}

          {/* iOS Sensor Permission Banner */}
          {iosPermissionNeeded && (
            <div className="mb-4 p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-between text-xs text-amber-200">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Tap here to allow Motion/Tilt Sensors</span>
              </div>
              <button
                onClick={enableSensors}
                className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-bold text-[11px] shadow hover:bg-amber-300"
              >
                Enable
              </button>
            </div>
          )}

          {/* Stage Controls & Mode Switcher */}
          <div
            style={{ transform: 'translateZ(35px)', transformStyle: 'preserve-3d' }}
            className="flex items-center justify-between gap-3 pb-6 border-b border-amber-500/20 flex-wrap"
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
                Sensory 3D
              </span>
            </div>

            {/* Mobile & Desktop Action Badges */}
            <div className="flex items-center gap-2">
              {/* Sensitive Status indicator */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#070b1e] border border-amber-500/30 text-amber-300">
                <Compass className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Tilt &amp; Shake Ready</span>
              </div>

              {/* Interactive Shake Tester Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  triggerShake();
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-gradient-to-r from-amber-500/30 to-yellow-500/30 text-amber-200 hover:from-amber-500/50 hover:to-yellow-500/50 border border-amber-400/40 active:scale-95 transition"
                title="Click or shake phone to trigger reaction"
              >
                <Vibrate className="w-3 h-3 text-amber-400" />
                <span>Test Shake</span>
              </button>
            </div>
          </div>

          {/* Center 3D Holographic Core & Orbital Rings */}
          <div
            style={{ transform: 'translateZ(45px)', transformStyle: 'preserve-3d' }}
            className="py-6 sm:py-14 flex items-center justify-center relative min-h-[220px] sm:min-h-[340px]"
          >
            {/* 3D Gyroscopic Orbital Ring 1 - Gold X/Z axis */}
            <motion.div
              animate={{
                rotateZ: [0, 360],
                rotateX: isShaking ? [50, 90, 50] : [65, 75, 65],
              }}
              transition={{
                duration: isShaking ? 2.5 : 16,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute w-44 sm:w-72 h-44 sm:h-72 rounded-full border border-dashed border-amber-400/40 pointer-events-none"
              style={{
                transformStyle: 'preserve-3d',
                boxShadow: isShaking
                  ? '0 0 45px rgba(245, 158, 11, 0.4)'
                  : '0 0 25px rgba(245, 158, 11, 0.15)',
              }}
            >
              {/* Satellite Dot 1 */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-amber-400 shadow-md shadow-amber-400 animate-pulse" />
            </motion.div>

            {/* 3D Gyroscopic Orbital Ring 2 - Sapphire Y/Z axis */}
            <motion.div
              animate={{
                rotateZ: [360, 0],
                rotateY: isShaking ? [45, 85, 45] : [60, 70, 60],
              }}
              transition={{
                duration: isShaking ? 2 : 13,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute w-52 sm:w-80 h-52 sm:h-80 rounded-full border border-indigo-400/35 pointer-events-none"
              style={{
                transformStyle: 'preserve-3d',
                boxShadow: isShaking
                  ? '0 0 50px rgba(99, 102, 241, 0.35)'
                  : '0 0 30px rgba(99, 102, 241, 0.12)',
              }}
            >
              {/* Satellite Dot 2 */}
              <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-md shadow-cyan-400" />
            </motion.div>

            {/* 3D Gyroscopic Orbital Ring 3 - Outer Thin Gold Accent */}
            <motion.div
              animate={{ rotateZ: [0, -360], rotateX: [35, 45, 35] }}
              transition={{
                duration: isShaking ? 3 : 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute w-60 sm:w-96 h-60 sm:h-96 rounded-full border border-amber-500/20 pointer-events-none"
              style={{ transformStyle: 'preserve-3d' }}
            />

            {/* Glowing 3D Center Core / Widecraft Crystal */}
            <motion.div
              style={{
                x: coreParallaxX,
                y: coreParallaxY,
                transform: 'translateZ(65px)',
                transformStyle: 'preserve-3d',
              }}
              animate={
                isShaking
                  ? {
                      scale: [1, 1.15, 0.95, 1.1, 1],
                      rotateZ: [-8, 10, -10, 8, 0],
                    }
                  : {
                      scale: [1, 1.06, 1],
                      rotateZ: [0, 5, -5, 0],
                    }
              }
              transition={{
                duration: isShaking ? 0.6 : 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative z-20 flex flex-col items-center justify-center"
            >
              {/* Core Hex Glow Backing */}
              <div
                className={`absolute w-24 sm:w-36 h-24 sm:h-36 rounded-3xl blur-2xl pointer-events-none transition-all duration-300 ${
                  isShaking
                    ? 'bg-gradient-to-tr from-amber-400/60 via-yellow-300/50 to-indigo-500/50 scale-125'
                    : 'bg-gradient-to-tr from-amber-500/30 via-yellow-400/20 to-indigo-600/30 animate-pulse'
                }`}
              />

              {/* Raised 3D Glass Platform */}
              <div
                className={`w-22 sm:w-28 h-22 sm:h-28 rounded-3xl border flex flex-col items-center justify-center shadow-2xl relative group transition-all duration-300 ${
                  isShaking
                    ? 'border-amber-300 bg-gradient-to-b from-[#18235a] to-[#0c1334] shadow-amber-400/40 ring-2 ring-amber-300/70'
                    : 'border-amber-400/60 bg-gradient-to-b from-[#121a42] to-[#080d24] shadow-amber-500/20 hover:border-amber-300'
                }`}
              >
                <WidecraftLogo size="md" showText={false} interactive={false} />
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest mt-1.5 bg-gradient-to-r from-amber-200 to-yellow-400 bg-clip-text text-transparent">
                  CORE ENGINE
                </span>
              </div>
            </motion.div>

            {/* Desktop & Tablet: Elevated 3D Floating Capability Satellites */}
            {/* Top Left: Sub-2s Speed */}
            <motion.div
              animate={isVisible ? { y: isShaking ? [-8, 8, -8] : [-4, 4, -4] } : {}}
              transition={{ duration: isShaking ? 0.4 : 4, repeat: Infinity, ease: 'easeInOut' }}
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
              animate={isVisible ? { y: isShaking ? [8, -8, 8] : [4, -4, 4] } : {}}
              transition={{ duration: isShaking ? 0.45 : 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
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
              animate={isVisible ? { y: isShaking ? [10, -10, 10] : [5, -5, 5] } : {}}
              transition={{ duration: isShaking ? 0.5 : 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
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
              animate={isVisible ? { y: isShaking ? [-10, 10, -10] : [-5, 5, -5] } : {}}
              transition={{ duration: isShaking ? 0.48 : 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
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

          {/* Mobile-Only Non-Overlapping 2x2 Grid */}
          <div
            style={{ transform: 'translateZ(35px)', transformStyle: 'preserve-3d' }}
            className="sm:hidden grid grid-cols-2 gap-2.5 pb-6 border-b border-amber-500/15"
          >
            <div className={`flex items-center gap-2 p-2.5 rounded-xl border bg-[#060a1d]/90 shadow-md transition-colors ${
              isShaking ? 'border-amber-400 bg-[#0d1436]' : 'border-amber-500/30'
            }`}>
              <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <div className="text-left overflow-hidden">
                <div className="text-[9px] text-slate-400 uppercase font-semibold truncate">Speed Vitals</div>
                <div className="text-xs font-black text-amber-300 truncate">&lt; 1.2s Vitals</div>
              </div>
            </div>

            <div className={`flex items-center gap-2 p-2.5 rounded-xl border bg-[#060a1d]/90 shadow-md transition-colors ${
              isShaking ? 'border-amber-400 bg-[#0d1436]' : 'border-amber-500/30'
            }`}>
              <div className="p-1.5 rounded-lg bg-yellow-500/20 text-yellow-400 shrink-0">
                <Search className="w-3.5 h-3.5" />
              </div>
              <div className="text-left overflow-hidden">
                <div className="text-[9px] text-slate-400 uppercase font-semibold truncate">SEO Authority</div>
                <div className="text-xs font-black text-yellow-300 truncate">#1 Google Rank</div>
              </div>
            </div>

            <div className={`flex items-center gap-2 p-2.5 rounded-xl border bg-[#060a1d]/90 shadow-md transition-colors ${
              isShaking ? 'border-emerald-400 bg-[#0d1436]' : 'border-emerald-500/30'
            }`}>
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <div className="text-left overflow-hidden">
                <div className="text-[9px] text-slate-400 uppercase font-semibold truncate">Target ROAS</div>
                <div className="text-xs font-black text-emerald-400 truncate">4.6x Return</div>
              </div>
            </div>

            <div className={`flex items-center gap-2 p-2.5 rounded-xl border bg-[#060a1d]/90 shadow-md transition-colors ${
              isShaking ? 'border-indigo-400 bg-[#0d1436]' : 'border-indigo-500/30'
            }`}>
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
              <span className="text-[10px] text-slate-400 block">Gyro Sensitivity</span>
              <span className="text-xs sm:text-sm font-black text-amber-300">Ultra High-Res</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#060919]/80 border border-amber-500/15">
              <span className="text-[10px] text-slate-400 block">Shake Detection</span>
              <span className="text-xs sm:text-sm font-black text-emerald-400">
                {shakeCount > 0 ? `${shakeCount} Shakes Active` : 'Dynamic Sensor'}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#060919]/80 border border-amber-500/15">
              <span className="text-[10px] text-slate-400 block">3D Frame Rate</span>
              <span className="text-xs sm:text-sm font-black text-cyan-300">Fluid 60-120 FPS</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#060919]/80 border border-amber-500/15">
              <span className="text-[10px] text-slate-400 block">Touch Physics</span>
              <span className="text-xs sm:text-sm font-black text-yellow-300">Direct Touch-Drag</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
