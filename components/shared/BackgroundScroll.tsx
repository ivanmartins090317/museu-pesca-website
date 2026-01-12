"use client";

import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useEffect, useRef, useState } from "react";

/**
 * Componente de background fixo compatível com iOS Safari
 *
 * Otimizações:
 * - Versões mobile (< 400px) e web (>= 400px)
 * - Preload adaptativo baseado na conexão
 * - Fallback para imagem em conexões lentas
 * - Respeita prefersReducedMotion
 */
export function BackgroundScroll() {
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [preloadStrategy, setPreloadStrategy] = useState<"metadata" | "auto">(
    "metadata"
  );
  const [shouldUseVideo, setShouldUseVideo] = useState<boolean>(true);
  const [videoSource, setVideoSource] = useState<"mobile" | "web">("web");

  // Detecta largura da tela e seleciona vídeo apropriado
  useEffect(() => {
    const updateVideoSource = () => {
      const width = window.innerWidth;
      const newSource = width < 400 ? "mobile" : "web";
      if (newSource !== videoSource) {
        setVideoSource(newSource);
      }
    };

    updateVideoSource();
    window.addEventListener("resize", updateVideoSource);
    return () => window.removeEventListener("resize", updateVideoSource);
  }, [videoSource]);

  // Detecta qualidade da conexão e ajusta estratégia
  useEffect(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;

    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;

    if (connection) {
      const { effectiveType, downlink, saveData } = connection;

      // Mobile com conexão lenta: usa apenas imagem
      if (
        isMobile &&
        (saveData ||
          effectiveType === "2g" ||
          effectiveType === "slow-2g" ||
          (downlink && downlink < 1.5))
      ) {
        setShouldUseVideo(false);
        return;
      }

      // Ajusta preload baseado na conexão
      if (
        saveData ||
        effectiveType === "2g" ||
        effectiveType === "slow-2g" ||
        (downlink && downlink < 1.5)
      ) {
        setPreloadStrategy("metadata");
      } else if (effectiveType === "4g" && downlink && downlink >= 2) {
        setPreloadStrategy("auto");
      } else {
        setPreloadStrategy("metadata");
      }
    } else {
      // Fallback: assume conexão média
      setPreloadStrategy("metadata");
    }

    setShouldUseVideo(true);
  }, [videoSource]);

  // Inicia carregamento do vídeo
  useEffect(() => {
    if (videoRef.current && !prefersReducedMotion && shouldUseVideo) {
      const video = videoRef.current;
      video.preload = preloadStrategy;
      video.load();
    }
  }, [prefersReducedMotion, preloadStrategy, shouldUseVideo, videoSource]);

  // Fallback para imagem se movimento reduzido ou sem vídeo
  if (prefersReducedMotion || !shouldUseVideo) {
    return (
      <div
        className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-primary-sea"
        aria-hidden="true"
        style={{
          backgroundImage: "url(/images/bg_sea_floor.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    );
  }

  // Determina qual vídeo usar
  const videoPath =
    videoSource === "mobile"
      ? "/video/video_drone-museu-web-mobile.webm"
      : "/video/video_drone-museu-web.webm";

  return (
    <div
      className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-primary-sea"
      aria-hidden="true"
    >
      <video
        key={videoSource}
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload={preloadStrategy}
        crossOrigin="anonymous"
        poster="/images/bg_sea_floor.png"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src={videoPath} type="video/webm" />
      </video>
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/80 pointer-events-none" />
    </div>
  );
}
