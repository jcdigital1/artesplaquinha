import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const ARTWORK_IMAGES = [
  {
    url: 'https://i.postimg.cc/7PW6td3n/Artes-Wi-Fiwhatsapp-1.jpg',
    title: 'Arte Plaquinha Wi-Fi e WhatsApp 1',
  },
  {
    url: 'https://i.postimg.cc/HWhxvRwQ/Artes-Wi-Fiwhatsapp-3.jpg',
    title: 'Arte Plaquinha Wi-Fi e WhatsApp 2',
  },
  {
    url: 'https://i.postimg.cc/FFBRC8yZ/Artes-Wi-Fiwhatsapp-6.jpg',
    title: 'Arte Plaquinha Wi-Fi e WhatsApp 3',
  },
  {
    url: 'https://i.postimg.cc/7YJLF99Q/Pix-2.jpg',
    title: 'Arte Plaquinha Pix 1',
  },
  {
    url: 'https://i.postimg.cc/654Qkcch/Pix-3.jpg',
    title: 'Arte Plaquinha Pix 2',
  },
  {
    url: 'https://i.postimg.cc/fTSbGCCp/Pix-1.jpg',
    title: 'Arte Plaquinha Pix 3',
  },
  {
    url: 'https://i.postimg.cc/3rcRfVXx/Artes-Wi-Fiwhatsapp-5.jpg',
    title: 'Arte Plaquinha Wi-Fi e WhatsApp 4',
  },
  {
    url: 'https://i.postimg.cc/y6bdptmh/Artes-Wi-Fiwhatsapp-2.jpg',
    title: 'Arte Plaquinha Wi-Fi e WhatsApp 5',
  },
];

export const ArtworkCarousel: React.FC = () => {
  const total = ARTWORK_IMAGES.length;
  // Use a central initial index for seamless infinite scroll
  // We duplicate the list 3 times: [0..7, 0..7, 0..7] => total 24
  // Starting at index total (8), which is the first item of the middle set
  const [currentIndex, setCurrentIndex] = useState(total);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(300);

  // Triple set of images for infinite loop
  const slides = [...ARTWORK_IMAGES, ...ARTWORK_IMAGES, ...ARTWORK_IMAGES];

  // Measure card width dynamically for responsive precision
  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      // In mobile, card is about 76% of viewport, max 340px, min 260px
      const measured = Math.min(340, Math.max(260, Math.round(containerWidth * 0.76)));
      setCardWidth(measured);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Handle seamless infinite loop jump when transition finishes
  const handleTransitionEnd = () => {
    // If we passed the middle set to the right
    if (currentIndex >= total * 2) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - total);
    }
    // If we passed the middle set to the left
    else if (currentIndex < total) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + total);
    }
  };

  // Autoplay timer (smooth loop)
  useEffect(() => {
    if (isPaused || isDragging) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 3400);

    return () => clearInterval(timer);
  }, [isPaused, isDragging, nextSlide]);

  // Touch and Pointer Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setDragStartX(e.clientX);
    setDragOffset(0);
    setIsDragging(true);
    setIsPaused(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || dragStartX === null) return;
    const delta = e.clientX - dragStartX;
    setDragOffset(delta);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragOffset < -40) {
      nextSlide();
    } else if (dragOffset > 40) {
      prevSlide();
    }

    setDragStartX(null);
    setDragOffset(0);
    setTimeout(() => setIsPaused(false), 2500);
  };

  const handlePointerCancel = () => {
    setDragStartX(null);
    setDragOffset(0);
    setIsDragging(false);
    setIsPaused(false);
  };

  // Active display index within the 8 items (0..7)
  const activeDotIndex = ((currentIndex % total) + total) % total;

  // Calculate track translation
  // Card gap is 16px
  const gap = 16;
  const slideStep = cardWidth + gap;

  // Center position offset:
  // We want the active card centered in the container
  const containerWidth = containerRef.current?.offsetWidth || 390;
  const centerOffset = (containerWidth - cardWidth) / 2;
  const currentTranslateX = centerOffset - currentIndex * slideStep + dragOffset;

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto px-1 select-none overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => {
        setTimeout(() => setIsPaused(false), 2000);
      }}
    >
      {/* Background neon glow spot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 bg-[#00FF66]/10 blur-[80px] rounded-full pointer-events-none -z-10" />

      {/* Viewport Stage */}
      <div
        className="relative w-full h-[410px] sm:h-[460px] md:h-[500px] flex items-center overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        {/* Sliding Horizontal Track */}
        <div
          className={`flex items-center ${
            isTransitioning && !isDragging
              ? 'transition-transform duration-500 ease-out'
              : 'transition-none'
          }`}
          style={{
            transform: `translateX(${currentTranslateX}px)`,
            gap: `${gap}px`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((item, idx) => {
            const isCenter = idx === currentIndex;
            return (
              <div
                key={`${item.url}-${idx}`}
                onClick={() => {
                  if (idx !== currentIndex && !isDragging) {
                    setIsTransitioning(true);
                    setCurrentIndex(idx);
                  }
                }}
                style={{ width: `${cardWidth}px` }}
                className={`flex-shrink-0 transition-all duration-300 ${
                  isCenter
                    ? 'scale-100 opacity-100 z-20'
                    : 'scale-[0.92] opacity-60 hover:opacity-80 z-10'
                }`}
              >
                {/* Artwork Outer Frame with Neon Border on active card */}
                <div
                  className={`relative rounded-2xl p-1.5 transition-all duration-300 ${
                    isCenter
                      ? 'bg-gradient-to-b from-[#00FF66]/40 via-white/10 to-[#00FF66]/20 box-glow-neon ring-1 ring-[#00FF66]/70 shadow-[0_15px_40px_rgba(0,0,0,0.85)]'
                      : 'bg-white/5 border border-white/10 shadow-md'
                  }`}
                >
                  {/* Inner Box Preserving Exact Image Proportion */}
                  <div className="relative rounded-xl overflow-hidden bg-[#070b08] w-full h-[370px] sm:h-[420px] md:h-[460px] flex items-center justify-center p-1.5">
                    <img
                      src={item.url}
                      alt={item.title}
                      loading="eager"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain block select-none pointer-events-none"
                    />

                    {/* Active Card Canva Tag */}
                    {isCenter && (
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-[#00FF66]/50 flex items-center gap-1 shadow-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
                        <span className="text-[10px] font-bold tracking-wider text-[#00FF66] uppercase">
                          Canva
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrow Left */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="absolute left-1.5 sm:left-3 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/80 hover:bg-black border border-white/20 hover:border-[#00FF66]/70 text-white hover:text-[#00FF66] backdrop-blur-md flex items-center justify-center transition-all duration-200 active:scale-90 shadow-xl"
          aria-label="Arte anterior"
        >
          <ChevronLeft className="w-5 h-5 -translate-x-0.5" />
        </button>

        {/* Navigation Arrow Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="absolute right-1.5 sm:right-3 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/80 hover:bg-black border border-white/20 hover:border-[#00FF66]/70 text-white hover:text-[#00FF66] backdrop-blur-md flex items-center justify-center transition-all duration-200 active:scale-90 shadow-xl"
          aria-label="Próxima arte"
        >
          <ChevronRight className="w-5 h-5 translate-x-0.5" />
        </button>
      </div>

      {/* Pagination Indicators & Swipe Hint */}
      <div className="mt-3 flex flex-col items-center gap-2">
        {/* Dot Indicators */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
          {ARTWORK_IMAGES.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => {
                setIsTransitioning(true);
                setCurrentIndex(total + dotIdx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                dotIdx === activeDotIndex
                  ? 'w-6 bg-[#00FF66] shadow-[0_0_8px_#00FF66]'
                  : 'w-1.5 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Ir para arte ${dotIdx + 1}`}
            />
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex items-center gap-1.5 text-xs text-[#A5ADA8]/70">
          <Sparkles className="w-3 h-3 text-[#00FF66]" />
          <span>Deslize para ver todas as 8 artes inclusas</span>
        </div>
      </div>
    </div>
  );
};
