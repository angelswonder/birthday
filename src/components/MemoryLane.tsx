'use client';

import { useState, useEffect, type MouseEvent, type TouchEvent } from 'react';
import gsap from 'gsap';

interface Card {
  id: number;
  title: string;
  caption: string;
  type: 'image' | 'video';
  src: string;
  story: string;
}

const storyTitles = [
  'Sunbeam Kiss',
  'Moonlit Promise',
  'Rose Petal Waltz',
  'Velvet Sunset',
  'Secret Garden',
  'Golden Hour',
  'Luna Lullaby',
  'Everlasting Ember',
  'Honeyed Whisper',
  'Candlelit Smile',
  'Twilight Serenade',
  'Stardust Promise',
  'Dreamside Stroll',
  'Blushing Dawn',
  'Gentle Breeze',
  'Cozy Nest',
  'Floating Heart',
  'Petal Moon',
  'Soft Halo',
  'Wildflower Wish',
  'Cherry Blossom Dance',
  'Pearl Morning',
  'Fairy Embrace',
  'Sparkling Secret',
  'Tender Bloom',
  'Radiant Rose',
  'Sugarplum Glow',
  'Lovers Lantern',
  'Precious Pause',
  'Warm Whisper',
  'Sweet Sigh',
  'Hearts Aglow',
  'Love Letter',
  'Honey Glow',
  'Magic Moment',
  'Petal Promise',
  'Rosewater Reverie',
  'Aurora Affection',
  'Moonbeam Memory',
  'Blissful Breeze',
  'Serene Spark',
  'Dawn Delight',
  'Featherlight Feel',
  'Cherry Moon',
  'Satin Sunset',
  'Kiss of Dawn',
  'Glowing Grace',
  'Mango Morning',
  'Velvet Whisper',
  'Starbright Smile',
  'Blooming Promise',
  'Soft Stardust',
  'Ever After Glow',
  'Luminous Love',
  'Sugar Petal',
  'Gentle Twilight',
  'Sweetheart Song',
  'Purely Yours',
  'Seaside Serenade',
  'Rose Moon',
  'Crimson Hush',
  'Starlight Serenade',
  'Velour Dreams',
  'Infinite Tenderness',
  'Devotion Dance',
  'Amber Afterglow',
  'Celestial Connection',
  'Heartfelt Harmony',
  'Silken Sanctuary',
  'Forever Whispered',
  'Passion Poetry',
  'Timeless Treasure',
  'Enchanted Eternity',
  'Beautiful Bond',
  'Sweetly Entwined',
  'Moonlit Serenade',
];

const storyCaptions = [
  'Oh my magnificent star.',
  'That time we laughed until the stars blinked.',
  'Every glance felt like a warm embrace.',
  'Your smile made the whole world shine.',
  'We danced beneath petals and soft light.',
  'The day felt like a dream in your arms.',
  'Your hand in mine was home.',
  'The sweetest memory I keep close.',
  'Every moment was wrapped in joy.',
  'We found magic in the smallest details.',
  'In that moment, time stood still.',
  'Your voice is my favorite sound.',
  'Forever feels too short with you.',
  'Every memory becomes a treasure.',
  'You make my heart skip a beat.',
  'Together we are unstoppable.',
  'This is where I belong.',
  'You are my greatest adventure.',
  'My soul recognized yours immediately.',
  'In your eyes, I found home.',
  'You are my favorite chapter.',
  'Every day with you is a blessing.',
  'We write our own love story.',
  'You make ordinary moments magical.',
  'My heart knew before my mind caught up.',
  'You are my happily ever after.',
  'Together we are stronger.',
  'Every kiss tastes like forever.',
  'You are my reason to smile.',
  'Our love is a beautiful journey.',
  'I fall for you more each day.',
  'You are my favorite person.',
  'In your arms, I am complete.',
  'Every day with you is a gift.',
  'You are my greatest dream come true.',
  'Forever with you feels perfect.',
  'My heart beats your name.',
  'You are my everything.',
  'Together we are infinite.',
  'I choose you, always.',
  'You are my sweetest escape.',
  'Every moment with you is precious.',
  'You make me believe in love.',
  'Together we shine brighter.',
  'You are my beautiful dream.',
  'My soul loves yours.',
  'In you, I found my soulmate.',
  'Every sunset is more beautiful with you.',
  'You are my greatest blessing.',
  'Forever is not enough time.',
  'You complete me.',
  'My heart chose you.',
  'Together we are magic.',
  'You are my inspiration.',
  'Every smile is for you.',
  'You are my reason to exist.',
  'In your love, I found myself.',
  'Together we are destined.',
  'You are my forever.',
  'My love for you grows infinitely.',
  'You are worth every moment.',
  'This love is timeless and true.',
  'With you, I believe in miracles.',
  'You are my greatest treasure.',
  'Our bond transcends time itself.',
  'Every breath I take is for you.',
  'In your embrace, I am safe.',
  'You are my sweetest serenity.',
  'Together we are unbreakable.',
  'Your love changes my everything.',
  'I am forever enchanted by you.',
  'You are my beautiful reality.',
  'Together we create pure magic.',
  'My heart will always be yours.',
  'You are my most sacred promise.',
  'Mo nife re',
];

const storyLines = [
  'You came into this world as the brightest star.',
  'Your hair caught the sunlight and the moment felt eternal.',
  'I still remember the way your eyes lit up that evening.',
  'The city faded away when we were together on that street.',
  'It was the day everything felt gentle and perfect.',
  'I want to relive that sunset with you every year.',
  'Our hearts hummed the same song under the moon.',
  'I tucked that afternoon into the best part of me.',
  'The glow of your smile made even the clouds blush.',
  'We made a secret promise beneath the lanterns.',
  'You took my hand and suddenly the world made sense.',
  'Dancing with you felt like coming home.',
  'That kiss changed everything for me.',
  'Every color seems brighter since you arrived.',
  'You are the reason my heart believes in forever.',
  'I love you more with every passing day.',
  'Together we create our own constellation.',
  'Your touch makes my soul feel alive.',
  'I found my reason to believe in destiny.',
  'You are written in every heartbeat.',
  'Our love story is my favorite escape.',
  'In this moment, nothing else exists but us.',
  'You make my soul sing louder than any song.',
  'I am endlessly grateful for you.',
  'Your love is the greatest gift I have ever received.',
  'We are two souls that found each other.',
  'Every moment with you is a memory I treasure.',
  'You are my greatest adventure and safest harbor.',
  'My heart was incomplete until you arrived.',
  'Together we are poetry in motion.',
  'You are the answer to my silent prayers.',
  'This is where our forever begins.',
  'Your love heals every broken piece of me.',
  'I would choose you in every lifetime.',
  'You are my sanctuary in a chaotic world.',
  'Together we are an eternal flame.',
  'My love for you knows no bounds or limits.',
  'You make me want to be the best version of myself.',
  'In your eyes, I see our beautiful future.',
  'You are the heartbeat of my happiness.',
  'Forever feels like a promise I am thrilled to keep.',
  'Your love transforms me into someone better.',
  'We are written in the stars together.',
  'You are the poetry my heart has always spoken.',
  'I love you with every fiber of my being.',
  'Together we create a masterpiece.',
  'You are my greatest adventure.',
  'My soul recognizes yours as my twin flame.',
  'You make ordinary days feel extraordinary.',
  'With you, I found my happily ever after.',
  'Your love is my greatest treasure.',
  'I choose to love you more each day.',
  'You are the song my heart sings.',
  'Together we are unstoppable force.',
  'You are my reason to wake up smiling.',
  'My love grows deeper with every sunrise.',
  'You make my dreams pale in comparison.',
  'Together we are infinite possibility.',
  'You are my favorite forever.',
  'I am forever grateful for your love.',
  'Your love is the greatest story ever told.',
  'In your arms, I found my purpose.',
  'You are my greatest wish come true.',
  'Together we paint the world with love.',
  'Your presence is my greatest joy.',
  'I see eternity in your eyes.',
  'You are the reason I believe in magic.',
  'Our love is a timeless masterpiece.',
  'You make my heart overflow with gratitude.',
  'Every day with you is a beautiful blessing.',
  'Together we create our own paradise.',
  'Your love is my greatest anchor.',
  'I am endlessly devoted to you.',
  'You are my favorite adventure forever.',
  'Together we are destiny itself.',
  'I will love you endlessly for the rest of my life.',
];

const videoSources = [
  '/media/VID-20250527-WA0021.mp4',
  '/media/14515151151.mp4',
  '/media/154151341351.mp4',
  '/media/161102d774824522a05004e459409f20.mp4',
  '/media/8eff940fa18441e3933d150f521344e8.mp4',
  '/media/Snapchat-2096789701.mp4',
  '/media/Snapchat-291563977.mp4',
  '/media/Snapchat-639745525.mp4',
  '/media/Snapchat-705060915.mp4',
  '/media/Snapchat-795490656.mp4',
  '/media/Snapchat-850204198.mp4',
  '/media/VID-20250526-WA0003.mp4',
  '/media/VID-20250527-WA0021.mp4',
  '/media/VID-20250702-WA0023.mp4',
  '/media/VID-20250911-WA0026.mp4',
  '/media/VID-20251129-WA0005.mp4',
  '/media/VID-20251212-WA0018.mp4',
  '/media/VID-20260105-WA0035.mp4',
  '/media/VID-20260112-WA0003.mp4',
  '/media/VID-20260113-WA0042.mp4',
  '/media/VID-20260114-WA0008.mp4',
  '/media/VID-20260114-WA0009.mp4',
  '/media/VID-20260118-WA0021.mp4',
  '/media/VID-20260119-WA0037.mp4',
  '/media/VID-20260120-WA0011.mp4',
  '/media/VID-20260120-WA0012.mp4',
  '/media/VID-20260131-WA0070.mp4',
  '/media/VID-20260201-WA0043.mp4',
  '/media/VID-20260204-WA0069.mp4',
  '/media/VID-20260206-WA0004.mp4',
  '/media/VID-20260214-WA0053.mp4',
  '/media/VID-20260324-WA0018.mp4',
  '/media/VID-20260406-WA0006.mp4',
  '/media/VID-20260418-WA0023.mp4',
  '/media/VID-20260430-WA0014.mp4',
  '/media/VID_20241009_113528.mp4'
];

// Create 75 cards with 40 images and 34 videos interleaved evenly
const initialCards: Card[] = (() => {
  const cards: Card[] = [];
  const totalCards = 76;
  const numImages = 41;
  const numVideos = 35;
  const spacing = totalCards / (numVideos + 1);

  let imageIndex = 0;
  let videoIndex = 0;
  let nextVideoPosition = spacing;

  for (let i = 0; i < totalCards; i++) {
    if (i >= nextVideoPosition && videoIndex < numVideos) {
      cards.push({
        id: i + 1,
        title: storyTitles[i],
        caption: storyCaptions[i],
        type: 'video',
        src: videoSources[videoIndex % videoSources.length],
        story: storyLines[i],
      });
      videoIndex++;
      nextVideoPosition += spacing;
    } else if (imageIndex < numImages) {
      cards.push({
        id: i + 1,
        title: storyTitles[i],
        caption: storyCaptions[i],
        type: 'image',
        src: `/media/${imageIndex + 1}.jpg`,
        story: storyLines[i],
      });
      imageIndex++;
    }
  }
  return cards;
})();

interface MemoryLaneProps {
  onNavigate: (page: 'intro' | 'memory' | 'cake' | 'letter') => void;
}

export default function MemoryLane({ onNavigate }: MemoryLaneProps) {
  const [cards] = useState<Card[]>(initialCards);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    gsap.fromTo(
      '.memory-card',
      { y: 100, opacity: 0, rotation: () => Math.random() * 10 - 5 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power2.out' }
    );
  }, []);

  const handleInteractionStart = (
    e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>,
    id: number
  ) => {
    setActiveCard(id);
    const card = e.currentTarget;
    const overlay = card.querySelector('.story-overlay');

    gsap.to(card, {
      scale: 1.05,
      boxShadow: '0 20px 40px rgba(255, 105, 180, 0.4)',
      zIndex: 50,
      duration: 0.3,
    });

    if (overlay) {
      gsap.fromTo(
        overlay,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  };

  const handleInteractionEnd = (
    e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ) => {
    setActiveCard(null);
    const card = e.currentTarget;
    const overlay = card.querySelector('.story-overlay');

    gsap.to(card, {
      scale: 1,
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
      zIndex: 1,
      duration: 0.3,
    });

    if (overlay) {
      gsap.to(overlay, { opacity: 0, y: 20, duration: 0.3 });
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#fff5f9] flex flex-col">
      <div
        className="fixed inset-0 opacity-40 z-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 40c2-2 5-2 7 0s2 5 0 7-5 2-7 0-2-5 0-7z' fill='%23ff9eda' fill-opacity='0.3'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full w-full">
        <header className="text-center pt-4 sm:pt-8 pb-2 px-4 flex-shrink-0">
          <h1 className="text-4xl sm:text-7xl font-bold text-pink-600 font-pacifico leading-tight">
            Your Memory Lane
          </h1>
          <p className="mt-1 text-purple-600 font-medium italic text-sm sm:text-base">
            Swipe to explore our story
          </p>
        </header>

        <div className="flex-grow flex items-center justify-center w-full min-h-0 overflow-hidden bg-transparent">
          <div className="flex flex-nowrap overflow-x-auto gap-4 sm:gap-8 px-10 py-4 horizontal-slider snap-x snap-mandatory h-full items-center">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className="memory-card snap-center flex-shrink-0 w-[45vw] sm:w-[320px] max-w-[320px] bg-white p-3 shadow-2xl rounded-sm transition-all duration-300 cursor-pointer relative flex flex-col"
                style={{ transform: `rotate(${index % 2 === 0 ? -1.5 : 1.5}deg)` }}
                onMouseEnter={(e) => handleInteractionStart(e, card.id)}
                onMouseLeave={handleInteractionEnd}
                onTouchStart={(e) => handleInteractionStart(e, card.id)}
                onTouchEnd={handleInteractionEnd}
              >
                <div className="w-full overflow-hidden relative rounded-sm bg-pink-50 aspect-[4/5] sm:aspect-[3/4]">
                  {card.type === 'image' ? (
                    <img src={card.src} className="absolute inset-0 w-full h-full object-contain sm:object-cover" alt={card.title} />
                  ) : (
                    <video
                      src={card.src}
                      className="absolute inset-0 w-full h-full object-contain sm:object-cover"
                      muted
                      autoPlay
                      loop
                      playsInline
                    />
                  )}
                  <div className="story-overlay absolute inset-0 bg-pink-600/90 p-4 flex items-center justify-center text-center pointer-events-none opacity-0">
                    <p className="text-white text-xs sm:text-sm italic leading-tight">
                      {`"${card.story}"`}
                    </p>
                  </div>
                </div>

                <div className="h-24 flex flex-col items-center justify-center text-center p-1 flex-shrink-0">
                  <h3 className="font-pacifico text-pink-500 text-lg sm:text-xl leading-none">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-purple-600">{card.caption}</p>
                  <div className="mt-2 text-lg">{['💖', '✨', '🌸', '🎈'][index % 4]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 py-4 sm:py-8 w-full px-6 flex-shrink-0">
          <button
            onClick={() => onNavigate('intro')}
            className="text-pink-400 font-bold hover:text-pink-600 transition-colors text-sm order-2 sm:order-1"
          >
            ← Back
          </button>
          <button
            onClick={() => onNavigate('cake')}
            className="px-8 py-3 bg-pink-500 text-white rounded-full font-bold text-lg sm:text-xl shadow-lg hover:bg-pink-600 transition-all order-1 sm:order-2 w-full sm:w-auto"
          >
            Make a Wish 🎂
          </button>
        </footer>
      </div>

      <style jsx global>{`
        html, body {
          height: 100%;
          width: 100%;
          overflow: hidden;
          margin: 0;
          position: fixed;
        }
        .horizontal-slider::-webkit-scrollbar {
          height: 6px !important;
        }
        .story-overlay {
          will-change: transform, opacity;
        }
        .memory-card {
          -webkit-tap-highlight-color: transparent;
          user-select: none;
        }
        .horizontal-slider {
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: #ff85c1 #ffe4f1;
        }
        .horizontal-slider::-webkit-scrollbar {
          height: 12px !important;
          display: block !important;
        }
        .horizontal-slider::-webkit-scrollbar-track {
          background: #ffe4f1;
          border-radius: 10px;
          margin: 0 10%;
        }
        .horizontal-slider::-webkit-scrollbar-thumb {
          background: #ff85c1;
          border-radius: 10px;
          border: 2px solid #ffe4f1;
        }
        @media (max-width: 640px) {
          .memory-card {
            margin-right: 10px;
          }
        }
      `}</style>
    </div>
  );
}
