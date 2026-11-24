import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Petal {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
  color: string;
}

export const RosePetals: React.FC<{ active?: boolean; count?: number }> = ({ active = true, count = 25 }) => {
  const petals = useMemo<Petal[]>(() => {
    const colors = ['#ff4d6d', '#c9184a', '#ff758f', '#ffb3c6', '#800f2e'];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 14 + 10,
      duration: Math.random() * 6 + 5,
      delay: Math.random() * 4,
      rotate: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, [count]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-tl-full rounded-br-full shadow-sm select-none"
          style={{
            left: `${p.x}%`,
            width: `${p.size}px`,
            height: `${p.size * 1.4}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 10px ${p.color}80`,
          }}
          initial={{ y: '-10vh', rotate: p.rotate, opacity: 0 }}
          animate={{
            y: '110vh',
            rotate: p.rotate + 360,
            x: [0, Math.sin(p.id) * 50, -Math.sin(p.id) * 30, 0],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};
