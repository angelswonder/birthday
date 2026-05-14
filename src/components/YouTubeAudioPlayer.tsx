'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YouTubeAudioPlayerProps {
  page: 'intro' | 'memory' | 'cake' | 'letter';
}

export default function YouTubeAudioPlayer({ page }: YouTubeAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const playerRef = useRef<any>(null);
  const isReadyRef = useRef(false);

  // Define different YouTube videos for each page (using video IDs)
  const pageVideos = useMemo(
    () => ({
      intro: 'DwuJeGYlYyw', // Replace with actual video IDs
      memory: 'BddP6PYo2gs',
      cake: 'I3XkeZ9Slf4',
      letter: 'hrPHsyGCN1s',
    }),
    []
  );

  const createPlayer = useCallback(() => {
    const win = window as any;
    playerRef.current = new win.YT.Player('youtube-audio-player', {
      height: '0',
      width: '0',
      videoId: pageVideos[page],
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        enablejsapi: 1,
        fs: 0,
        iv_load_policy: 3,
        loop: 1,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
        showinfo: 0,
        start: 0,
        mute: 0,
      },
      events: {
        onReady: (event: any) => {
          isReadyRef.current = true;
          setCurrentVideoId(pageVideos[page]);
          event.target.setVolume(70);
          event.target.playVideo();
        },
        onStateChange: (event: any) => {
          const win = window as any;
          if (event.data === win.YT.PlayerState.ENDED) {
            playerRef.current.playVideo();
          }
          if (event.data === win.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
          } else if (
            event.data === win.YT.PlayerState.PAUSED ||
            event.data === win.YT.PlayerState.CUED ||
            event.data === win.YT.PlayerState.UNSTARTED
          ) {
            setIsPlaying(false);
          }
        },
      },
    });
  }, [pageVideos, page]);

  useEffect(() => {
    const win = window as any;

    // Load YouTube IFrame API
    if (!win.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      win.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    } else if (!playerRef.current) {
      createPlayer();
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [createPlayer]);

  useEffect(() => {
    if (playerRef.current && isReadyRef.current) {
      const newVideoId = pageVideos[page];
      if (newVideoId !== currentVideoId) {
        setCurrentVideoId(newVideoId);
        playerRef.current.loadVideoById(newVideoId);
      }
      if (isPlaying) {
        playerRef.current.playVideo();
      }
    }
  }, [page, currentVideoId, isPlaying, pageVideos]);

  const togglePlay = () => {
    if (playerRef.current && isReadyRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {/* Hidden YouTube player */}
      <div id="youtube-audio-player" style={{ display: 'none' }} />

      {/* Floating play/pause button */}
      <button
        onClick={togglePlay}
        className="fixed bottom-4 left-4 z-50 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
        title={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
      >
        {isPlaying ? '⏸️' : '▶️'}
      </button>
    </>
  );
}