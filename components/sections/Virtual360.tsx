"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Virtual360Props } from "@/types";
import { Virtual360CarouselItem } from "./Virtual360CarouselItem";
import { Virtual360Fullscreen } from "./Virtual360Fullscreen";
import type { IframeState } from "./Virtual360CarouselItem";
import { useDeviceCapability } from "@/lib/hooks/useDeviceCapability";

function resolveCarouselPosition(
  offset: number,
  total: number
): { position: number; scale: number; rotateY: number; zIndex: number; opacity: number } {
  const isCurrent = offset === 0;
  const isNext = offset === 1;
  const isPrev = offset === total - 1;

  if (isCurrent) return { position: 0, scale: 1, rotateY: 0, zIndex: 30, opacity: 1 };
  if (isNext) return { position: 35, scale: 0.75, rotateY: -25, zIndex: 20, opacity: 0.7 };
  if (isPrev) return { position: -35, scale: 0.75, rotateY: 25, zIndex: 20, opacity: 0.7 };
  return { position: 0, scale: 0.7, rotateY: 0, zIndex: 0, opacity: 0.5 };
}

export function Virtual360({ title, embedUrl }: Virtual360Props) {
  const { shouldReduceMotion } = useDeviceCapability();
  const embedUrls = useMemo(() => {
    const urls = Array.isArray(embedUrl) ? embedUrl : [embedUrl];
    return urls.filter((url) => url && typeof url === "string" && url.trim() !== "");
  }, [embedUrl]);

  const [current, setCurrent] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [iframeStates, setIframeStates] = useState<Record<number, IframeState>>({});
  const [loadedIframes, setLoadedIframes] = useState<Set<number>>(new Set());
  const carouselRef = useRef<HTMLDivElement>(null);
  const swipeStartX = useRef<number | null>(null);
  const swipeStartY = useRef<number | null>(null);

  const backgroundElements = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        width: Math.random() * 300 + 100,
        height: Math.random() * 300 + 100,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 2,
      })),
    []
  );

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const states: Record<number, IframeState> = {};
    embedUrls.forEach((_, index) => { states[index] = { loading: true, error: false }; });
    setIframeStates(states);
  }, [embedUrls]);

  const next = useCallback(() => {
    if (embedUrls.length > 0) setCurrent((prev) => (prev + 1) % embedUrls.length);
  }, [embedUrls]);

  const prev = useCallback(() => {
    if (embedUrls.length > 0) setCurrent((prev) => (prev - 1 + embedUrls.length) % embedUrls.length);
  }, [embedUrls]);

  const goTo = useCallback(
    (index: number) => {
      if (embedUrls.length > 0 && index >= 0 && index < embedUrls.length) setCurrent(index);
    },
    [embedUrls]
  );

  const goToFirst = useCallback(() => goTo(0), [goTo]);

  const goToLast = useCallback(() => {
    if (embedUrls.length > 0) goTo(embedUrls.length - 1);
  }, [embedUrls, goTo]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    swipeStartX.current = e.touches[0].clientX;
    swipeStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (swipeStartX.current === null || swipeStartY.current === null) return;
      const dx = e.changedTouches[0].clientX - swipeStartX.current;
      const dy = e.changedTouches[0].clientY - swipeStartY.current;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) dx > 0 ? prev() : next();
      swipeStartX.current = null;
      swipeStartY.current = null;
    },
    [prev, next]
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isExpanded) { setIsExpanded(false); return; }
      if (!carouselRef.current?.contains(document.activeElement)) return;
      switch (event.key) {
        case "ArrowLeft": event.preventDefault(); prev(); break;
        case "ArrowRight": event.preventDefault(); next(); break;
        case "Home": event.preventDefault(); goToFirst(); break;
        case "End": event.preventDefault(); goToLast(); break;
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded, prev, next, goToFirst, goToLast]);

  const handleIframeLoad = useCallback((index: number) => {
    setIframeStates((prev) => ({ ...prev, [index]: { loading: false, error: false } }));
    setLoadedIframes((prev) => new Set(prev).add(index));
  }, []);

  const handleIframeError = useCallback((index: number) => {
    setIframeStates((prev) => ({ ...prev, [index]: { loading: false, error: true } }));
  }, []);

  useEffect(() => {
    const timeouts = embedUrls.map((_, index) =>
      setTimeout(() => {
        setIframeStates((prev) => {
          if (prev[index]?.loading && !prev[index]?.error)
            return { ...prev, [index]: { loading: false, error: false } };
          return prev;
        });
      }, 2000)
    );
    return () => timeouts.forEach(clearTimeout);
  }, [embedUrls]);

  useEffect(() => {
    if (!loadedIframes.has(current))
      setIframeStates((prev) => ({ ...prev, [current]: { loading: true, error: false } }));
  }, [current, loadedIframes]);

  const visibleIndices = useMemo(() => {
    if (embedUrls.length === 0) return [];
    if (embedUrls.length === 1) return [0];
    const prevIndex = (current - 1 + embedUrls.length) % embedUrls.length;
    const nextIndex = (current + 1) % embedUrls.length;
    return [...new Set([prevIndex, current, nextIndex])].sort((a, b) => a - b);
  }, [current, embedUrls.length]);

  if (embedUrls.length === 0) return null;

  return (
    <section
      id="visita-360"
      className="relative pt-8 pb-28 md:py-32 px-6 overflow-hidden"
      role="region"
      aria-label="Visita Virtual 360°"
      aria-live="polite"
    >
      <div className="absolute inset-0 bg-primary-sea/40" />

      {mounted && !shouldReduceMotion && (
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          {backgroundElements.map((el) => (
            <motion.div
              key={el.id}
              className="absolute rounded-full border border-cyan-500"
              style={{ width: el.width, height: el.height, left: `${el.left}%`, top: `${el.top}%` }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: el.duration, repeat: Infinity, delay: el.delay }}
            />
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-white uppercase tracking-wider">Visita Virtual</span>
          <motion.h2
            className="text-h2 font-bold text-white mt-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-gray-300 text-lg mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Explore o museu virtualmente e conheça nossos espaços sem sair de casa
          </motion.p>
        </motion.div>

        <motion.div
          ref={carouselRef}
          className="w-full mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
          role="group"
          aria-label="Carrossel de visitas virtuais"
          tabIndex={0}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative h-[300px] md:h-[600px] flex items-center justify-center perspective-[1000px]">
            <div className="relative w-full h-full flex items-center justify-center">
              {visibleIndices.map((index) => {
                const offset = (index - current + embedUrls.length) % embedUrls.length;
                const layout = resolveCarouselPosition(offset, embedUrls.length);
                const iframeState = iframeStates[index] ?? { loading: true, error: false };

                return (
                  <Virtual360CarouselItem
                    key={index}
                    url={embedUrls[index]}
                    index={index}
                    total={embedUrls.length}
                    isCurrent={offset === 0}
                    isLoaded={loadedIframes.has(index)}
                    iframeState={iframeState}
                    onExpand={() => setIsExpanded(true)}
                    onLoad={() => handleIframeLoad(index)}
                    onError={() => handleIframeError(index)}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    {...layout}
                  />
                );
              })}
            </div>

            {embedUrls.length > 1 && (
              <>
                <motion.button
                  onClick={prev}
                  className="absolute left-2 md:left-4 z-40 p-3 md:p-4 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white hover:bg-black/60 active:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.85 }}
                  aria-label="Visita anterior"
                  aria-controls="visita-360"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
                </motion.button>
                <motion.button
                  onClick={next}
                  className="absolute right-2 md:right-4 z-40 p-3 md:p-4 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white hover:bg-black/60 active:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.85 }}
                  aria-label="Próxima visita"
                  aria-controls="visita-360"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
                </motion.button>
              </>
            )}
          </div>

          {embedUrls.length > 1 && (
            <div
              className="flex justify-center gap-3 mt-0 min-[480px]:mt-12 md:mt-0"
              role="tablist"
              aria-label="Indicadores de visita virtual"
            >
              {embedUrls.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goTo(index)}
                  role="tab"
                  aria-selected={current === index}
                  aria-controls={`visita-${index}`}
                  className={`h-2 rounded-full transition-all border duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-primary-sea ${
                    current === index ? "bg-primary-sea w-12" : "bg-cyan-500/30 w-2 hover:bg-cyan-500/50"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Ir para visita ${index + 1} de ${embedUrls.length}`}
                />
              ))}
            </div>
          )}

          <div className="sr-only" aria-live="polite" aria-atomic="true">
            Visita {current + 1} de {embedUrls.length}
          </div>
        </motion.div>
      </div>

      <Virtual360Fullscreen
        isOpen={isExpanded}
        src={embedUrls[current]}
        index={current}
        total={embedUrls.length}
        onClose={() => setIsExpanded(false)}
      />
    </section>
  );
}
