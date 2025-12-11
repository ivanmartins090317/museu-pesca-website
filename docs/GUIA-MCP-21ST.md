# Guia de Uso do MCP 21st.dev

## 📋 Visão Geral

O MCP 21st.dev oferece 4 ferramentas principais para acelerar o desenvolvimento de componentes UI no projeto Museu da Pesca.

---

## 🛠️ Ferramentas Disponíveis

### 1. **Component Builder** (`21st_magic_component_builder`)
**Quando usar:** Para criar componentes UI novos do zero.

**Exemplos de uso:**
- "Crie um componente de card de notícia para a seção Blog"
- "Preciso de um modal de confirmação"
- "Crie um componente de formulário de contato"
- "Faça um componente de galeria de imagens"

**Como usar:**
```
Use o MCP 21st.dev para criar um componente [nome do componente] que [descrição da funcionalidade]
```

**Exemplo prático:**
```
Use o MCP 21st.dev para criar um componente de card de exposição que mostra imagem, título, descrição e botão "Saiba mais"
```

---

### 2. **Component Inspiration** (`21st_magic_component_inspiration`)
**Quando usar:** Para buscar inspiração ou ver exemplos de componentes existentes na biblioteca 21st.dev.

**Exemplos de uso:**
- "Mostre exemplos de cards de produtos"
- "Preciso de inspiração para um hero section moderno"
- "Quero ver exemplos de formulários de contato"
- "Mostre componentes de timeline"

**Como usar:**
```
Use o MCP 21st.dev para buscar inspiração de [tipo de componente]
```

**Exemplo prático:**
```
Use o MCP 21st.dev para buscar inspiração de cards de notícias com imagem
```

---

### 3. **Component Refiner** (`21st_magic_component_refiner`)
**Quando usar:** Para melhorar, refinar ou redesenhar componentes existentes no projeto.

**Exemplos de uso:**
- "Melhore o design do componente Hero"
- "Refine o componente About para ficar mais moderno"
- "Melhore a responsividade do componente Partners"
- "Redesenhe o componente Location com melhor UX"

**Como usar:**
```
Use o MCP 21st.dev para refinar o componente [nome do arquivo] melhorando [aspectos específicos]
```

**Exemplo prático:**
```
Use o MCP 21st.dev para refinar o componente Hero.tsx melhorando a animação e responsividade
```

---

### 4. **Logo Search** (`logo_search`)
**Quando usar:** Para buscar e adicionar logos de empresas, marcas ou instituições.

**Exemplos de uso:**
- "Adicione o logo do Instituto Pesca"
- "Busque logos dos parceiros: Aquário, Museu do Café, Pinacoteca"
- "Adicione logo da Prefeitura de Santos"
- "Busque logo do CNPq"

**Como usar:**
```
Use o MCP 21st.dev para buscar o logo da [empresa/instituição]
```

**Exemplo prático:**
```
Use o MCP 21st.dev para buscar logos: instituto pesca, prefeitura santos, cnpq
```

---

## 🎯 Fluxo de Trabalho Recomendado

### Cenário 1: Criar um Novo Componente
1. **Buscar inspiração** (opcional): Use `component_inspiration` para ver exemplos
2. **Criar componente**: Use `component_builder` com descrição detalhada
3. **Integrar no projeto**: Adapte o código gerado ao padrão do projeto
4. **Refinar se necessário**: Use `component_refiner` para ajustes finos

### Cenário 2: Melhorar Componente Existente
1. **Analisar componente atual**: Leia o arquivo do componente
2. **Refinar**: Use `component_refiner` com contexto específico
3. **Testar e ajustar**: Faça ajustes manuais se necessário

### Cenário 3: Adicionar Logos
1. **Buscar logo**: Use `logo_search` com nome da empresa
2. **Escolher formato**: TSX (recomendado), JSX ou SVG
3. **Integrar**: Adicione o componente no projeto

---

## 💡 Dicas e Boas Práticas

### ✅ Faça
- **Seja específico**: Quanto mais detalhes, melhor o resultado
- **Mencione o contexto**: "componente para seção de exposições do museu"
- **Especifique requisitos**: "responsivo, com animações suaves, usando Tailwind"
- **Use após gerar**: Sempre revise e adapte o código ao padrão do projeto

### ❌ Evite
- **Pedidos muito genéricos**: "crie um card" (muito vago)
- **Ignorar padrões do projeto**: Sempre adapte ao estilo existente
- **Usar sem revisar**: O código gerado precisa ser integrado ao projeto

---

## 📝 Exemplos Práticos para o Projeto

### Exemplo 1: Criar Card de Exposição
```
Use o MCP 21st.dev para criar um componente CardExposicao que:
- Mostra imagem da exposição
- Título e descrição curta
- Data de início e fim
- Botão "Ver detalhes"
- Design moderno com hover effects
- Totalmente responsivo
```

### Exemplo 2: Melhorar Seção About
```
Use o MCP 21st.dev para refinar o componente About.tsx melhorando:
- Layout mais moderno e espaçado
- Melhor hierarquia visual
- Animações mais suaves
- Melhor responsividade mobile
```

### Exemplo 3: Buscar Logos de Parceiros
```
Use o MCP 21st.dev para buscar logos em formato TSX:
- Aquário de Santos
- Museu do Café
- Pinacoteca de Santos
- CNPq
```

---

## 🔄 Integração com Padrões do Projeto

Após usar o MCP 21st.dev, sempre:

1. **Revisar estrutura**: Garantir que segue o padrão do projeto
2. **Ajustar imports**: Usar paths do projeto (`@/components/...`)
3. **Aplicar design system**: Usar cores e estilos do `globals.css`
4. **Adicionar animações**: Integrar com `lib/animations.ts` se necessário
5. **Testar responsividade**: Verificar mobile-first
6. **Otimizar performance**: Usar Next.js Image, lazy loading, etc.

---

## 📚 Recursos Adicionais

- **Documentação 21st.dev**: https://21st.dev
- **Biblioteca de componentes**: Explore componentes prontos
- **Padrões do projeto**: Consulte `.cursor/agents/` e `docs/`

---

**Última atualização:** 2025-01-XX  
**Responsável:** Equipe Técnica

