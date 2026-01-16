"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { defaultTransition } from "@/lib/animations";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import type { PartnersProps } from "@/types";

export function Partners({ partners }: PartnersProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const shouldAnimate = !prefersReducedMotion && isInView;

  // Logos dos apoiadores

  // Estado para o carrossel mobile
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play do carrossel apenas em mobile
  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % partners.length);
    }, 3000); // Muda a cada 3 segundos

    return () => clearInterval(interval);
  }, [partners.length, prefersReducedMotion]);

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
          <h2 className="text-h2 font-bold text-white mb-4">APOIO</h2>
        </motion.div>
      </div>
      <div className="relative h-full md:py-32 py-10">
        {/* Logos dos Apoiadores - Desktop (grid) */}
        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 30 } : undefined}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
          transition={{ ...defaultTransition, delay: 0.2 }}
          className="flex sm:bg-transparent md:bg-white p-4 w-full flex-wrap items-center justify-center gap-20 md:gap-12 lg:gap-16 mt-0"
        >
          {partners.map((apoiador, index) => (
            <motion.div
              key={apoiador.name}
              initial={shouldAnimate ? { opacity: 0, scale: 0.9 } : undefined}
              animate={shouldAnimate ? { opacity: 1, scale: 1 } : undefined}
              transition={{
                ...defaultTransition,
                delay: 0.3 + index * 0.1,
              }}
              className="flex items-center justify-center hover:grayscale-0 transition-all duration-300 hover:scale-105"
            >
              <Image
                src={apoiador.logo}
                alt={apoiador.alt}
                width={200}
                height={80}
                className="object-contain max-h-20 md:max-h-24 w-auto h-auto bg-white p-4 rounded-lg"
                priority={index === 0}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Carrossel Mobile - abaixo de 760px */}
        <div className="hidden w-full overflow-hidden relative">
          <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 30 } : undefined}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
            transition={{ ...defaultTransition, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-sm mx-auto">
              <AnimatePresence
                mode="wait"
                initial={false}
                onExitComplete={() => {
                  // Garantir que a limpeza seja concluída
                }}
              >
                {partners[currentIndex] && (
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                    }}
                    className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
                  >
                    <Image
                      src={partners[currentIndex].logo}
                      alt={partners[currentIndex].alt}
                      width={200}
                      height={80}
                      className="object-contain max-h-20 w-auto h-auto bg-white p-4 rounded-lg"
                      priority={currentIndex === 0}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Indicadores de slide */}
              <div className="flex justify-center gap-2 mt-6">
                {partners.map((_, index) => (
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
            </div>
          </motion.div>
        </div>
        {/* Background text "APOIO" */}
        <div className="absolute inset-0 flex  items-center justify-center pointer-events-none z-0 overflow-hidden">
          <h2
            className="text-[clamp(6rem,25vw,20rem)] font-black text-transparent select-none leading-none"
            style={{
              WebkitTextStroke: "2px rgba(255, 255, 255, 0.08)",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.05em",
              fontFamily: "var(--font-roboto)",
            }}
          >
            APOIO
          </h2>
        </div>
      </div>
    </section>
  );
}
