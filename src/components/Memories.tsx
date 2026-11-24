import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ZoomIn, Heart, Sparkles } from 'lucide-react';
import { siteContent, MemoryCard } from '../config/siteContent';
import { soundManager } from '../utils/soundManager';

interface MemoriesProps {
  onNext: () => void;
}

export const Memories: React.FC<MemoriesProps> = ({ onNext }) => {
  const content = siteContent.memories;
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryCard | null>(null);

  const handleCardClick = (photo: MemoryCard) => {
    soundManager.playChime(783.99, 'sine'); // G5 chime
    setSelectedPhoto(photo);
  };

  const handleNext = () => {
    soundManager.playChime(659.25, 'sine');
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
      <div className="max-w-4xl w-full">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/20 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Camera className="w-4 h-4 text-rose-400" />
            <span>Photo Album</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-rose-100 text-glow mb-2">
            {content.heading}
          </h2>
          <p className="text-rose-200/80 text-sm sm:text-base font-light">
            {content.subheading}
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {content.photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.15 + 0.2 }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => handleCardClick(photo)}
              className="glass-card rounded-2xl overflow-hidden border border-rose-300/20 shadow-xl cursor-pointer group text-left transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-burgundy-900">
                <img
                  src={photo.imageUrl}
                  alt={photo.caption}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/90 via-burgundy-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
                {/* Date Tag */}
                {photo.date && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-burgundy-950/70 backdrop-blur-md text-[11px] font-medium text-rose-200 border border-rose-300/20">
                    {photo.date}
                  </span>
                )}

                {/* Zoom Icon overlay */}
                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-rose-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="text-lg font-serif font-semibold text-rose-100 flex items-center gap-1.5">
                  <span>{photo.caption}</span>
                </h3>
                <p className="text-xs sm:text-sm text-rose-200/70 font-light mt-1">
                  {photo.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Continue CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={handleNext}
            className="px-8 py-3.5 rounded-full glass-button text-white font-medium text-base tracking-wide flex items-center justify-center gap-2 mx-auto shadow-lg shadow-rose-600/30 cursor-pointer"
          >
            <span>{content.buttonText}</span>
            <Sparkles className="w-4 h-4 text-rose-200" />
          </button>
        </motion.div>

        {/* Fullscreen Photo Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-burgundy-950/90 backdrop-blur-xl"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-2xl w-full glass-card rounded-3xl overflow-hidden border border-rose-300/30 p-4 relative"
              >
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-burgundy-950/80 border border-rose-300/30 text-rose-200 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="rounded-2xl overflow-hidden aspect-[4/3] mb-4">
                  <img
                    src={selectedPhoto.imageUrl}
                    alt={selectedPhoto.caption}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-2 text-center">
                  <h3 className="text-2xl font-serif font-bold text-rose-100 flex items-center justify-center gap-2">
                    <Heart className="w-5 h-5 text-rose-400 fill-rose-500" />
                    <span>{selectedPhoto.caption}</span>
                  </h3>
                  <p className="text-rose-200/90 text-sm mt-2 font-light">
                    {selectedPhoto.subtitle}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
