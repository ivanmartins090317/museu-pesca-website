"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, AlertCircle, Maximize2, Play } from "lucide-react";
import Image from "next/image";

export interface IframeState {
  loading: boolean;
  error: boolean;
}

interface Virtual360CarouselItemProps {
  url: string;
  index: number;
  total: number;
  isCurrent: boolean;
  isLoaded: boolean;
  iframeState: IframeState;
  position: number;
  scale: number;
  rotateY: number;
  zIndex: number;
  opacity: number;
  onExpand: () => void;
  onLoad: () => void;
  onError: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
}

/**
 * Poster de preview exibido antes do usuário iniciar o tour.
 * Evita que o Matterport (WebGL) carregue automaticamente —
 * o que trava computadores fracos antes mesmo do site abrir.
 */
function TourPlaceholder({
  index,
  total,
  onStart,
}: {
  index: number;
  total: number;
  onStart: () => void;
}) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary-sea/60">
      <Image
        src="/images/museu-de-pesca-santos-visao-fora.webp"
        alt={`Preview da visita virtual ${index + 1} de ${total}`}
        fill
        className="object-cover opacity-40"
        sizes="(max-width: 1024px) 100vw, 896px"
        priority={index === 0}
      />
      <div className="relative z-10 flex flex-col items-center gap-4 text-center px-4">
        <motion.button
          onClick={onStart}
          className="flex items-center gap-3 px-6 py-3 rounded-full bg-cyan-500 text-white font-semibold text-sm shadow-lg hover:bg-cyan-400 active:scale-95 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-transparent"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Iniciar tour virtual ${index + 1} de ${total}`}
        >
          <Play className="w-4 h-4 fill-white" aria-hidden="true" />
          Iniciar Tour Virtual
        </motion.button>
        <p className="text-white/70 text-xs">
          Clique para carregar o tour 360°
        </p>
      </div>
    </div>
  );
}

export function Virtual360CarouselItem({
  url,
  index,
  total,
  isCurrent,
  isLoaded,
  iframeState,
  position,
  scale,
  rotateY,
  zIndex,
  opacity,
  onExpand,
  onLoad,
  onError,
  onTouchStart,
  onTouchEnd,
}: Virtual360CarouselItemProps) {
  const [started, setStarted] = useState(false);

  return (
    <motion.div
      className="absolute w-full max-w-4xl"
      style={{ transformStyle: "preserve-3d" }}
      animate={{ x: `${position}%`, scale, rotateY, zIndex, opacity }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      aria-hidden={!isCurrent}
    >
      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-primary-sea/20 border border-cyan-500/20">
        {isCurrent && total > 1 && (
          <>
            <div
              className="absolute left-0 top-0 w-14 h-full z-10 touch-none"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              aria-hidden="true"
            />
            <div
              className="absolute right-0 top-0 w-14 h-full z-10 touch-none"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              aria-hidden="true"
            />
          </>
        )}

        {/* Placeholder mostrado até o usuário clicar em "Iniciar Tour" */}
        {!started && !iframeState.error && (
          <TourPlaceholder
            index={index}
            total={total}
            onStart={() => setStarted(true)}
          />
        )}

        {/* Iframe só é montado após clique — evita WebGL automático */}
        {started && !iframeState.error && (
          <iframe
            src={isCurrent || isLoaded ? url : undefined}
            data-src={url}
            className="w-full h-full border-0"
            allow="fullscreen; accelerometer; gyroscope; autoplay; camera; microphone; xr-spatial-tracking; vr; payment"
            allowFullScreen
            title={`Visita Virtual 360° - Museu de Pesca de Santos - ${index + 1} de ${total}`}
            loading={isCurrent ? "eager" : "lazy"}
            onLoad={onLoad}
            onError={onError}
            aria-label={`Visita virtual ${index + 1} de ${total}`}
          />
        )}

        {started && iframeState.loading && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-primary-sea/10 z-[5] pointer-events-none transition-opacity duration-300"
            style={{ opacity: 0.3 }}
            aria-hidden="true"
          >
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin opacity-70" />
          </div>
        )}

        {iframeState.error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary-sea/30 z-10 p-4 pointer-events-auto">
            <AlertCircle className="w-8 h-8 text-red-400 mb-2" />
            <p className="text-white text-sm text-center">
              Erro ao carregar visita virtual
            </p>
          </div>
        )}

        {isCurrent && started && !iframeState.error && (
          <button
            onClick={onExpand}
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/50 border border-white/20 text-white hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Expandir para tela cheia"
          >
            <Maximize2 className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
