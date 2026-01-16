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
  mapShareUrl,
}: LocationProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Gera a URL do embed do Google Maps
  const getMapEmbedUrl = (): string | null => {
    // Prepara o endereço completo para usar como query
    const addressQuery = encodeURIComponent(
      `${address.street}, ${address.city}, ${address.state}`
    );

    // Se tiver API key, usa a API oficial do Google Maps Embed
    if (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      return `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${addressQuery}&zoom=15`;
    }

    // Usa coordenadas diretamente no formato de embed do Google Maps
    // Formato que funciona sem API key usando coordenadas
    const { lat, lng } = address.coordinates;

    // Gera URL de embed usando coordenadas no formato padrão do Google Maps
    // Este formato funciona sem necessidade de API key
    // O formato pb (place base) é complexo, então usamos uma abordagem mais simples
    // com coordenadas e endereço como fallback
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDU4JzI0LjYiUyA0NsKwMTknMDUuNSJX!5e0!3m2!1spt-BR!2sbr!4v${Date.now()}&q=${addressQuery}`;
  };

  const mapUrl = getMapEmbedUrl();

  const shouldAnimate = !prefersReducedMotion && isInView;

  return (
    <section
      id="localizacao"
      ref={ref}
      className="py-section bg-primary-sea_floor/10 relative z-10"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 20 } : {}}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
          transition={defaultTransition}
          className="text-center mb-12 relative z-10"
        >
          <h2 className="text-h2 font-bold text-white mb-4">Como Chegar</h2>
          <p className="text-body text-white max-w-2xl mx-auto">
            Encontre-nos facilmente e planeje sua visita
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Google Maps */}
          <motion.div
            initial={
              prefersReducedMotion || !isInView ? {} : { opacity: 0, x: -40 }
            }
            animate={
              prefersReducedMotion || !isInView ? {} : { opacity: 1, x: 0 }
            }
            transition={{ ...defaultTransition, delay: 0.2 }}
            className="relative h-[500px] rounded-lg overflow-hidden shadow-lg"
          >
            {mapUrl ? (
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
                  Configure o link do mapa ou NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
                  para exibir o mapa
                </p>
              </div>
            )}
          </motion.div>

          {/* Information Card */}
          <motion.div
            initial={
              prefersReducedMotion || !isInView ? {} : { opacity: 0, x: 40 }
            }
            animate={
              prefersReducedMotion || !isInView ? {} : { opacity: 1, x: 0 }
            }
            transition={{ ...defaultTransition, delay: 0.3 }}
            className="bg-primary-sea_floor/30 backdrop-blur-md text-neutral-white rounded-lg p-8 shadow-lg flex flex-col justify-center"
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
                    <h3 className="font-bold text-lg mb-1">
                      Horário de Funcionamento
                    </h3>
                    <p className="text-primary-aqua">
                      *Museu temporariamente fechado para restauração.
                      <br />{" "}
                      <a
                        href="/virtual-tour"
                        className="hover:text-neutral-white/80 transition-colors mt-8"
                      >
                        - Conheça nossa visita virtual
                      </a>
                      {/* <strong>Segunda a Sexta:</strong> {hours.weekday}
                      <br />
                      <strong>Sábado e Domingo:</strong> {hours.weekend} */}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact */}
              {/* <div>
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
                            href={`https://wa.me/${contact.whatsapp.replace(
                              /\D/g,
                              ""
                            )}`}
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
              </div> */}

              {/* Parking */}
              {/* <div>
                <div className="flex items-start mb-2">
                  <Car className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">Estacionamento</h3>
                    <p className="text-neutral-white/90">{parkingInfo}</p>
                  </div>
                </div>
              </div> */}

              {/* Public Transport */}
              {/* {publicTransport.length > 0 && (
                <div>
                  <div className="flex items-start mb-2">
                    <Bus className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">
                        Transporte Público
                      </h3>
                      <ul className="space-y-1 text-neutral-white/90">
                        {publicTransport.map((transport, index) => (
                          <li key={index}>• {transport}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )} */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
