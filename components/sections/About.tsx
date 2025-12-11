"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { AboutSection } from "@/types";
import { defaultTransition, staggerContainer } from "@/lib/animations";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

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

export function About({ title, description, highlights, images }: AboutProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="sobre"
      className="relative py-16 md:py-section px-4 sm:px-6 md:px-8 overflow-hidden z-10"
    >
      {/* Light overlay for readability */}
      <div className="absolute inset-0 bg-[#0a1628]/30" />

      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-aqua rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary-ocean rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, x: -30 }}
            whileInView={
              prefersReducedMotion ? undefined : { opacity: 1, x: 0 }
            }
            transition={defaultTransition}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6 md:space-y-8"
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
                    className="bg-primary-sea/20 backdrop-blur-sm border border-primary-aqua/30 rounded-lg p-4 md:p-5"
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

          {/* Image Grid */}
          {images && images.length > 0 && (
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={prefersReducedMotion ? undefined : { opacity: 0, x: 30 }}
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, x: 0 }
              }
              transition={{
                ...defaultTransition,
                delay: ANIMATION_DELAYS.images,
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              {images.map((imageSrc, index) => {
                const altText =
                  IMAGE_ALT_TEXTS[index] ||
                  `Imagem do acervo do Museu de Pesca - ${index + 1}`;
                return (
                  <motion.div
                    key={index}
                    className={`relative overflow-hidden rounded-2xl ${
                      index === 0 ? "col-span-2" : ""
                    }`}
                    initial={
                      prefersReducedMotion ? undefined : { opacity: 0, y: 20 }
                    }
                    whileInView={
                      prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                    }
                    transition={{
                      ...defaultTransition,
                      delay:
                        ANIMATION_DELAYS.images +
                        index * ANIMATION_DELAYS.imagesStagger,
                    }}
                    viewport={{ once: true, amount: 0.2 }}
                    whileHover={
                      prefersReducedMotion ? undefined : { scale: 1.03 }
                    }
                  >
                    <div className="relative aspect-[4/3] overflow-hidden group">
                      <Image
                        src={imageSrc}
                        alt={altText}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading={index > 1 ? "lazy" : "eager"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
