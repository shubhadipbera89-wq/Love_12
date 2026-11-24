import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, ChevronDown, CheckCircle2 } from 'lucide-react';
import { siteContent, SpecialReason } from '../config/siteContent';
import { soundManager } from '../utils/soundManager';

interface ReasonsProps {
  onNext: () => void;
}

export const Reasons: React.FC<ReasonsProps> = ({ onNext }) => {
  const content = siteContent.reasons;
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    soundManager.playChime(659.25, 'sine');
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleNext = () => {
    soundManager.playChime(783.99, 'sine');
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 text-center z-10 my-10"
    >
      <div className="max-w-2xl w-full">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/20 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-500/30" />
            <span>5 Special Reasons</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-rose-100 text-glow mb-2">
            {content.heading}
          </h2>
          <p className="text-rose-200/80 text-sm sm:text-base font-light">
            {content.subheading}
          </p>
        </motion.div>

        {/* Interactive Cards List */}
        <div className="space-y-4 mb-10 text-left">
          {content.cards.map((card: SpecialReason, idx: number) => {
            const isExpanded = expandedId === card.id;

            return (
              <motion.div
                key={card.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => toggleCard(card.id)}
                className={`glass-card rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${isExpanded ? 'border-rose-400/60 bg-burgundy-900/60 shadow-xl shadow-rose-600/20' : 'border-rose-300/20 hover:border-rose-300/40'}`}
              >
                <div className="p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl sm:text-4xl select-none">{card.icon}</span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-serif font-semibold text-rose-100">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-rose-200/70 font-light mt-0.5">
                        {card.shortDesc}
                      </p>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-300 shrink-0"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </div>

                {/* Expanded Full Message */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-rose-300/20 px-5 py-4 bg-burgundy-950/40"
                    >
                      <p className="text-sm sm:text-base text-rose-100 font-serif leading-relaxed italic">
                        "{card.fullMessage}"
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={handleNext}
            className="px-8 py-3.5 rounded-full glass-button text-white font-medium text-base tracking-wide flex items-center justify-center gap-2 mx-auto shadow-lg shadow-rose-600/30 cursor-pointer"
          >
            <span>{content.buttonText}</span>
            <Sparkles className="w-4 h-4 text-rose-200" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};
