"use client";

import { useEffect } from "react";

/**
 * Componente que injeta preload do vídeo no head do documento
 * para iniciar o download o mais cedo possível
 *
 * Preloada apenas WebM (que é o formato principal usado).
 * MP4 não precisa de preload pois é apenas fallback para navegadores antigos.
 */
export function VideoPreload() {
  useEffect(() => {
    // Preloada apenas WebM (formato principal, menor tamanho)
    // MP4 não precisa de preload pois é apenas fallback e será carregado sob demanda
    const existingLink = document.querySelector(
      'link[rel="preload"][href="/video/video_drone-museu-web.webm"]'
    );

    if (!existingLink) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = "/video/video_drone-museu-web.webm";
      link.as = "fetch";
      link.type = "video/webm";
      document.head.appendChild(link);
    }
  }, []);

  return null;
}
