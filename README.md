# Criativarts Brands Pack — Landing

Landing page estática (React + Vite + Tailwind). Lista para produção e deploy na **Vercel**.

## Requisitos

- **Node.js** 20+ (recomendado: versão em `.nvmrc`)

## Desenvolvimento local

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000` (ver `package.json`).

- **Lint:** `npm run lint`
- **Build de produção:** `npm run build` → saída em `dist/`
- **Preview do build:** `npm run preview`

### Variáveis de ambiente

- Copia `.env.example` para `.env` ou `.env.local` se usares APIs (ex.: `GEMINI_API_KEY`).
- **Nunca** faças commit de `.env` com segredos (já estão ignorados no `.gitignore`).

---

## Git (primeira vez nesta pasta)

Se ainda não existir repositório:

```bash
git init
git branch -M main
git add .
git commit -m "chore: initial commit — Criativarts Brands landing"
```

Liga a um remoto (GitHub/GitLab) e faz push:

```bash
git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
git push -u origin main
```

---

## Deploy na Vercel

1. Instala a [CLI da Vercel](https://vercel.com/docs/cli) ou usa o [dashboard](https://vercel.com/new).
2. **Import** do repositório Git.
3. A Vercel deteta **Vite**; o ficheiro `vercel.json` fixa:
   - `npm run build`
   - pasta de saída `dist/`
   - rewrites para SPA (`index.html`)
   - cabeçalhos de segurança básicos e cache longo em `/assets/*`

**Variáveis de ambiente na Vercel:** Project → Settings → Environment Variables (só se a app precisar em runtime; esta landing é maioritariamente estática).

**Domínio:** Settings → Domains.

---

## CI (GitHub Actions)

O workflow `.github/workflows/ci.yml` corre `npm ci`, `lint` e `build` em cada push/PR para `main`/`master`.

---

## Estrutura relevante

| Pasta / ficheiro | Uso |
|------------------|-----|
| `src/` | Código React |
| `public/` | Assets estáticos (imagens, `favicon.svg`) |
| `vercel.json` | Configuração de deploy Vercel |
| `.nvmrc` | Versão de Node para CI e equipas |
