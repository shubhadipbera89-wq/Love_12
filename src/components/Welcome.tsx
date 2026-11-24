import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Stars } from 'lucide-react';
import { siteContent } from '../config/siteContent';
import { soundManager } from '../utils/soundManager';

interface WelcomeProps {
  onNext: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onNext }) => {
  const content = siteContent.welcome;

  const handleStart = () => {
    soundManager.playChime(587.33, 'sine'); // D5 chime
    if (siteContent.music.autoStartOnSurprise) {
      soundManager.playMusic();
    }
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center z-10"
    >
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-purple-900/30 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Star Constellation Sparks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-300/40"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Stars className="w-4 h-4" />
          </motion.div>
        ))}
      </div>

      {/* Glass Card Container */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="max-w-lg w-full glass-card p-8 md:p-12 rounded-3xl relative border border-rose-300/20 shadow-2xl backdrop-blur-xl"
      >
        {/* Animated Floating Heart Header */}
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-tr from-rose-500 to-rose-700 p-0.5 shadow-lg shadow-rose-600/30 flex items-center justify-center"
        >
          <div className="w-full h-full bg-burgundy-950/80 rounded-full flex items-center justify-center backdrop-blur-md">
            <Heart className="w-10 h-10 text-rose-400 fill-rose-500/30 animate-pulse" />
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-400/20 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>{content.badgeText}</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-rose-200 to-rose-400 mb-4 text-glow"
        >
          {content.heading}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-lg md:text-xl text-rose-200/90 font-light leading-relaxed mb-8"
        >
          {content.subtitle}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={handleStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="w-full sm:w-auto px-8 py-4 rounded-full glass-button text-white font-medium text-lg tracking-wide shadow-lg shadow-rose-600/40 flex items-center justify-center gap-2 mx-auto group cursor-pointer"
        >
          <span>{content.buttonText}</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
