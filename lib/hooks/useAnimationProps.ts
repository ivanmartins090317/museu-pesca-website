"use client";

import { useReducedMotion } from "./useReducedMotion";
import { fadeInUp, defaultTransition } from "@/lib/animations";
import type { Variants } from "framer-motion";

interface UseAnimationPropsOptions {
  variants?: Variants;
  isInView?: boolean;
  delay?: number;
}

export function useAnimationProps({
  variants = fadeInUp,
  isInView = true,
  delay = 0,
}: UseAnimationPropsOptions = {}) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion && isInView;

  return {
    variants: shouldAnimate ? variants : undefined,
    initial: shouldAnimate ? "hidden" : false,
    animate: shouldAnimate ? "visible" : false,
    transition: { ...defaultTransition, delay },
  };
}

