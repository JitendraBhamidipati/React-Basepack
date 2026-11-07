---
inclusion: always
---

# Project Overview

This is **React Basepack** — a production-ready React 19 starter that uses Rspack (Rust-based, webpack-compatible bundler) instead of webpack or Vite.

## Core Stack

- **React 19** with TypeScript 6 (strict mode, `moduleResolution: bundler`)
- **Rspack 2** — bundler config in `rspack.config.mjs`. Uses built-in SWC for TS/JSX transforms — no babel or ts-loader.
- **Redux Toolkit 2** — store in `src/store/store.ts`, typed hooks in `src/store/hooks.ts`. Always use `useAppDispatch` / `useAppSelector` instead of the raw hooks.
- **React Router 8** — routes defined in `src/router/index.tsx` using `createBrowserRouter`. `RootLayout` wraps all pages via `<Outlet>`.
- **Axios 1** — pre-configured instance in `src/lib/axios.ts` with request/response interceptors. Never use raw `axios` in feature code.
- **ESLint 10** flat config (`eslint.config.mjs`) with TypeScript, React Hooks, and react-refresh rules.
- **Prettier 3** — config in `.prettierrc` (single quotes, trailing commas, 100-char width).
- **Jest 30** + Testing Library — config in `jest/jest.config.mjs`, tests in `__tests__/` at the project root.
- **pnpm 12** — always use `pnpm`, never `npm` or `yarn`.

## Path Alias

`@/` resolves to `src/` everywhere (source, tests, TypeScript configs).

## Package Manager

This project uses **pnpm**. Always run `pnpm install`, `pnpm add`, `pnpm test`, etc.
