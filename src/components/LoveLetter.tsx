import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, Feather, ChevronDown, Code2, GitCommit, Users, HeartHandshake } from 'lucide-react';
import { siteContent } from '../config/siteContent';
import { soundManager } from '../utils/soundManager';
import { fireHeartBurst, fireRomanticConfetti } from '../utils/confetti';
import { RosePetals } from './RosePetals';

interface LoveLetterProps {
  onNext: () => void;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ onNext }) => {
  const content = siteContent.loveLetter;
  const [isOpen, setIsOpen] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  const handleOpenLetter = () => {
    soundManager.playHeartChord();
    setIsOpen(true);
    setTimeout(() => {
      letterRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  const handleContinue = () => {
    soundManager.playHeartChord();
    fireHeartBurst();
    fireRomanticConfetti();
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 text-center z-10 my-8 overflow-hidden"
    >
      {/* Rose Petals and Ambient Glow */}
      <RosePetals active={isOpen} count={24} />

      <div
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full blur-3xl pointer-events-none transition-all duration-1000 ${
          isOpen ? 'bg-gradient-to-tr from-rose-500/25 via-pink-600/20 to-burgundy-900/30 scale-125' : 'bg-rose-700/15'
        }`}
      />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* ========================================================================= */
          /* STAGE 1: Sealed Romantic Envelope Experience                              */
          /* ========================================================================= */
          <motion.div
            key="envelope-stage"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md w-full glass-card p-8 sm:p-12 rounded-3xl border border-rose-300/30 shadow-2xl relative text-center group"
          >
            {/* Animated 3D Envelope with Wax Heart Seal */}
            <motion.div
              whileHover={{ scale: 1.06, rotate: [0, -2, 2, 0] }}
              className="w-28 h-28 mx-auto mb-6 rounded-3xl bg-gradient-to-tr from-rose-600 via-rose-700 to-burgundy-900 border-2 border-rose-300/40 shadow-2xl flex items-center justify-center relative cursor-pointer group-hover:border-rose-400/70 transition-all duration-300"
              onClick={handleOpenLetter}
            >
              <Mail className="w-14 h-14 text-rose-100 group-hover:text-white transition-colors" />
              
              {/* Wax Seal Badge */}
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 border-2 border-rose-200 text-white flex items-center justify-center shadow-lg"
              >
                <Heart className="w-5 h-5 fill-white" />
              </motion.div>
            </motion.div>

            {/* Prompt Text */}
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-rose-100 mb-3 text-glow">
              {content.envelopePrompt}
            </h2>
            <p className="text-xs sm:text-sm text-rose-200/80 font-light mb-8">
              A personal handwritten letter written straight from the heart.
            </p>

            {/* Open Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenLetter}
              className="w-full sm:w-auto px-10 py-4 rounded-full glass-button text-white font-bold text-lg tracking-wide shadow-xl shadow-rose-600/50 flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>{content.openButtonText}</span>
            </motion.button>
          </motion.div>
        ) : (
          /* ========================================================================= */
          /* STAGE 2: Full Handwritten-Style Digital Love Letter                      */
          /* ========================================================================= */
          <motion.div
            key="letter-stage"
            ref={letterRef}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl w-full text-left"
          >
            {/* Scroll Notice */}
            <div className="text-center mb-4 text-xs font-mono text-rose-300/70 flex items-center justify-center gap-1.5 animate-pulse">
              <span>Scroll to read the full letter</span>
              <ChevronDown className="w-4 h-4" />
            </div>

            {/* Main Letter Card */}
            <div className="glass-card p-6 sm:p-12 md:p-14 rounded-3xl border border-rose-300/30 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
              {/* Paper Top Corner Decoration */}
              <div className="flex items-center justify-between border-b border-rose-300/20 pb-4 mb-8">
                <div className="flex items-center gap-2 text-rose-300">
                  <Feather className="w-5 h-5 text-rose-400" />
                  <span className="font-handwriting text-2xl text-rose-200">A Letter From My Heart</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-400/20 text-rose-300 text-xs font-mono">
                  <Code2 className="w-3.5 h-3.5 text-rose-400" />
                  <span>from_my_heart.tsx</span>
                </div>
              </div>

              {/* Salutation */}
              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-4xl font-serif font-bold text-rose-100 text-glow mb-8"
              >
                {content.title}
              </motion.h1>

              {/* Letter Paragraphs */}
              <div className="space-y-6 text-base sm:text-lg text-rose-100 font-serif leading-relaxed italic">
                {content.paragraphs.map((p, idx) => {
                  if (p.isHighlight) {
                    // Special highlighted callout blocks
                    return (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="my-6 p-5 sm:p-7 rounded-2xl bg-gradient-to-r from-rose-600/20 via-pink-600/15 to-purple-600/20 border border-rose-400/40 shadow-xl shadow-rose-600/15 text-center relative overflow-hidden not-italic group"
                      >
                        <div className="absolute top-2 right-3 opacity-20 group-hover:opacity-40 transition-opacity">
                          {p.highlightType === 'commit' && <GitCommit className="w-6 h-6 text-rose-300" />}
                          {p.highlightType === 'love' && <Heart className="w-6 h-6 text-rose-300" />}
                          {p.highlightType === 'teammate' && <HeartHandshake className="w-6 h-6 text-rose-300" />}
                          {p.highlightType === 'code' && <Code2 className="w-6 h-6 text-rose-300" />}
                        </div>

                        <p className="text-xl sm:text-2xl md:text-3xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-pink-200 to-white text-glow leading-snug whitespace-pre-line">
                          {p.text}
                        </p>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.p
                      key={p.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.03 }}
                      className="whitespace-pre-line"
                    >
                      {p.text}
                    </motion.p>
                  );
                })}
              </div>

              {/* Signature Section */}
              <div className="border-t border-rose-300/20 pt-6 mt-10 flex flex-col items-end text-right">
                <p className="text-sm text-rose-300/80 font-serif italic mb-1">
                  {content.signaturePrefix}
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-handwriting text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-pink-300 font-bold text-glow">
                    {content.signature}
                  </span>
                </div>
              </div>

              {/* Final Continue CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="pt-10 text-center"
              >
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={handleContinue}
                  className="px-10 py-4 rounded-full glass-button text-white font-bold text-lg tracking-wide shadow-xl shadow-rose-600/40 flex items-center justify-center gap-2 mx-auto cursor-pointer"
                >
                  <span>{content.continueButtonText}</span>
                  <Sparkles className="w-5 h-5 text-rose-200" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
