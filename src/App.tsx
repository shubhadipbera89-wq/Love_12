import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FloatingHearts } from './components/FloatingHearts';
import { MusicControl } from './components/MusicControl';
import { Welcome } from './components/Welcome';
import { PersonalMessage } from './components/PersonalMessage';
import { Memories } from './components/Memories';
import { SpecialQuestion } from './components/SpecialQuestion';
import { LoveCodePoem } from './components/LoveCodePoem';
import { LoveLetter } from './components/LoveLetter';
import { LoveReveal } from './components/LoveReveal';
import { Reasons } from './components/Reasons';
import { FinalMessage } from './components/FinalMessage';
import { siteContent } from './config/siteContent';
import { soundManager } from './utils/soundManager';

export const App: React.FC = () => {
  const [screen, setScreen] = useState<number>(1);

  useEffect(() => {
    // Initialize sound manager with background music URL
    soundManager.initBackgroundAudio(siteContent.music.audioUrl, siteContent.music.defaultVolume);
  }, []);

  const nextScreen = () => {
    setScreen((prev) => Math.min(prev + 1, 9));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const restart = () => {
    setScreen(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-burgundy-950 text-rose-50 overflow-x-hidden">
      {/* Persistent Floating Hearts Background */}
      <FloatingHearts count={22} />

      {/* Persistent Floating Music Control */}
      <MusicControl />

      {/* Screen Flow with Framer Motion AnimatePresence */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {screen === 1 && <Welcome key="welcome" onNext={nextScreen} />}
          {screen === 2 && <PersonalMessage key="personal" onNext={nextScreen} />}
          {screen === 3 && <Memories key="memories" onNext={nextScreen} />}
          {screen === 4 && <SpecialQuestion key="special" onNext={nextScreen} />}
          {screen === 5 && <LoveCodePoem key="love-poem" onNext={nextScreen} />}
          {screen === 6 && <LoveLetter key="letter" onNext={nextScreen} />}
          {screen === 7 && <LoveReveal key="reveal" onNext={nextScreen} />}
          {screen === 8 && <Reasons key="reasons" onNext={nextScreen} />}
          {screen === 9 && <FinalMessage key="final" onRestart={restart} />}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
