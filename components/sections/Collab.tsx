"use client";

import React from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { defaultTransition } from "@/lib/animations";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import type { CollabProps } from "@/types";

export function Collab({ collabs }: CollabProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const shouldAnimate = !prefersReducedMotion && isInView;

  // Logos dos apoiadores

  // Estado para o carrossel mobile
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitX, setExitX] = useState<number>(0);

  // Função para navegar entre slides
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % collabs.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + collabs.length) % collabs.length);
  };

  // Função para lidar com drag/swipe
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (Math.abs(info.offset.x) > 100) {
      setExitX(info.offset.x);
      setTimeout(() => {
        if (info.offset.x > 0) {
          handlePrevious();
        } else {
          handleNext();
        }
        setExitX(0);
      }, 200);
    }
  };

  // Auto-play do carrossel apenas em mobile
  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % collabs.length);
    }, 4000); // Muda a cada 4 segundos para melhor experiência

    return () => clearInterval(interval);
  }, [collabs.length, prefersReducedMotion]);

  return (
    <section className="py-section relative overflow-hidden bg-transparent isolate">
      <div className="container mx-auto sm:px-6 lg:px-8 h-full pb-10 relative z-10 px-1">
        <motion.div
          ref={ref}
          initial={shouldAnimate ? { opacity: 0, y: 20 } : undefined}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
          transition={defaultTransition}
          className="text-center mb-0"
        >
          <h2 className="text-h2 font-bold text-white mb-4">
            Os colaboradores <br className="sm:hidden" /> do Museu
          </h2>
          <p className="text-body text-white max-w-lg mx-auto mb-10 md:mb-0">
            Agradecemos aos nossos colaboradores que tornam possível nossa
            missão
          </p>
        </motion.div>
      </div>
      <div className="relative h-full md:py-32 py-10">
        {/* Logos dos parceiros - Desktop (grid) */}
        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 30 } : undefined}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
          transition={{ ...defaultTransition, delay: 0.2 }}
          className="hidden md:flex w-full flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16 mt-0"
        >
          {collabs.map((collab, index) => (
            <motion.div
              key={collab.name}
              initial={shouldAnimate ? { opacity: 1, scale: 0.9 } : undefined}
              animate={shouldAnimate ? { opacity: 1, scale: 1 } : undefined}
              transition={{
                ...defaultTransition,
                delay: 0.3 + index * 0.1,
              }}
              className="flex items-center justify-center  hover:grayscale-100 transition-all duration-300 hover:scale-105"
            >
              <Image
                src={collab.logo}
                alt={collab.alt}
                width={800}
                height={300}
                className="object-contain max-h-40 md:max-h-48 w-auto h-auto bg-white p-4 rounded-lg"
                priority={index === 0}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Carrossel Mobile - abaixo de 760px com cards empilhados */}
        <div className="md:hidden w-full overflow-visible relative">
          <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 30 } : undefined}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
            transition={{ ...defaultTransition, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-sm mx-auto h-[320px] flex items-center justify-center">
              {/* Container dos cards empilhados */}
              <div className="relative w-full h-full">
                <AnimatePresence mode="popLayout">
                  {collabs.map((collab, index) => {
                    // Calcular posição relativa ao card atual
                    const position = index - currentIndex;
                    const isCurrentCard = position === 0;
                    const isPrevCard =
                      index ===
                      (currentIndex - 1 + collabs.length) % collabs.length;
                    const isNextCard =
                      index === (currentIndex + 1) % collabs.length;

                    // Mostrar apenas o card atual e os 2 próximos/anteriores
                    if (!isCurrentCard && !isPrevCard && !isNextCard)
                      return null;

                    // Calcular z-index baseado na posição
                    const zIndex = isCurrentCard ? 3 : isPrevCard ? 2 : 1;

                    return (
                      <motion.div
                        key={`${collab.name}-${index}`}
                        drag={isCurrentCard ? "x" : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.7}
                        onDragEnd={isCurrentCard ? handleDragEnd : undefined}
                        initial={{
                          scale: 0.95,
                          opacity: 0,
                          y: isCurrentCard ? 0 : isPrevCard ? 8 : 16,
                          rotate: isCurrentCard ? 0 : isPrevCard ? -2 : -4,
                        }}
                        animate={{
                          scale: isCurrentCard ? 1 : 0.95,
                          opacity: isCurrentCard ? 1 : isPrevCard ? 0.6 : 0.3,
                          x: isCurrentCard ? exitX : 0,
                          y: isCurrentCard ? 0 : isPrevCard ? 8 : 16,
                          rotate: isCurrentCard
                            ? exitX / 20
                            : isPrevCard
                            ? -2
                            : -4,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
                        style={{
                          zIndex,
                        }}
                      >
                        <div
                          className={`flex items-center justify-center transition-all duration-300 ${
                            isCurrentCard
                              ? "hover:scale-105"
                              : "pointer-events-none"
                          }`}
                        >
                          <div className="bg-white p-4 rounded-2xl shadow-xl dark:bg-card dark:shadow-[2px_2px_4px_rgba(0,0,0,0.4),-1px_-1px_3px_rgba(255,255,255,0.1)]">
                            <Image
                              src={collab.logo}
                              alt={collab.alt}
                              width={200}
                              height={80}
                              className="object-contain max-h-200 w-auto h-auto"
                              priority={index === 0}
                            />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Controles de navegação */}
              <div className="absolute top-[24rem] bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
                <button
                  onClick={handlePrevious}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 hover:bg-white/30 hover:border-white/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  aria-label="Slide anterior"
                >
                  <ChevronLeft className="h-5 w-5 text-white" />
                </button>

                {/* Indicadores de slide */}
                <div className="flex justify-center gap-2">
                  {collabs.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentIndex === index
                          ? "bg-white w-8"
                          : "bg-white/40 w-2 hover:bg-white/60"
                      }`}
                      aria-label={`Ir para slide ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 hover:bg-white/30 hover:border-white/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  aria-label="Próximo slide"
                >
                  <ChevronRight className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
        {/* Background text "APOIO" */}
        {/* <div className="absolute inset-0 flex  items-center justify-center pointer-events-none z-0 overflow-hidden">
          <h2
            className="text-[clamp(2rem,9vw,4rem)] font-black text-transparent select-none leading-none"
            style={{
              WebkitTextStroke: "2px rgba(255, 255, 255, 1)",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.05em",
              fontFamily: "var(--font-roboto)",
            }}
          >
            COLABORADORES
          </h2>
        </div> */}
      </div>
    </section>
  );
}
