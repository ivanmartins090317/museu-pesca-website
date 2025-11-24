"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Virtual360Props } from "@/types";

export function Virtual360({
  title,
  embedUrl,
  areas,
  images,
  cta,
}: Virtual360Props) {
  // Criar array de embedUrls - se for string única, criar array com um item
  const embedUrls = useMemo(
    () => (Array.isArray(embedUrl) ? embedUrl : [embedUrl]),
    [embedUrl]
  );
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    if (embedUrls && embedUrls.length > 0) {
      setCurrent((prev) => (prev + 1) % embedUrls.length);
    }
  }, [embedUrls]);

  const prev = useCallback(() => {
    if (embedUrls && embedUrls.length > 0) {
      setCurrent((prev) => (prev - 1 + embedUrls.length) % embedUrls.length);
    }
  }, [embedUrls]);

  // Auto rotate
  useEffect(() => {
    if (!embedUrls || embedUrls.length === 0) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [embedUrls, next]);
  return (
    <section id="visita-360" className="relative py-32 px-6 overflow-hidden">
      {/* Light overlay for readability */}
      <div className="absolute inset-0 bg-primary-sea/40" />

      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-cyan-500"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-white uppercase tracking-wider">
            Visita Virtual
          </span>
          <motion.h2
            className="text-5xl font-bold md:text-6xl text-white mt-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-gray-300 text-lg mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Explore o museu virtualmente e conheça nossos espaços sem sair de
            casa
          </motion.p>
        </motion.div>

        {/* 3D Matterport Carousel */}
        {embedUrls && embedUrls.length > 0 && (
          <motion.div
            className="w-full mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="relative h-[600px] flex items-center justify-center perspective-[1000px]">
              <div className="relative w-full h-full flex items-center justify-center">
                {embedUrls.map((url, index) => {
                  const offset =
                    (index - current + embedUrls.length) % embedUrls.length;
                  const isCurrent = offset === 0;
                  const isNext = offset === 1;
                  const isPrev = offset === embedUrls.length - 1;
                  const isVisible = isCurrent || isNext || isPrev;

                  let position = 0;
                  let scale = 0.7;
                  let rotateY = 0;
                  let zIndex = 0;
                  let opacity = 0.5;

                  if (isCurrent) {
                    position = 0;
                    scale = 1;
                    rotateY = 0;
                    zIndex = 30;
                    opacity = 1;
                  } else if (isNext) {
                    position = 35;
                    scale = 0.75;
                    rotateY = -25;
                    zIndex = 20;
                    opacity = 0.7;
                  } else if (isPrev) {
                    position = -35;
                    scale = 0.75;
                    rotateY = 25;
                    zIndex = 20;
                    opacity = 0.7;
                  }

                  return (
                    <motion.div
                      key={index}
                      className="absolute w-full max-w-4xl"
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                      animate={{
                        x: `${position}%`,
                        scale,
                        rotateY,
                        zIndex,
                        opacity: isVisible ? opacity : 0,
                      }}
                      transition={{
                        duration: 0.7,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-primary-sea/20 border border-cyan-500/20">
                        <iframe
                          src={url}
                          className="w-full h-full border-0"
                          allow="fullscreen; vr; accelerometer; gyroscope"
                          allowFullScreen
                          title={`Visita Virtual 360° - Museu de Pesca de Santos - ${
                            index + 1
                          }`}
                          loading="lazy"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Navigation Buttons */}
              {embedUrls.length > 1 && (
                <>
                  <motion.button
                    onClick={prev}
                    className="absolute left-4 z-40 p-3 rounded-full bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 text-white hover:bg-cyan-500/40 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Visita anterior"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>
                  <motion.button
                    onClick={next}
                    className="absolute right-4 z-40 p-3 rounded-full bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 text-white hover:bg-cyan-500/40 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Próxima visita"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                </>
              )}
            </div>

            {/* Indicators */}
            {embedUrls.length > 1 && (
              <div className="flex justify-center gap-3 mt-[-10rem] md:mt-12">
                {embedUrls.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      current === index
                        ? "bg-cyan-500 w-12"
                        : "bg-cyan-500/30 w-2 hover:bg-cyan-500/50"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Ir para visita ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* CTA Button */}
        {cta && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          ></motion.div>
        )}
      </div>
    </section>
  );
}
