import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  lines: string[];
  speed?: number; // ms per char
  lineDelay?: number; // ms delay between lines
  onComplete?: () => void;
  className?: string;
  lineClassName?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  lines,
  speed = 40,
  lineDelay = 500,
  onComplete,
  className = '',
  lineClassName = '',
}) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState<string[]>(lines.map(() => ''));
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsFinished(true);
      if (onComplete) onComplete();
      return;
    }

    const currentFullLine = lines[currentLineIndex];
    let charIndex = 0;

    const interval = setInterval(() => {
      if (charIndex <= currentFullLine.length) {
        const textSlice = currentFullLine.slice(0, charIndex);
        setDisplayedText((prev) => {
          const next = [...prev];
          next[currentLineIndex] = textSlice;
          return next;
        });
        charIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
        }, lineDelay);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [currentLineIndex, lines, speed, lineDelay, onComplete]);

  return (
    <div className={`space-y-4 ${className}`}>
      {lines.map((_, idx) => (
        <div key={idx} className={`min-h-[1.75em] ${lineClassName}`}>
          {displayedText[idx] && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {displayedText[idx]}
            </motion.span>
          )}
          {idx === currentLineIndex && !isFinished && (
            <span className="inline-block w-2 h-5 ml-1 bg-rose-400 animate-pulse align-middle rounded-full" />
          )}
        </div>
      ))}
    </div>
  );
};
