'use client';

interface LetterPageProps {
  onNavigate: (page: 'intro' | 'memory' | 'cake' | 'letter') => void;
}

export default function LetterPage({ onNavigate }: LetterPageProps) {
  return (
    /* h-screen and overflow-hidden ensures the container never grows larger than the screen */
    <div className="h-screen w-screen p-4 flex flex-col items-center relative overflow-hidden bg-gradient-to-br from-pink-100 to-blue-100">
      
      {/* Navigation - Fixed at the top */}
      <nav className="w-full flex justify-between items-center flex-wrap gap-2 z-40 mb-2 flex-shrink-0">
        <div className="flex flex-col items-center">
          <button
            onClick={() => onNavigate('intro')}
            className="px-3 py-2 bg-white/80 backdrop-blur text-green-700 rounded-full font-comic text-sm hover:bg-white transition-all shadow-sm"
          >
            🏡
          </button>
          <span className="text-[10px] mt-1 text-green-700 font-bold uppercase tracking-tighter">Intro</span>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <button
              onClick={() => onNavigate('memory')}
              className="px-3 py-2 bg-white/80 backdrop-blur text-green-700 rounded-full font-comic text-sm hover:bg-white transition-all shadow-sm"
            >
              🎨
            </button>
            <span className="text-[10px] mt-1 text-green-700 font-bold uppercase tracking-tighter">Memory</span>
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={() => onNavigate('cake')}
              className="px-3 py-2 bg-white/80 backdrop-blur text-green-700 rounded-full font-comic text-sm hover:bg-white transition-all shadow-sm"
            >
              🎂
            </button>
            <span className="text-[10px] mt-1 text-green-700 font-bold uppercase tracking-tighter">Cake</span>
          </div>
        </div>
      </nav>

      {/* Main Content Wrapper: flex-grow ensures this takes all middle space */}
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-4xl min-h-0 z-10">
        
        {/* Adaptive Header */}
        <div className="text-center mb-4 flex-shrink-0">
          <h2 className="text-2xl sm:text-5xl font-bold text-green-700 mb-1" style={{ textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8)' }}>
            💌 A Letter from My Heart 💌
          </h2>
        </div>

        {/* The Letter Card: Scrollable internally if content is too long for the screen */}
        <div className="w-full flex-grow bg-white/90 p-5 sm:p-8 rounded-3xl shadow-xl backdrop-blur-md border-2 sm:border-4 border-green-200 flex flex-col min-h-0">
          
          {/* Scrollable Letter Content */}
          <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar text-purple-700 leading-relaxed space-y-4 font-comic text-sm sm:text-lg">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-3xl">🧚</span>
              <h3 className="text-lg sm:text-xl font-bold text-green-700">For My Fairy Whitney</h3>
            </div>

            <p className="italic">Anike Mi,</p>
            
            <p>
              Today I celebrate the beautiful light inside you. Your laugh feels like petals in the wind, your kindness like the freshest mint in spring. Every moment with you is a gentle fairytale filled with warmth, laughter, and soft pastel dreams.
            </p>
            
            <p>
              May your year be painted with sky-blue days, baby-pink sunsets, and the sweetest melodies of love. I promise to keep building memory lanes with you, to place fairy dust on every ordinary day, and to hold your hand while we make wishes together.
            </p>
            
            <p>
              You are the reason I believe in magic. Your smile brightens even the darkest days, and your presence makes my heart feel like it&apos;s dancing. Thank you for being you, for loving me, and for making life feel like a beautiful adventure.
            </p>
            
            <div className="pt-4">
              <p className="font-bold text-green-700 text-lg sm:text-2xl">Happy birthday, Ololufe Mi. 🌸</p>
              <p className="italic text-right text-green-700 mt-2">Always yours, with endless love 💖</p>
            </div>
          </div>

          {/* Fixed Gift Button at the bottom of the card */}
          <div className="flex justify-center mt-6 flex-shrink-0">
            <a
              href="https://open.spotify.com/playlist/2aw8ymfa4H4UJE3FFbsZAQ?si=ifZRG8UdQhWkm50vnM4QNA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:scale-105 transition-all font-bold font-comic text-base sm:text-lg"
            >
              <span>🎁</span>
              Get your gift
            </a>
          </div>
        </div>
      </main>

      {/* Decorative floating elements - Using hidden on small mobile to reduce clutter */}
      <div className="absolute top-1/4 left-5 text-3xl animate-bounce hidden sm:block">🧚</div>
      <div className="absolute bottom-10 right-5 text-3xl animate-bounce hidden sm:block" style={{ animationDelay: '0.3s' }}>🐇</div>
      <div className="absolute top-1/2 right-5 text-2xl animate-pulse">🌸</div>
      <div className="absolute bottom-1/4 left-5 text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>🌼</div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #86efac;
          border-radius: 10px;
        }
        body {
          margin: 0;
          overflow: hidden;
          touch-action: manipulation;
        }
      `}</style>
    </div>
  );
}