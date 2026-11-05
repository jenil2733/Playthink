import React, { useState, useEffect, useRef } from 'react';

export interface ScrambleTextProps {
  /** The final string to reveal */
  text: string;
  /** Optional Tailwind / CSS classes */
  className?: string;
  /** Optional inline styles */
  style?: React.CSSProperties;
  /** Total animation duration in milliseconds (default: 600ms) */
  duration?: number;
  /** Custom characters to cycle through during scramble */
  scrambleChars?: string;
}

// Clean high-tech ASCII cyber glyphs that render razor-sharp on all platforms
const DEFAULT_CHARS = '01#/_<>[]*XPT!+';

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  style,
  duration = 600,
  scrambleChars = DEFAULT_CHARS,
}) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    let startTime: number | null = null;
    const len = text.length;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Compute how many characters are locked in from left to right
      const lockedCount = Math.floor(progress * len);

      let scrambled = '';
      for (let i = 0; i < len; i++) {
        const targetChar = text[i];

        // Preserve spaces and whitespace
        if (targetChar === ' ' || targetChar === '\n' || targetChar === '\t') {
          scrambled += targetChar;
          continue;
        }

        if (i < lockedCount) {
          // Locked characters on the left
          scrambled += targetChar;
        } else {
          // Unlocked characters on the right cycle through cybernetic glyphs
          const randomChar = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          scrambled += randomChar;
        }
      }

      setDisplayText(scrambled);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(text); // Ensure final string is 100% accurate
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [text, duration, scrambleChars]);

  return (
    <span style={style} className={`inline-block select-none ${className}`}>
      {displayText}
    </span>
  );
};

export default ScrambleText;

