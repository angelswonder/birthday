'use client';

import { useState, useEffect, useRef } from 'react';

interface CakePageProps {
  onNavigate: (page: 'intro' | 'memory' | 'cake' | 'letter') => void;
}

export default function CakePage({ onNavigate }: CakePageProps) {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [micStatus, setMicStatus] = useState('Microphone is off. Click to begin.');
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const blowInterval = useRef<NodeJS.Timeout | null>(null);

  const startMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      analyserRef.current = analyser;
      setMicActive(true);
      setMicStatus('Microphone is ready. Blow gently toward the mic to make the candles go out.');
      // Start polling for blow detection
      blowInterval.current = setInterval(() => {
        detectBlow(true);
      }, 200);
    } catch (error) {
      setMicStatus('Microphone permission was denied or unavailable.');
    }
  };

  const detectBlow = (auto = false) => {
    if (!analyserRef.current) {
      if (!auto) setMicStatus('Please start the microphone first.');
      return;
    }

    const data = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteTimeDomainData(data);
    const amplitude = data.reduce((sum, value) => sum + Math.abs(value - 128), 0) / data.length;

    if (amplitude > 18 && !candlesBlown) {
      setCandlesBlown(true);
      setMicStatus('Wish granted! The candles are softly blown out. Happy birthday!');
      if (blowInterval.current) clearInterval(blowInterval.current);
    } else if (!auto && !candlesBlown) {
      setMicStatus('Blow a little harder and closer to the microphone.');
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (blowInterval.current) clearInterval(blowInterval.current);
    };
  }, []);

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center relative">
      {/* Navigation */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center flex-wrap gap-2 z-40">
        <div className="flex flex-col items-center">
          <button
            onClick={() => onNavigate('intro' as any)}
            className="px-3 py-2 bg-white text-green-700 rounded-full font-comic text-sm sm:text-base hover:bg-green-50 transition-all"
          >
            🏡
          </button>
          <span className="text-xs mt-1 text-green-700">Back to Intro</span>
        </div>
        <div className="flex gap-6">
          <div className="flex flex-col items-center">
            <button
              onClick={() => onNavigate('memory')}
              className="px-3 py-2 bg-white text-green-700 rounded-full font-comic text-sm sm:text-base hover:bg-green-50 transition-all"
            >
              🎨
            </button>
            <span className="text-xs mt-1 text-green-700">Back: Memory Lane</span>
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={() => onNavigate('letter')}
              className="px-3 py-2 bg-white text-green-700 rounded-full font-comic text-sm sm:text-base hover:bg-green-50 transition-all"
            >
              💌
            </button>
            <span className="text-xs mt-1 text-green-700">Next: Letter</span>
          </div>
        </div>
      </div>

      <div className="text-center mb-8 mt-24 px-2 sm:px-0">
        <h2 className="text-3xl sm:text-5xl font-bold text-green-700 mb-4" style={{ textShadow: '2px 2px 8px rgba(255, 255, 255, 0.8)' }}>
          🎂 Make a Wish 🎂
        </h2>
        <p className="text-sm sm:text-lg text-purple-700 font-comic max-w-2xl mx-auto">
          Light the candles and blow into your microphone to make the flame disappear like a wish come true.
        </p>
      </div>

      {/* Cake Display */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-8 max-w-6xl w-full px-2 sm:px-0">
        <div className="relative">
          {/* Cake */}
          <div className="w-80 h-40 bg-gradient-to-b from-green-300 to-green-200 rounded-3xl border-4 border-green-400 shadow-2xl relative">
            {/* Candles */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className={`w-4 h-16 bg-purple-500 rounded-full relative transition-all ${candlesBlown ? 'opacity-30' : ''}`}>
                  {!candlesBlown && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <div className="flame-flicker"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="absolute inset-0 flex items-center justify-center text-4xl">🍰</p>
          </div>
          {/* Cake Shadow */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-96 h-8 bg-purple-300/30 rounded-full blur-xl"></div>
        </div>

        {/* Controls */}
        <div className="bg-white/90 p-8 rounded-3xl shadow-2xl backdrop-filter backdrop-blur-lg max-w-md">
          <h3 className="text-2xl font-bold text-pink-600 mb-6 text-center font-comic">Make Your Wish</h3>
          
          <button
            onClick={startMicrophone}
            disabled={micActive}
            className="w-full px-6 py-4 bg-gradient-to-r from-blue-400 to-cyan-400 text-white rounded-full font-comic text-lg font-bold mb-4 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🎤 Start Microphone
          </button>
          
          <button
            onClick={() => detectBlow()}
            disabled={!micActive}
            className="w-full px-6 py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-comic text-lg font-bold mb-6 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            💨 I&apos;m Ready to Blow
          </button>

          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-2xl p-4 text-center">
            <p className="text-purple-700 font-comic text-sm leading-relaxed">
              {micStatus}
            </p>
            {candlesBlown && (
              <p className="text-pink-600 font-bold text-lg mt-2">✨ Wish Granted! ✨</p>
            )}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-8 left-8 text-4xl animate-bounce">🎈</div>
      <div className="absolute bottom-8 right-8 text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎉</div>

      <style jsx>{`
        .flame-flicker {
          width: 12px;
          height: 28px;
          background: radial-gradient(ellipse at center, #fff700 60%, #ff9900 80%, #ff6a00 100%);
          border-radius: 50% 50% 20% 20%;
          box-shadow: 0 0 10px #ff9900, 0 0 20px #ffff00;
          opacity: 1;
          animation: flicker 0.5s infinite alternate;
          z-index: 20;
        }
        @keyframes flicker {
          0% {
            transform: translateX(-50%) scale(1);
            opacity: 1;
            filter: blur(0.5px) brightness(1.1);
          }
          50% {
            transform: translateX(-50%) scale(1.1) skewX(2deg);
            opacity: 0.95;
            filter: blur(1.5px) brightness(1.2);
          }
          100% {
            transform: translateX(-50%) scale(1.05) skewX(-2deg);
            opacity: 0.9;
            filter: blur(0.5px) brightness(1.05);
          }
        }
      `}</style>
    </div>
  );
}