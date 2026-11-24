import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Terminal, Code2, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';
import { siteContent } from '../config/siteContent';
import { soundManager } from '../utils/soundManager';
import { fireHeartBurst, fireRomanticConfetti } from '../utils/confetti';
import { RosePetals } from './RosePetals';

interface LoveCodePoemProps {
  onNext: () => void;
}

interface CodeParticle {
  id: number;
  text: string;
  x: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const LoveCodePoem: React.FC<LoveCodePoemProps> = ({ onNext }) => {
  const content = siteContent.lovePoem;

  // Paragraph reveal index (0 to 4)
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState<number>(0);
  const [isPoemFinished, setIsPoemFinished] = useState<boolean>(false);
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  
  // Proposal response states
  const [hasSaidYes, setHasSaidYes] = useState<boolean>(false);
  const [noCount, setNoCount] = useState<number>(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Matrix-style falling romantic code & binary particles
  const codeParticles = useMemo<CodeParticle[]>(() => {
    const snippets = [
      '01001100 01101111 01110110 01100101', // "Love" in binary
      '</>',
      '{ heart: ∞ }',
      'const you = "my_world";',
      'while (alive) { love(you); }',
      'await connect(heart);',
      '01011001 01001111 01010101', // "YOU"
      'status: 200 OK ❤️',
      'git commit -m "forever"',
      '❤️',
      '✨',
      'ping: 0ms (always close)',
    ];

    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      text: snippets[i % snippets.length],
      x: Math.random() * 95,
      duration: Math.random() * 8 + 7,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.4 + 0.15,
    }));
  }, []);

  // Automatic paragraph progression with smooth timing
  useEffect(() => {
    if (currentParagraphIndex < content.paragraphs.length - 1) {
      const timer = setTimeout(() => {
        setCurrentParagraphIndex((prev) => prev + 1);
        soundManager.playChime(523.25 + currentParagraphIndex * 40, 'sine');
      }, 3400);
      return () => clearTimeout(timer);
    } else if (currentParagraphIndex === content.paragraphs.length - 1 && !isPoemFinished) {
      const timer = setTimeout(() => {
        setIsPoemFinished(true);
        // Dramatic pause before revealing question
        setTimeout(() => {
          setShowQuestion(true);
          soundManager.playChime(783.99, 'sine');
        }, 1800);
      }, 3600);
      return () => clearTimeout(timer);
    }
  }, [currentParagraphIndex, content.paragraphs.length, isPoemFinished]);

  const handleSkipPoem = () => {
    setCurrentParagraphIndex(content.paragraphs.length - 1);
    setIsPoemFinished(true);
    setShowQuestion(true);
    soundManager.playChime(659.25, 'sine');
  };

  const handleYes = () => {
    setHasSaidYes(true);
    soundManager.playHeartChord();
    fireHeartBurst();
    fireRomanticConfetti();
  };

  const handleNo = () => {
    soundManager.playChime(320, 'triangle');
    setNoCount((prev) => prev + 1);
    // Move playfully to safe random offset
    const randomX = (Math.random() - 0.5) * 220;
    const randomY = (Math.random() - 0.5) * 160;
    setNoPosition({ x: randomX, y: randomY });
  };

  const currentNoToast = content.noDodges[noCount % content.noDodges.length];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 text-center z-10 my-8 overflow-hidden"
    >
      {/* Rose Petals active during YES celebration or question reveal */}
      <RosePetals active={hasSaidYes || showQuestion} count={hasSaidYes ? 40 : 16} />

      {/* Futuristic Romantic Cyber Glow Orbs */}
      <div
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none transition-all duration-1000 ${
          hasSaidYes ? 'bg-gradient-to-tr from-rose-500/40 via-pink-600/30 to-purple-700/30 scale-125' : 'bg-rose-700/15'
        }`}
      />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-950/30 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Matrix Romantic Code Rain Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
        {codeParticles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute font-mono text-[11px] sm:text-xs text-rose-400/40 tracking-wider whitespace-nowrap"
            style={{
              left: `${p.x}%`,
              opacity: p.opacity,
            }}
            initial={{ y: '-10vh' }}
            animate={{
              y: '110vh',
              opacity: [0, p.opacity, p.opacity, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'linear',
            }}
          >
            {p.text}
          </motion.div>
        ))}
      </div>

      <div className="max-w-2xl w-full relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs font-mono font-medium uppercase tracking-wider mb-3 shadow-sm backdrop-blur-md">
            <Cpu className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>My Heart Is Coded For You</span>
            <span className="text-rose-400/60">::</span>
            <Code2 className="w-3.5 h-3.5 text-pink-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-rose-100 text-glow">
            {content.title}
          </h2>
        </motion.div>

        {/* Romantic Terminal / IDE Poetry Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="glass-card rounded-3xl border border-rose-300/30 shadow-2xl overflow-hidden backdrop-blur-xl relative text-left mb-8"
        >
          {/* Terminal Window Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-burgundy-950/90 border-b border-rose-400/20 text-xs text-rose-300/80 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 shadow-[0_0_6px_rgba(244,63,94,0.8)] inline-block" />
              <span className="w-3 h-3 rounded-full bg-pink-400/80 shadow-[0_0_6px_rgba(244,114,182,0.8)] inline-block" />
              <span className="w-3 h-3 rounded-full bg-purple-400/80 shadow-[0_0_6px_rgba(192,132,252,0.8)] inline-block" />
              <span className="ml-2 text-rose-200/90 font-medium hidden sm:inline-block">
                {content.terminalTitle}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-400/20">
                <Terminal className="w-3 h-3" />
                <span>running</span>
              </span>
            </div>
          </div>

          {/* Poetry Content Area */}
          <div className="p-6 sm:p-8 space-y-6">
            {content.paragraphs.map((paragraph, index) => {
              const isVisible = index <= currentParagraphIndex;
              const isCurrent = index === currentParagraphIndex;

              if (!isVisible) return null;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className={`relative flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl transition-all duration-500 ${
                    isCurrent && !isPoemFinished
                      ? 'bg-rose-500/10 border border-rose-400/30 shadow-lg shadow-rose-500/10'
                      : 'bg-transparent border border-transparent'
                  }`}
                >
                  {/* Line Number */}
                  <span className="font-mono text-xs text-rose-400/50 mt-1 select-none shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Poetry Paragraph */}
                  <div className="flex-1 text-base sm:text-lg text-rose-100 font-serif leading-relaxed whitespace-pre-line italic">
                    {paragraph}
                  </div>

                  {/* Active Blinking Cursor on Latest Line */}
                  {isCurrent && !isPoemFinished && (
                    <span className="w-2 h-5 bg-rose-400 animate-pulse rounded-full shrink-0 mt-1" />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Skip animation button if poem is still typing */}
          {!showQuestion && !isPoemFinished && (
            <div className="px-6 pb-4 text-right">
              <button
                onClick={handleSkipPoem}
                className="text-xs font-mono text-rose-300/50 hover:text-rose-200 underline transition-colors cursor-pointer"
              >
                Skip to question →
              </button>
            </div>
          )}
        </motion.div>

        {/* Dramatic Question & Forever Partner Proposal */}
        <AnimatePresence mode="wait">
          {showQuestion && !hasSaidYes && (
            <motion.div
              key="question-box"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              className="glass-card p-6 sm:p-10 rounded-3xl border border-rose-300/40 shadow-2xl relative space-y-6"
            >
              {/* Pulsing Heart Emblem */}
              <motion.div
                animate={{ scale: [1, 1.22, 1, 1.15, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 p-0.5 shadow-xl shadow-rose-500/50 flex items-center justify-center"
              >
                <div className="w-full h-full bg-burgundy-950/80 rounded-full flex items-center justify-center backdrop-blur-md">
                  <Heart className="w-9 h-9 text-rose-300 fill-rose-500" />
                </div>
              </motion.div>

              {/* Glowing Climax Question */}
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-pink-200 to-white text-glow">
                  {content.question}
                </h3>
              </div>

              {/* Cute Toast Message if NO button clicked/hovered */}
              {noCount > 0 && (
                <motion.div
                  key={noCount}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-200 text-xs sm:text-sm font-medium font-mono"
                >
                  <span>{currentNoToast}</span>
                </motion.div>
              )}

              {/* Interactive Choice Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 min-h-[70px] relative pt-2">
                {/* YES Button */}
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleYes}
                  className="w-full sm:w-auto px-10 py-4 rounded-full glass-button text-white font-bold text-lg tracking-wide shadow-xl shadow-rose-600/50 flex items-center justify-center gap-2 cursor-pointer z-10"
                >
                  <Heart className="w-5 h-5 fill-white" />
                  <span>{content.yesButtonText}</span>
                </motion.button>

                {/* NO Button (Playfully Evasive) */}
                <motion.button
                  animate={{ x: noPosition.x, y: noPosition.y }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  onMouseEnter={handleNo}
                  onClick={handleNo}
                  onTouchStart={handleNo}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full glass-button-secondary text-rose-200/80 font-medium text-base tracking-wide cursor-pointer transition-colors"
                >
                  <span>{content.noButtonText}</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* YES Success & Connection Established State */}
          {hasSaidYes && (
            <motion.div
              key="connection-established"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="glass-card p-8 sm:p-12 rounded-3xl border border-rose-300/50 shadow-2xl relative space-y-6 text-center"
            >
              {/* Animated Connection Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-xl shadow-rose-500/60"
              >
                <CheckCircle2 className="w-10 h-10" />
              </motion.div>

              <div className="space-y-3">
                <motion.h3
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl sm:text-4xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-pink-200 to-white text-glow"
                >
                  {content.connectionEstablished}
                </motion.h3>

                <motion.p
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg sm:text-xl text-rose-200 font-serif italic"
                >
                  {content.connectionSuccess}
                </motion.p>

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="pt-2"
                >
                  <span className="text-3xl sm:text-5xl font-serif font-extrabold text-rose-100 text-glow inline-block">
                    {content.loveRevealText}
                  </span>
                </motion.div>
              </div>

              {/* Continue to Love Letter */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="pt-4"
              >
                <button
                  onClick={() => {
                    soundManager.playChime(659.25, 'sine');
                    onNext();
                  }}
                  className="px-8 py-4 rounded-full glass-button text-white font-medium text-base tracking-wide flex items-center justify-center gap-2 mx-auto shadow-lg shadow-rose-600/40 cursor-pointer"
                >
                  <span>{content.continueButtonText}</span>
                  <ArrowRight className="w-5 h-5 text-rose-200" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
