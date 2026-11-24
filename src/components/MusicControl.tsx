import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, Music2 } from 'lucide-react';
import { soundManager } from '../utils/soundManager';

export const MusicControl: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    // Check initial state
    setIsPlaying(soundManager.getIsPlaying());
    setIsMuted(soundManager.getIsMuted());

    // Update interval check for audio state
    const timer = setInterval(() => {
      setIsPlaying(soundManager.getIsPlaying());
      setIsMuted(soundManager.getIsMuted());
    }, 500);

    return () => clearInterval(timer);
  }, []);

  const handleToggle = () => {
    if (!isPlaying) {
      soundManager.playMusic();
      setIsPlaying(true);
    } else {
      const muted = soundManager.toggleMute();
      setIsMuted(muted);
    }
    soundManager.playChime(600, 'sine');
  };

  return (
    <div className="fixed top-5 right-5 z-50">
      <motion.button
        onClick={handleToggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isPlaying ? (isMuted ? "Unmute romantic background music" : "Mute background music") : "Play romantic background music"}
        className="relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-full glass-card border border-rose-300/30 text-rose-100 shadow-xl backdrop-blur-md hover:border-rose-400/50 transition-all duration-300 group overflow-hidden"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Animated Sound Wave / Music Note */}
        <AnimatePresence mode="wait">
          {isPlaying && !isMuted ? (
            <motion.div
              key="playing"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex items-center gap-1.5"
            >
              <Music className="w-4 h-4 text-rose-400 animate-pulse" />
              <div className="flex items-end gap-0.5 h-3.5">
                <span className="w-0.5 h-full bg-rose-400 animate-[bounce_1s_infinite_100ms]" />
                <span className="w-0.5 h-3/4 bg-rose-300 animate-[bounce_1s_infinite_300ms]" />
                <span className="w-0.5 h-full bg-rose-500 animate-[bounce_1s_infinite_200ms]" />
              </div>
            </motion.div>
          ) : isMuted ? (
            <motion.div
              key="muted"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <VolumeX className="w-4 h-4 text-rose-300/70" />
            </motion.div>
          ) : (
            <motion.div
              key="stopped"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <Music2 className="w-4 h-4 text-rose-300" />
            </motion.div>
          )}
        </AnimatePresence>

        <span className="text-xs font-medium tracking-wide">
          {isPlaying ? (isMuted ? 'Muted' : 'Music ON') : 'Music OFF'}
        </span>
      </motion.button>
    </div>
  );
};
