"use client";

import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type UseMediaQueryOptions = {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
};

const IS_SERVER = typeof window === "undefined";

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue;
    }
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query);
    }
    return defaultValue;
  });

  const handleChange = () => {
    setMatches(getMatches(query));
  };

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);
    handleChange();

    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}

type CollabItem = {
  name: string;
  logo: string;
  alt: string;
  url?: string;
};

const duration = 0.15;
const transition = {
  duration,
  ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
  filter: "blur(4px)",
};
const transitionOverlay = {
  duration: 0.5,
  ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
};

const Carousel = memo(
  ({
    handleClick,
    controls,
    cards,
    isCarouselActive,
  }: {
    handleClick: (imgUrl: string, index: number) => void;
    controls: any;
    cards: CollabItem[];
    isCarouselActive: boolean;
  }) => {
    // Estado para garantir que só aplicamos valores responsivos após hidratação
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
      setMounted(true);
    }, []);

    // Valores padrão que funcionam no servidor e cliente inicial
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)", {
      defaultValue: false,
      initializeWithValue: false, // Importante: não inicializar com valor no SSR
    });
    const isScreenSizeMd = useMediaQuery("(max-width: 768px)", {
      defaultValue: false,
      initializeWithValue: false,
    });
    const isScreenSizeLg = useMediaQuery("(max-width: 1024px)", {
      defaultValue: false,
      initializeWithValue: false,
    });
    
    // Usar valores padrão até que o componente esteja montado no cliente
    const cylinderWidth = !mounted 
      ? 2000 // Valor padrão que funciona no SSR
      : isScreenSizeSm 
        ? 1400 
        : isScreenSizeMd 
          ? 2000 
          : isScreenSizeLg 
            ? 2400 
            : 3000;
    
    const faceCount = cards.length;
    const faceWidth = !mounted
      ? 300 // Valor padrão
      : isScreenSizeSm 
        ? 220 
        : isScreenSizeMd 
          ? 280 
          : 320;
    
    const radius = !mounted
      ? 350 // Valor padrão
      : isScreenSizeSm 
        ? 250 
        : isScreenSizeMd 
          ? 350 
          : 450;
    
    const rotation = useMotionValue(0);
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    );

    return (
      <div
        className="flex h-full items-center justify-center w-full"
        style={{
          perspective: "1500px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing w-full"
          style={{
            transform,
            rotateY: rotation,
            width: `${cylinderWidth}px`,
            minWidth: "100%",
            transformStyle: "preserve-3d",
          }}
          onDrag={(_, info) =>
            isCarouselActive &&
            rotation.set(rotation.get() + info.offset.x * 0.05)
          }
          onDragEnd={(_, info) =>
            isCarouselActive &&
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.05,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 30,
                mass: 0.1,
              },
            })
          }
          animate={controls}
        >
          {cards.map((card, i) => (
            <motion.div
              key={`key-${card.name}-${i}`}
              className="absolute flex h-full origin-center items-center justify-center bg-transparent"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(card.logo, i)}
            >
              <div className="relative w-full h-[35%] max-h-[200px] flex items-center justify-center bg-white rounded-xl p-3 md:p-4 lg:p-5 shadow-2xl border border-gray-100/50">
                {card.url ? (
                  <Link
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" w-full h-full flex items-center justify-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <motion.div
                      layoutId={`img-${card.logo}`}
                      className="pointer-events-none w-full h-full flex items-center justify-center"
                      initial={{ filter: "blur(4px)" }}
                      layout="position"
                      animate={{ filter: "blur(0px)" }}
                      transition={transition}
                    >
                      <Image
                        src={card.logo}
                        alt={card.alt}
                        width={100}
                        height={150}
                        className="object-contain max-w-[85%] max-h-[85%] w-auto h-auto rounded-lg"
                        priority={i === 0}
                      />
                    </motion.div>
                  </Link>
                ) : (
                  <motion.div
                    layoutId={`img-${card.logo}`}
                    className="pointer-events-none w-full h-full flex items-center justify-center"
                    initial={{ filter: "blur(4px)" }}
                    layout="position"
                    animate={{ filter: "blur(0px)" }}
                    transition={transition}
                  >
                    <Image
                      src={card.logo}
                      alt={card.alt}
                      width={200}
                      height={250}
                      className="object-contain max-w-[85%] max-h-[85%] w-auto h-auto rounded-lg"
                      priority={i === 0}
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }
);

Carousel.displayName = "Carousel";

function ThreeDPhotoCarousel({ cards }: { cards: CollabItem[] }) {
  const [activeImg, setActiveImg] = useState<string | null>(null);
  const [isCarouselActive, setIsCarouselActive] = useState(true);
  const controls = useAnimation();

  useEffect(() => {
    console.log("Cards loaded:", cards);
  }, [cards]);

  const handleClick = (imgUrl: string) => {
    setActiveImg(imgUrl);
    setIsCarouselActive(false);
    controls.stop();
  };

  const handleClose = () => {
    setActiveImg(null);
    setIsCarouselActive(true);
  };

  const ButtonClose = () => {
    return <button
    onClick={(e) => {
      e.stopPropagation(); // Previne que o clique feche o modal também
      handleClose();
    }}
    className="absolute top-4 right-4 z-100 p-2 rounded-full bg-white/90 hover:bg-white transition-colors duration-200 shadow-lg"
    aria-label="Fechar modal"
  >
    <X className="h-5 w-5 text-gray-800" />
  </button>
  }

  const activeCard = useMemo(
    () => cards.find((card) => card.logo === activeImg),
    [activeImg, cards]
  );

  return (
    <motion.div layout className="relative">
      <AnimatePresence mode="sync">
        {activeImg && activeCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            layoutId={`img-container-${activeImg}`}
            layout="position"
            onClick={handleClose}
            className="fixed w-full h-full border inset-0 bg-black/80 flex items-center justify-center z-50 top-10 rounded-3xl"
            style={{ willChange: "opacity" }}
            transition={transitionOverlay}
          >
            {ButtonClose()}
            <motion.div
              layoutId={`img-${activeImg}`}
              className="max-w-full max-h-full rounded-lg shadow-lg bg-white p-6 flex items-center justify-center"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.5,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{
                willChange: "transform",
              }}
            >
              {activeCard.url ? (
                <Link
                  href={activeCard.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Image
                    src={activeCard.logo}
                    alt={activeCard.alt}
                    width={600}
                    height={400}
                    className="object-contain max-h-[70vh] w-auto h-auto rounded-lg"
                  />
                </Link>
              ) : (
                <Image
                  src={activeCard.logo}
                  alt={activeCard.alt}
                  width={600}
                  height={400}
                  className="object-contain max-h-[70vh] w-auto h-auto rounded-lg"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative h-[550px] md:h-[650px] lg:h-[750px] w-full overflow-visible">
        <Carousel
          handleClick={handleClick}
          controls={controls}
          cards={cards}
          isCarouselActive={isCarouselActive}
        />
      </div>
    </motion.div>
  );
}

export { ThreeDPhotoCarousel };
