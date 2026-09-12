import React, { useState, useId } from 'react';
import { motion } from 'motion/react';

export interface WidecraftLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showText?: boolean;
  subtitle?: string;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
}

export const WidecraftLogo: React.FC<WidecraftLogoProps> = ({
  size = 'md',
  showText = true,
  subtitle = 'Mehsana, Gujarat',
  className = '',
  interactive = true,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const rawId = useId();
  const uid = rawId.replace(/:/g, '');

  const sizeMap = {
    xs: { icon: 24, text: 'text-xs', subText: 'text-[8px]', gap: 'gap-2' },
    sm: { icon: 32, text: 'text-sm', subText: 'text-[9px]', gap: 'gap-2.5' },
    md: { icon: 42, text: 'text-lg sm:text-xl', subText: 'text-[10px] sm:text-[11px]', gap: 'gap-3' },
    lg: { icon: 54, text: 'text-xl sm:text-2xl', subText: 'text-xs', gap: 'gap-3.5' },
    xl: { icon: 72, text: 'text-2xl sm:text-3xl', subText: 'text-sm', gap: 'gap-4' },
    hero: { icon: 96, text: 'text-3xl sm:text-4xl', subText: 'text-sm font-semibold', gap: 'gap-5' },
  };

  const currentSize = sizeMap[size];

  return (
    <motion.div
      className={`inline-flex items-center ${currentSize.gap} select-none cursor-pointer group ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={interactive ? { scale: 1.02 } : undefined}
      whileTap={interactive ? { scale: 0.97 } : undefined}
    >
      {/* Royal Emblem Squircle Badge */}
      <div
        className="relative flex items-center justify-center shrink-0"
        style={{ width: currentSize.icon, height: currentSize.icon }}
      >
        {/* Ambient Royal Gold & Sapphire Aura */}
        <motion.div
          animate={{
            scale: isHovered ? [1, 1.2, 1] : [1, 1.08, 1],
            opacity: isHovered ? [0.6, 0.9, 0.6] : [0.35, 0.55, 0.35],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 rounded-2xl blur-md bg-gradient-to-tr from-amber-500 via-indigo-600 to-amber-300 pointer-events-none"
        />

        {/* Squircle SVG Emblem */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full relative z-10 overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Royal Midnight Squircle Gradient */}
            <linearGradient id={`${uid}-royal-bg`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#050714" />
            </linearGradient>

            {/* Left Wing Gradient - Indigo to Sapphire */}
            <linearGradient id={`${uid}-royal-wing-left`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a5b4fc" />
              <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>

            {/* Left Inner Fold - Indigo to Amber Gold */}
            <linearGradient id={`${uid}-royal-inner-left`} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4338ca" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            {/* Right Inner Fold - Amber Gold to Imperial Yellow */}
            <linearGradient id={`${uid}-royal-inner-right`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            {/* Right Wing Gradient - Amber to Emerald-Gold */}
            <linearGradient id={`${uid}-royal-wing-right`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            {/* Apex Diamond Light */}
            <linearGradient id={`${uid}-royal-apex`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fde047" />
            </linearGradient>

            {/* Shimmering Border Gradient */}
            <linearGradient id={`${uid}-royal-border`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>

          {/* Squircle Outer Base */}
          <rect
            x="6"
            y="6"
            width="88"
            height="88"
            rx="24"
            fill={`url(#${uid}-royal-bg)`}
            stroke="#fbbf24"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />

          {/* Animated Orbital Gold Border Circuit */}
          <motion.rect
            x="6"
            y="6"
            width="88"
            height="88"
            rx="24"
            fill="none"
            stroke={`url(#${uid}-royal-border)`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="45 230"
            animate={{
              strokeDashoffset: [0, -275],
            }}
            transition={{
              duration: isHovered ? 2.5 : 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Geometric 'W' Emblem Group */}
          <g>
            {/* Left Stem Wing */}
            <path
              d="M 18 24 L 35 76 L 27 76 L 10 24 Z"
              fill={`url(#${uid}-royal-wing-left)`}
            />

            {/* Left Inner Fold */}
            <path
              d="M 35 76 L 50 42 L 42 42 L 27 76 Z"
              fill={`url(#${uid}-royal-inner-left)`}
            />

            {/* Right Inner Fold */}
            <path
              d="M 50 42 L 65 76 L 73 76 L 58 42 Z"
              fill={`url(#${uid}-royal-inner-right)`}
            />

            {/* Right Stem Wing */}
            <path
              d="M 65 76 L 82 24 L 90 24 L 73 76 Z"
              fill={`url(#${uid}-royal-wing-right)`}
            />

            {/* Faceted Top Arrow Chevrons */}
            <polygon points="10,24 18,24 14,15" fill="#c7d2fe" />
            <polygon points="82,24 90,24 86,15" fill="#fde047" />

            {/* Center Royal Beacon */}
            <motion.polygon
              points="50,34 55,42 50,48 45,42"
              fill={`url(#${uid}-royal-apex)`}
              animate={{
                scale: isHovered ? [1, 1.25, 1] : [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ originX: '50px', originY: '42px' }}
            />

            {/* Core Golden Sparkle */}
            <circle cx="50" cy="42" r="2.5" fill="#ffffff" />
          </g>
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className={`font-black tracking-tight text-white group-hover:text-amber-300 transition-colors duration-300 ${currentSize.text}`}>
              Widecraft{' '}
              <span className="font-extrabold bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                Digital
              </span>
            </span>
            {/* Live Gold Signal Pulse */}
            <span className="relative flex h-2 w-2 ml-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
          </div>
          {subtitle && (
            <span className={`font-medium tracking-wide text-amber-200/70 group-hover:text-amber-200 transition-colors duration-300 ${currentSize.subText}`}>
              {subtitle}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
};
