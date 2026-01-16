"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import {
  Waves,
  Facebook,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { socialMedia, navigation, siteConfig } from "@/lib/constants";

const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
};

const footerLinks = {
  Navegação: navigation,
  Recursos: [
    { label: "Blog", href: "#blog" },
    { label: "Eventos", href: "#eventos" },
    { label: "Parceiros", href: "#parceiros" },
    { label: "Visitação 360", href: "#visita-360" },
  ],
  Legal: [
    { label: "Privacidade", href: "/privacidade" },
    { label: "Termos de Uso", href: "/termos" },
    { label: "Cookies", href: "/cookies" },
    { label: "Acessibilidade", href: "/acessibilidade" },
  ],
};

export function Footer() {
  const [mounted, setMounted] = useState(false);

  // Calcular valores aleatórios apenas no cliente após montagem
  const backgroundElements = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      width: Math.random() * 200 + 50,
      height: Math.random() * 200 + 50,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 5 + 5,
    }));
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer id="contato" className="relative pt-20 pb-10 overflow-hidden">
      {/* Darker overlay only for footer */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-sea/60 backdrop-blur-md to-primary-sea_floor/80" />

      {/* Animated Background */}
      {mounted && (
        <div className="absolute inset-0 opacity-5">
          {backgroundElements.map((element) => (
            <motion.div
              key={element.id}
              className="absolute rounded-full bg-cyan-500"
              style={{
                width: element.width,
                height: element.height,
                left: `${element.left}%`,
                top: `${element.top}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: element.duration,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              className="flex items-center gap-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-white text-2xl font-bold">
                {siteConfig.name}
              </span>
            </motion.div>
            <motion.p
              className="text-gray-400 mb-6 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {siteConfig.description}
            </motion.p>
            {/* Social Links */}
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {socialMedia.map((social) => {
                const Icon = socialIcons[social.platform];
                return (
                  <motion.a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 text-gray-400 hover:text-cyan-400 transition-colors" />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links], idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white mb-6 font-semibold">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => {
                  const href = typeof link === "string" ? "#" : link.href;
                  const label = typeof link === "string" ? link : link.label;
                  return (
                    <li key={label}>
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          href={href}
                          className="text-gray-400 hover:text-cyan-400 transition-colors inline-block"
                        >
                          {label}
                        </Link>
                      </motion.div>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Info */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 pb-16 border-b border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
              <Mail className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h5 className="text-white mb-1 font-semibold">Email</h5>
              <p className="text-gray-400">mpescasantos@gmail.com</p>
            </div>
          </div>
          {/* <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
              <Phone className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h5 className="text-white mb-1 font-semibold">Telefone</h5>
              <p className="text-gray-400">(13) 3261-5260</p>
            </div>
          </div> */}
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
              <MapPin className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h5 className="text-white mb-1 font-semibold">Localização</h5>
              <p className="text-gray-400">Santos, SP - Brasil</p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos
            reservados.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacidade"
              className="text-gray-500 hover:text-cyan-400 transition-colors"
            >
              Política de Privacidade
            </Link>
            <Link
              href="/termos"
              className="text-gray-500 hover:text-cyan-400 transition-colors"
            >
              Termos de Uso
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative Wave at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 opacity-10">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <motion.path
            fill="currentColor"
            className="text-cyan-500"
            initial={{
              d: "M0,0 C300,50 600,50 900,20 C1100,0 1150,10 1200,20 L1200,120 L0,120 Z",
            }}
            animate={{
              d: [
                "M0,0 C300,50 600,50 900,20 C1100,0 1150,10 1200,20 L1200,120 L0,120 Z",
                "M0,20 C300,0 600,30 900,50 C1100,40 1150,30 1200,0 L1200,120 L0,120 Z",
                "M0,0 C300,50 600,50 900,20 C1100,0 1150,10 1200,20 L1200,120 L0,120 Z",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>
    </footer>
  );
}
