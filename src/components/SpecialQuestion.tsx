import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, HelpCircle } from 'lucide-react';
import { siteContent } from '../config/siteContent';
import { soundManager } from '../utils/soundManager';

interface SpecialQuestionProps {
  onNext: () => void;
}

export const SpecialQuestion: React.FC<SpecialQuestionProps> = ({ onNext }) => {
  const content = siteContent.specialQuestion;

  const handleChoice = (isYes: boolean) => {
    soundManager.playChime(isYes ? 783.99 : 659.25, 'sine');
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center z-10"
    >
      <div className="max-w-md w-full glass-card p-8 md:p-10 rounded-3xl border border-rose-300/20 shadow-2xl relative">
        {/* Animated Icon */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 mx-auto mb-6 rounded-full bg-rose-500/10 border border-rose-400/20 flex items-center justify-center text-rose-300"
        >
          <HelpCircle className="w-8 h-8" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-serif font-bold text-rose-100 mb-3 text-glow"
        >
          {content.heading}
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-rose-200/80 font-light mb-8"
        >
          {content.subheading}
        </motion.p>

        {/* Choice Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => handleChoice(true)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full glass-button text-white font-medium text-base tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 cursor-pointer"
          >
            <span>{content.yesButtonText}</span>
            <Sparkles className="w-4 h-4 text-rose-200" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => handleChoice(false)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full glass-button-secondary text-rose-100 font-medium text-base tracking-wide cursor-pointer"
          >
            <span>{content.maybeButtonText}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
