import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Virtual360 } from "@/components/sections/Virtual360";
import { Blog } from "@/components/sections/Blog";
import { Partners } from "@/components/sections/Partners";
import { Location } from "@/components/sections/Location";

// Dados mockados - em produção viriam de um CMS ou API
const heroData = {
  title: "Museu de Pesca Santos",
  subtitle: "Preservando a história marítima brasileira desde 1934",
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
    "O Museu de Pesca de Santos é uma instituição centenária dedicada à preservação da memória da pesca e da cultura marítima brasileira. Localizado em um edifício histórico na Ponta da Praia, o museu abriga um acervo de mais de 2.000 peças que contam a história da pesca artesanal e industrial no Brasil.",
    "Nossa missão é preservar, pesquisar e divulgar o patrimônio cultural marítimo, promovendo a educação ambiental e o conhecimento sobre a importância dos oceanos para a humanidade.",
  ],
  highlights: [
    { label: "Anos de História", value: "90+" },
    { label: "Peças no Acervo", value: "2.000+" },
    { label: "Visitantes/Ano", value: "50.000+" },
    { label: "Área do Museu", value: "1.200m²" },
  ],
  images: [
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
  ],
};

const virtual360Data = {
  title: "Explore o Museu Virtualmente",
  embedUrl: "https://my.matterport.com/show/?m=example123",
  areas: [
    "Sala Principal",
    "Exposição de Embarcações",
    "Acervo de Equipamentos",
    "Biblioteca Marítima",
    "Auditório",
    "Área Externa",
  ],
  cta: {
    label: "Agende sua Visita Presencial",
    href: "#localizacao",
  },
};

const blogData = {
  title: "Histórias do Mar",
  posts: [
    {
      id: "1",
      title: "A História do Tubarão-Baleia do Museu",
      excerpt:
        "Conheça a história por trás do impressionante esqueleto de tubarão-baleia que é uma das principais atrações do nosso acervo.",
      category: "História",
      publishedAt: new Date("2024-01-15"),
      thumbnail:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
      slug: "historia-tubarao-baleia",
    },
    {
      id: "2",
      title: "Técnicas Tradicionais de Pesca Artesanal",
      excerpt:
        "Descubra as técnicas ancestrais de pesca que foram passadas de geração em geração nas comunidades litorâneas brasileiras.",
      category: "Cultura",
      publishedAt: new Date("2024-01-10"),
      thumbnail:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
      slug: "tecnicas-pesca-artesanal",
    },
    {
      id: "3",
      title: "Expedição Científica: Descobertas no Litoral Paulista",
      excerpt:
        "Relato da última expedição científica realizada pelo museu, revelando novas descobertas sobre a vida marinha do litoral paulista.",
      category: "Ciência",
      publishedAt: new Date("2024-01-05"),
      thumbnail:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
      slug: "expedicao-cientifica-litoral-paulista",
    },
  ],
  ctaLink: "/blog",
};

const partnersData = {
  partners: [
    {
      id: "1",
      name: "Prefeitura de Santos",
      logo: "/logos/prefeitura-santos.svg",
      category: "master" as const,
      website: "https://www.santos.sp.gov.br",
    },
    {
      id: "2",
      name: "Instituto de Pesca",
      logo: "/logos/instituto-pesca.svg",
      category: "institutional" as const,
      website: "https://www.institutodepesca.sp.gov.br",
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
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero {...heroData} />
        <About {...aboutData} />
        <Virtual360 {...virtual360Data} />
        <Blog {...blogData} />
        <Partners {...partnersData} />
        <Location {...locationData} />
      </main>
      <Footer />
    </>
  );
}
