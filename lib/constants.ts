export const siteConfig = {
  name: "Museu de Pesca",
  description: "Preservando a história marítima brasileira desde 1934",
  url: "https://museu-pesca-santos.com.br",
};

export const navigation = [
  { label: "Sobre", href: "#sobre" },
  { label: "Visitação 360", href: "#visita-360" },
  { label: "Blog", href: "#blog" },
  { label: "Localização", href: "#localizacao" },
];

export const socialMedia = [
  {
    platform: "instagram" as const,
    url: "https://instagram.com/museu_de_pesca",
    label: "Instagram",
  },
  {
    platform: "facebook" as const,
    url: "https://www.facebook.com/museudepescaoficial",
    label: "Facebook",
  },
  {
    platform: "youtube" as const,
    url: "https://www.youtube.com/watch?v=hAq4oAeLlEk&amp;list=PLyCx5sbEDbxtYnMKOI3ubVbyR4924YkML",
    label: "YouTube",
  },
];

export const ANIMATION_DELAYS = {
  highlights: 0.2,
  highlightCard: 0.3,
  highlightCardStagger: 0.1,
  images: 0.6,
  imageStagger: 0.1,
} as const;
