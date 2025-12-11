"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { defaultTransition } from "@/lib/animations";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import type { HeroProps } from "@/types";
import { useEffect, useRef, useState } from "react";

export function Hero({
  subtitle,
  badge,
  cta,
  backgroundImage,
}: Omit<HeroProps, "title">) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);

  // Motion values para interações suaves
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const scrollYMotion = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Transformações baseadas na posição do mouse
  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["2.5deg", "-2.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-2.5deg", "2.5deg"]
  );

  // Parallax baseado no scroll
  const parallaxY = useTransform(scrollYMotion, [0, 500], [0, -100]);
  const scaleBackground = useTransform(scrollYMotion, [0, 1], [1, 1.1]);

  // Transformações para partículas (hooks devem estar no nível superior)
  const particle0X = useTransform(mouseXSpring, [-0.5, 0.5], [0, 30]);
  const particle0Y = useTransform(mouseYSpring, [-0.5, 0.5], [0, 30]);
  const particle1X = useTransform(mouseXSpring, [-0.5, 0.5], [0, 60]);
  const particle1Y = useTransform(mouseYSpring, [-0.5, 0.5], [0, 60]);
  const particle2X = useTransform(mouseXSpring, [-0.5, 0.5], [0, 90]);
  const particle2Y = useTransform(mouseYSpring, [-0.5, 0.5], [0, 90]);
  const particle3X = useTransform(mouseXSpring, [-0.5, 0.5], [0, 120]);
  const particle3Y = useTransform(mouseYSpring, [-0.5, 0.5], [0, 120]);
  const particle4X = useTransform(mouseXSpring, [-0.5, 0.5], [0, 150]);
  const particle4Y = useTransform(mouseYSpring, [-0.5, 0.5], [0, 150]);
  const particle5X = useTransform(mouseXSpring, [-0.5, 0.5], [0, 180]);
  const particle5Y = useTransform(mouseYSpring, [-0.5, 0.5], [0, 180]);

  const particleTransforms = [
    { x: particle0X, y: particle0Y },
    { x: particle1X, y: particle1Y },
    { x: particle2X, y: particle2Y },
    { x: particle3X, y: particle3Y },
    { x: particle4X, y: particle4Y },
    { x: particle5X, y: particle5Y },
  ];

  // Transformações para texto e botão
  const textShadowTransform = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["0 2px 10px rgba(0,0,0,0.3)", "0 4px 20px rgba(255,255,255,0.2)"]
  );
  const buttonBrightnessTransform = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["brightness(1)", "brightness(1.1)"]
  );

  // Transformações para a imagem da água-viva
  const jellyfishX = useTransform(mouseXSpring, [-0.5, 0.5], [-30, 30]);
  const jellyfishY = useTransform(mouseYSpring, [-0.5, 0.5], [-30, 30]);
  const jellyfishRotate = useTransform(mouseXSpring, [-0.5, 0.5], [-5, 5]);
  const jellyfishScale = useTransform(scrollYMotion, [0, 500], [1, 1.15]);

  // Efeito de scroll
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(
          0,
          Math.min(1, -rect.top / window.innerHeight)
        );
        setScrollY(scrollProgress);
        // Atualiza o motion value baseado no scroll
        const scrollAmount = Math.max(0, -rect.top);
        scrollYMotion.set(scrollAmount);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Chamada inicial

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReducedMotion, scrollYMotion]);

  // Efeito de movimento do mouse
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseXRelative = (e.clientX - rect.left - width / 2) / width;
      const mouseYRelative = (e.clientY - rect.top - height / 2) / height;

      mouseX.set(mouseXRelative);
      mouseY.set(mouseYRelative);
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
      return () => section.removeEventListener("mousemove", handleMouseMove);
    }
  }, [prefersReducedMotion, mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      className="bg-primary-sea/40 relative overflow-visible z-[100] h-[130vh] md:h-screen"
    >
      <div className="container mx-auto relative h-screen md:h-[100vh] flex items-center justify-center bg-transparent pt-20 md:pt-0">
        {/* Background com efeito parallax no scroll */}
        <motion.div
          style={{
            y: prefersReducedMotion ? 0 : parallaxY,
            scale: prefersReducedMotion ? 1 : scaleBackground,
          }}
          className="absolute inset-0 w-full h-full z-0"
        >
          <div className="absolute inset-0" />
        </motion.div>

        {/* Partículas flutuantes interativas */}
        {!prefersReducedMotion && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/10 backdrop-blur-sm"
                style={{
                  width: `${20 + i * 10}px`,
                  height: `${20 + i * 10}px`,
                  x: particleTransforms[i].x,
                  y: particleTransforms[i].y,
                  left: `${15 + i * 15}%`,
                  top: `${20 + i * 10}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </>
        )}

        {/* Container principal com layout de duas colunas */}
        <div className="relative  pb-32 md:pb-0 md:pt-0 container overflow-y-visible mx-auto px-4 sm:px-6 md:px-8 lg:px-12 h-full flex items-center">
          <div className="w-full  flex flex-col-reverse md:flex-row gap-8 lg:gap-12 items-center">
            {/* Coluna esquerda - Texto e Botão */}
            <motion.div
              style={{
                rotateX: prefersReducedMotion ? 0 : rotateX,
                rotateY: prefersReducedMotion ? 0 : rotateY,
                transformStyle: "preserve-3d",
              }}
              className="flex flex-col items-start justify-center md:items-center md:text-left mt-32 md:mt-28"
            >
              <motion.div
                initial={
                  prefersReducedMotion ? undefined : { opacity: 0, y: 20 }
                }
                animate={
                  prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                }
                transition={{ ...defaultTransition, duration: 0.5 }}
                className="w-full mb-60 md:mb-0"
              >
                <motion.p
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                  transition={{
                    ...defaultTransition,
                    delay: 0.3,
                    duration: 0.5,
                  }}
                  className="w-full md:w-10/12 text-center md:text-left text-xl sm:text-base md:text-2xl  text-neutral-white/95 mb-8 md:mb-12 text-balance leading-relaxed md:leading-relaxed font-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
                  style={{
                    textShadow: prefersReducedMotion
                      ? undefined
                      : textShadowTransform,
                  }}
                >
                  {subtitle}
                </motion.p>

                <motion.div
                  initial={
                    prefersReducedMotion
                      ? {}
                      : { opacity: 0, y: 20, scale: 0.95 }
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
                  whileHover={
                    prefersReducedMotion ? {} : { scale: 1.05, y: -4 }
                  }
                  whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                  className="w-full sm:w-auto"
                  style={{
                    filter: prefersReducedMotion
                      ? undefined
                      : buttonBrightnessTransform,
                  }}
                >
                  <Button
                    asChild
                    size="lg"
                    className="w-full sm:w-auto text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-12 py-5 sm:py-6 md:py-7 min-h-[48px] sm:min-h-[56px] rounded-full bg-primary-sea/60 backdrop-blur-lg text-neutral-white hover:bg-primary-sea hover:text-neutral-white active:bg-primary-sea/90 transition-all duration-300 shadow-[0_8px_30px_rgba(13,31,60,0.5)] hover:shadow-[0_12px_40px_rgba(13,31,60,0.7)] border border-white/20 hover:border-white/40 font-semibold touch-manipulation relative overflow-hidden group"
                  >
                    <Link href={cta.href}>
                      <span className="relative z-10">{cta.label}</span>
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-primary-sea via-primary-ocean to-primary-sea"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Coluna direita - Imagem da água-viva */}
            <motion.div
              style={{
                x: prefersReducedMotion ? 0 : jellyfishX,
                y: prefersReducedMotion ? 0 : jellyfishY,
                rotate: prefersReducedMotion ? 0 : jellyfishRotate,
                scale: prefersReducedMotion ? 1 : jellyfishScale,
              }}
              className="flex items-center justify-center lg:justify-end pointer-events-none overflow-y-visible"
            >
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                animate={
                  prefersReducedMotion
                    ? {}
                    : { opacity: 1, scale: [1, 1.05, 1] }
                }
                transition={{
                  ...defaultTransition,
                  duration: 1,
                  delay: 0.2,
                  scale: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="relative z-0 md:z-[100] w-full lg:max-w-lg xl:max-w-4xl top-32 mt-80 md:mt-0 md:top-0 md:relative md:bottom-0 md:left-16"
              >
                <Image
                  src="/images/GPT_agua_viva.png"
                  alt="Água-viva bioluminescente"
                  width={800}
                  height={1000}
                  priority
                  className="w-[70vw] md:w-[90%] h-auto object-contain opacity-80 md:opacity-90"
                  style={{
                    filter: "drop-shadow(0 0 40px rgba(255, 105, 180, 0.3))",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
        {/* Indicador de scroll */}
        {!prefersReducedMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-[-10rem] md:bottom-8  left-1/2 sm:transform -translate-x-1/2 md:transform md:-translate-x-1"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center gap-2 text-neutral-white/70"
            >
              <span className="text-xs uppercase tracking-wider">Scroll</span>
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-6 h-6"
              >
                <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
              </motion.svg>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
