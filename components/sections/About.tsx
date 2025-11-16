"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { fadeInUp, staggerContainer, defaultTransition } from "@/lib/animations";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import type { AboutSection } from "@/types";

export function About({ title, description, highlights, images }: AboutSection) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="sobre"
      ref={ref}
      className="py-section bg-neutral-gray-100"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion || !isInView ? {} : staggerContainer.hidden}
          animate={prefersReducedMotion || !isInView ? {} : staggerContainer.visible}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Text Content */}
          <motion.div
            variants={prefersReducedMotion ? {} : fadeInUp}
            initial={prefersReducedMotion ? {} : "hidden"}
            animate={prefersReducedMotion || !isInView ? {} : "visible"}
            transition={defaultTransition}
          >
            <h2 className="text-h2 font-bold text-primary-ocean mb-6">
              {title}
            </h2>
            <div className="space-y-4 text-body text-neutral-gray-800">
              {description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div
            variants={prefersReducedMotion ? {} : fadeInUp}
            initial={prefersReducedMotion ? {} : "hidden"}
            animate={prefersReducedMotion || !isInView ? {} : "visible"}
            transition={{ ...defaultTransition, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                variants={prefersReducedMotion ? {} : fadeInUp}
                initial={prefersReducedMotion ? {} : "hidden"}
                animate={prefersReducedMotion || !isInView ? {} : "visible"}
                transition={{ ...defaultTransition, delay: 0.3 + index * 0.1 }}
                className="bg-neutral-white p-6 rounded-lg shadow-sm border border-neutral-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="text-4xl font-black text-primary-aqua mb-2">
                  {highlight.value}
                </div>
                <div className="text-sm text-neutral-gray-800 font-medium">
                  {highlight.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Images */}
        {images.length > 0 && (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
            animate={prefersReducedMotion || !isInView ? {} : { opacity: 1, y: 0 }}
            transition={{ ...defaultTransition, delay: 0.6 }}
            className="mt-16 grid md:grid-cols-2 gap-6"
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
                animate={prefersReducedMotion || !isInView ? {} : { opacity: 1, scale: 1 }}
                transition={{ ...defaultTransition, delay: 0.7 + index * 0.1 }}
                className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg"
              >
                <Image
                  src={image}
                  alt={`Imagem do museu ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

