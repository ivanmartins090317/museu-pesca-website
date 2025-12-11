"use client";

import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useEffect, useRef } from "react";

/**
 * Componente de background fixo compatível com iOS Safari
 *
 * Usa position: fixed para manter o background completamente parado
 * enquanto apenas o conteúdo acima se move durante o scroll.
 *
 * No iOS, position: fixed funciona melhor que background-attachment: fixed
 *
 * Otimizações de performance:
 * - WebM primeiro (menor tamanho, ~40-50% menor que MP4)
 * - MP4 como fallback (compatibilidade universal)
 * - Preload otimizado (metadata em vez de auto)
 * - Fallback visual imediato (cor de fundo + poster)
 * - Respeita prefersReducedMotion
 */
export function BackgroundScroll() {
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Força o carregamento do vídeo assim que o componente montar
  useEffect(() => {
    if (videoRef.current && !prefersReducedMotion) {
      // Força o navegador a começar a baixar o vídeo imediatamente
      videoRef.current.load();
    }
  }, [prefersReducedMotion]);

  // Se preferir movimento reduzido, não renderiza vídeo
  if (prefersReducedMotion) {
    return (
      <div
        className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-primary-sea"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-primary-sea"
      aria-hidden="true"
    >
      {/* Vídeo renderizado imediatamente para começar o carregamento o mais cedo possível */}
      {/* O poster é exibido automaticamente pelo navegador enquanto o vídeo carrega */}
      {/* WebM primeiro (menor tamanho), MP4 como fallback (compatibilidade) */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/images/bg_sea_floor.png"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        {/* WebM primeiro - menor tamanho, melhor compressão */}
        <source src="/video/video_hero_museu.webm" type="video/webm" />
        {/* MP4 como fallback - compatibilidade universal (Safari, IE, etc) */}
        <source src="/video/video_hero_museu.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
