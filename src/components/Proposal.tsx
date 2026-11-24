import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { siteContent } from '../config/siteContent';
import { soundManager } from '../utils/soundManager';
import { fireHeartBurst, fireRomanticConfetti } from '../utils/confetti';
import { RosePetals } from './RosePetals';

interface ProposalProps {
  onNext: () => void;
}

export const Proposal: React.FC<ProposalProps> = ({ onNext }) => {
  const content = siteContent.proposal;
  const [hasSaidYes, setHasSaidYes] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleYes = () => {
    setHasSaidYes(true);
    soundManager.playHeartChord();
    fireHeartBurst();
    fireRomanticConfetti();
  };

  const handleNoInteraction = () => {
    soundManager.playChime(350, 'triangle');
    setNoCount((prev) => prev + 1);
    
    // Calculate random dodge displacement (-100 to 100 px)
    const randomX = (Math.random() - 0.5) * 220;
    const randomY = (Math.random() - 0.5) * 160;
    setNoPosition({ x: randomX, y: randomY });
  };

  const currentNoToast = content.noDodges[noCount % content.noDodges.length];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 text-center z-10"
    >
      {/* Rose Petals when YES is triggered */}
      <RosePetals active={hasSaidYes} count={35} />

      {/* Background Pulse Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full blur-3xl transition-all duration-1000 pointer-events-none ${hasSaidYes ? 'bg-rose-500/30 scale-125' : 'bg-rose-700/20'}`} />

      <div className="max-w-xl w-full glass-card p-8 md:p-12 rounded-3xl border border-rose-300/30 shadow-2xl relative overflow-hidden">
        {/* Top Decorative Emblem */}
        <motion.div
          animate={hasSaidYes ? { scale: [1, 1.25, 1], rotate: [0, 10, -10, 0] } : { y: [-4, 4, -4] }}
          transition={{ duration: hasSaidYes ? 1.2 : 3, repeat: Infinity }}
          className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-500 ${hasSaidYes ? 'bg-gradient-to-r from-rose-500 to-pink-500 shadow-xl shadow-rose-500/50' : 'bg-rose-500/10 border border-rose-400/20'}`}
        >
          <Heart className={`w-10 h-10 ${hasSaidYes ? 'text-white fill-white animate-bounce' : 'text-rose-400 fill-rose-500/40'}`} />
        </motion.div>

        <AnimatePresence mode="wait">
          {!hasSaidYes ? (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Suspense Pre-Text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-sm uppercase tracking-widest text-rose-300/80 font-medium mb-3"
              >
                {content.preText}
              </motion.p>

              {/* Main Question */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-3xl sm:text-4xl font-serif font-bold text-rose-50 mb-8 text-glow leading-tight"
              >
                {content.question}
              </motion.h2>

              {/* Cute dodge toast message if NO clicked/hovered */}
              {noCount > 0 && (
                <motion.div
                  key={noCount}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 inline-block px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-200 text-xs sm:text-sm font-medium"
                >
                  <span>{currentNoToast}</span>
                </motion.div>
              )}

              {/* Interactive Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 min-h-[80px] relative">
                {/* YES Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleYes}
                  className="w-full sm:w-auto px-10 py-4 rounded-full glass-button text-white font-bold text-lg tracking-wide shadow-xl shadow-rose-600/50 flex items-center justify-center gap-2 cursor-pointer z-10"
                >
                  <Heart className="w-5 h-5 fill-white" />
                  <span>{content.yesButtonText}</span>
                </motion.button>

                {/* Evasive Playful NO Button */}
                <motion.button
                  animate={{ x: noPosition.x, y: noPosition.y }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  onMouseEnter={handleNoInteraction}
                  onClick={handleNoInteraction}
                  onTouchStart={handleNoInteraction}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full glass-button-secondary text-rose-200/80 font-medium text-base tracking-wide cursor-pointer transition-colors"
                >
                  <span>{content.noButtonText}</span>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            /* YES Celebration State */
            <motion.div
              key="yes-response"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-200 to-white text-glow">
                {content.yesResponseHeading}
              </h2>
              <p className="text-xl sm:text-2xl text-rose-200 font-serif italic">
                {content.yesResponseSubtitle}
              </p>

              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    soundManager.playChime(659.25, 'sine');
                    onNext();
                  }}
                  className="px-8 py-4 rounded-full glass-button text-white font-medium text-base tracking-wide flex items-center justify-center gap-2 mx-auto shadow-lg shadow-rose-600/40 cursor-pointer"
                >
                  <span>{content.continueButtonText}</span>
                  <ArrowRight className="w-5 h-5 text-rose-200" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
