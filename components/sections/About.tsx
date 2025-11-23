"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { staggerContainer } from "@/lib/animations";
import { useAnimationProps } from "@/lib/hooks/useAnimationProps";
import { ANIMATION_DELAYS } from "@/lib/constants";
import type { AboutSection } from "@/types";

interface HighlightCardProps {
  highlight: { label: string; value: string };
  index: number;
  isInView: boolean;
}

function HighlightCard({ highlight, index, isInView }: HighlightCardProps) {
  const cardAnimation = useAnimationProps({
    isInView,
    delay:
      ANIMATION_DELAYS.highlightCard +
      index * ANIMATION_DELAYS.highlightCardStagger,
  });

  return (
    <motion.div
      {...cardAnimation}
      className="bg-neutral-white p-6 rounded-lg shadow-sm border border-neutral-gray-200 hover:shadow-md transition-shadow"
    >
      <div className="text-4xl font-black text-primary-aqua mb-2">
        {highlight.value}
      </div>
      <div className="text-sm text-neutral-gray-800 font-medium">
        {highlight.label}
      </div>
    </motion.div>
  );
}

interface ImageCardProps {
  image: string;
  index: number;
  isInView: boolean;
  className?: string;
  style?: React.CSSProperties;
}

function ImageCard({
  image,
  index,
  isInView,
  className = "",
  style,
}: ImageCardProps) {
  const imageAnimation = useAnimationProps({
    isInView,
    delay: ANIMATION_DELAYS.images + index * ANIMATION_DELAYS.imageStagger,
  });

  return (
    <motion.div
      {...imageAnimation}
      className={`relative rounded-lg overflow-hidden shadow-xl ${className}`}
      style={style}
    >
      <Image
        src={image}
        alt={`Imagem do museu ${index + 1}`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </motion.div>
  );
}

export function About({
  title,
  description,
  highlights,
  images,
}: AboutSection) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerAnimation = useAnimationProps({
    variants: staggerContainer,
    isInView,
  });

  const textAnimation = useAnimationProps({ isInView });
  const highlightsAnimation = useAnimationProps({
    isInView,
    delay: ANIMATION_DELAYS.highlights,
  });
  const imagesAnimation = useAnimationProps({
    isInView,
    delay: ANIMATION_DELAYS.images,
  });

  return (
    <section id="sobre" ref={ref} className="py-section bg-neutral-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...containerAnimation}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Text Content */}
          <motion.div {...textAnimation}>
            <h2 className="text-h2 font-bold text-primary-sea mb-6">{title}</h2>
            <div className="space-y-4 text-body text-neutral-gray-800">
              {description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          {/* Images Collage */}
          {images.length > 0 && (
            <motion.div
              {...imagesAnimation}
              className="mt-16 flex flex-col sm:flex-row gap-4 sm:gap-6 w-full"
            >
              {/* Smaller Images Column */}
              <div className="flex flex-col gap-4 sm:gap-6 flex-1 sm:flex-[0.8]">
                {/* Top Image */}
                {images[1] && (
                  <div className="relative flex-1 min-h-[200px] sm:min-h-[240px] md:min-h-[280px] mt-16">
                    <ImageCard
                      key={images[1]}
                      image={images[1]}
                      index={1}
                      isInView={isInView}
                      className="w-full h-full"
                    />
                  </div>
                )}

                {/* Bottom Image */}
                {images[2] && (
                  <div className="relative flex-1 min-h-[200px] sm:min-h-[240px] md:min-h-[280px]">
                    <ImageCard
                      key={images[2]}
                      image={images[2]}
                      index={2}
                      isInView={isInView}
                      className="w-full h-full"
                    />
                  </div>
                )}
              </div>
              {/* Main Large Image (Right/Center) */}
              {images[0] && (
                <div className="flex-1 relative min-h-[300px] sm:min-h-[400px] md:min-h-[500px] mb-16">
                  <ImageCard
                    key={images[0]}
                    image={images[0]}
                    index={0}
                    isInView={isInView}
                    className="w-full h-full"
                  />
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
