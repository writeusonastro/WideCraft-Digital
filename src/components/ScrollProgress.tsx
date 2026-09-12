import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-amber-500 via-yellow-400 to-indigo-500 shadow-[0_0_12px_rgba(245,158,11,0.7)]"
        style={{ scaleX }}
      />
    </div>
  );
};
