# Museu de Pesca de Santos - Website Institucional

Website moderno e institucional para o Museu de Pesca de Santos, inspirado no design minimalista e sofisticado do London Museum.

## 🚀 Tecnologias

- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (Animações)
- **shadcn/ui** (Componentes)
- **Lucide React** (Ícones)

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=sua_chave_aqui
```

Para obter uma chave da API do Google Maps:
1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a API "Maps Embed API"
4. Crie uma credencial (API Key)
5. Adicione a chave no arquivo `.env.local`

## 📁 Estrutura do Projeto

```
├── app/
│   ├── layout.tsx          # Layout raiz
│   ├── page.tsx            # Página inicial
│   └── globals.css         # Estilos globais
├── components/
│   ├── sections/           # Seções da landing page
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Virtual360.tsx
│   │   ├── Blog.tsx
│   │   ├── Partners.tsx
│   │   └── Location.tsx
│   ├── shared/             # Componentes compartilhados
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── ui/                 # Componentes base (shadcn)
│       ├── button.tsx
│       ├── card.tsx
│       └── badge.tsx
├── lib/
│   ├── animations.ts       # Variantes de animação
│   ├── constants.ts        # Constantes do site
│   ├── utils.ts            # Utilitários
│   └── hooks/
│       └── useReducedMotion.ts
└── types/
    └── index.ts            # Tipos TypeScript
```

## 🎨 Design System

### Cores

- **Primary Sand**: `#E5C4B0`
- **Primary Beach**: `#C9A582`
- **Primary Stone**: `#8B9B9B`
- **Primary Ocean**: `#1A6B6B`
- **Primary Aqua**: `#4DB8B8`

### Tipografia

- **Fonte**: Roboto (100, 300, 400, 500, 700, 900)
- **Tamanhos**: Responsivos com `clamp()`

## 🖼️ Imagens

As imagens devem ser adicionadas na pasta `public/images/`:

- `hero-museu.jpg` - Imagem do hero
- `museu-exterior.jpg` - Exterior do museu
- `museu-interior.jpg` - Interior do museu
- `blog-tubarao.jpg` - Imagem do blog
- `blog-pesca-artesanal.jpg` - Imagem do blog
- `blog-expedicao.jpg` - Imagem do blog

Logos dos parceiros devem ser adicionados em `public/logos/`.

## ♿ Acessibilidade

- ✅ Suporte a `prefers-reduced-motion`
- ✅ Navegação por teclado
- ✅ ARIA labels
- ✅ Contraste WCAG AA
- ✅ HTML semântico

## 🎬 Animações

Todas as animações respeitam `prefers-reduced-motion` e são otimizadas para performance:

- Animações de entrada (fade-in, slide-up)
- Animações de scroll (reveal on scroll)
- Micro-interações em botões e cards
- Parallax sutil no hero

## 📱 Responsividade

- **Mobile First**: Design começa pelo mobile
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **Touch Targets**: Mínimo 44x44px

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outros Provedores

O projeto pode ser deployado em qualquer plataforma que suporte Next.js:
- Netlify
- AWS Amplify
- Railway
- etc.

## 📝 Licença

Este projeto foi desenvolvido para o Museu de Pesca de Santos.

## 🤝 Contribuindo

Para contribuir com o projeto, siga as convenções de código estabelecidas e use os fluxos documentados em `.cursor/fluxos/`.

