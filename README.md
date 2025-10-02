# Card Viking React

Projeto em evolução que migra um protótipo HTML/CSS/JS (card de perfil com botão de seguir) para uma arquitetura em React aplicando princípios de código limpo, componentização e validação de propriedades com `prop-types`.

> Escopo atual: apenas a listagem de cards de perfil (`CardProfile`) dentro do componente raiz `App`. (O componente de background interativo ainda não faz parte deste README por solicitação.)

---

## 🎯 Objetivos da Migração

1. Substituir manipulação imperativa de DOM (`querySelector`, `addEventListener`, `classList.toggle`) por estado reativo do React (`useState`).
2. Separar responsabilidades (SRP) em componentes pequenos e testáveis.
3. Tornar o comportamento extensível via props (aberto para extensão, fechado para modificação).
4. Validar contratos entre componentes com `PropTypes` enquanto TypeScript não é adotado.

---

## 🧱 Estrutura (parcial)

```text
src/
  App.jsx          # Componente raiz: orquestra lista de cards
  App.css          # Estilos globais/parciais usados pelo App
  components/
    Card.jsx       # (CardProfile) Componente de apresentação + ação seguir
```

---

## 🧩 Componentes

### `CardProfile`

Responsável por exibir:

- Avatar / imagem
- Nome
- Descrição
- Quantidade de seguidores (valor numérico + sufixo M)
- Botão de ação (Seguir / Unfollow) cujo estado vem do pai

Não armazena estado interno sobre seguir; recebe via props (`isFollowing`, `onToggle`). Isso reforça a separação de responsabilidade e facilita reutilização / testes.

### `App`

Controla o estado de follow de cada card via array booleano em `useState`:

```jsx
const [isFollowing, setIsFollowing] = useState([false, false]);
```

Atualização imutável:

```jsx
setIsFollowing((prev) => prev.map((val, i) => (i === idx ? !val : val)));
```

Renderização dinâmica via `map`, passando props derivadas de um array de configuração (`cards`).

---

## ✅ Uso de `PropTypes`

`PropTypes` garante que o componente receba tipos corretos em tempo de desenvolvimento, evitando integrações quebradas ou comportamentos silenciosos.

Trecho do `Card.jsx` (resumido):

```jsx
CardProfile.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  followers: PropTypes.number.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  dark: PropTypes.bool.isRequired,
  imgSrc: PropTypes.string.isRequired,
};
```

Benefícios:

- Documentação viva do contrato do componente.
- Erros visíveis cedo no console de desenvolvimento.
- Facilita migração futura para TypeScript (mapeamento direto para tipos).

Boas práticas aplicadas:

- Uso de `isRequired` para campos essenciais ao layout/fluxo.
- Tipos simples e explícitos (sem objetos genéricos ou `any`).
- Sinalização de intenção (por ex.: `followers` como `number`).

Quando migrar para TypeScript, esse bloco se traduz naturalmente para uma interface ou type alias.

---

## 🧪 Princípios SOLID Aplicados

| Princípio                   | Aplicação Atual                                                                                                       |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| SRP (Single Responsibility) | `CardProfile` só apresenta dados e delega ação; `App` gerencia estado de coleção.                                     |
| Open/Closed                 | Extensível adicionando novos campos via props sem alterar lógica interna atual.                                       |
| Liskov                      | Qualquer variação de card que mantenha as props pode substituir `CardProfile`.                                        |
| Interface Segregation       | Props específicas e sem objetos monolíticos; cada responsabilidade explícita.                                         |
| Dependency Inversion        | `CardProfile` depende de uma abstração (função `onToggle`) injetada, não conhece detalhes de armazenamento do estado. |

---

## 🧼 Outras Boas Práticas

| Tema                             | Decisão                                                                         |
| -------------------------------- | ------------------------------------------------------------------------------- |
| Imutabilidade                    | `map` para criar novo array ao alternar follow.                                 |
| Sem efeitos colaterais no render | Lógica de clique isolada em handler.                                            |
| Sem manipulação de DOM direta    | Nada de `document.querySelector` dentro de componentes.                         |
| CSS modular                      | Classes reutilizadas; possível evoluir para CSS Modules / Tailwind se desejado. |
| Acessibilidade                   | `aria-label` descrevendo número de seguidores.                                  |
| Nomenclatura                     | Verbos claros (`handleToggle`), substantivos descritivos (`CardProfile`).       |

---

## 🚀 Executando o Projeto

Pré-requisitos: Node.js (versão LTS recomendada) e npm.

Instalar dependências:

```bash
npm install
```

Rodar em modo desenvolvimento (Vite):

```bash
npm run dev
```

Build de produção:

```bash
npm run build
```

Pré-visualização do build:

```bash
npm run preview
```

Lint (quando configurado / ajustes futuros):

```bash
npm run lint
```

---

## 🔧 Extensões Futuras (Ideias)

- Tipagem com TypeScript (substituição de PropTypes).
- Testes unitários (ex.: Vitest + React Testing Library) para validar alternância de follow.
- Extração de dados de cards para JSON externo ou API.
- Suporte a tema (dark/light) controlado via contexto.
- Internacionalização (i18n) para textos "Seguir" / "Unfollow".

---

## 🧭 Convenções Recomendadas (Próximos Commits)

- Prefixar handlers com `handle` (já aplicado).
- Evitar valores mágicos (ex.: substituir `15` por constante ou dado da API).
- Criar pasta `types/` (quando migrar para TS) ou `constants/` para labels e números.

---

## 📄 Licença

Definir conforme necessidade (MIT sugerida se público).

---

Se quiser incluir a documentação do background interativo depois, posso complementar sem retrabalho. Basta pedir. 😉
