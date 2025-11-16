"use client";

import Link from "next/link";
import { Instagram, Facebook, Youtube, Twitter, Mail } from "lucide-react";
import { socialMedia, navigation, siteConfig } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  twitter: Twitter,
};

export function Footer() {
  return (
    <footer className="bg-primary-ocean text-neutral-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo e Descrição */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">{siteConfig.name}</h3>
            <p className="text-neutral-white/80 mb-6 max-w-md">
              {siteConfig.description}
            </p>
            <div className="flex space-x-4">
              {socialMedia.map((social) => {
                const Icon = socialIcons[social.platform];
                return (
                  <Link
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary-aqua/20 hover:bg-primary-aqua flex items-center justify-center transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Navegação Rápida */}
          <div>
            <h4 className="font-bold text-lg mb-4">Navegação</h4>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-neutral-white/80 hover:text-primary-aqua transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-4">Newsletter</h4>
            <p className="text-neutral-white/80 mb-4 text-sm">
              Receba novidades e eventos do museu
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="w-full px-4 py-2 rounded-md bg-primary-aqua/20 border border-primary-aqua/30 text-neutral-white placeholder:text-neutral-white/60 focus:outline-none focus:ring-2 focus:ring-primary-aqua"
                required
              />
              <Button
                type="submit"
                variant="secondary"
                className="w-full"
                size="sm"
              >
                <Mail className="w-4 h-4 mr-2" />
                Inscrever-se
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-aqua/20 pt-8 text-center text-sm text-neutral-white/60">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

