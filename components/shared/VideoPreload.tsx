"use client";

import { useEffect } from "react";

/**
 * Componente que injeta preload do vídeo no head do documento
 * para iniciar o download o mais cedo possível
 */
export function VideoPreload() {
  useEffect(() => {
    // Verifica se o link já existe para evitar duplicação
    const existingLink = document.querySelector(
      'link[rel="preload"][href="/video/video_hero_museu.mp4"]'
    );

    if (!existingLink) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = "/video/video_hero_museu.mp4";
      link.as = "video";
      link.type = "video/mp4";
      document.head.appendChild(link);
    }
  }, []);

  return null;
}

