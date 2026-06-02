"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Minimize2 } from "lucide-react";

interface Virtual360FullscreenProps {
  isOpen: boolean;
  src: string;
  index: number;
  total: number;
  onClose: () => void;
}

export function Virtual360Fullscreen({
  isOpen,
  src,
  index,
  total,
  onClose,
}: Virtual360FullscreenProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label="Visita virtual em tela cheia"
        >
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-white hover:bg-black/80 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm font-medium shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Sair do modo tela cheia"
          >
            <Minimize2 className="w-4 h-4" aria-hidden="true" />
            Voltar ao padrão
          </motion.button>
          <iframe
            src={src}
            className="w-full h-full border-0"
            allow="fullscreen; accelerometer; gyroscope; autoplay; camera; microphone; xr-spatial-tracking; vr; payment"
            allowFullScreen
            title={`Visita Virtual 360° - Tela Cheia - ${index + 1} de ${total}`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
