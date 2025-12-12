"use client";

import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useEffect, useRef, useState } from "react";

// Flag para habilitar logs de debug (apenas em desenvolvimento)
const DEBUG_VIDEO =
  process.env.NODE_ENV === "development" ||
  (typeof window !== "undefined" && (window as any).__DEBUG_VIDEO__ === true);

/**
 * Componente de background fixo compatível com iOS Safari
 *
 * Usa position: fixed para manter o background completamente parado
 * enquanto apenas o conteúdo acima se move durante o scroll.
 *
 * No iOS, position: fixed funciona melhor que background-attachment: fixed
 *
 * Otimizações de performance:
 * - Versões otimizadas: mobile (< 400px) e web (>= 400px)
 * - WebM primeiro (menor tamanho, ~40-50% menor que MP4)
 * - Preload adaptativo baseado na conexão
 * - Fallback para imagem em conexões lentas
 * - Fallback visual imediato (cor de fundo + poster)
 * - Respeita prefersReducedMotion
 */
export function BackgroundScroll() {
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const loadStartTimeRef = useRef<number | null>(null);
  const firstPlayingTimeRef = useRef<number | null>(null);
  const hasLoggedFirstPlayingRef = useRef<boolean>(false);
  const progressLogThrottleRef = useRef<number>(0);
  const [preloadStrategy, setPreloadStrategy] = useState<"metadata" | "auto">(
    "metadata"
  );
  const [shouldUseVideo, setShouldUseVideo] = useState<boolean>(true);
  const [videoSource, setVideoSource] = useState<"mobile" | "web">("web");

  // Detecta largura da tela e seleciona vídeo apropriado
  useEffect(() => {
    const updateVideoSource = () => {
      const width = window.innerWidth;
      const isMobile = width < 400;
      const newSource = isMobile ? "mobile" : "web";

      if (newSource !== videoSource) {
        setVideoSource(newSource);
        if (DEBUG_VIDEO) {
          console.log(
            `[BackgroundScroll] Largura da tela: ${width}px - Usando vídeo: ${newSource}`
          );
        }
      }
    };

    // Verifica na montagem
    updateVideoSource();

    // Listener para mudanças de tamanho da janela
    window.addEventListener("resize", updateVideoSource);

    return () => {
      window.removeEventListener("resize", updateVideoSource);
    };
  }, [videoSource]);

  // Detecta qualidade da conexão e ajusta estratégia de carregamento
  useEffect(() => {
    // Detecta se é mobile
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;

    // Network Information API (disponível em alguns navegadores)
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;

    if (connection) {
      const effectiveType = connection.effectiveType; // '2g', '3g', '4g', 'slow-2g'
      const downlink = connection.downlink; // Mbps
      const saveData = connection.saveData; // modo economia de dados

      if (DEBUG_VIDEO) {
        console.log("[BackgroundScroll] Informações de conexão:", {
          effectiveType,
          downlink: `${downlink} Mbps`,
          saveData,
          isMobile,
          videoSource,
        });
      }

      // Em mobile com conexão lenta, usa apenas imagem
      if (
        isMobile &&
        (saveData ||
          effectiveType === "2g" ||
          effectiveType === "slow-2g" ||
          (downlink && downlink < 1.5))
      ) {
        if (DEBUG_VIDEO) {
          console.log(
            "[BackgroundScroll] Mobile com conexão lenta detectada, usando apenas imagem (sem vídeo)"
          );
        }
        setShouldUseVideo(false);
        setPreloadStrategy("metadata");
        return;
      }

      // Ajusta preload baseado na conexão
      if (
        saveData ||
        effectiveType === "2g" ||
        effectiveType === "slow-2g" ||
        (downlink && downlink < 1.5)
      ) {
        if (DEBUG_VIDEO) {
          console.log(
            "[BackgroundScroll] Conexão lenta detectada, usando preload='metadata'"
          );
        }
        setPreloadStrategy("metadata");
        setShouldUseVideo(true);
      } else if (effectiveType === "4g" && downlink && downlink >= 2) {
        if (DEBUG_VIDEO) {
          console.log(
            "[BackgroundScroll] Conexão rápida detectada, usando preload='auto' para reduzir delay"
          );
        }
        setPreloadStrategy("auto");
        setShouldUseVideo(true);
      } else {
        if (DEBUG_VIDEO) {
          console.log(
            "[BackgroundScroll] Conexão média detectada, usando preload='metadata'"
          );
        }
        setPreloadStrategy("metadata");
        setShouldUseVideo(true);
      }
    } else {
      // Fallback: assume conexão média se API não disponível
      // Em mobile sem API, usa apenas imagem por segurança apenas se conexão muito lenta
      if (isMobile && window.innerWidth < 400) {
        if (DEBUG_VIDEO) {
          console.log(
            "[BackgroundScroll] Mobile pequeno detectado sem Network API, usando vídeo mobile otimizado"
          );
        }
        setShouldUseVideo(true);
        setPreloadStrategy("metadata");
      } else {
        if (DEBUG_VIDEO) {
          console.log(
            "[BackgroundScroll] Network Information API não disponível, usando preload='metadata'"
          );
        }
        setPreloadStrategy("metadata");
        setShouldUseVideo(true);
      }
    }
  }, [videoSource]);

  // Log quando o componente renderiza com reduced motion
  useEffect(() => {
    if (prefersReducedMotion && DEBUG_VIDEO) {
      console.log(
        "[BackgroundScroll] Renderizando: Fallback de cor (prefersReducedMotion ativo)"
      );
    }
  }, [prefersReducedMotion]);

  // Força o carregamento do vídeo assim que o componente montar
  useEffect(() => {
    if (videoRef.current && !prefersReducedMotion && shouldUseVideo) {
      const video = videoRef.current;
      const componentStartTime = Date.now();

      // Aplica estratégia de preload
      video.preload = preloadStrategy;

      // Força o navegador a começar a baixar o vídeo imediatamente
      video.load();

      // Detecta quando o poster (imagem) está sendo exibido
      const handleLoadStart = () => {
        loadStartTimeRef.current = Date.now();
        if (DEBUG_VIDEO) {
          const elapsed = loadStartTimeRef.current - componentStartTime;
          console.log(
            `[BackgroundScroll] [${elapsed}ms] Iniciando carregamento do vídeo. Poster (imagem) sendo exibido:`,
            video.poster,
            `| Versão: ${videoSource}`
          );
        }
      };

      // Detecta progresso de carregamento (throttled para não poluir console)
      const handleProgress = () => {
        if (video.buffered.length > 0 && DEBUG_VIDEO) {
          const now = Date.now();
          // Throttle: loga apenas a cada 500ms
          if (now - progressLogThrottleRef.current < 500) {
            return;
          }
          progressLogThrottleRef.current = now;

          const bufferedEnd = video.buffered.end(video.buffered.length - 1);
          const duration = video.duration;
          const progress = duration > 0 ? (bufferedEnd / duration) * 100 : 0;
          const elapsed = loadStartTimeRef.current
            ? now - loadStartTimeRef.current
            : now - componentStartTime;

          console.log(
            `[BackgroundScroll] [${elapsed}ms] Progresso de carregamento: ${progress.toFixed(
              1
            )}%`,
            {
              buffered: `${bufferedEnd.toFixed(2)}s`,
              duration: `${duration.toFixed(2)}s`,
              versao: videoSource,
            }
          );
        }
      };

      // Detecta quando dados suficientes foram carregados para iniciar reprodução
      const handleCanPlay = () => {
        if (DEBUG_VIDEO) {
          const elapsed = loadStartTimeRef.current
            ? Date.now() - loadStartTimeRef.current
            : Date.now() - componentStartTime;
          console.log(
            `[BackgroundScroll] [${elapsed}ms] Vídeo pronto para reprodução (canplay) | Versão: ${videoSource}`
          );
        }
      };

      // Detecta quando dados suficientes foram carregados
      const handleCanPlayThrough = () => {
        if (DEBUG_VIDEO) {
          const elapsed = loadStartTimeRef.current
            ? Date.now() - loadStartTimeRef.current
            : Date.now() - componentStartTime;
          console.log(
            `[BackgroundScroll] [${elapsed}ms] Vídeo totalmente carregado (canplaythrough) | Versão: ${videoSource}`
          );
        }
      };

      // Detecta qual formato de vídeo foi carregado
      const handleLoadedData = () => {
        if (!DEBUG_VIDEO) return;

        const elapsed = loadStartTimeRef.current
          ? Date.now() - loadStartTimeRef.current
          : Date.now() - componentStartTime;
        const currentSrc = video.currentSrc;
        const videoSize =
          video.videoWidth && video.videoHeight
            ? `${video.videoWidth}x${video.videoHeight}`
            : "desconhecido";

        // Tenta obter tamanho do arquivo
        fetch(currentSrc, { method: "HEAD" })
          .then((response) => {
            const contentLength = response.headers.get("content-length");
            const sizeMB = contentLength
              ? (parseInt(contentLength) / (1024 * 1024)).toFixed(2)
              : "desconhecido";

            if (currentSrc.includes(".webm")) {
              const versaoDetectada = currentSrc.includes("mobile")
                ? "mobile"
                : "web";
              console.log(
                `[BackgroundScroll] [${elapsed}ms] Renderizando: Vídeo WebM carregado`,
                {
                  src: currentSrc,
                  tamanho: `${sizeMB} MB`,
                  resolução: videoSize,
                  versao: versaoDetectada,
                }
              );

              // Alerta se o vídeo for muito pesado
              if (
                contentLength &&
                parseInt(contentLength) > 1.5 * 1024 * 1024
              ) {
                console.warn(
                  `[BackgroundScroll] ⚠️ Vídeo muito pesado (${sizeMB} MB). Considere otimizar ainda mais.`
                );
              } else {
                console.log(
                  `[BackgroundScroll] ✅ Tamanho do vídeo otimizado (${sizeMB} MB)`
                );
              }
            }
          })
          .catch(() => {
            // Se não conseguir obter tamanho, apenas loga o formato
            const versaoDetectada = currentSrc.includes("mobile")
              ? "mobile"
              : "web";
            console.log(
              `[BackgroundScroll] [${elapsed}ms] Renderizando: Vídeo WebM carregado`,
              { src: currentSrc, resolução: videoSize, versao: versaoDetectada }
            );
          });
      };

      // Detecta quando o vídeo começa a tocar (transição do poster para vídeo)
      // Loga apenas a primeira vez para evitar spam no loop
      const handlePlaying = () => {
        if (!hasLoggedFirstPlayingRef.current) {
          hasLoggedFirstPlayingRef.current = true;
          firstPlayingTimeRef.current = Date.now();

          if (DEBUG_VIDEO) {
            const delay = loadStartTimeRef.current
              ? firstPlayingTimeRef.current - loadStartTimeRef.current
              : firstPlayingTimeRef.current - componentStartTime;

            console.log(
              `[BackgroundScroll] ✅ PRIMEIRA REPRODUÇÃO - Transição do poster para vídeo`,
              {
                delayTotal: `${delay}ms (${(delay / 1000).toFixed(2)}s)`,
                preloadStrategy,
                versao: videoSource,
                larguraTela: `${window.innerWidth}px`,
              }
            );

            // Alerta se o delay for muito grande
            if (delay > 3000) {
              console.warn(
                `[BackgroundScroll] ⚠️ Delay muito grande detectado (${(
                  delay / 1000
                ).toFixed(
                  2
                )}s). Considere otimizar o vídeo ou reduzir o tamanho do arquivo.`
              );
            }
          }
        }
      };

      // Detecta erros no carregamento do vídeo (sempre loga erros)
      const handleError = (e: Event) => {
        const error = video.error;
        if (error) {
          const elapsed = loadStartTimeRef.current
            ? Date.now() - loadStartTimeRef.current
            : Date.now() - componentStartTime;
          console.error(
            `[BackgroundScroll] [${elapsed}ms] Erro ao carregar vídeo:`,
            {
              code: error.code,
              message: error.message,
              currentSrc: video.currentSrc,
              versao: videoSource,
            }
          );
          if (DEBUG_VIDEO) {
            console.log(
              "[BackgroundScroll] Renderizando: Apenas imagem (poster) devido a erro no vídeo"
            );
          }
        }
      };

      // Detecta quando o vídeo está esperando dados (buffering)
      const handleWaiting = () => {
        if (DEBUG_VIDEO) {
          const elapsed = loadStartTimeRef.current
            ? Date.now() - loadStartTimeRef.current
            : Date.now() - componentStartTime;

          // Mostra informações sobre o buffering
          const bufferedEnd =
            video.buffered.length > 0
              ? video.buffered.end(video.buffered.length - 1)
              : 0;
          const currentTime = video.currentTime;
          const duration = video.duration;
          const bufferedPercent =
            duration > 0 ? (bufferedEnd / duration) * 100 : 0;

          console.warn(
            `[BackgroundScroll] [${elapsed}ms] ⏳ Vídeo em buffering (aguardando dados)`,
            {
              tempoAtual: `${currentTime.toFixed(2)}s`,
              buffered: `${bufferedEnd.toFixed(2)}s`,
              progresso: `${bufferedPercent.toFixed(1)}%`,
              duracao: `${duration.toFixed(2)}s`,
              versao: videoSource,
            }
          );
        }
      };

      video.addEventListener("loadstart", handleLoadStart);
      video.addEventListener("progress", handleProgress);
      video.addEventListener("canplay", handleCanPlay);
      video.addEventListener("canplaythrough", handleCanPlayThrough);
      video.addEventListener("loadeddata", handleLoadedData);
      video.addEventListener("error", handleError);
      video.addEventListener("playing", handlePlaying);
      video.addEventListener("waiting", handleWaiting);

      return () => {
        video.removeEventListener("loadstart", handleLoadStart);
        video.removeEventListener("progress", handleProgress);
        video.removeEventListener("canplay", handleCanPlay);
        video.removeEventListener("canplaythrough", handleCanPlayThrough);
        video.removeEventListener("loadeddata", handleLoadedData);
        video.removeEventListener("error", handleError);
        video.removeEventListener("playing", handlePlaying);
        video.removeEventListener("waiting", handleWaiting);
      };
    }
  }, [prefersReducedMotion, preloadStrategy, shouldUseVideo, videoSource]);

  // Se preferir movimento reduzido ou não deve usar vídeo, renderiza apenas imagem
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

  // Determina qual vídeo usar baseado na largura da tela
  const videoPath =
    videoSource === "mobile"
      ? "/video/video_hero_museu_mobile.webm"
      : "/video/video_hero_museu_web.webm";

  return (
    <div
      className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-primary-sea"
      aria-hidden="true"
    >
      {/* Vídeo renderizado imediatamente para começar o carregamento o mais cedo possível */}
      {/* O poster é exibido automaticamente pelo navegador enquanto o vídeo carrega */}
      {/* Versão mobile (< 400px) ou web (>= 400px) baseado na largura da tela */}
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
        {/* WebM otimizado - versão mobile ou web baseado na largura da tela */}
        <source src={videoPath} type="video/webm" />
      </video>
    </div>
  );
}
