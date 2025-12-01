"use client";

import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useState, useEffect, useRef } from "react";

/**
 * Componente de background fixo compatível com iOS Safari
 *
 * Usa position: fixed para manter o background completamente parado
 * enquanto apenas o conteúdo acima se move durante o scroll.
 *
 * No iOS, position: fixed funciona melhor que background-attachment: fixed
 *
 * Otimizações de performance:
 * - Fallback visual imediato (cor de fundo) para evitar tela cinza
 * - Imagem de poster exibida enquanto o vídeo carrega
 * - Controle de estado de carregamento do vídeo
 * - Transição suave quando vídeo está pronto
 */
export function BackgroundScroll() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handlers para eventos do vídeo
  const handleLoadedData = () => {
    setVideoLoaded(true);
  };

  const handleCanPlay = () => {
    setVideoLoaded(true);
  };

  const handleError = () => {
    setVideoError(true);
  };

  // Container sempre renderizado com fallback de cor de fundo
  // Isso elimina a tela cinza durante refresh
  // Usa position: fixed que mantém o elemento completamente parado na viewport
  // O conteúdo acima (z-index maior) se move normalmente durante o scroll
  // pointer-events-none garante que não bloqueie interações com outros componentes
  return (
    <div
      className={`${
        prefersReducedMotion ? "absolute" : "fixed"
      } inset-0 w-full h-full z-0 pointer-events-none bg-primary-sea`}
      aria-hidden="true"
    >
      {/* Vídeo com imagem de poster */}
      {/* O poster é exibido automaticamente pelo navegador enquanto o vídeo carrega */}
      {/* Quando o vídeo está pronto e começa a tocar, ele substitui o poster automaticamente */}
      {mounted && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/bg_sea_floor.png"
          onLoadedData={handleLoadedData}
          onCanPlay={handleCanPlay}
          onError={handleError}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src="/video/video_hero_museu.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
