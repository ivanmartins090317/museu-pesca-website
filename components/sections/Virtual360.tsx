import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel";
import type { Virtual360Props } from "@/types";
import Image from "next/image";

export function Virtual360({
  title,
  embedUrl,
  areas,
  images,
  cta,
}: Virtual360Props) {
  return (
    <section id="visita-360" className="py-section bg-primary-sea">
      <div className="inset-0 mt-[-3rem] md:mt-[-8rem]">
        <Image
          src="/images/divider.png"
          alt="Museu de Pesca de Santos"
          width={1920}
          height={600}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-h2 font-bold text-neutral-white mb-4">{title}</h2>
          <p className="text-body text-neutral-white max-w-2xl mx-auto">
            Explore o museu virtualmente e conheça nossos espaços sem sair de
            casa
          </p>
        </div>

        {/* <div className="max-w-6xl mx-auto mb-8">
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allow="fullscreen"
              allowFullScreen
              title="Tour Virtual 360 do Museu de Pesca"
            />
          </div>
        </div> */}

        {/* bloco de informações   */}
        <div className="w-full mx-auto">
          <div className="bg-neutral-white rounded-lg p-8 shadow-lg text-center">
            <h3 className="text-h3 font-bold text-primary-sea mb-6">
              Áreas Disponíveis no Tour
            </h3>

            <ul className="w-full grid md:grid-cols-2 gap-4 mb-8">
              {areas.map((area, index) => (
                <li
                  key={index}
                  className="flex items-center text-body text-neutral-gray-800"
                >
                  <span className="w-2 h-2 bg-primary-sea rounded-full mr-3" />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {images && images.length > 0 && (
        <div className="w-full mx-auto mb-8 h-full border">
          <ThreeDPhotoCarousel images={images} />
        </div>
      )}
      <div className="inset-0 mb-[-8rem] md:mb-[-8rem] transform rotate-180 z-[-10]">
        <Image
          src="/images/divider.png"
          alt="Museu de Pesca de Santos"
          width={1920}
          height={600}
        />
      </div>
    </section>
  );
}
