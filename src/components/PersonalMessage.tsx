import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import { siteContent } from '../config/siteContent';
import { TypewriterText } from './TypewriterText';
import { soundManager } from '../utils/soundManager';

interface PersonalMessageProps {
  onNext: () => void;
}

export const PersonalMessage: React.FC<PersonalMessageProps> = ({ onNext }) => {
  const content = siteContent.personalMessage;
  const [showButton, setShowButton] = useState(false);

  const handleNext = () => {
    soundManager.playChime(659.25, 'sine'); // E5 chime
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center z-10"
    >
      <div className="max-w-xl w-full glass-card p-8 md:p-12 rounded-3xl border border-rose-300/20 shadow-2xl relative">
        {/* Heart Accent */}
        <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-rose-500/10 border border-rose-400/20 flex items-center justify-center text-rose-400">
          <Heart className="w-6 h-6 fill-rose-500/30" />
        </div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-serif font-bold text-rose-100 mb-8 text-glow"
        >
          {content.heading}
        </motion.h2>

        {/* Typewriter Body */}
        <div className="text-left text-lg md:text-xl text-rose-200/90 font-serif leading-relaxed italic my-6 px-2 sm:px-6">
          <TypewriterText
            lines={content.lines}
            speed={35}
            lineDelay={400}
            onComplete={() => setShowButton(true)}
          />
        </div>

        {/* Continue Button */}
        <div className="mt-8 min-h-[50px]">
          {showButton ? (
            <motion.button
              onClick={handleNext}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 rounded-full glass-button text-white font-medium text-base tracking-wide flex items-center justify-center gap-2 mx-auto shadow-lg shadow-rose-600/30 cursor-pointer"
            >
              <span>{content.buttonText}</span>
              <ArrowRight className="w-4 h-4 text-rose-200" />
            </motion.button>
          ) : (
            <button
              onClick={() => setShowButton(true)}
              className="text-xs text-rose-300/50 hover:text-rose-300 underline cursor-pointer transition-colors"
            >
              Skip animation
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
