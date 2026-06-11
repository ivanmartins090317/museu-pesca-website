"use client";

import { useDeviceCapability } from "@/lib/hooks/useDeviceCapability";
import { useEffect, useRef, useState } from "react";

/**
 * Vídeos em `public/video` — servidos como `/video/...`
 *
 * IMPORTANTE: para hardware antigo (sem decodificação VP9 por hardware),
 * adicione o arquivo MP4 H.264 com o mesmo nome base em public/video/.
 * O browser escolherá automaticamente MP4 quando disponível, usando
 * decodificação por hardware na GPU — muito mais leve para CPUs antigas.
 *
 * Conversão: ffmpeg -i clip_02_vista_museu_pesca_leve.webm \
 *              -c:v libx264 -crf 23 -preset fast \
 *              -c:a aac public/video/clip_02_vista_museu_pesca_leve.mp4
 */
const VIDEO_BASE = "/video/clip_02_vista_museu_pesca_leve";
const BACKGROUND_VIDEO_MP4 = `${VIDEO_BASE}.mp4`;
const BACKGROUND_VIDEO_WEBM = `${VIDEO_BASE}.webm`;

const BACKGROUND_POSTER_WEB = "/images/bg_sea_floor_poster_web.webp";
const BACKGROUND_POSTER_MOBILE = "/images/bg_sea_floor_poster_mobile.webp";

/** Tempo máximo em ms aguardando o vídeo iniciar antes de usar o poster */
const VIDEO_TIMEOUT_MS = 8000;

export function BackgroundScroll() {
  const { shouldReduceMotion, isLowEnd } = useDeviceCapability();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Detecta largura da tela para poster correto
  useEffect(() => {
    const update = () => setIsMobileView(window.innerWidth < 400);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Intersection Observer para lazy load do vídeo
  useEffect(() => {
    if (!containerRef.current || shouldReduceMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "100px", threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  // Controla o load do vídeo e inicia o timer de fallback
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVisible || videoFailed) return;

    // Em hardware fraco: não pré-carrega, só carrega quando visível
    video.preload = isLowEnd ? "none" : "metadata";
    video.load();

    // Fallback: se o vídeo não iniciar em VIDEO_TIMEOUT_MS, exibe poster
    timeoutRef.current = setTimeout(() => {
      if (video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) {
        setVideoFailed(true);
      }
    }, VIDEO_TIMEOUT_MS);

    const handleCanPlay = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const handleError = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setVideoFailed(true);
    };

    video.addEventListener("canplaythrough", handleCanPlay);
    video.addEventListener("error", handleError);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      video.removeEventListener("canplaythrough", handleCanPlay);
      video.removeEventListener("error", handleError);
    };
  }, [isVisible, isLowEnd, videoFailed]);

  const posterPath = isMobileView
    ? BACKGROUND_POSTER_MOBILE
    : BACKGROUND_POSTER_WEB;

  // SSR, prefers-reduced-motion ou vídeo não conseguiu iniciar → poster estático
  if (!mounted || shouldReduceMotion || videoFailed) {
    return (
      <div
        ref={containerRef}
        className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-primary-sea"
        style={
          mounted
            ? {
                backgroundImage: `url(${posterPath})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-primary-sea"
      aria-hidden="true"
    >
      <video
        key="museu-vista-pesca-bg"
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={posterPath}
        preload={isVisible ? (isLowEnd ? "none" : "metadata") : "none"}
        className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none"
      >
        {/* MP4 H.264 primeiro: decodificação por hardware em CPUs/GPUs antigas */}
        {isVisible && (
          <source src={BACKGROUND_VIDEO_MP4} type="video/mp4" />
        )}
        {/* WebM VP9 como fallback para browsers modernos */}
        {isVisible && (
          <source src={BACKGROUND_VIDEO_WEBM} type="video/webm; codecs=vp9" />
        )}
      </video>
      <div className="absolute inset-0 bg-black/70 pointer-events-none" />
    </div>
  );
}
