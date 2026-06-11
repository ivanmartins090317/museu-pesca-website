"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface DeviceCapability {
  /** true se RAM < 2GB ou CPU < 4 núcleos */
  isLowEnd: boolean;
  /** isLowEnd || prefersReducedMotion — desabilita animações pesadas */
  shouldReduceMotion: boolean;
  /** isLowEnd — remove backdrop-filter que satura GPUs antigas */
  shouldRemoveBlur: boolean;
}

/**
 * Detecta a capacidade de hardware do dispositivo para adaptar
 * experiências GPU/CPU-intensivas em computadores fracos.
 *
 * APIs utilizadas:
 * - navigator.deviceMemory  → RAM disponível (Chrome/Edge, não disponível no Firefox/Safari)
 * - navigator.hardwareConcurrency → número de núcleos de CPU lógicos
 * - prefers-reduced-motion → preferência do sistema operacional
 *
 * Inicializa com isLowEnd=false para evitar hydration mismatch (SSR).
 */
export function useDeviceCapability(): DeviceCapability {
  const prefersReducedMotion = useReducedMotion();
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof navigator === "undefined") return;

    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const cores = navigator.hardwareConcurrency;

    const lowMemory = typeof memory === "number" && memory < 2;
    const lowCores = typeof cores === "number" && cores < 4;

    if (lowMemory || lowCores) {
      setIsLowEnd(true);
    }
  }, []);

  return {
    isLowEnd,
    shouldReduceMotion: isLowEnd || prefersReducedMotion,
    shouldRemoveBlur: isLowEnd,
  };
}
