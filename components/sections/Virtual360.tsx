"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fadeInUp, defaultTransition } from "@/lib/animations";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import type { Virtual360Props } from "@/types";

export function Virtual360({ title, embedUrl, areas, cta }: Virtual360Props) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="visita-360"
      ref={ref}
      className="py-section bg-primary-sand"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion || !isInView ? {} : fadeInUp.hidden}
          animate={prefersReducedMotion || !isInView ? {} : fadeInUp.visible}
          transition={defaultTransition}
          className="text-center mb-12"
        >
          <h2 className="text-h2 font-bold text-primary-ocean mb-4">
            {title}
          </h2>
          <p className="text-body text-neutral-gray-800 max-w-2xl mx-auto">
            Explore o museu virtualmente e conheça nossos espaços sem sair de casa
          </p>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion || !isInView ? {} : { opacity: 0, scale: 0.95 }}
          animate={prefersReducedMotion || !isInView ? {} : { opacity: 1, scale: 1 }}
          transition={{ ...defaultTransition, delay: 0.2 }}
          className="max-w-6xl mx-auto mb-8"
        >
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allow="fullscreen"
              allowFullScreen
              title="Tour Virtual 360 do Museu de Pesca"
            />
          </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion || !isInView ? {} : fadeInUp.hidden}
          animate={prefersReducedMotion || !isInView ? {} : fadeInUp.visible}
          transition={{ ...defaultTransition, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-neutral-white rounded-lg p-8 shadow-lg">
            <h3 className="text-h3 font-bold text-primary-ocean mb-6">
              Áreas Disponíveis no Tour
            </h3>
            <ul className="grid md:grid-cols-2 gap-4 mb-8">
              {areas.map((area, index) => (
                <motion.li
                  key={index}
                  initial={prefersReducedMotion || !isInView ? {} : { opacity: 0, x: -20 }}
                  animate={prefersReducedMotion || !isInView ? {} : { opacity: 1, x: 0 }}
                  transition={{ ...defaultTransition, delay: 0.5 + index * 0.1 }}
                  className="flex items-center text-body text-neutral-gray-800"
                >
                  <span className="w-2 h-2 bg-primary-aqua rounded-full mr-3" />
                  {area}
                </motion.li>
              ))}
            </ul>
            <div className="text-center">
              <Button asChild size="lg" variant="outline">
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

