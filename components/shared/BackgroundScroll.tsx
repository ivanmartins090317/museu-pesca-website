"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

/**
 * Componente de background fixo compatível com iOS Safari
 * 
 * iOS Safari não suporta background-attachment: fixed corretamente,
 * então usamos uma abordagem com elemento fixo que se move mais devagar
 * que o scroll para simular o efeito parallax/fixo.
 */
export function BackgroundScroll() {
  const prefersReducedMotion = useReducedMotion();
  const [scrollY, setScrollY] = useState(0);
  const [isIOS, setIsIOS] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (typeof window === "undefined") {
      return;
    }

    // Detecta iOS de forma mais robusta
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice =
      /iphone|ipad|ipod/.test(userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    
    setIsIOS(isIOSDevice);

    // Se não for iOS ou tiver reduced motion, não precisa de scroll listener
    if (prefersReducedMotion || !isIOSDevice) {
      return;
    }

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Inicializa com o valor atual
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prefersReducedMotion]);

  // Durante SSR ou antes da montagem, retorna versão estática
  if (!isMounted) {
    return (
      <div
        className="fixed inset-0 -z-10 w-full h-full bg-[url('/images/bg-sea-floor_.svg')] bg-[size:140%] md:bg-[size:100%] bg-top bg-no-repeat pointer-events-none"
        aria-hidden="true"
      />
    );
  }

  // Para iOS, usa elemento fixo que se move mais devagar (efeito parallax)
  // Isso simula o background-attachment: fixed
  if (isIOS && !prefersReducedMotion) {
    return (
      <div
        className="fixed inset-0 -z-10 w-full h-full pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 w-full h-[150vh] bg-[url('/images/bg-sea-floor_.svg')] bg-[size:140%] md:bg-[size:100%] bg-top bg-no-repeat"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            willChange: "transform",
            top: "-25%",
          }}
        />
      </div>
    );
  }

  // Para dispositivos não-iOS, usa background fixo nativo (mais performático)
  return (
    <div
      className="fixed inset-0 -z-10 w-full h-full bg-[url('/images/bg-sea-floor_.svg')] bg-fixed bg-[size:140%] md:bg-[size:100%] bg-top bg-no-repeat pointer-events-none"
      aria-hidden="true"
    />
  );
}

