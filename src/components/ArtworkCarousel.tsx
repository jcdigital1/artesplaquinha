import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const ARTWORK_IMAGES = [
  {
    url: 'https://i.postimg.cc/7PW6td3n/Artes-Wi-Fiwhatsapp-1.jpg',
    title: 'Arte Plaquinha Wi-Fi e WhatsApp Clean',
  },
  {
    url: 'https://i.postimg.cc/HWhxvRwQ/Artes-Wi-Fiwhatsapp-3.jpg',
    title: 'Arte Plaquinha Wi-Fi e WhatsApp Minimalista',
  },
  {
    url: 'https://i.postimg.cc/FFBRC8yZ/Artes-Wi-Fiwhatsapp-6.jpg',
    title: 'Arte Plaquinha Wi-Fi e WhatsApp Premium',
  },
  {
    url: 'https://i.postimg.cc/7YJLF99Q/Pix-2.jpg',
    title: 'Arte Plaquinha Pix Moderna',
  },
  {
    url: 'https://i.postimg.cc/654Qkcch/Pix-3.jpg',
    title: 'Arte Plaquinha Pix QR Code Dourada / Dark',
  },
  {
    url: 'https://i.postimg.cc/fTSbGCCp/Pix-1.jpg',
    title: 'Arte Plaquinha Pix Elegante',
  },
  {
    url: 'https://i.postimg.cc/3rcRfVXx/Artes-Wi-Fiwhatsapp-5.jpg',
    title: 'Arte Plaquinha Redes Sociais e Wi-Fi',
  },
  {
    url: 'https://i.postimg.cc/y6bdptmh/Artes-Wi-Fiwhatsapp-2.jpg',
    title: 'Arte Plaquinha Atendimento e Pagamento',
  },
];

export const ArtworkCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const total = ARTWORK_IMAGES.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay with loop
  useEffect(() => {
    if (isPaused || isDragging) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 3200);

    return () => clearInterval(timer);
  }, [isPaused, isDragging, nextSlide]);

  // Pointer/Touch gesture handling
  const handlePointerDown = (e: React.PointerEvent) => {
    setTouchStartX(e.clientX);
    setTouchDeltaX(0);
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || touchStartX === null) return;
    const delta = e.clientX - touchStartX;
    setTouchDeltaX(delta);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    if (touchDeltaX < -45) {
      nextSlide();
    } else if (touchDeltaX > 45) {
      prevSlide();
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
    setIsDragging(false);
  };

  const handlePointerCancel = () => {
    setTouchStartX(null);
    setTouchDeltaX(0);
    setIsDragging(false);
  };

  // Helper to get normalized position relative to currentIndex (-2, -1, 0, 1, 2)
  const getRelativePosition = (index: number) => {
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <div
      className="relative w-full max-w-5xl mx-auto px-2 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => {
        setTimeout(() => setIsPaused(false), 2000);
      }}
    >
      {/* Glow highlight behind the carousel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 bg-[#00FF66]/10 blur-[90px] rounded-full pointer-events-none" />

      {/* Main viewport stage */}
      <div
        className="relative h-[430px] sm:h-[490px] md:h-[550px] w-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        {ARTWORK_IMAGES.map((item, index) => {
          const relPos = getRelativePosition(index);
          const isCenter = relPos === 0;
          const isPrev = relPos === -1;
          const isNext = relPos === 1;
          const isFarPrev = relPos === -2;
          const isFarNext = relPos === 2;

          // Render only nearby items for seamless DOM performance and 3D layering
          const isVisible = Math.abs(relPos) <= 2;
          if (!isVisible) return null;

          // Responsive spacing offset calculations
          // In mobile, we want center card prominent and sides peeking ~15%
          let translateX = '0%';
          let scale = 1;
          let zIndex = 30;
          let opacity = 1;

          if (isCenter) {
            translateX = `calc(0% + ${touchDeltaX}px)`;
            scale = 1;
            zIndex = 30;
            opacity = 1;
          } else if (isPrev) {
            translateX = `calc(-82% + ${touchDeltaX * 0.6}px)`;
            scale = 0.88;
            zIndex = 20;
            opacity = 0.55;
          } else if (isNext) {
            translateX = `calc(82% + ${touchDeltaX * 0.6}px)`;
            scale = 0.88;
            zIndex = 20;
            opacity = 0.55;
          } else if (isFarPrev) {
            translateX = `calc(-155% + ${touchDeltaX * 0.3}px)`;
            scale = 0.75;
            zIndex = 10;
            opacity = 0.2;
          } else if (isFarNext) {
            translateX = `calc(155% + ${touchDeltaX * 0.3}px)`;
            scale = 0.75;
            zIndex = 10;
            opacity = 0.2;
          }

          return (
            <div
              key={item.url}
              onClick={() => {
                if (!isCenter && !isDragging) {
                  setCurrentIndex(index);
                }
              }}
              className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[76vw] max-w-[310px] sm:max-w-[340px] md:max-w-[380px] transition-all ${
                isDragging ? 'duration-75 ease-out' : 'duration-500 ease-out'
              }`}
              style={{
                transform: `translate(-50%, -50%) translateX(${translateX}) scale(${scale})`,
                zIndex,
                opacity,
              }}
            >
              {/* Artwork Container Card */}
              <div
                className={`relative rounded-2xl p-1.5 transition-all duration-300 ${
                  isCenter
                    ? 'bg-gradient-to-b from-[#00FF66]/30 via-white/10 to-[#00FF66]/10 box-glow-neon ring-1 ring-[#00FF66]/60 shadow-[0_20px_50px_rgba(0,0,0,0.9)]'
                    : 'bg-white/5 border border-white/10 shadow-lg hover:border-white/20'
                }`}
              >
                {/* Visual Glass Inner Frame */}
                <div className="relative rounded-xl overflow-hidden bg-[#070b08] aspect-[3/4] flex items-center justify-center">
                  <img
                    src={item.url}
                    alt={item.title}
                    loading={index < 3 ? 'eager' : 'lazy'}
                    draggable={false}
                    className="w-full h-full object-contain pointer-events-none select-none transition-transform duration-500"
                  />

                  {/* Elegant top reflection sheen */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/20 pointer-events-none" />

                  {/* Active Card Subtle Accent Badge */}
                  {isCenter && (
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-[#00FF66]/40 flex items-center gap-1 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
                      <span className="text-[10px] font-semibold tracking-wider text-[#00FF66] uppercase">
                        Canva
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Manual Navigation Arrows (Discreet, Elegant) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="absolute left-2 sm:left-4 z-40 w-10 h-10 rounded-full bg-black/75 hover:bg-black border border-white/15 hover:border-[#00FF66]/60 text-white hover:text-[#00FF66] backdrop-blur-md flex items-center justify-center transition-all duration-200 active:scale-90 shadow-lg"
          aria-label="Arte anterior"
        >
          <ChevronLeft className="w-5 h-5 -translate-x-0.5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="absolute right-2 sm:right-4 z-40 w-10 h-10 rounded-full bg-black/75 hover:bg-black border border-white/15 hover:border-[#00FF66]/60 text-white hover:text-[#00FF66] backdrop-blur-md flex items-center justify-center transition-all duration-200 active:scale-90 shadow-lg"
          aria-label="Próxima arte"
        >
          <ChevronRight className="w-5 h-5 translate-x-0.5" />
        </button>
      </div>

      {/* Pagination Indicators & Swipe Hint */}
      <div className="mt-2 flex flex-col items-center gap-2.5">
        {/* Dot Indicators */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
          {ARTWORK_IMAGES.map((_, dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => setCurrentIndex(dotIndex)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                dotIndex === currentIndex
                  ? 'w-6 bg-[#00FF66] shadow-[0_0_8px_#00FF66]'
                  : 'w-1.5 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Ir para arte ${dotIndex + 1}`}
            />
          ))}
        </div>

        {/* Quiet Swipe Note for Mobile */}
        <div className="flex items-center gap-1.5 text-xs text-[#A5ADA8]/70">
          <Sparkles className="w-3 h-3 text-[#00FF66]" />
          <span>Deslize para ver todas as 8 artes inclusas</span>
        </div>
      </div>
    </div>
  );
};
