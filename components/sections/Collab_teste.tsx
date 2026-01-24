"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { defaultTransition } from "@/lib/animations";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import type { CollabProps } from "@/types";
import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel";

export function CollabTeste({ collabs }: CollabProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const shouldAnimate = !prefersReducedMotion && isInView;

  return (
    <section className="relative overflow-visible bg-transparent isolate">
      <div className="container mx-auto sm:px-6 lg:px-8 h-full pb-10 relative z-10 px-1">
        <motion.div
          ref={ref}
          initial={shouldAnimate ? { opacity: 0, y: 20 } : undefined}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
          transition={defaultTransition}
          className="text-center mb-0"
        >
          <h2 className="text-h2 font-bold text-white mb-4">
            Museus <br className="sm:hidden" /> Parceiros
          </h2>
          <p className="text-body text-white max-w-xl mx-auto mb-10 md:mb-0">
            Explore os museus que fazem parte do Metaverso do Museu de Pesca
          </p>
        </motion.div>
      </div>

      {/* Container 3D Carousel */}
      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: 30 } : undefined}
        animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
        transition={{ ...defaultTransition, delay: 0.2 }}
        className="relative w-full py-0 md:py-0 overflow-visible"
      >
        <ThreeDPhotoCarousel cards={collabs} />
      </motion.div>
    </section>
  );
}
