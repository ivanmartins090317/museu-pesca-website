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
 * - Vídeo renderizado imediatamente (sem esperar mounted)
 * - Preload agressivo para iniciar download o mais cedo possível
 * - Força carregamento do vídeo via load() no mount
 * - Fallback visual imediato (cor de fundo + poster) para evitar tela cinza
 */
export function BackgroundScroll() {
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Força o carregamento do vídeo assim que o componente montar
  useEffect(() => {
    if (videoRef.current) {
      // Força o navegador a começar a baixar o vídeo imediatamente
      videoRef.current.load();
    }
  }, []);

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
      {/* Vídeo renderizado imediatamente para começar o carregamento o mais cedo possível */}
      {/* O poster é exibido automaticamente pelo navegador enquanto o vídeo carrega */}
      {/* preload="auto" + load() forçam o download imediato */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/bg_sea_floor.png"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src="/video/video_hero_museu.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
