"use client";

import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useEffect, useRef, useState } from "react";

export function BackgroundScroll() {
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [preloadStrategy, setPreloadStrategy] = useState<"metadata" | "auto" | "none">("none");
  const [shouldUseVideo, setShouldUseVideo] = useState<boolean>(true);
  const [videoSource, setVideoSource] = useState<"mobile" | "web">("web");
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer para lazy load
  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { 
        rootMargin: "100px", // Começa a carregar 100px antes de aparecer
        threshold: 0.1 
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  // Detecta largura da tela
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

  // Detecta qualidade da conexão
  useEffect(() => {
    if (!isVisible) return; // Só verifica quando visível

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768;

    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;

    if (connection) {
      const { effectiveType, downlink, saveData } = connection;

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
      setPreloadStrategy("metadata");
    }

    setShouldUseVideo(true);
  }, [videoSource, isVisible]);

  // Carrega vídeo apenas quando visível
  useEffect(() => {
    if (videoRef.current && !prefersReducedMotion && shouldUseVideo && isVisible) {
      const video = videoRef.current;
      video.preload = preloadStrategy;
      video.load();
    }
  }, [prefersReducedMotion, preloadStrategy, shouldUseVideo, videoSource, isVisible]);

  if (prefersReducedMotion || !shouldUseVideo) {
    return (
      <div
        ref={containerRef}
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

  const videoPath =
    videoSource === "mobile"
      ? "/video/video_drone-museu-web-mobile.webm"
      : "/video/video_drone-museu-web.webm";

  return (
    <div
      ref={containerRef}
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
        preload={isVisible ? preloadStrategy : "none"} // ✅ Lazy load real
        poster="/images/bg_sea_floor.png"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src={isVisible ? videoPath : undefined} type="video/webm" />
      </video>
      <div className="absolute inset-0 bg-black/55 pointer-events-none" />
    </div>
  );
}