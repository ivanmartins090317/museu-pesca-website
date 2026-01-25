"use client";

import { useEffect, useState } from "react";

/**
 * Componente que faz preload inteligente do vídeo
 * Só carrega quando a página está visível e próxima do vídeo
 */
export function VideoPreload() {
  const [shouldPreload, setShouldPreload] = useState(false);

  useEffect(() => {
    // Só preloada se a página estiver visível
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setShouldPreload(true);
      }
    };

    // Verifica se já está visível
    if (!document.hidden) {
      setShouldPreload(true);
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!shouldPreload) return;

    // Detecta qual vídeo preloadar baseado no tamanho da tela
    const width = window.innerWidth;
    const videoPath = width < 400 
      ? "/video/video_drone-museu-web-mobile.webm"
      : "/video/video_drone-museu-web.webm";

    const existingLink = document.querySelector(
      `link[rel="preload"][href="${videoPath}"]`
    );

    if (!existingLink) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = videoPath;
      link.as = "video";
      link.type = "video/webm";
      document.head.appendChild(link);
    }
  }, [shouldPreload]);

  return null;
}