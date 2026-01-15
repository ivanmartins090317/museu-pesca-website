import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Virtual360 } from "@/components/sections/Virtual360";
import { Blog } from "@/components/sections/Blog";
import { Partners } from "@/components/sections/Partners";
import { Location } from "@/components/sections/Location";
import { Collab } from "@/components/sections/Collab";

// Dados mockados - em produção viriam de um CMS ou API
const heroData = {
  title: "Museu de Pesca",
  subtitle:
    "Preservando a história marítima brasileira desde 1934 agora disponível para você explorar virtualmente.",
  badge: {
    text: "Desde 1934",
    variant: "highlight" as const,
  },
  cta: {
    label: "Visita Virtual 360",
    href: "#visita-360",
  },
  backgroundImage:
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80",
};

const aboutData = {
  title: "Sobre o Museu",
  description: [
    "O Museu de Pesca do Instituto de Pesca é uma instituição centenária dedicada à preservação do patrimônio científico, natural e cultural relacionado à pesca e aos ambientes aquáticos no Brasil. Localizado em um edifício histórico na Ponta da Praia, o museu abriga um acervo de mais de 2.000 peças, que inclui exemplares da biodiversidade marinha e costeira, além de objetos e registros que narram a história da pesca artesanal e industrial no país.",
    "Sua missão é promover a educação ambiental e a comunicação científica, valorizando o patrimônio cultural da pesca e sensibilizando o público sobre a importância dos ecossistemas aquáticos na manutenção da vida e da biodiversidade.",
  ],
  highlights: [
    { label: "Desde", value: "1950" },
    { label: "Peças no Acervo", value: "2.000+" },
    { label: "Visitantes/Ano", value: "50.000+" },
    { label: "Área do Museu", value: "1.800m²" },
  ],
  images: [
    "/images/museu-pesca-frente-upscale.jpg",
    "/images/museu-de-pesca-santos-visao-fora.webp",
    "/images/museu-pesca-peixes.jpg",
  ],
};

const virtual360Data = {
  title: "Explore o Museu Virtualmente",
  embedUrl: [
    "https://my.matterport.com/show/?m=X9SyiXKERd4",
    "https://my.matterport.com/show/?m=r1yf88xgFsk",
  ],
};

const blogData = {
  title: "Histórias do Mar",
  posts: [
    {
      id: "1",
      title: "Lula Gigante (Architeuthis spp.)",
      excerpt:
        "Conheça a história por trás do impressionante da lula gigante que é uma das principais atrações do nosso acervo.",
      category: "História",
      publishedAt: new Date("2024-01-15"),
      thumbnail:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhXbiJKLpeKt7LnRJ95iSoWVF5qigQ06zJ_SpvhgXTl7Iz28_nb2n5PFm3yHVzPsZvGW1yhipulV4tyETqYMQMZC9b11CfJPaA_2SWH0rkuQFOHeJv4CbqH8lPUyY50pf8Xtc9yn5PZh2o/s320/lula+gigante.png",
      slug: "lula-gigante-architeuthis-spp",
      url: "https://museudepescadesantos.blogspot.com/2017/10/lula-gigante-architeuthis-spp.html",
    },
    {
      id: "2",
      title: "A história da Baleia-fin",
      excerpt:
        "O Museu de Pesca tem como principal atração a ossada da baleia-fin (Balaenoptera physalus).",
      category: "Cultura",
      publishedAt: new Date("2024-01-10"),
      thumbnail:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgIPABSFfMMVw7eZprEmWeVFBQocsIqNBFVl45hVildn_wa2RoWbK2RLUpj3hAKh-H6DKg82WWy0J_KVQ77IDq1rAFyM3O8W5XJi2JfE_lEeTBexXW-XNbTg-gpfeMqYs8O08M7GBE0dos/s320/foto+baleia+fin.jpg",
      slug: "baleia-fin-balaenoptera-physalus",
      url: "https://museudepescadesantos.blogspot.com/2017/10/baleia-fin-balaenoptera-physalus.html",
    },
    {
      id: "3",
      title: "EXPOSIÇÃO: ARCADAS DE TUBARÕES",
      excerpt: "ARCADA DENTÁRIA DOS ELASMOBRANCHII – SELACHIMORPHA (TUBARÕES)",
      category: "Ciência",
      publishedAt: new Date("2024-01-05"),
      thumbnail:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg2v6YoQRKq_1k8Qpv1XtTloUmbqYh-lSmTS8V3tthd9Vuzl7S8bjyjRIo6KXhhU8VrvMIOshViBOxzo-QXDV8PFRwvLRZAG4kEMOcuzCkBZPUb-tTSkIAtcNpHuV5gy4K7U91vu8c96O4/s640/ad651c05-793e-49be-b567-e4ab225f7116.jpg",
      slug: "exposicao-de-arcadas",
      url: "https://museudepescadesantos.blogspot.com/2019/07/exposicao-de-arcadas.html",
    },
  ],
  ctaLink: "https://museudepescadesantos.blogspot.com/",
};

const partnersData = {
  partners: [
    {
      name: "CNPq",
      logo: "/logos/Logo_apoiadores_CNPq.svg",
      alt: "Conselho Nacional de Desenvolvimento Científico e Tecnológico",
    },
    {
      name: "FNDCT",
      logo: "/logos/Logo_apoiadores_fndct.svg",
      alt: "Fundo Nacional de Desenvolvimento Científico e Tecnológico",
    },
    {
      name: "MCTI",
      logo: "/logos/Logo_apoiadores_MCTI_color.svg",
      alt: "Ministério da Ciência, Tecnologia e Inovações",
    },
  ],
};
const collabsData = {
  collabs: [
    {
      name: "Aquario",
      logo: "/logos/Logo_parceiro_aquario.png",
      alt: "Conselho Nacional de Desenvolvimento Científico e Tecnológico",
    },
    {
      name: "Pinacoteca",
      logo: "/logos/Logo_parceiro_pinacoteca.png",
      alt: "Fundo Nacional de Desenvolvimento Científico e Tecnológico",
    },
    {
      name: "Museu Café",
      logo: "/logos/Logo_parceiro_museu_cafe.png",
      alt: "Museu Café",
    },
    {
      name: "Museu Pelé",
      logo: "/logos/Logo_parceiro_museu_pele.png",
      alt: "Museu Pelé",
    },
  ],
};

const locationData = {
  address: {
    street: "Avenida Bartolomeu de Gusmão, s/n",
    city: "Santos",
    state: "SP",
    zip: "11030-906",
    coordinates: {
      lat: -23.9735,
      lng: -46.3182,
    },
  },
  hours: {
    weekday: "9h às 17h",
    weekend: "10h às 16h",
  },
  contact: {
    phone: "(13) 3261-5260",
    whatsapp: "(13) 99123-4567",
  },
  parkingInfo: "Estacionamento gratuito disponível no local",
  publicTransport: [
    "Linha 20 - Terminal Valongo",
    "Linha 25 - Praia do Gonzaga",
    "Estação da CPTM próxima",
  ],
  mapShareUrl: "https://maps.app.goo.gl/nrinDrkvR4FkiLbh8",
};

export default function HomePage() {
  return (
    <>
      <main className="overflow-hidden z-10">
        <Header />
        <Hero {...heroData} />
        <About {...aboutData} />
        <Virtual360 {...virtual360Data} />
        <Collab {...collabsData} />
        <Blog {...blogData} />
        <Partners {...partnersData} />
        <Location {...locationData} />
      </main>
      <Footer />
    </>
  );
}
