'use client';

import { useState, useEffect } from 'react';
import IntroScreen from '@/components/IntroScreen';
import MemoryLane from '@/components/MemoryLane';
import CakePage from '@/components/CakePage';
import LetterPage from '@/components/LetterPage';
import YouTubeAudioPlayer from '@/components/YouTubeAudioPlayer';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'intro' | 'memory' | 'cake' | 'letter'>('intro');
  const [userInteracted, setUserInteracted] = useState(false);

  const handleStart = () => {
    setUserInteracted(true);
    setCurrentPage('memory');
  };

  useEffect(() => {
    if (!userInteracted) {
      const handleInteraction = () => setUserInteracted(true);
      document.addEventListener('pointerdown', handleInteraction, { once: true });
      return () => document.removeEventListener('pointerdown', handleInteraction);
    }
  }, [userInteracted]);

  const renderPage = () => {
    switch (currentPage) {
      case 'intro':
        return <IntroScreen onStart={handleStart} />;
      case 'memory':
        return <MemoryLane onNavigate={setCurrentPage} />;
      case 'cake':
        return <CakePage onNavigate={setCurrentPage} />;
      case 'letter':
        return <LetterPage onNavigate={setCurrentPage} />;
      default:
        return <IntroScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="relative">
      <YouTubeAudioPlayer page={currentPage} userInteracted={userInteracted} />
      {renderPage()}
    </div>
  );
}