import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, className = '' }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Parse numeric part if present
          const match = value.match(/([^\d]*)([\d,.]+)(.*)/);
          if (match) {
            const prefix = match[1];
            const rawNum = parseFloat(match[2].replace(/,/g, ''));
            const suffix = match[3];

            if (!isNaN(rawNum)) {
              let start = 0;
              const duration = 1200; // ms
              const startTime = performance.now();
              const isDecimal = match[2].includes('.');

              const updateCount = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out expo
                const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                const current = start + (rawNum - start) * easeProgress;

                const formattedNum = isDecimal ? current.toFixed(1) : Math.round(current).toLocaleString('en-IN');
                setDisplayValue(`${prefix}${formattedNum}${suffix}`);

                if (progress < 1) {
                  requestAnimationFrame(updateCount);
                } else {
                  setDisplayValue(value);
                }
              };

              requestAnimationFrame(updateCount);
            }
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={elementRef} className={className}>
      {displayValue}
    </span>
  );
};
