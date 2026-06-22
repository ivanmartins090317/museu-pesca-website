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
const VIDEO_TIMEOUT_MS = 12000;
/** Timeout estendido para hardware fraco ou conexão lenta */
const VIDEO_TIMEOUT_LOW_END_MS = 20000;

export function BackgroundScroll() {
  const { shouldReduceMotion, isLowEnd } = useDeviceCapability();
  const videoRef = useRef<HTMLVideoElement>(null);
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

  // Ativa o carregamento do vídeo após a montagem do componente.
  // IntersectionObserver não é necessário aqui: o elemento é `fixed inset-0`
  // e está sempre 100% visível. Usar observer criava uma race condition em
  // máquinas lentas — o div do poster era desmontado antes do observer disparar.
  useEffect(() => {
    if (!mounted || shouldReduceMotion) return;
    setIsVisible(true);
  }, [mounted, shouldReduceMotion]);

  // Controla o load do vídeo e inicia o timer de fallback
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVisible || videoFailed) return;

    // Sempre usa "metadata" quando visível: garante que o browser carregue
    // dados suficientes para iniciar a reprodução, mesmo em hardware fraco.
    // "none" bloquearia o canplay event em conexões lentas.
    video.preload = "metadata";
    video.load();

    // Fallback: timeout estendido para hardware fraco ou conexão lenta
    const timeout = isLowEnd ? VIDEO_TIMEOUT_LOW_END_MS : VIDEO_TIMEOUT_MS;
    timeoutRef.current = setTimeout(() => {
      if (video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) {
        setVideoFailed(true);
      }
    }, timeout);

    const handleCanPlay = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      // play() explícito: necessário quando <source> são adicionadas dinamicamente.
      // Verifica video.paused antes de marcar como falha: em alguns browsers o autoPlay
      // já iniciou a reprodução e play() rejeita com AbortError mesmo tocando.
      video.play().catch(() => {
        if (video.paused) setVideoFailed(true);
      });
    };

    const handleError = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setVideoFailed(true);
    };

    // canplay (não canplaythrough): dispara assim que há dados para iniciar a reprodução,
    // sem exigir buffer completo — fundamental para conexões lentas
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      video.removeEventListener("canplay", handleCanPlay);
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
        preload={isVisible ? "metadata" : "none"}
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
