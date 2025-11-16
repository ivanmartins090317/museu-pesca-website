# PRD - Website Museu de Pesca de Santos

## 1. Visão Geral do Projeto

### 1.1 Objetivo

Criar um website moderno e institucional para o Museu de Pesca de Santos, inspirado no design minimalista e sofisticado do London Museum, com foco em apresentação visual impactante, acessibilidade e experiência do usuário.

### 1.2 Público-Alvo

- Visitantes locais e turistas
- Estudantes e educadores
- Pesquisadores e entusiastas de história marítima
- Famílias em busca de programação cultural

---

## 2. Stack Tecnológica

### 2.1 Framework e Linguagens

- **Framework:** Next.js 14+ (App Router)
- **Linguagem:** TypeScript
- **Styling:** Tailwind CSS
- **Componentes:** shadcn/ui
- **Tipografia:** Google Fonts - Roboto (100, 300, 400, 500, 700, 900)

### 2.2 Bibliotecas Adicionais

- `framer-motion` - Animações suaves
- `Lucide` -https://lucide.dev/icons/ - Ícones de redes sociais
- `@googlemaps/react-wrapper` - Integração Google Maps
- `next-image` - Otimização de imagens

---

## 3. Design System

### 3.1 Paleta de Cores

```typescript
const colors = {
  primary: {
    sand: "#E5C4B0", // Areia clara
    beach: "#C9A582", // Areia média
    stone: "#8B9B9B", // Pedra/concreto
    ocean: "#1A6B6B", // Oceano profundo
    aqua: "#4DB8B8", // Água tropical
  },
  neutral: {
    white: "#FFFFFF",
    black: "#0A0A0A",
    gray: {
      100: "#F5F5F5",
      200: "#E5E5E5",
      300: "#D4D4D4",
      800: "#262626",
    },
  },
};
```

### 3.2 Tipografia

```typescript
const typography = {
  fontFamily: "'Roboto', sans-serif",
  weights: {
    thin: 100,
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
    black: 900,
  },
  sizes: {
    hero: "clamp(3rem, 8vw, 6rem)", // 48-96px
    h1: "clamp(2.5rem, 6vw, 4.5rem)", // 40-72px
    h2: "clamp(2rem, 5vw, 3.5rem)", // 32-56px
    h3: "clamp(1.5rem, 4vw, 2.5rem)", // 24-40px
    body: "clamp(1rem, 2vw, 1.125rem)", // 16-18px
    small: "0.875rem", // 14px
  },
};
```

### 3.3 Espaçamento

- Sistema baseado em múltiplos de 8px
- Espaçamento generoso entre seções (120-160px)
- Whitespace estratégico para respiração visual

---

## 4. Estrutura de Seções

### 4.1 Hero Section

**Objetivo:** Impacto visual imediato e apresentação institucional

**Componentes:**

- Imagem full-width do museu ou oceano (hero image)
- Título principal: "Museu de Pesca de Santos"
- Subtitle descritivo curto
- CTA: "Visita virtual 360"

**Especificações Técnicas:**

```typescript
// Estrutura do Hero
interface HeroProps {
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
```

**Design:**

- Height: 100vh (desktop) / 80vh (mobile)
- Overlay gradient: `from-ocean/30 to-ocean/70`
- Texto em branco sobre imagem
- Animação parallax sutil no scroll

---

### 4.2 Sobre o Museu

**Objetivo:** Apresentar história, missão e relevância institucional

**Componentes:**

- Título da seção: "Sobre o Museu"
- Texto introdutório (2-3 parágrafos)
- Grid 2x2 com destaques:
  - Anos de história
  - Peças no acervo
  - Visitantes/ano
  - Área do museu
- Imagem lateral do acervo/edifício

**Especificações Técnicas:**

```typescript
interface AboutSection {
  title: string;
  description: string[];
  highlights: {
    label: string;
    value: string;
    icon?: ReactNode;
  }[];
  images: string[];
}
```

**Design:**

- Layout: 60/40 (texto/imagem) em desktop
- Background: `neutral.gray.100`
- Cards de highlight com `primary.aqua` accent
- Tipografia: Roboto Light 300 para corpo, Bold 700 para números

---

### 4.3 Visitação 360

**Objetivo:** Oferecer tour virtual imersivo

**Componentes:**

- Título: "Explore o Museu Virtualmente"
- Subtitle explicativo
- Iframe/Embed do tour 360° (Matterport, Google Tour, etc.)
- Lista de áreas disponíveis no tour
- CTA secundário: "Agende sua Visita Presencial"

**Especificações Técnicas:**

```typescript
interface Virtual360Props {
  title: string;
  embedUrl: string;
  areas: string[];
  cta: {
    label: string;
    href: string;
  };
}
```

**Design:**

- Container max-width: 1400px
- Aspect ratio 16:9 para embed
- Background: `primary.sand`
- Botões de navegação: `primary.ocean`

---

### 4.4 Conheça o Blog

**Objetivo:** Destacar conteúdo editorial e engajamento

**Componentes:**

- Título: "Histórias do Mar"
- Grid de cards de artigos (3 colunas desktop, 1 mobile)
- Cada card contém:
  - Imagem thumbnail
  - Categoria/tag
  - Título do artigo
  - Data de publicação
  - Excerpt (2 linhas)
- CTA: "Ver Todos os Artigos"

**Especificações Técnicas:**

```typescript
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: Date;
  thumbnail: string;
  slug: string;
}

interface BlogSectionProps {
  title: string;
  posts: BlogPost[];
  ctaLink: string;
}
```

**Design:**

- Cards com hover effect: elevação e scale(1.02)
- Imagens com aspect ratio 4:3
- Tag/categoria: `primary.aqua` background
- Tipografia: Roboto Medium 500 para títulos

---

### 4.5 Parceiros e Apoiadores

**Objetivo:** Reconhecer e dar visibilidade aos patrocinadores

**Componentes:**

- Título: "Quem Apoia o Museu"
- Grid de logos (responsivo)
- Divisão por categorias:
  - Patrocinadores Master
  - Apoiadores
  - Parceiros Institucionais

**Especificações Técnicas:**

```typescript
interface Partner {
  id: string;
  name: string;
  logo: string;
  category: "master" | "supporter" | "institutional";
  website?: string;
}

interface PartnersProps {
  partners: Partner[];
}
```

**Design:**

- Background: `neutral.white`
- Logos em grayscale com hover color
- Grid: 6 colunas desktop, 3 mobile
- Separadores sutis entre categorias

---

### 4.6 Localização (Google Maps)

**Objetivo:** Facilitar acesso e fornecer informações práticas

**Componentes:**

- Título: "Como Chegar"
- Google Maps embed (interativo)
- Card lateral com:
  - Endereço completo
  - Horário de funcionamento
  - Telefone/WhatsApp
  - Informações de estacionamento
  - Transporte público próximo

**Especificações Técnicas:**

```typescript
interface LocationProps {
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
```

**Design:**

- Layout 50/50 (mapa/informações)
- Mapa altura: 500px
- Card informativo: `primary.stone` background, texto branco
- Ícones: `react-icons/fa`

---

### 4.7 Footer

**Objetivo:** Navegação secundária e contato em redes sociais

**Componentes:**

- Logo do museu
- Links de navegação rápida
- Redes sociais (Instagram, Facebook, YouTube, Twitter)
- Formulário de newsletter
- Informações de copyright
- Selos/certificações

**Especificações Técnicas:**

```typescript
interface FooterProps {
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
```

**Design:**

- Background: `primary.ocean`
- Texto: `neutral.white`
- Layout: 4 colunas desktop, stack mobile
- Social icons: hover effect `primary.aqua`
- Newsletter input: borda `primary.aqua`

---

## 5. Arquitetura de Pastas

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── blog/
│   │   └── page.tsx
│   └── globals.css
├── components/
│   ├── ui/              # shadcn components
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Virtual360.tsx
│   │   ├── Blog.tsx
│   │   ├── Partners.tsx
│   │   ├── Location.tsx
│   │   └── Footer.tsx
│   └── shared/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Badge.tsx
├── lib/
│   ├── utils.ts
│   └── constants.ts
├── types/
│   └── index.ts
└── public/
    ├── images/
    └── logos/
```

---

## 6. Performance e Otimização

### 6.1 Métricas Alvo

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1
- **Lighthouse Score:** > 90

### 6.2 Estratégias

- Next.js Image Optimization para todas as imagens
- Lazy loading para seções abaixo da fold
- Font display: swap para Roboto
- Compressão de assets (WebP para imagens)
- Critical CSS inline
- Preload de recursos críticos

---

## 7. Responsividade

### 7.1 Breakpoints

```typescript
const breakpoints = {
  sm: "640px", // Mobile landscape
  md: "768px", // Tablet
  lg: "1024px", // Desktop
  xl: "1280px", // Large desktop
  "2xl": "1536px", // Extra large
};
```

### 7.2 Comportamento

- Mobile-first approach
- Hamburger menu < 1024px
- Grid adaptativo: 1 col (mobile) → 2 cols (tablet) → 3-4 cols (desktop)
- Touch-friendly buttons (min 44x44px)

---

## 8. Acessibilidade

### 8.1 Requisitos WCAG 2.1 AA

- Contraste mínimo 4.5:1 para texto
- Navegação por teclado completa
- ARIA labels em elementos interativos
- Alt text descritivo em imagens
- Focus indicators visíveis
- HTML semântico

### 8.2 Implementação

```typescript
// Exemplo de componente acessível
<button
  aria-label="Abrir menu de navegação"
  className="focus:ring-2 focus:ring-aqua"
  onClick={toggleMenu}
>
  <MenuIcon aria-hidden="true" />
</button>
```

---

## 9. Animações e Interações

### 9.1 Princípios

- Subtle não overwhelming
- Performance-first (GPU acceleration)
- Respeitam `prefers-reduced-motion`

### 9.2 Exemplos

```typescript
// Hero parallax
const y = useTransform(scrollY, [0, 500], [0, 150]);

// Card hover
className="transition-all duration-300 hover:scale-102 hover:shadow-xl"

// Fade in on scroll
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
```

---

## 10. Integrações

### 10.1 Google Maps

```typescript
import { GoogleMap, Marker } from "@react-google-maps/api";

const mapOptions = {
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
};
```

### 10.2 Newsletter (Future)

- Integração com Mailchimp/SendGrid
- Validação de email client-side
- Double opt-in

### 10.3 Analytics

- Google Analytics 4
- Hotjar para heatmaps
- Event tracking em CTAs

---

## 11. Conteúdo de Exemplo

### 11.1 Textos Sugeridos

**Hero:**

- Título: "Museu de Pesca de Santos"
- Subtitle: "Preservando a história marítima brasileira desde 1934"

**Sobre:**
"O Museu de Pesca de Santos é uma instituição centenária dedicada à preservação da memória da pesca e da cultura marítima brasileira. Localizado em um edifício histórico na Ponta da Praia, o museu abriga um acervo de mais de 2.000 peças..."

**Blog Posts Exemplo:**

1. "A História do Tubarão-Baleia do Museu"
2. "Técnicas Tradicionais de Pesca Artesanal"
3. "Expedição Científica: Descobertas no Litoral Paulista"

---

## 12. Cronograma de Desenvolvimento

### Fase 1 - Setup (Semana 1)

- Configuração do projeto Next.js
- Instalação de dependências
- Setup do Design System com Tailwind
- Configuração do shadcn/ui

### Fase 2 - Componentes Base (Semana 2)

- Criação de componentes UI reutilizáveis
- Implementação da tipografia e cores
- Desenvolvimento de Cards, Buttons, Badges

### Fase 3 - Seções (Semanas 3-4)

- Hero Section
- Sobre o Museu
- Visitação 360
- Blog Section

### Fase 4 - Integrações (Semana 5)

- Google Maps
- Parceiros e Apoiadores
- Footer com newsletter
- Otimização de performance

### Fase 5 - Testes e Deploy (Semana 6)

- Testes de responsividade
- Auditoria de acessibilidade
- Testes de performance
- Deploy em Vercel

---

## 13. Critérios de Sucesso

### 13.1 Técnicos

- ✅ 100% TypeScript type-safe
- ✅ Lighthouse score > 90 em todas as categorias
- ✅ Zero erros de acessibilidade (WAVE)
- ✅ Mobile-responsive em todos os breakpoints

### 13.2 UX

- ✅ Tempo de carregamento < 3s
- ✅ Taxa de rejeição < 40%
- ✅ Tempo médio na página > 2min
- ✅ Feedback positivo em testes de usuário

---

## 14. Manutenção e Escalabilidade

### 14.1 CMS (Futuro)

- Considerar integração com Strapi ou Contentful
- Permitir atualização de conteúdo sem código
- Preview de mudanças antes de publicar

### 14.2 Multilíngue (Futuro)

- Suporte a PT-BR, EN, ES
- next-i18next para internacionalização
- URLs localizadas

---

## 15. Referências de Design

### 15.1 Inspirações

- London Museum (minimalismo institucional)
- Museu do Amanhã (interatividade)
- Rijksmuseum (navegação clara)

### 15.2 Princípios Aplicados

- **Clareza:** Hierarquia visual óbvia
- **Respiração:** Whitespace generoso
- **Impacto:** Tipografia como elemento visual dominante
- **Acessibilidade:** Design para todos
- **Naturalidade:** Cores inspiradas no ambiente marítimo

---

**Documento criado para:** Museu de Pesca de Santos  
**Data:** Novembro 2025  
**Versão:** 1.0
