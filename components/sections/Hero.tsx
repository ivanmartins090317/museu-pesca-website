"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { defaultTransition } from "@/lib/animations";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import type { HeroProps } from "@/types";
import Image from "next/image";
import { Header } from "../shared/Header";
export function Hero({
  title,
  subtitle,
  badge,
  cta,
  backgroundImage,
}: HeroProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-primary-sea/20">
      {/* <Header /> */}
      <div className="relative h-screen md:h-[100vh] flex items-center justify-center overflow-hidden bg-transparent pt-20 md:pt-0">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 w-full h-full z-0 opacity-0">
          {/* <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="video/video_hero_museu.mp4" type="video/mp4" />
            Seu navegador não suporta vídeos HTML5.
          </video> */}
          {/* Overlay Gradient */}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-primary-ocean/30 via-primary-ocean/50 to-primary-ocean/70" /> */}
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 lg:px-0 text-center flex flex-col items-center justify-center min-h-[60vh] md:min-h-0">
          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ ...defaultTransition, duration: 0.5 }}
            className="max-w-5xl w-full ml-0 md:ml-8"
          >
            <motion.h1
              initial={
                prefersReducedMotion ? {} : { opacity: 0, y: 30, scale: 0.98 }
              }
              animate={
                prefersReducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }
              }
              transition={{
                ...defaultTransition,
                whileHover: { scale: 1.05 },
                delay: 0.25,
                type: "spring",
                stiffness: 120,
                damping: 20,
              }}
              className="w-full h-full hover:-scale-110 transition-all duration-300 text-[clamp(2.5rem,8vw,4rem)] md:text-[clamp(4rem,9vw,7rem)] mx-auto leading-[1.1] font-black text-neutral-white mb-6 md:mb-10 text-balance tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)] px-2"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ ...defaultTransition, delay: 0.5, duration: 0.5 }}
              className="text-sm sm:text-base md:text-xl lg:text-2xl mx-auto text-neutral-white/95 mb-8 md:mb-12 max-w-3xl text-balance leading-relaxed md:leading-relaxed font-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] px-4"
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={
                prefersReducedMotion ? {} : { opacity: 0, y: 20, scale: 0.95 }
              }
              animate={
                prefersReducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }
              }
              transition={{
                ...defaultTransition,
                delay: 0.45,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -2 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
              className="w-full sm:w-auto"
            >
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-12 py-5 sm:py-6 md:py-7 min-h-[48px] sm:min-h-[56px] rounded-full bg-primary-sea/60 backdrop-blur-lg text-neutral-white hover:bg-primary-sea hover:text-neutral-white active:bg-primary-sea/90 transition-all duration-300 shadow-[0_8px_30px_rgba(13,31,60,0.5)] hover:shadow-[0_12px_40px_rgba(13,31,60,0.7)] border border-white/20 hover:border-white/40 font-semibold touch-manipulation"
              >
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
