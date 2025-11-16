"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Phone, Car, Bus } from "lucide-react";
import { fadeInUp, defaultTransition } from "@/lib/animations";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import type { LocationProps } from "@/types";

export function Location({
  address,
  hours,
  contact,
  parkingInfo,
  publicTransport,
}: LocationProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${address.coordinates.lat},${address.coordinates.lng}&zoom=15`;

  return (
    <section
      id="localizacao"
      ref={ref}
      className="py-section bg-neutral-gray-100"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion || !isInView ? {} : fadeInUp.hidden}
          animate={prefersReducedMotion || !isInView ? {} : fadeInUp.visible}
          transition={defaultTransition}
          className="text-center mb-12"
        >
          <h2 className="text-h2 font-bold text-primary-ocean mb-4">
            Como Chegar
          </h2>
          <p className="text-body text-neutral-gray-800 max-w-2xl mx-auto">
            Encontre-nos facilmente e planeje sua visita
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Google Maps */}
          <motion.div
            initial={prefersReducedMotion || !isInView ? {} : { opacity: 0, x: -40 }}
            animate={prefersReducedMotion || !isInView ? {} : { opacity: 1, x: 0 }}
            transition={{ ...defaultTransition, delay: 0.2 }}
            className="relative h-[500px] rounded-lg overflow-hidden shadow-lg"
          >
            {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização do Museu de Pesca de Santos"
              />
            ) : (
              <div className="w-full h-full bg-neutral-gray-200 flex items-center justify-center">
                <p className="text-neutral-gray-800">
                  Configure NEXT_PUBLIC_GOOGLE_MAPS_API_KEY para exibir o mapa
                </p>
              </div>
            )}
          </motion.div>

          {/* Information Card */}
          <motion.div
            initial={prefersReducedMotion || !isInView ? {} : { opacity: 0, x: 40 }}
            animate={prefersReducedMotion || !isInView ? {} : { opacity: 1, x: 0 }}
            transition={{ ...defaultTransition, delay: 0.3 }}
            className="bg-primary-stone text-neutral-white rounded-lg p-8 shadow-lg"
          >
            <div className="space-y-6">
              {/* Address */}
              <div>
                <div className="flex items-start mb-2">
                  <MapPin className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">Endereço</h3>
                    <p className="text-neutral-white/90">
                      {address.street}
                      <br />
                      {address.city}, {address.state} - {address.zip}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div>
                <div className="flex items-start mb-2">
                  <Clock className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">Horário de Funcionamento</h3>
                    <p className="text-neutral-white/90">
                      <strong>Segunda a Sexta:</strong> {hours.weekday}
                      <br />
                      <strong>Sábado e Domingo:</strong> {hours.weekend}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div>
                <div className="flex items-start mb-2">
                  <Phone className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">Contato</h3>
                    <p className="text-neutral-white/90">
                      <a
                        href={`tel:${contact.phone}`}
                        className="hover:text-primary-aqua transition-colors"
                      >
                        {contact.phone}
                      </a>
                      {contact.whatsapp && (
                        <>
                          <br />
                          <a
                            href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary-aqua transition-colors"
                          >
                            WhatsApp: {contact.whatsapp}
                          </a>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Parking */}
              <div>
                <div className="flex items-start mb-2">
                  <Car className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">Estacionamento</h3>
                    <p className="text-neutral-white/90">{parkingInfo}</p>
                  </div>
                </div>
              </div>

              {/* Public Transport */}
              {publicTransport.length > 0 && (
                <div>
                  <div className="flex items-start mb-2">
                    <Bus className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">Transporte Público</h3>
                      <ul className="space-y-1 text-neutral-white/90">
                        {publicTransport.map((transport, index) => (
                          <li key={index}>• {transport}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

