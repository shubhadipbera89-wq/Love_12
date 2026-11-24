import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';
import { siteContent } from '../config/siteContent';
import { TypewriterText } from './TypewriterText';
import { soundManager } from '../utils/soundManager';
import { fireHeartBurst } from '../utils/confetti';

interface FinalMessageProps {
  onRestart: () => void;
}

export const FinalMessage: React.FC<FinalMessageProps> = ({ onRestart }) => {
  const content = siteContent.finalMessage;
  const [showThankYou, setShowThankYou] = useState(false);

  const handleRestart = () => {
    soundManager.playChime(523.25, 'sine');
    onRestart();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center z-10"
    >
      <div className="max-w-xl w-full glass-card p-8 sm:p-12 rounded-3xl border border-rose-300/30 shadow-2xl relative">
        {/* Line by line text reveal */}
        <div className="text-xl sm:text-2xl font-serif text-rose-100 italic leading-relaxed mb-8">
          <TypewriterText
            lines={content.lines}
            speed={40}
            lineDelay={600}
            onComplete={() => {
              setShowThankYou(true);
              fireHeartBurst();
            }}
          />
        </div>

        {/* Thank You and Final Reveal */}
        <AnimatePresence>
          {showThankYou && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 pt-4 border-t border-rose-300/20"
            >
              <p className="text-lg sm:text-xl text-rose-200 font-serif">
                {content.thankYouText}
              </p>

              <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-200 to-white text-glow">
                {content.finalHeartText}
              </h1>

              {/* Glowing Pulsing Animated Heart Emblem */}
              <motion.div
                animate={{ scale: [1, 1.25, 1, 1.2, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 p-1 shadow-2xl shadow-rose-500/60 flex items-center justify-center cursor-pointer"
                onClick={() => fireHeartBurst()}
              >
                <div className="w-full h-full bg-burgundy-950/80 rounded-full flex items-center justify-center backdrop-blur-md">
                  <Heart className="w-10 h-10 text-rose-300 fill-rose-500" />
                </div>
              </motion.div>

              {/* Replay Button */}
              <div className="pt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRestart}
                  className="px-6 py-3 rounded-full glass-button-secondary text-rose-200 font-medium text-sm tracking-wide inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-rose-300" />
                  <span>{content.replayButtonText}</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
