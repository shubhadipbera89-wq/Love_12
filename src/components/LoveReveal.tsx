import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { siteContent } from '../config/siteContent';
import { soundManager } from '../utils/soundManager';
import { fireHeartBurst, fireRomanticConfetti } from '../utils/confetti';
import { RosePetals } from './RosePetals';

interface LoveRevealProps {
  onNext: () => void;
}

export const LoveReveal: React.FC<LoveRevealProps> = ({ onNext }) => {
  const content = siteContent.loveReveal;
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // Wait 2 seconds before triggering the grand reveal
    const timer = setTimeout(() => {
      setIsRevealed(true);
      soundManager.playHeartChord();
      fireHeartBurst();
      fireRomanticConfetti();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    soundManager.playChime(659.25, 'sine');
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center z-10 overflow-hidden"
    >
      {/* Rose Petal & Sparkle overlay upon reveal */}
      <RosePetals active={isRevealed} count={35} />

      {/* Massive Glowing Ambient Orbs */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-3xl transition-all duration-1000 pointer-events-none ${isRevealed ? 'bg-gradient-to-tr from-rose-500/40 to-pink-500/30 scale-125' : 'bg-burgundy-900/20 scale-75'}`} />

      <AnimatePresence mode="wait">
        {!isRevealed ? (
          /* 2-Second Suspense Teaser */
          <motion.div
            key="teaser"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 mx-auto rounded-full bg-rose-500/10 border border-rose-400/20 flex items-center justify-center text-rose-300"
            >
              <Sparkles className="w-8 h-8" />
            </motion.div>

            <h2 className="text-2xl sm:text-4xl font-serif font-medium text-rose-200/90 tracking-wide italic">
              {content.teaserText}
            </h2>
          </motion.div>
        ) : (
          /* Grand "I LOVE YOU 🤗❤️" Reveal */
          <motion.div
            key="grand-reveal"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="max-w-2xl w-full glass-card p-8 sm:p-14 rounded-3xl border border-rose-300/40 shadow-2xl relative space-y-8"
          >
            {/* Pulsing Heart Emblem */}
            <motion.div
              animate={{ scale: [1, 1.25, 1, 1.2, 1] }}
              transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 p-1 shadow-2xl shadow-rose-500/60 flex items-center justify-center"
            >
              <div className="w-full h-full bg-burgundy-950/80 rounded-full flex items-center justify-center backdrop-blur-md">
                <Heart className="w-12 h-12 text-rose-300 fill-rose-500" />
              </div>
            </motion.div>

            {/* Huge Glowing Text */}
            <div className="space-y-4">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-pink-200 to-white text-glow leading-tight"
              >
                {content.bigText}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg sm:text-2xl text-rose-200 font-serif italic font-light"
              >
                {content.subtitle}
              </motion.p>
            </div>

            {/* Next Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="pt-4"
            >
              <button
                onClick={handleNext}
                className="px-8 py-4 rounded-full glass-button text-white font-medium text-base tracking-wide flex items-center justify-center gap-2 mx-auto shadow-lg shadow-rose-600/40 cursor-pointer"
              >
                <span>{content.buttonText}</span>
                <ArrowRight className="w-5 h-5 text-rose-200" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
