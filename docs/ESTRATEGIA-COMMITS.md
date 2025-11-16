# Estratégia de Commits - Museu de Pesca

## 📋 Visão Geral

Este documento detalha a estratégia de commits atômicos para o primeiro commit do projeto Museu de Pesca de Santos, seguindo rigorosamente o padrão **Conventional Commits**.

**Data de criação:** 16 de Novembro de 2025  
**Responsável:** Sistema de Commits Automatizado  
**Padrão:** Conventional Commits 1.0.0

---

## 🎯 Objetivo

Organizar todo o código desenvolvido até o momento em commits atômicos, lógicos e bem estruturados, facilitando:

- Histórico de desenvolvimento claro e rastreável
- Geração automática de changelogs
- Code review eficiente
- Reversão de mudanças específicas quando necessário
- Versionamento semântico automatizado

---

## 📦 Análise do Projeto

### Estrutura Atual

```
museu-pesca/
├── app/                          # Next.js App Router
│   ├── globals.css              # Estilos globais + design system
│   ├── layout.tsx               # Layout raiz com fontes
│   └── page.tsx                 # Página inicial com todas as seções
├── components/
│   ├── sections/                # Seções da landing page
│   │   ├── About.tsx           # Seção sobre o museu
│   │   ├── Blog.tsx            # Seção de blog/notícias
│   │   ├── Hero.tsx            # Seção hero com vídeo
│   │   ├── Location.tsx        # Seção de localização
│   │   ├── Partners.tsx        # Seção de parceiros
│   │   └── Virtual360.tsx      # Seção de tour virtual
│   ├── shared/                  # Componentes compartilhados
│   │   ├── Footer.tsx          # Rodapé
│   │   └── Header.tsx          # Cabeçalho/navbar
│   └── ui/                      # Componentes base (shadcn)
│       ├── badge.tsx           # Componente Badge
│       ├── button.tsx          # Componente Button
│       ├── card.tsx            # Componente Card
│       └── scroll-expansion-hero.tsx  # Animação de hero
├── lib/
│   ├── animations.ts           # Variantes de animação Framer Motion
│   ├── constants.ts            # Constantes do site
│   ├── utils.ts                # Utilitários (cn)
│   └── hooks/
│       └── useReducedMotion.ts # Hook de acessibilidade
├── types/
│   └── index.ts                # Tipos TypeScript do projeto
├── public/
│   ├── images/                 # Imagens do site
│   ├── logos/                  # Logos de parceiros
│   └── video/                  # Vídeos
├── docs/
│   └── PRD-Projeto.md         # Documento de requisitos
└── [arquivos de configuração]
```

### Tecnologias Utilizadas

- **Framework:** Next.js 14+ (App Router)
- **Linguagem:** TypeScript (strict mode)
- **Estilo:** Tailwind CSS + Design System customizado
- **Componentes:** shadcn/ui
- **Animações:** Framer Motion
- **Ícones:** Lucide React

---

## 🔄 Estratégia de Commits (16 commits)

### Commit 1: Configuration Setup

```bash
chore(config): setup Next.js project configuration

Add base configuration files for the project:
- TypeScript config with strict mode and path aliases
- ESLint config for Next.js
- PostCSS config for Tailwind
- Next.js config
- .gitignore with rules for Next.js and TypeScript
```

**Arquivos:**

- `.gitignore`
- `.eslintrc.json`
- `next.config.js`
- `postcss.config.js`
- `tsconfig.json`

---

### Commit 2: Dependencies

```bash
chore(deps): add project dependencies

Install main dependencies:
- next, react, react-dom (framework)
- typescript, @types/* (typing)
- tailwindcss, autoprefixer, postcss (styling)
- framer-motion (animations)
- lucide-react (icons)
- shadcn/ui utilities (class-variance-authority, clsx, tailwind-merge)
```

**Arquivos:**

- `package.json`
- `package-lock.json`

---

### Commit 3: Design System

```bash
feat(config): setup Tailwind CSS and design system

Implement museum's design system:
- Maritime color palette (sand, beach, stone, ocean, aqua)
- Responsive typography system with clamp()
- Roboto font with multiple weights
- Custom spacing for sections
- CSS reset and global variables
```

**Arquivos:**

- `tailwind.config.ts`
- `app/globals.css`

---

### Commit 4: TypeScript Types

```bash
feat(types): define TypeScript interfaces and types

Add type definitions for:
- Hero section props
- About section with highlights
- Virtual 360 tour
- Blog posts and articles
- Partners and supporters
- Location and contact information
- Footer navigation and social media
```

**Arquivos:**

- `types/index.ts`

---

### Commit 5: Utilities and Animations

```bash
feat(lib): implement utilities and animation system

Add core utilities:
- cn() utility for className merging (Tailwind + clsx)
- Site-wide constants (metadata, navigation, social links)
- Framer Motion animation variants (fade-in, slide-up, scale)
- useReducedMotion hook for accessibility (prefers-reduced-motion)
```

**Arquivos:**

- `lib/utils.ts`
- `lib/constants.ts`
- `lib/animations.ts`
- `lib/hooks/useReducedMotion.ts`

---

### Commit 6: UI Components

```bash
feat(ui): add base shadcn/ui components

Implement reusable UI components:
- Button with multiple variants (default, outline, ghost)
- Card with header, content, footer structure
- Badge for labels and tags
- ScrollExpansionHero for hero animation effects

All components are accessible and follow shadcn/ui patterns.
```

**Arquivos:**

- `components/ui/button.tsx`
- `components/ui/card.tsx`
- `components/ui/badge.tsx`
- `components/ui/scroll-expansion-hero.tsx`

---

### Commit 7: Shared Components

```bash
feat(components): implement Header and Footer

Add shared layout components:
- Responsive Header with mobile menu and navigation
- Sticky header with scroll behavior
- Footer with multiple sections (about, navigation, contact)
- Social media links and newsletter form
- Accessibility features (ARIA labels, keyboard navigation)
```

**Arquivos:**

- `components/shared/Header.tsx`
- `components/shared/Footer.tsx`

---

### Commit 8: Hero Section

```bash
feat(sections): implement Hero section

Add landing page hero:
- Full-screen video background
- Animated title and subtitle
- Call-to-action button
- Scroll indicator with animation
- Responsive design (mobile-first)
- Framer Motion entrance animations
```

**Arquivos:**

- `components/sections/Hero.tsx`

---

### Commit 9: About Section

```bash
feat(sections): implement About section

Add museum information section:
- Introduction text with museum history
- 2-column layout (text + image)
- Highlight cards with statistics (4 metrics)
- Animated on scroll reveal
- Responsive grid layout
```

**Arquivos:**

- `components/sections/About.tsx`

---

### Commit 10: Virtual Tour Section

```bash
feat(sections): implement Virtual360 section

Add virtual tour section:
- 360° tour embed placeholder
- List of available areas to explore
- Call-to-action for in-person visit
- Responsive iframe container
- Loading state handling
```

**Arquivos:**

- `components/sections/Virtual360.tsx`

---

### Commit 11: Blog Section

```bash
feat(sections): implement Blog section

Add blog/news section:
- Grid layout for blog posts (3 columns)
- Post cards with image, title, excerpt, category
- Date formatting
- Hover effects and animations
- Link to full blog page
- Responsive design (1-3 columns based on screen size)
```

**Arquivos:**

- `components/sections/Blog.tsx`

---

### Commit 12: Partners Section

```bash
feat(sections): implement Partners section

Add supporters and partners section:
- Grid layout for partner logos
- Category-based grouping (master, institutional)
- Grayscale logos with hover color effect
- Responsive grid (2-6 columns)
- External links to partner websites
```

**Arquivos:**

- `components/sections/Partners.tsx`

---

### Commit 13: Location Section

```bash
feat(sections): implement Location section

Add location and contact information:
- Google Maps embed placeholder
- Address and contact details
- Operating hours
- Parking information
- Public transportation options
- 2-column layout (map + info)
- Click-to-call and WhatsApp links
```

**Arquivos:**

- `components/sections/Location.tsx`

---

### Commit 14: App Layout and Page

```bash
feat(app): setup layout and landing page

Configure Next.js app:
- Root layout with metadata and fonts (Roboto)
- Landing page composition with all sections
- Mock data for all sections (to be replaced by CMS)
- Proper section ordering and spacing
- SEO metadata configuration
```

**Arquivos:**

- `app/layout.tsx`
- `app/page.tsx`

---

### Commit 15: Documentation

```bash
docs: add project documentation and PRD

Add comprehensive project documentation:
- Product Requirements Document (PRD)
- README with setup instructions
- Technology stack documentation
- Design system guidelines
- Folder structure explanation
- Deployment instructions
- Accessibility features documentation
```

**Arquivos:**

- `docs/PRD-Projeto.md`
- `README.md`

---

### Commit 16: Assets

```bash
chore(assets): add images and visual resources

Add project assets:
- Museum images and photographs
- Partner logos (Prefeitura Santos, Instituto de Pesca)
- SVG graphics and dividers
- Hero video file
- Optimized images for web (WebP when possible)
```

**Arquivos:**

- `public/images/*`
- `public/logos/*`
- `public/video/*`

---

## 📝 Comandos para Executar

### Executar todos os commits em sequência:

```bash
# 1. Configuration
git add .gitignore .eslintrc.json next.config.js postcss.config.js tsconfig.json
git commit -m "chore(config): setup Next.js project configuration

Add base configuration files for the project:
- TypeScript config with strict mode and path aliases
- ESLint config for Next.js
- PostCSS config for Tailwind
- Next.js config
- .gitignore with rules for Next.js and TypeScript"

# 2. Dependencies
git add package.json package-lock.json
git commit -m "chore(deps): add project dependencies

Install main dependencies:
- next, react, react-dom (framework)
- typescript, @types/* (typing)
- tailwindcss, autoprefixer, postcss (styling)
- framer-motion (animations)
- lucide-react (icons)
- shadcn/ui utilities (class-variance-authority, clsx, tailwind-merge)"

# 3. Design System
git add tailwind.config.ts app/globals.css
git commit -m "feat(config): setup Tailwind CSS and design system

Implement museum's design system:
- Maritime color palette (sand, beach, stone, ocean, aqua)
- Responsive typography system with clamp()
- Roboto font with multiple weights
- Custom spacing for sections
- CSS reset and global variables"

# 4. Types
git add types/
git commit -m "feat(types): define TypeScript interfaces and types

Add type definitions for:
- Hero section props
- About section with highlights
- Virtual 360 tour
- Blog posts and articles
- Partners and supporters
- Location and contact information
- Footer navigation and social media"

# 5. Utilities
git add lib/
git commit -m "feat(lib): implement utilities and animation system

Add core utilities:
- cn() utility for className merging (Tailwind + clsx)
- Site-wide constants (metadata, navigation, social links)
- Framer Motion animation variants (fade-in, slide-up, scale)
- useReducedMotion hook for accessibility (prefers-reduced-motion)"

# 6. UI Components
git add components/ui/
git commit -m "feat(ui): add base shadcn/ui components

Implement reusable UI components:
- Button with multiple variants (default, outline, ghost)
- Card with header, content, footer structure
- Badge for labels and tags
- ScrollExpansionHero for hero animation effects

All components are accessible and follow shadcn/ui patterns."

# 7. Shared Components
git add components/shared/
git commit -m "feat(components): implement Header and Footer

Add shared layout components:
- Responsive Header with mobile menu and navigation
- Sticky header with scroll behavior
- Footer with multiple sections (about, navigation, contact)
- Social media links and newsletter form
- Accessibility features (ARIA labels, keyboard navigation)"

# 8. Hero Section
git add components/sections/Hero.tsx
git commit -m "feat(sections): implement Hero section

Add landing page hero:
- Full-screen video background
- Animated title and subtitle
- Call-to-action button
- Scroll indicator with animation
- Responsive design (mobile-first)
- Framer Motion entrance animations"

# 9. About Section
git add components/sections/About.tsx
git commit -m "feat(sections): implement About section

Add museum information section:
- Introduction text with museum history
- 2-column layout (text + image)
- Highlight cards with statistics (4 metrics)
- Animated on scroll reveal
- Responsive grid layout"

# 10. Virtual360 Section
git add components/sections/Virtual360.tsx
git commit -m "feat(sections): implement Virtual360 section

Add virtual tour section:
- 360° tour embed placeholder
- List of available areas to explore
- Call-to-action for in-person visit
- Responsive iframe container
- Loading state handling"

# 11. Blog Section
git add components/sections/Blog.tsx
git commit -m "feat(sections): implement Blog section

Add blog/news section:
- Grid layout for blog posts (3 columns)
- Post cards with image, title, excerpt, category
- Date formatting
- Hover effects and animations
- Link to full blog page
- Responsive design (1-3 columns based on screen size)"

# 12. Partners Section
git add components/sections/Partners.tsx
git commit -m "feat(sections): implement Partners section

Add supporters and partners section:
- Grid layout for partner logos
- Category-based grouping (master, institutional)
- Grayscale logos with hover color effect
- Responsive grid (2-6 columns)
- External links to partner websites"

# 13. Location Section
git add components/sections/Location.tsx
git commit -m "feat(sections): implement Location section

Add location and contact information:
- Google Maps embed placeholder
- Address and contact details
- Operating hours
- Parking information
- Public transportation options
- 2-column layout (map + info)
- Click-to-call and WhatsApp links"

# 14. App Setup
git add app/
git commit -m "feat(app): setup layout and landing page

Configure Next.js app:
- Root layout with metadata and fonts (Roboto)
- Landing page composition with all sections
- Mock data for all sections (to be replaced by CMS)
- Proper section ordering and spacing
- SEO metadata configuration"

# 15. Documentation
git add docs/ README.md
git commit -m "docs: add project documentation and PRD

Add comprehensive project documentation:
- Product Requirements Document (PRD)
- README with setup instructions
- Technology stack documentation
- Design system guidelines
- Folder structure explanation
- Deployment instructions
- Accessibility features documentation"

# 16. Assets
git add public/
git commit -m "chore(assets): add images and visual resources

Add project assets:
- Museum images and photographs
- Partner logos (Prefeitura Santos, Instituto de Pesca)
- SVG graphics and dividers
- Hero video file
- Optimized images for web (WebP when possible)"
```

---

## ✅ Validação dos Commits

Cada commit segue as regras do Conventional Commits:

### Formato Válido

```
<type>(<scope>): <subject>

<body>
```

### Tipos Utilizados

- ✅ **chore**: Tarefas de manutenção (config, deps, assets)
- ✅ **feat**: Novas funcionalidades (sections, components, ui)
- ✅ **docs**: Documentação

### Scopes Utilizados

- ✅ **config**: Arquivos de configuração
- ✅ **deps**: Dependências
- ✅ **types**: Tipos TypeScript
- ✅ **lib**: Utilitários e bibliotecas
- ✅ **ui**: Componentes UI base
- ✅ **components**: Componentes compartilhados
- ✅ **sections**: Seções da página
- ✅ **app**: Configuração do app Next.js
- ✅ **assets**: Recursos visuais

### Regras Seguidas

- ✅ Subject em inglês
- ✅ Subject no imperativo
- ✅ Subject sem ponto final
- ✅ Subject com menos de 50 caracteres
- ✅ Body explicativo quando necessário
- ✅ Commits atômicos (uma responsabilidade por commit)
- ✅ Ordem lógica de dependências

---

## 🎯 Benefícios da Estratégia

### 1. Rastreabilidade

Cada commit tem um propósito claro e pode ser rastreado individualmente.

### 2. Reversibilidade

É possível reverter mudanças específicas sem afetar outras partes do código.

### 3. Code Review

Facilita a revisão de código, pois cada commit é focado em uma área.

### 4. Changelog Automático

Commits seguem Conventional Commits, permitindo geração automática de changelogs.

### 5. Versionamento Semântico

Tipos de commit (feat, fix, BREAKING CHANGE) permitem versionamento automático.

### 6. Histórico Limpo

Git log fica organizado e profissional:

```
* chore(assets): add images and visual resources
* docs: add project documentation and PRD
* feat(app): setup layout and landing page
* feat(sections): implement Location section
* feat(sections): implement Partners section
* feat(sections): implement Blog section
* feat(sections): implement Virtual360 section
* feat(sections): implement About section
* feat(sections): implement Hero section
* feat(components): implement Header and Footer
* feat(ui): add base shadcn/ui components
* feat(lib): implement utilities and animation system
* feat(types): define TypeScript interfaces and types
* feat(config): setup Tailwind CSS and design system
* chore(deps): add project dependencies
* chore(config): setup Next.js project configuration
```

---

## 📊 Estatísticas do Projeto

### Arquivos por Categoria

- **Configuração:** 5 arquivos
- **Dependências:** 2 arquivos
- **Types:** 1 arquivo
- **Lib/Utils:** 4 arquivos
- **UI Components:** 4 arquivos
- **Shared Components:** 2 arquivos
- **Sections:** 6 arquivos
- **App:** 3 arquivos
- **Documentação:** 2 arquivos
- **Assets:** ~10 arquivos

**Total:** ~39 arquivos (excluindo node_modules)

### Tecnologias

- **Next.js 14+** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS** (design system customizado)
- **Framer Motion** (animações suaves)
- **shadcn/ui** (componentes acessíveis)
- **Lucide React** (ícones)

---

## 🚀 Próximos Passos

Após realizar os commits:

1. **Verificar histórico:**

   ```bash
   git log --oneline --graph
   ```

2. **Criar branch de desenvolvimento:**

   ```bash
   git checkout -b develop
   ```

3. **Configurar hooks de commit:**

   - Instalar Husky
   - Configurar commitlint
   - Adicionar pre-commit hooks

4. **Push para repositório remoto:**

   ```bash
   git remote add origin <url>
   git push -u origin master
   ```

5. **Configurar CI/CD:**
   - GitHub Actions ou Vercel
   - Testes automatizados
   - Deploy automático

---

## 📚 Referências

- **Conventional Commits:** https://www.conventionalcommits.org/
- **Semantic Versioning:** https://semver.org/
- **Git Best Practices:** https://cbea.ms/git-commit/
- **Next.js Documentation:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs

---

**Documento criado em:** 16 de Novembro de 2025  
**Última atualização:** 16 de Novembro de 2025  
**Versão:** 1.0  
**Status:** ✅ Pronto para execução
