import { useState, useEffect, useRef, useMemo } from 'react';

interface MusicPlayerProps {
  page: 'intro' | 'memory' | 'cake' | 'letter';
}

export default function MusicPlayer({ page }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Define different songs for each page
  const pageTracks = useMemo(() => ({
    intro: '/music/intro-song.mp3', // Replace with actual song paths
    memory: '/music/memory-song.mp3',
    cake: '/music/cake-song.mp3',
    letter: '/music/letter-song.mp3'
  }), []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = pageTracks[page];
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [page, isPlaying, pageTracks]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        loop
        preload="none"
      />

      {/* Floating play/pause button */}
      <button
        onClick={togglePlay}
        className="fixed bottom-4 right-4 z-50 w-12 h-12 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
        title={isPlaying ? 'Pause Music' : 'Play Music'}
      >
        {isPlaying ? '⏸️' : '▶️'}
      </button>
    </>
  );
}