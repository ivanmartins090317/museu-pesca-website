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
      <div className="relative h-screen md:h-[100vh] flex items-center justify-center overflow-hidden bg-transparent">
        {/* Background Image with Parallax */}

        <div className="absolute inset-0 w-full h-full z-0">
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
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-0 text-center flex flex-col items-center justify-center">
          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={defaultTransition}
            className="max-w-4xl ml-8"
          >
            <motion.h1
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ ...defaultTransition, delay: 0.3 }}
              className="text-5xl md:text-7xl mx-auto leading-none font-black text-neutral-white mb-6 text-balance"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ ...defaultTransition, delay: 0.4 }}
              className="text-body mx-auto text-neutral-white mb-8 max-w-2xl  text-balance"
            >
              {subtitle}
            </motion.p>

            {/* <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ ...defaultTransition, delay: 0.2 }}
            className="mb-6"
          >
            <Badge
              variant={badge.variant === "highlight" ? "highlight" : "info"}
            >
              {badge.text}
            </Badge>
          </motion.div> */}

            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ ...defaultTransition, delay: 0.5 }}
            >
              <Button
                asChild
                size="lg"
                className="text-lg rounded-full bg-primary-sea/60 backdrop-blur-md text-neutral-white hover:bg-primary-sea hover:text-neutral-white duration-700"
              >
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-neutral-white/50 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-neutral-white rounded-full"
          />
        </motion.div>
      </motion.div> */}

        {/* <div className="absolute inset-x-0 bottom-0">
          <Image
            src="/images/waves-divider.svg"
            alt="Museu de Pesca de Santos"
            width={1920}
            height={1080}
          />
        </div> */}
      </div>
    </section>
  );
}
