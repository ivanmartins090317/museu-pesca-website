"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { fadeInUp, staggerContainer, defaultTransition } from "@/lib/animations";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import type { PartnersProps } from "@/types";

export function Partners({ partners }: PartnersProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const partnersByCategory = {
    master: partners.filter((p) => p.category === "master"),
    supporter: partners.filter((p) => p.category === "supporter"),
    institutional: partners.filter((p) => p.category === "institutional"),
  };

  return (
    <section className="py-section bg-neutral-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={prefersReducedMotion || !isInView ? {} : fadeInUp.hidden}
          animate={prefersReducedMotion || !isInView ? {} : fadeInUp.visible}
          transition={defaultTransition}
          className="text-center mb-12"
        >
          <h2 className="text-h2 font-bold text-primary-ocean mb-4">
            Quem Apoia o Museu
          </h2>
          <p className="text-body text-neutral-gray-800 max-w-2xl mx-auto">
            Agradecemos aos nossos parceiros e apoiadores que tornam possível nossa missão
          </p>
        </motion.div>

        {/* Patrocinadores Master */}
        {partnersByCategory.master.length > 0 && (
          <motion.div
            initial={prefersReducedMotion || !isInView ? {} : fadeInUp.hidden}
            animate={prefersReducedMotion || !isInView ? {} : fadeInUp.visible}
            transition={{ ...defaultTransition, delay: 0.2 }}
            className="mb-16"
          >
            <h3 className="text-h3 font-bold text-primary-ocean mb-8 text-center">
              Patrocinadores Master
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {partnersByCategory.master.map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={prefersReducedMotion || !isInView ? {} : { opacity: 0, scale: 0.9 }}
                  animate={prefersReducedMotion || !isInView ? {} : { opacity: 1, scale: 1 }}
                  transition={{ ...defaultTransition, delay: 0.3 + index * 0.1 }}
                  className="flex items-center justify-center"
                >
                  {partner.website ? (
                    <Link
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
                    >
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        width={120}
                        height={80}
                        className="object-contain max-h-20"
                      />
                    </Link>
                  ) : (
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={120}
                      height={80}
                      className="object-contain max-h-20 grayscale"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Apoiadores */}
        {partnersByCategory.supporter.length > 0 && (
          <motion.div
            initial={prefersReducedMotion || !isInView ? {} : fadeInUp.hidden}
            animate={prefersReducedMotion || !isInView ? {} : fadeInUp.visible}
            transition={{ ...defaultTransition, delay: 0.4 }}
            className="mb-16"
          >
            <h3 className="text-h3 font-bold text-primary-ocean mb-8 text-center">
              Apoiadores
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {partnersByCategory.supporter.map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={prefersReducedMotion || !isInView ? {} : { opacity: 0, y: 20 }}
                  animate={prefersReducedMotion || !isInView ? {} : { opacity: 1, y: 0 }}
                  transition={{ ...defaultTransition, delay: 0.5 + index * 0.05 }}
                  className="flex items-center justify-center"
                >
                  {partner.website ? (
                    <Link
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grayscale hover:grayscale-0 transition-all duration-300"
                    >
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        width={100}
                        height={60}
                        className="object-contain max-h-16"
                      />
                    </Link>
                  ) : (
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={100}
                      height={60}
                      className="object-contain max-h-16 grayscale"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Parceiros Institucionais */}
        {partnersByCategory.institutional.length > 0 && (
          <motion.div
            initial={prefersReducedMotion || !isInView ? {} : fadeInUp.hidden}
            animate={prefersReducedMotion || !isInView ? {} : fadeInUp.visible}
            transition={{ ...defaultTransition, delay: 0.6 }}
          >
            <h3 className="text-h3 font-bold text-primary-ocean mb-8 text-center">
              Parceiros Institucionais
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {partnersByCategory.institutional.map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={prefersReducedMotion || !isInView ? {} : { opacity: 0, y: 20 }}
                  animate={prefersReducedMotion || !isInView ? {} : { opacity: 1, y: 0 }}
                  transition={{ ...defaultTransition, delay: 0.7 + index * 0.05 }}
                  className="flex items-center justify-center"
                >
                  {partner.website ? (
                    <Link
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grayscale hover:grayscale-0 transition-all duration-300"
                    >
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        width={100}
                        height={60}
                        className="object-contain max-h-16"
                      />
                    </Link>
                  ) : (
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={100}
                      height={60}
                      className="object-contain max-h-16 grayscale"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

