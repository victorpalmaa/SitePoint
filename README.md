# POINT — Fase Final

Projeto frontend da loja POINT, com foco em experiência fluida, transições leves e cobertura completa de testes para garantir funcionamento 100% em dispositivos móveis.

## Tecnologias
- React + React Router
- Tailwind CSS
- Playwright (E2E mobile)
- Jest (unit tests)

## Como rodar
```bash
# servidor de desenvolvimento
yarn --cwd frontend start

# testes unitários
yarn --cwd frontend test --watchAll=false

# testes E2E mobile (iPhone 12, Pixel 5)
cd frontend
npx playwright test --reporter=list
```

## Build de produção
```bash
yarn --cwd frontend build
# saída: frontend/build
```

## Deploy (Vercel)
- A raiz do repositório contém `vercel.json` com:
  - `installCommand`: `yarn --cwd frontend install`
  - `buildCommand`: `yarn --cwd frontend build`
  - `outputDirectory`: `frontend/build`
  - `rewrites` para SPA

## Garantias Mobile
- Layout responsivo e centrado nas páginas de produto
- Modais acessíveis: Provador virtual e Detalhes do produto
- Carrinho com overlay, controle de quantidade e checkout via WhatsApp
- Transições “clean e leves” nas imagens (crossfade + leve zoom) e botões

## Estrutura de testes
- Configuração: `frontend/playwright.config.js`
- Suítes E2E (mobile): `frontend/src/e2e/*.spec.js`
- Suítes unitárias: `frontend/src/__tests__/*.js`

## Scripts úteis
```bash
# iniciar servidor de testes E2E automaticamente
cd frontend && npx playwright test

# reexecutar somente uma suíte
cd frontend && npx playwright test src/e2e/product.mobile.spec.js
```

## Observações
- O favicon está configurado para `frontend/public/assets/LOGOS/LOGO POINT.png`
- Para publicar em um novo repositório sem histórico anterior, inicialize e faça um único commit (ver abaixo)

## Commit final (sem histórico)
```bash
rm -rf .git
git init
git add -A
git commit -m "site fase final"
# depois: git remote add origin <URL do novo repo>
# git push -u origin main
```