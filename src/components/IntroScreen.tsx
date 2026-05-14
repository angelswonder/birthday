'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface IntroScreenProps {
  onStart: () => void;
}

type EffectType = 'confetti' | 'balloon' | 'star' | 'hearts' | 'flower' | 'sparkle';

export default function IntroScreen({ onStart }: IntroScreenProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal Title
    gsap.from(".intro-title", {
      duration: 1.5,
      y: -50,
      opacity: 0,
      ease: "bounce.out"
    });

    const interval = setInterval(() => {
      const types: EffectType[] = ['confetti', 'balloon', 'star', 'hearts', 'flower', 'sparkle'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      createEffect(randomType);
    }, 400);

    // After 2 seconds, we fade in the video (assuming it has buffered)
    // In a production app, you'd use the YouTube IFrame API 'onReady' callback
    const timer = setTimeout(() => setVideoLoaded(true), 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const createEffect = (type: EffectType) => {
    const el = document.createElement('div');
    el.className = `effect-element ${type}`;
    const icons: Record<EffectType, string> = {
      confetti: '✨', balloon: '🎈', star: '⭐', hearts: '💖', flower: '🌸', sparkle: '💫'
    };
    el.innerText = icons[type];
    el.style.position = 'fixed';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (Math.random() * 20 + 20) + 'px';
    el.style.zIndex = '100';
    el.style.pointerEvents = 'none';

    const isBalloon = type === 'balloon';
    el.style.top = isBalloon ? '110vh' : '-50px';

    document.body.appendChild(el);

    gsap.to(el, {
      y: isBalloon ? '-120vh' : '110vh',
      x: (Math.random() - 0.5) * 200,
      rotation: isBalloon ? 10 : 360,
      duration: isBalloon ? 6 : 3,
      onComplete: () => el.remove()
    });
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-pink-150 to-green-170">
      
      {/* YouTube Background Container */}
      <div 
        ref={videoContainerRef}
        className={`absolute inset-0 z-0 transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2">
          <iframe
            className="w-full h-full pointer-events-none"
            src="https://www.youtube.com/embed/afv2lnSumlI?autoplay=1&mute=1&controls=0&loop=1&playlist=afv2lnSumlI&rel=0&end=180"
            allow="autoplay; encrypted-media"
          ></iframe>
        </div>
        {/* Magic Overlay */}
        <div className="absolute inset-0 bg-pink-100/20 backdrop-blur-[1px]" />
      </div>

      {/* Content */}
      <div className="text-center z-10 p-4 max-w-3xl">
        <h1 className="intro-title text-4xl sm:text-7xl font-bold text-green-600 mb-6 font-pacifico drop-shadow-lg">
          Happy Birthday, My Love! 🎉
        </h1>
        
        <div className="bg-white/30 p-6 rounded-3xl backdrop-blur-md border border-white/40 shadow-xl max-w-2xl mx-auto">
          <p className="text-lg sm:text-xl text-purple-900 font-medium leading-relaxed font-comic">
            Step into a dreamy memory lane full of glowing cards, fairy kisses, and a cake waiting for your wish, My Fairy Whitney.
          </p>
        </div>

        <button
          onClick={onStart}
          className="mt-10 px-10 py-4 bg-green-500 text-white rounded-full font-bold text-xl hover:bg-green-600 shadow-xl transform transition-all hover:scale-110 active:scale-95"
        >
          Enter the Birthday Garden 🌸
        </button>
      </div>

      <style jsx global>{`
        .effect-element { position: fixed; z-index: 50; pointer-events: none; }
        body { margin: 0; overflow: hidden; }
      `}</style>
    </div>
  );
}