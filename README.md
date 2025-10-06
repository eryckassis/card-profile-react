# Card Profile React — Profile Card com Animações (GSAP)

Um profile card elegante (modo claro/escuro) com interação de “seguir” e um cursor personalizado que acompanha o mouse, construído em React com foco em Clean Code, SOLID e boas práticas de arquitetura. O objetivo vai além de entregar o resultado visual: documentar decisões, erros corrigidos e aprendizados que podem ser aplicados em projetos reais.


<table align="center" width="100%" style="margin: 0 auto;">
  <tr>
    <td style="border: 3px solid #00ffc8; border-radius: 10px; padding: 8px; background: #111;">
    
    
  </tr>
<img src="https://i.postimg.cc/3JrhZJGy/Screenshot-2025-10-05-202127.png" alt="GIF 1" style="display: block; margin: 0 auto; border-radius:8px; max-width:100%;">



https://github.com/user-attachments/assets/35ff9933-7652-4b2f-b715-b2e922673472




## Visão Geral

- Componente de card de perfil (CardProfile).
- Botão “Seguir/Unfollow” com estado local e acessível.
- Ícones via Font Awesome.
- Cursor animado (MouseFollow) com GSAP, focado em performance e suavidade.
- Estrutura de pastas pensada para escalabilidade (feature-based/components-first).
- Boas práticas de semântica HTML e acessibilidade (ARIA, alt, landmarks).

## Como rodar

> Requisitos: Node LTS (18+) e npm ou pnpm/yarn.

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build de produção
npm run build

# (Opcional) Pré-visualização do build
npm run preview
```

Se estiver usando Vite (comum em projetos React recentes), os scripts acima já funcionam. Adapte conforme seu bundler.

## Estrutura de Pastas (resumo bem básico)

```text
src/
	components/
		Card/
			Card.jsx              # Componente de apresentação do card
		MouseFollow.jsx         # Cursor animado (GSAP)
	styles/
		App.css                 # Estilos globais da aplicação
	App.jsx                   # Composição de páginas/feature
	main.jsx                  # Ponto de entrada (ReactDOM)
```

A organização é “component-first” (por reuso e manutenibilidade). Para escalar, recomendo migrar para um arranjo por features/domínios (Feature-based) quando houver mais funcionalidades:

```text
src/
	assets/
	components/
	features/
		user-card/
			components/
			hooks/
			index.tsx
	hooks/
	services/
	styles/
	App.jsx
	main.jsx
```

## Componentes principais

### CardProfile

- Responsabilidade única (SRP): renderizar dados do perfil e expor um callback para alternar “seguir”.
- Aberto para extensão (OCP) via props: `name`, `description`, `followers`, `dark`, `imageSource`, `isFollowing`, `onToggle`.
- Acessível: usa semântica HTML (article, header, footer), `alt` na imagem, e botão real com `type="button"`.

Uso simplificado no `App.jsx`:

```jsx
{
  cards.map((cardData, cardIndex) => (
    <CardProfile
      key={cardIndex}
      {...cardData}
      isFollowing={isFollowing[cardIndex]}
      onToggle={() => handleToggleFollow(cardIndex)}
    />
  ));
}
```

### MouseFollow (GSAP)

- Segue o mouse com uma animação suave.
- Implementado sem jQuery, usando `useRef` e `useEffect` (DIP: desacoplado do DOM global).
- Suporte a personalizações via props: `size`, `color`, `duration`/`ease` ou `follow` (LERP), `enabled` e `zIndex`.

Uso sugerido:

```jsx
import MouseFollow from "./components/MouseFollow";

<MouseFollow size={60} color="#fff" />;
```

Para esconder o cursor nativo e deixar só a bolinha:

```css
body {
  cursor: none;
}
```

## Bibliotecas utilizadas (e por quê)

- React: base do UI. Hooks (`useState`, `useEffect`, `useRef`) simplificam estado e efeitos.
- GSAP: animações performáticas e simples de controlar; usamos `quickTo`/`quickSetter` e o ticker (opcional) para suavidade.
- PropTypes: validação de props em tempo de desenvolvimento, documentando a “interface” dos componentes.
- Font Awesome: ícones prontos e acessíveis (via CDN ou pacote npm).

## Animações e Performance

- Preferência por `transform: translate3d(...)` (x/y) ao invés de `left/top`, pois evita reflow e é mais suave na GPU.
- `gsap.quickTo`/`quickSetter`: atualização performática em eventos de alta frequência (como `pointermove`).
- Alternativa de suavização: LERP com `gsap.ticker` para trailing mais sedoso.
- Evitei o uso de “dupla centralização”: centraliza-se no JS OU no CSS, nunca nos dois.

## Semântica, SEO e Acessibilidade

- Estrutura semântica: `main` > `article` > `header`/`section`/`footer`.
- Texto alternativo nas imagens (`alt`) e ícones com `aria-hidden="true"` quando decorativos.
- Marcação de informações (seguidores) com conteúdo claro e `aria-label` quando necessário.
- Botões reais e foco gerenciável (sem substituir `<button>` por `<div>` clicável).
- Headings (`h2`) para nome do perfil (hierarquia lógica).

Essas práticas ajudam SEO (semântica) e acessibilidade, e também tornam o layout mais robusto para leitores de tela.

## Clean Code, SOLID e Design de Software

- SRP (Single Responsibility Principle): cada componente faz apenas uma coisa (CardProfile renderiza UI de perfil; MouseFollow cuida do cursor).
- OCP (Open/Closed Principle): componentes configuráveis via props, sem necessidade de modificá-los para novos cenários.
- LSP (Liskov Substitution): o CardProfile pode ser trocado por outra variação sem quebrar o `App` se mantiver a mesma interface de props.
- ISP (Interface Segregation): props específicas e enxutas. Nada de “mega-prop”.
- DIP (Dependency Inversion): GSAP e DOM são acessados via abstrações (hooks/refs), e não diretamente no código de alto nível.

Outras práticas aplicadas:

- Nomes de variáveis e funções expressivos (`handleToggleFollow`, `cardData`, `isFollowed`).
- Estado imutável com `map`/spread.
- Separação de apresentação e comportamento (UI x lógica de evento/estado).
- Tipagem de props com PropTypes (ou migração futura para TypeScript).

## Erros encontrados e como fora corrigidos

1. Ícone do Font Awesome não aparecia

   - Causa: CDN ausente no `index.html` ou pacote não importado.
   - Correção: adicionar `<link ... font-awesome ...>` no `public/index.html` ou `npm i @fortawesome/fontawesome-free` e `import '@fortawesome/fontawesome-free/css/all.min.css'`.

2. Cursor (bolinha) aparecia e sumia

   - Causa: lógica de fade dependente de `pointerenter/pointerleave` no `window`, eventos pouco confiáveis em alguns cenários.
   - Correção: desativar fade por padrão ou ligar o fade apenas após o primeiro `pointermove`; esconder só em `mouseleave` do `document`, `blur` e `visibilitychange`.

3. `clienty` escrito incorretamente

   - Causa: typo comum (o correto é `e.clientY`).
   - Correção: padronizar `e.clientX`/`e.clientY`.

4. Dupla centralização do cursor

   - Causa: CSS com `left/top` negativos e `transform` somados ao ajuste no JS.
   - Correção: escolher UMA estratégia — centralizar no JS (subtraindo `size/2`) OU no CSS com `translate(-50%, -50%)` sem subtrair no JS.

5. Uso de `left/top` em animações

   - Causa: relayout e menor fluidez.
   - Correção (recomendada): migrar para `transform: translate3d(...)` com `gsap.quickTo`/`quickSetter`.

6. Import de Compass (`@import "compass/css3"`)

   - Causa: Compass é legado (Sass antigo) e não funciona em CSS puro.
   - Correção: remover o import ou migrar para SCSS moderno; preferimos CSS/CSS Modules.

7. Dependência de jQuery no script original
   - Causa: seleção e animação com `$`/`TweenLite`.
   - Correção: reescrever usando React + GSAP 3 com `useRef`/`useEffect` e `gsap.quickTo`.

## 🧪 O que levar para projetos reais

- Componentização com SRP e props bem definidas.
- Controle de estado simples e previsível.
- Acessibilidade e semântica desde o início.
- Animações com foco em performance (transform + GSAP).
- Remoção de dependências desnecessárias (jQuery) e adoção de padrões modernos.
- Tipagem e validação: PropTypes agora, TypeScript como evolução natural.
- Estrutura de pastas que evolui com o projeto (de components-first para feature-based/DDD-light).

## 📚 Glossário rápido

- GSAP (GreenSock Animation Platform): biblioteca de animação de alta performance para Web.
- `quickTo` / `quickSetter`: helpers do GSAP para atualizar propriedades de forma performática em alta frequência.
- LERP: técnica de interpolação para suavizar a aproximação entre posição atual e alvo.
- PropTypes: validação de propriedades de componentes React em tempo de desenvolvimento.
- ARIA: atributos que melhoram a acessibilidade para leitores de tela.
- HTML Semântico: uso correto de tags (`main`, `article`, `header`, `footer`) para dar significado ao conteúdo.
- SRP/OCP/LSP/ISP/DIP: princípios SOLID de design de software.
- CSS Modules: escopo local de estilos via arquivos `.module.css`.
- Strict Mode (React): modo que ajuda a detectar problemas, podendo executar efeitos duas vezes em dev.
- CDN: rede de entrega de conteúdo; usada para carregar libs como Font Awesome.

## Próximos passos que ainda vou realizar

- Migrar para TypeScript (tipagem estática, DX e refatoração mais seguras).
- Storybook para documentação visual de componentes.
- Testes unitários (Vitest/Jest + Testing Library) e testes de acessibilidade.
- Suavização por LERP no `MouseFollow` com `gsap.ticker` (opção alternativa já documentada).
- Theming (CSS variables) e alternância de tema (light/dark) por Context/Theme Provider.
- Otimização de build (code splitting, imagens otimizadas, lazy loading onde couber).

## Créditos e licença

Projeto didático e demonstração de boas práticas. Ajuste e reutilize conforme necessário no seu contexto.

🛡️⚔️
