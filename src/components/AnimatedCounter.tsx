import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  delay?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, duration = 1.8, delay = 0 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [displayValue, setDisplayValue] = useState<string>(() => {
    // Start with 0 in the formatted shape (e.g., "0%", "0 FPS", "0M+", "< 0 MS")
    const match = value.match(/^([^0-9.]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
    if (!match) return value;
    const prefix = match[1] || '';
    const isDecimal = match[2].includes('.');
    const suffix = match[3] || '';
    return `${prefix}${isDecimal ? '0.0' : '0'}${suffix}`;
  });

  useEffect(() => {
    if (!isInView) return;

    // Parse prefix, number (integer or decimal), and suffix
    const match = value.match(/^([^0-9.]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1] || '';
    const targetNum = parseFloat(match[2]);
    const suffix = match[3] || '';
    const isDecimal = match[2].includes('.');
    const decimals = isDecimal ? match[2].split('.')[1].length : 0;

    let startTimestamp: number | null = null;
    let animFrameId: number;
    const animDuration = duration * 1000;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / animDuration, 1);
      // Smooth deceleration curve (cubic ease-out)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentNum = easeProgress * targetNum;
      
      const formattedNum = isDecimal ? currentNum.toFixed(decimals) : Math.floor(currentNum).toString();
      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        animFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    const timer = setTimeout(() => {
      animFrameId = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, [isInView, value, duration, delay]);

  return <span ref={ref}>{displayValue}</span>;
};
