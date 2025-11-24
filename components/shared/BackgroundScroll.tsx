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
  return (
    <div
      className={`${
        prefersReducedMotion ? "absolute" : "fixed"
      } inset-0 -z-10 w-screen h-screen bg-[url('/images/bg-sea-floor_.svg')] bg-[size:140%] md:bg-[size:100%] bg-top bg-no-repeat pointer-events-none`}
      aria-hidden="true"
    />
  );
}
