"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import type { AboutSection } from "@/types";
import { defaultTransition, staggerContainer } from "@/lib/animations";
import { useDeviceCapability } from "@/lib/hooks/useDeviceCapability";

interface AboutProps extends AboutSection {}

// Constantes para delays de animação
const ANIMATION_DELAYS = {
  title: 0.2,
  description: 0.3,
  descriptionStagger: 0.15,
  highlights: 0.6,
  highlightsStagger: 0.1,
  images: 0.4,
  imagesStagger: 0.15,
} as const;

// Descrições para alt text das imagens
const IMAGE_ALT_TEXTS = [
  "Entrada principal do Museu de Pesca de Santos",
  "Vista externa do Museu de Pesca",
  "Acervo de peixes e espécies marinhas do museu",
  "Exposição de equipamentos de pesca históricos",
  "Interior do museu com exposições temáticas",
  "Detalhes arquitetônicos do edifício do museu",
];

const CAROUSEL_INTERVAL_MS = 4000;

export function About({ title, description, highlights, images }: AboutProps) {
  const { shouldReduceMotion: prefersReducedMotion } = useDeviceCapability();
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!images || images.length <= 1 || prefersReducedMotion || isHovered) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, CAROUSEL_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [images, prefersReducedMotion, isHovered]);

  const imageCount = images?.length ?? 0;
  const canNavigateCarousel = imageCount > 1;

  function goToPreviousImage() {
    if (!images?.length) return;
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  }

  function goToNextImage() {
    if (!images?.length) return;
    setCurrentImage((prev) => (prev + 1) % images.length);
  }

  const carouselNavButtonClassName =
    "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-primary-aqua/35 bg-[#0a1628]/70 text-primary-aqua backdrop-blur-sm transition-all duration-300 hover:bg-primary-aqua/15 hover:border-primary-aqua/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-aqua focus-visible:ring-offset-1 focus-visible:ring-offset-[#0a1628] disabled:pointer-events-none disabled:opacity-35";

  return (
    <section
      id="sobre"
      className="relative py-16 md:py-section px-4 sm:px-6 md:px-8 overflow-hidden z-10"
    >
      {/* Light overlay for readability */}
      <div className="absolute inset-0 bg-[#0a1628]/30" />

      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary-aqua rounded-full blur-[60px]" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-primary-ocean rounded-full blur-[60px]" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 mt-12 lg:grid-cols-2 gap-8 md:gap-16 lg:items-stretch">
          {/* Text Content */}
          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, x: -30 }}
            whileInView={
              prefersReducedMotion ? undefined : { opacity: 1, x: 0 }
            }
            transition={defaultTransition}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6 md:space-y-8 lg:flex lg:flex-col lg:justify-between"
          >
            <motion.h2
              className="text-h2 md:text-[clamp(2.5rem,5vw,4rem)] text-white font-bold"
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
              }
              transition={{
                ...defaultTransition,
                delay: ANIMATION_DELAYS.title,
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              {title}
            </motion.h2>

            <motion.div
              variants={prefersReducedMotion ? undefined : staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-4"
            >
              {description.map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={
                    prefersReducedMotion
                      ? undefined
                      : { hidden: { opacity: 0 }, visible: { opacity: 1 } }
                  }
                  transition={{
                    ...defaultTransition,
                    delay:
                      ANIMATION_DELAYS.description +
                      index * ANIMATION_DELAYS.descriptionStagger,
                  }}
                  className="text-body text-gray-300 leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>

            {highlights && highlights.length > 0 && (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6"
                initial={
                  prefersReducedMotion ? undefined : { opacity: 0, y: 20 }
                }
                whileInView={
                  prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                }
                transition={{
                  ...defaultTransition,
                  delay: ANIMATION_DELAYS.highlights,
                }}
                viewport={{ once: true, amount: 0.2 }}
              >
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    className="bg-primary-sea/40 flex flex-row-reverse md:flex-col justify-between border border-primary-aqua/30 rounded-lg p-4 md:p-5"
                    initial={
                      prefersReducedMotion
                        ? undefined
                        : { opacity: 0, scale: 0.95 }
                    }
                    whileInView={
                      prefersReducedMotion
                        ? undefined
                        : { opacity: 1, scale: 1 }
                    }
                    transition={{
                      ...defaultTransition,
                      delay:
                        ANIMATION_DELAYS.highlights +
                        index * ANIMATION_DELAYS.highlightsStagger,
                    }}
                    viewport={{ once: true, amount: 0.2 }}
                  >
                      <div className="text-2xl md:text-3xl font-bold text-white">
                      {highlight.value}
                    </div>
                    <div className="text-sm md:text-base text-gray-400 mt-1">
                      {highlight.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Image Carousel */}
          {images && images.length > 0 && (
            <motion.div
              className="flex flex-col gap-3 lg:h-full"
              initial={prefersReducedMotion ? undefined : { opacity: 0, x: 30 }}
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, x: 0 }
              }
              transition={{
                ...defaultTransition,
                delay: ANIMATION_DELAYS.images,
              }}
              viewport={{ once: true, amount: 0.2 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Imagem principal com fade + zoom */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-black/40 aspect-video mt-8 sm:aspect-[4/3] lg:aspect-auto lg:flex-1 lg:min-h-[280px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage}
                    initial={
                      prefersReducedMotion
                        ? undefined
                        : { opacity: 0, scale: 1.06 }
                    }
                    animate={
                      prefersReducedMotion
                        ? undefined
                        : { opacity: 1, scale: 1 }
                    }
                    exit={
                      prefersReducedMotion
                        ? undefined
                        : { opacity: 0, scale: 0.97 }
                    }
                    transition={{ duration: 0.75, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[currentImage]}
                      alt={
                        IMAGE_ALT_TEXTS[currentImage] ||
                        `Imagem do Museu de Pesca ${currentImage + 1}`
                      }
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={currentImage === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/70 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Barra de progresso */}
                {!prefersReducedMotion && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
                    <motion.div
                      key={`progress-${currentImage}-${isHovered}`}
                      className="h-full bg-primary-aqua"
                      initial={{ width: "0%" }}
                      animate={{ width: isHovered ? "0%" : "100%" }}
                      transition={{
                        duration: isHovered ? 0 : CAROUSEL_INTERVAL_MS / 1000,
                        ease: "linear",
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Thumbnails clicáveis */}
              <div
                className={`grid gap-2`}
                style={{
                  gridTemplateColumns: `repeat(${Math.min(images.length, 4)}, 1fr)`,
                }}
              >
                {images.slice(0, 4).map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`relative overflow-hidden rounded-xl aspect-video transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-aqua ${
                      i === currentImage
                        ? "ring-2 ring-primary-aqua ring-offset-1 ring-offset-[#0a1628] scale-[1.04] opacity-100"
                        : "opacity-50 hover:opacity-80 hover:scale-[1.02]"
                    }`}
                    aria-label={
                      IMAGE_ALT_TEXTS[i] || `Ver imagem ${i + 1}`
                    }
                  >
                    <Image
                      src={src}
                      alt={IMAGE_ALT_TEXTS[i] || `Miniatura ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </button>
                ))}
              </div>

              {/* Dots + navegação anterior/próximo */}
              <div className="flex justify-center items-center gap-3">
                <button
                  type="button"
                  onClick={goToPreviousImage}
                  disabled={!canNavigateCarousel}
                  aria-label="Imagem anterior"
                  className={carouselNavButtonClassName}
                >
                  <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
                </button>
                <div className="flex justify-center items-center gap-2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrentImage(i)}
                      aria-label={`Ir para imagem ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-aqua focus-visible:ring-offset-1 focus-visible:ring-offset-[#0a1628] ${
                        i === currentImage
                          ? "bg-primary-aqua w-6"
                          : "bg-white/30 w-1.5 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={goToNextImage}
                  disabled={!canNavigateCarousel}
                  aria-label="Próxima imagem"
                  className={carouselNavButtonClassName}
                >
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
