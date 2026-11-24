import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface HeartParticle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  rotate: number;
  symbol: string;
}

export const FloatingHearts: React.FC<{ count?: number }> = ({ count = 20 }) => {
  const particles = useMemo<HeartParticle[]>(() => {
    const symbols = ['❤️', '💖', '💕', '✨', '🌸', '💘'];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      size: Math.random() * 16 + 12, // px
      duration: Math.random() * 10 + 8, // seconds
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.2,
      rotate: Math.random() * 360,
      symbol: symbols[Math.floor(Math.random() * symbols.length)]
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-center select-none"
          style={{
            left: `${p.x}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
          }}
          initial={{ y: '110vh', rotate: p.rotate, opacity: 0 }}
          animate={{
            y: '-10vh',
            rotate: p.rotate + 180,
            x: [0, Math.sin(p.id) * 30, 0],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        >
          {p.symbol}
        </motion.div>
      ))}
    </div>
  );
};
