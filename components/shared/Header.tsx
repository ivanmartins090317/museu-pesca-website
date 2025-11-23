"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navigation } from "@/lib/constants";
import Image from "next/image";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-3/4 rounded-full absolute mx-auto left-0 right-0 z-50 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg top-4">
      <nav className="container w-3/4 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify- h-12">
          {/* <Link
            href="/"
            className="text-2xl font-bold text-primary-ocean hover:text-primary-aqua transition-colors"
          >
            <Image
              src="/logos/logo-museu-predio.png"
              alt="Museu de Pesca de Santos"
              width={100}
              height={100}
            />
          </Link> */}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-neutral-gray-800 text-lg hover:bg-neutral-white py-2 px-4 rounded-full transition-colors font-semibold duration-300"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-neutral-gray-800 hover:text-primary-ocean transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-neutral-gray-800 hover:text-primary-ocean transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
