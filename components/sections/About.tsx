"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { AboutSection } from "@/types";

interface AboutProps extends AboutSection {}

export function About({ title, description, highlights, images }: AboutProps) {
  return (
    <section id="sobre" className="relative py-32 px-6 overflow-hidden">
      {/* Light overlay for readability */}
      <div className="absolute inset-0 bg-[#0a1628]/30" />

      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <span className="text-white uppercase tracking-wider">
                Sobre Nós
              </span>
              <motion.h2
                className="text-5xl md:text-6xl text-white font-bold mt-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {title}
              </motion.h2>
            </motion.div>

            {description.map((paragraph, index) => (
              <motion.p
                key={index}
                className="text-gray-300 text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                viewport={{ once: true }}
              >
                {paragraph}
              </motion.p>
            ))}

            {highlights && highlights.length > 0 && (
              <motion.div
                className="grid grid-cols-2 gap-4 pt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-3xl font-bold text-cyan-400">
                      {highlight.value}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
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
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {images.map((imageSrc, index) => (
                <motion.div
                  key={index}
                  className={`relative overflow-hidden rounded-2xl ${
                    index === 0 ? "col-span-2" : ""
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden group">
                    <Image
                      src={imageSrc}
                      alt={`Imagem ${index + 1} do museu`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
