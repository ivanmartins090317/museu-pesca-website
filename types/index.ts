export interface HeroProps {
  title: string;
  subtitle: string;
  badge: {
    text: string;
    variant: "info" | "highlight";
  };
  cta: {
    label: string;
    href: string;
  };
  backgroundImage: string;
}

export interface AboutSection {
  title: string;
  description: string[];
  highlights: {
    label: string;
    value: string;
    icon?: React.ReactNode;
  }[];
  images: string[];
}

export interface Virtual360Props {
  title: string;
  embedUrl: string;
  areas: string[];
  images: string[];
  cta: {
    label: string;
    href: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: Date;
  thumbnail: string;
  slug: string;
}

export interface BlogSectionProps {
  title: string;
  posts: BlogPost[];
  ctaLink: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  category: "master" | "supporter" | "institutional";
  website?: string;
}

export interface PartnersProps {
  partners: Partner[];
}

export interface LocationProps {
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  hours: {
    weekday: string;
    weekend: string;
  };
  contact: {
    phone: string;
    whatsapp?: string;
  };
  parkingInfo: string;
  publicTransport: string[];
}

export interface FooterProps {
  logo: string;
  navigation: {
    label: string;
    href: string;
  }[];
  socialMedia: {
    platform: "instagram" | "facebook" | "youtube" | "twitter";
    url: string;
  }[];
  newsletter: {
    placeholder: string;
    submitLabel: string;
  };
}

