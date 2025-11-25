"use client";

import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

/**
 * Componente de background fixo compatível com iOS Safari
 *
 * Usa position: fixed para manter o background completamente parado
 * enquanto apenas o conteúdo acima se move durante o scroll.
 *
 * No iOS, position: fixed funciona melhor que background-attachment: fixed
 */
export function BackgroundScroll() {
  const prefersReducedMotion = useReducedMotion();

  // Usa position: fixed que mantém o elemento completamente parado na viewport
  // Não aplica nenhum transform - o elemento fica fixo na tela
  // O conteúdo acima (z-index maior) se move normalmente durante o scroll
  // pointer-events-none garante que não bloqueie interações com outros componentes
  return (
    <div
      className={`${
        prefersReducedMotion ? "absolute" : "fixed"
      } inset-0 w-full h-full z-0 pointer-events-none`}
      aria-hidden="true"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src="/video/video_hero_museu.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
