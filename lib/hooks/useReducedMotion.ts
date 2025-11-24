"use client";

import { useEffect, useState } from "react";

/**
 * Hook para detectar preferência de movimento reduzido
 * 
 * Inicializa com false para evitar problemas de hidratação no SSR,
 * especialmente em dispositivos iOS onde a detecção pode falhar.
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Verifica se window está disponível (client-side)
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    // Atualiza o estado inicial
    setPrefersReducedMotion(mediaQuery.matches);

    function handleChange(e: MediaQueryListEvent) {
      setPrefersReducedMotion(e.matches);
    }

    // Usa addEventListener se disponível, senão usa addListener (compatibilidade)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else if (mediaQuery.addListener) {
      // Fallback para navegadores mais antigos
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  // Retorna false durante SSR e antes da montagem para evitar problemas de hidratação
  if (!isMounted) {
    return false;
  }

  return prefersReducedMotion;
}

