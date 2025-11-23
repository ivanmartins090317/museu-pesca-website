export const siteConfig = {
  name: "Museu de Pesca de Santos",
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
    url: "https://instagram.com/museupescasantos",
    label: "Instagram",
  },
  {
    platform: "facebook" as const,
    url: "https://facebook.com/museupescasantos",
    label: "Facebook",
  },
  {
    platform: "youtube" as const,
    url: "https://youtube.com/@museupescasantos",
    label: "YouTube",
  },
  {
    platform: "twitter" as const,
    url: "https://twitter.com/museupescasantos",
    label: "Twitter",
  },
];

export const ANIMATION_DELAYS = {
  highlights: 0.2,
  highlightCard: 0.3,
  highlightCardStagger: 0.1,
  images: 0.6,
  imageStagger: 0.1,
} as const;

