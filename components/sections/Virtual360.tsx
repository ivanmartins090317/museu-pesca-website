"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import type { Virtual360Props } from "@/types";

interface IframeState {
  loading: boolean;
  error: boolean;
}

export function Virtual360({ title, embedUrl }: Virtual360Props) {
  // Criar array de embedUrls - se for string única, criar array com um item
  const embedUrls = useMemo(() => {
    const urls = Array.isArray(embedUrl) ? embedUrl : [embedUrl];
    // Validar URLs
    return urls.filter(
      (url) => url && typeof url === "string" && url.trim() !== ""
    );
  }, [embedUrl]);

  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [iframeStates, setIframeStates] = useState<Record<number, IframeState>>(
    {}
  );
  const [loadedIframes, setLoadedIframes] = useState<Set<number>>(new Set());
  const carouselRef = useRef<HTMLDivElement>(null);

  // Calcular valores aleatórios apenas no cliente para evitar erro de hidratação
  const backgroundElements = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      width: Math.random() * 300 + 100,
      height: Math.random() * 300 + 100,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 2,
    }));
  }, []);

  // Garantir que só renderiza no cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Inicializar estados dos iframes
  useEffect(() => {
    const states: Record<number, IframeState> = {};
    embedUrls.forEach((_, index) => {
      states[index] = { loading: true, error: false };
    });
    setIframeStates(states);
  }, [embedUrls]);

  const next = useCallback(() => {
    if (embedUrls && embedUrls.length > 0) {
      setCurrent((prev) => (prev + 1) % embedUrls.length);
    }
  }, [embedUrls]);

  const prev = useCallback(() => {
    if (embedUrls && embedUrls.length > 0) {
      setCurrent((prev) => (prev - 1 + embedUrls.length) % embedUrls.length);
    }
  }, [embedUrls]);

  const goTo = useCallback(
    (index: number) => {
      if (
        embedUrls &&
        embedUrls.length > 0 &&
        index >= 0 &&
        index < embedUrls.length
      ) {
        setCurrent(index);
      }
    },
    [embedUrls]
  );

  const goToFirst = useCallback(() => {
    goTo(0);
  }, [goTo]);

  const goToLast = useCallback(() => {
    if (embedUrls && embedUrls.length > 0) {
      goTo(embedUrls.length - 1);
    }
  }, [embedUrls, goTo]);

  // Navegação por teclado
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!carouselRef.current?.contains(document.activeElement)) {
        return;
      }

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          prev();
          break;
        case "ArrowRight":
          event.preventDefault();
          next();
          break;
        case "Home":
          event.preventDefault();
          goToFirst();
          break;
        case "End":
          event.preventDefault();
          goToLast();
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prev, next, goToFirst, goToLast]);

  // Handlers para iframes
  const handleIframeLoad = useCallback((index: number) => {
    setIframeStates((prev) => ({
      ...prev,
      [index]: { loading: false, error: false },
    }));
    setLoadedIframes((prev) => new Set(prev).add(index));
  }, []);

  const handleIframeError = useCallback((index: number) => {
    setIframeStates((prev) => ({
      ...prev,
      [index]: { loading: false, error: true },
    }));
  }, []);

  // Carregar iframe quando se torna current
  useEffect(() => {
    if (!loadedIframes.has(current)) {
      setIframeStates((prev) => ({
        ...prev,
        [current]: { loading: true, error: false },
      }));
    }
  }, [current, loadedIframes]);

  // Calcular quais iframes devem ser renderizados (apenas visíveis)
  const visibleIndices = useMemo(() => {
    if (embedUrls.length === 0) return [];
    if (embedUrls.length === 1) return [0];

    const indices: number[] = [];
    const prevIndex = (current - 1 + embedUrls.length) % embedUrls.length;
    const nextIndex = (current + 1) % embedUrls.length;

    indices.push(prevIndex);
    indices.push(current);
    indices.push(nextIndex);

    return [...new Set(indices)].sort((a, b) => a - b);
  }, [current, embedUrls.length]);

  if (embedUrls.length === 0) {
    return null;
  }

  return (
    <section
      id="visita-360"
      className="relative pt-8 pb-28 md:py-32 px-6 overflow-hidden"
      role="region"
      aria-label="Visita Virtual 360°"
      aria-live="polite"
    >
      {/* Light overlay for readability */}
      <div className="absolute inset-0 bg-primary-sea/40" />

      {/* Background Elements */}
      {mounted && (
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          {backgroundElements.map((element) => (
            <motion.div
              key={element.id}
              className="absolute rounded-full border border-cyan-500"
              style={{
                width: element.width,
                height: element.height,
                left: `${element.left}%`,
                top: `${element.top}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: element.duration,
                repeat: Infinity,
                delay: element.delay,
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-white uppercase tracking-wider">
            Visita Virtual
          </span>
          <motion.h2
            className="text-h2 font-bold  text-white mt-4"
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
            Explore o museu virtualmente e conheça nossos espaços sem sair de
            casa
          </motion.p>
        </motion.div>

        {/* 3D Matterport Carousel */}
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
        >
          <div className="relative h-[300px] md:h-[600px] flex items-center justify-center perspective-[1000px]">
            <div className="relative w-full h-full flex items-center justify-center">
              {visibleIndices.map((index) => {
                const url = embedUrls[index];
                const offset =
                  (index - current + embedUrls.length) % embedUrls.length;
                const isCurrent = offset === 0;
                const isNext = offset === 1;
                const isPrev = offset === embedUrls.length - 1;

                let position = 0;
                let scale = 0.7;
                let rotateY = 0;
                let zIndex = 0;
                let opacity = 0.5;

                if (isCurrent) {
                  position = 0;
                  scale = 1;
                  rotateY = 0;
                  zIndex = 30;
                  opacity = 1;
                } else if (isNext) {
                  position = 35;
                  scale = 0.75;
                  rotateY = -25;
                  zIndex = 20;
                  opacity = 0.7;
                } else if (isPrev) {
                  position = -35;
                  scale = 0.75;
                  rotateY = 25;
                  zIndex = 20;
                  opacity = 0.7;
                }

                const iframeState = iframeStates[index] || {
                  loading: true,
                  error: false,
                };

                return (
                  <motion.div
                    key={index}
                    className="absolute w-full max-w-4xl"
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                    animate={{
                      x: `${position}%`,
                      scale,
                      rotateY,
                      zIndex,
                      opacity,
                    }}
                    transition={{
                      duration: 0.7,
                      ease: "easeInOut",
                    }}
                    aria-hidden={!isCurrent}
                  >
                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-primary-sea/20 border border-cyan-500/20">
                      {iframeState.loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-primary-sea/30 z-10">
                          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                        </div>
                      )}
                      {iframeState.error && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary-sea/30 z-10 p-4">
                          <AlertCircle className="w-8 h-8 text-red-400 mb-2" />
                          <p className="text-white text-sm text-center">
                            Erro ao carregar visita virtual
                          </p>
                        </div>
                      )}
                      {!iframeState.error && (
                        <iframe
                          src={
                            isCurrent || loadedIframes.has(index)
                              ? url
                              : undefined
                          }
                          data-src={url}
                          className="w-full h-full border-0"
                          allow="fullscreen; accelerometer; gyroscope"
                          title={`Visita Virtual 360° - Museu de Pesca de Santos - ${
                            index + 1
                          } de ${embedUrls.length}`}
                          loading={isCurrent ? "eager" : "lazy"}
                          onLoad={() => handleIframeLoad(index)}
                          onError={() => handleIframeError(index)}
                          aria-label={`Visita virtual ${index + 1} de ${
                            embedUrls.length
                          }`}
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            {embedUrls.length > 1 && (
              <>
                <motion.button
                  onClick={prev}
                  className="absolute left-4 z-40 p-3 rounded-full bg-primary-sea/20 backdrop-blur-sm border border-cyan-500/20 text-white hover:bg-primary-sea/40 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-sea/400 focus:ring-offset-2 focus:ring-offset-primary-sea"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Visita anterior"
                  aria-controls="visita-360"
                >
                  <ChevronLeft className="w-6 h-6" aria-hidden="true" />
                </motion.button>
                <motion.button
                  onClick={next}
                  className="absolute right-4 z-40 p-3 rounded-full bg-primary-sea/20 backdrop-blur-sm border border-cyan-500/20 text-white hover:bg-primary-sea/40 transition-colors focus:outline-none focus:ring-2 focus:primary-sea-400 focus:ring-offset-2 focus:ring-offset-primary-sea"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Próxima visita"
                  aria-controls="visita-360"
                >
                  <ChevronRight className="w-6 h-6" aria-hidden="true" />
                </motion.button>
              </>
            )}
          </div>

          {/* Indicators */}
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
                    current === index
                      ? "bg-primary-sea w-12"
                      : "bg-cyan-500/30 w-2 hover:bg-cyan-500/50"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Ir para visita ${index + 1} de ${
                    embedUrls.length
                  }`}
                />
              ))}
            </div>
          )}

          {/* Screen reader announcement */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            Visita {current + 1} de {embedUrls.length}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
