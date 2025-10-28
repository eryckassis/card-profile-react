# 📋 Guia de Comandos do Projeto

Este documento explica todos os comandos disponíveis no projeto de forma clara e objetiva.

---

## 🚀 Desenvolvimento

### `npm run dev`

**O que faz:** Inicia o servidor de desenvolvimento (Vite)
**Quando usar:** Durante o desenvolvimento diário
**Resultado:** Abre o projeto em `http://localhost:5173`

```bash
npm run dev
```

---

### `npm run build`

**O que faz:** Cria a versão otimizada para produção
**Quando usar:** Antes de fazer deploy
**Resultado:** Gera pasta `dist/` com arquivos otimizados

```bash
npm run build
```

---

### `npm run preview`

**O que faz:** Visualiza a build de produção localmente
**Quando usar:** Para testar a build antes do deploy
**Resultado:** Abre preview em `http://localhost:4173`

```bash
npm run preview
```

---

## 🔍 Qualidade de Código

### `npm run lint`

**O que faz:** Analisa o código em busca de problemas (ESLint)
**Quando usar:** Antes de fazer commit ou para verificar erros
**Resultado:** Lista todos os problemas encontrados

```bash
npm run lint
```

**Exemplo de saída:**

```
src/App.jsx
  12:5  error  'x' is defined but never used  no-unused-vars
✖ 1 problem (1 error, 0 warnings)
```

---

### `npm run lint:fix`

**O que faz:** Corrige automaticamente problemas de lint
**Quando usar:** Quando houver erros que podem ser corrigidos automaticamente
**Resultado:** Corrige e reformata o código

```bash
npm run lint:fix
```

**O que é corrigido automaticamente:**

- ✅ Aspas simples/duplas
- ✅ Ponto e vírgula
- ✅ Indentação
- ✅ Import/export não utilizados
- ✅ Espaçamento

**O que NÃO é corrigido (precisa de intervenção manual):**

- ❌ Variáveis não utilizadas
- ❌ Lógica incorreta
- ❌ Problemas de acessibilidade

---

### `npm run format`

**O que faz:** Formata TODO o código do projeto (Prettier)
**Quando usar:** Após escrever código ou antes de commit
**Resultado:** Padroniza formatação em todos os arquivos

```bash
npm run format
```

**Arquivos afetados:**

- `.js`, `.jsx`, `.ts`, `.tsx`
- `.json`
- `.md` (markdown)
- `.css`, `.scss`

---

### `npm run format:check`

**O que faz:** Verifica se o código está formatado corretamente
**Quando usar:** No CI/CD ou antes de fazer push
**Resultado:** Apenas verifica, NÃO modifica arquivos

```bash
npm run format:check
```

---

## ✅ Validação Completa

### `npm run validate`

**O que faz:** Roda LINT + FORMAT CHECK (sem modificar arquivos)
**Quando usar:** Antes de fazer push ou abrir PR
**Resultado:** Valida qualidade sem alterar código

```bash
npm run validate
```

**Equivalente a:**

```bash
npm run lint
npm run format:check
```

---

### `npm run validate:fix`

**O que faz:** Roda LINT FIX + FORMAT (corrige automaticamente)
**Quando usar:** Quando quiser corrigir todos os problemas de uma vez
**Resultado:** Corrige e formata todo o código

```bash
npm run validate:fix
```

**Equivalente a:**

```bash
npm run lint:fix
npm run format
```

---

## 🔧 Git Hooks (Automáticos)

Estes comandos rodam **automaticamente** em eventos do Git:

### Pre-commit (antes de aceitar commit)

**O que acontece:**

1. Husky intercepta o `git commit`
2. Lint-staged roda nos arquivos modificados
3. ESLint corrige problemas
4. Prettier formata
5. Se tudo passar → commit aceito ✅
6. Se falhar → commit bloqueado ❌

**Como funciona:**

```bash
git add .
git commit -m "feat: nova funcionalidade"
# → Husky roda automaticamente
# → Lint-staged processa apenas arquivos staged
# → Se passar: commit criado
# → Se falhar: você vê os erros e precisa corrigir
```

---

### Commit-msg (valida mensagem de commit)

**O que acontece:**

1. Commitlint valida a mensagem
2. Segue padrão Conventional Commits
3. Se válida → aceita ✅
4. Se inválida → rejeita ❌

**Formato válido:**

```
<tipo>: <descrição curta>

Tipos permitidos:
- feat:     Nova funcionalidade
- fix:      Correção de bug
- docs:     Documentação
- style:    Formatação (não afeta lógica)
- refactor: Refatoração
- perf:     Performance
- test:     Testes
- build:    Build/dependências
- ci:       CI/CD
- chore:    Manutenção
- revert:   Reverter commit
```

**Exemplos válidos:**

```bash
git commit -m "feat: adiciona tema dark ao CardProfile"
git commit -m "fix: corrige centralização do cursor"
git commit -m "docs: atualiza README com exemplos"
git commit -m "refactor: extrai lógica de seguir para hook"
```

**Exemplos inválidos:**

```bash
git commit -m "adicionei dark mode"        # ❌ sem tipo
git commit -m "Feat: dark mode"            # ❌ tipo com maiúscula
git commit -m "feat: dark mode."           # ❌ ponto final
git commit -m "feature: dark mode"         # ❌ tipo inválido
git commit -m "feat:"                      # ❌ sem descrição
```

---

## 🎯 Fluxo de Trabalho Recomendado

### Durante o desenvolvimento:

```bash
# 1. Inicia servidor
npm run dev

# 2. Desenvolve normalmente...
# (código, testes, etc.)

# 3. Antes de commitar, valida localmente (opcional)
npm run validate:fix

# 4. Adiciona arquivos
git add .

# 5. Faz commit (hooks rodam automaticamente)
git commit -m "feat: implementa nova funcionalidade"
# → Pre-commit roda lint + format
# → Commit-msg valida mensagem
# → Se tudo passar: commit criado ✅

# 6. Push para repositório
git push
```

### Se houver erros:

```bash
# Opção 1: Corrigir automaticamente
npm run validate:fix

# Opção 2: Ver o que está errado
npm run validate

# Opção 3: Corrigir manualmente e tentar novamente
# (edita os arquivos com problemas)
git add .
git commit -m "fix: corrige problema X"
```

---

## 💡 Dicas Úteis

### Ver todos os scripts disponíveis:

```bash
npm run
```

### Ignorar hooks temporariamente (NÃO RECOMENDADO):

```bash
git commit -m "mensagem" --no-verify
```

⚠️ **Cuidado:** Isso pula todas as validações!

### Verificar se hooks estão funcionando:

```bash
# Tenta fazer commit com mensagem inválida
git commit --allow-empty -m "teste invalido"
# ❌ Deve falhar

# Tenta com mensagem válida
git commit --allow-empty -m "test: valida hooks"
# ✅ Deve passar
```

---

## 🆘 Solução de Problemas

### "Husky não está rodando"

```bash
# Reinstala hooks
npm run prepare
```

### "ESLint diz que há erros mas não vejo"

```bash
# Roda lint com mais detalhes
npm run lint -- --debug
```

### "Prettier está formatando diferente do ESLint"

```bash
# Verifica conflitos (não deve haver nenhum)
npm run lint
npm run format:check
# Se ambos passarem, está tudo certo
```

### "Quero desabilitar uma regra específica do ESLint"

Edite `eslint.config.js` e adicione na seção `rules`:

```javascript
rules: {
  'nome-da-regra': 'off', // desabilita
  'outra-regra': 'warn',  // apenas avisa
}
```

---

## 📚 Referências

- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Husky](https://typicode.github.io/husky/)
- [Lint-staged](https://github.com/okonet/lint-staged)
