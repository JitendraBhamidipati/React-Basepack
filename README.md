# React Basepack

A production-ready React starter built on **[Rspack](https://rspack.dev)** — the Rust-powered bundler that's API-compatible with webpack and delivers up to 10× faster cold builds.

---

## Tech Stack

| Layer           | Tool                                                                                      | Version |
| --------------- | ----------------------------------------------------------------------------------------- | ------- |
| UI              | [React](https://react.dev)                                                                | 19      |
| Bundler         | [Rspack](https://rspack.dev)                                                              | 2       |
| Transform       | [SWC](https://swc.rs) (built-in)                                                          | —       |
| Language        | [TypeScript](https://www.typescriptlang.org)                                              | 6       |
| State           | [Redux Toolkit](https://redux-toolkit.js.org) + [React-Redux](https://react-redux.js.org) | 2 / 9   |
| Routing         | [React Router](https://reactrouter.com)                                                   | 8       |
| HTTP            | [Axios](https://axios-http.com)                                                           | 1       |
| Linting         | [ESLint](https://eslint.org) (flat config)                                                | 10      |
| Formatting      | [Prettier](https://prettier.io)                                                           | 3       |
| Testing         | [Jest](https://jestjs.io) 30 + [Testing Library](https://testing-library.com)             | 30 / 16 |
| Package manager | [pnpm](https://pnpm.io)                                                                   | 12      |

---

## Quick Start

```bash
# Install dependencies
pnpm install

# Start dev server → http://localhost:3000
pnpm dev

# Production build → dist/
pnpm build

# Type-check source
pnpm type-check

# Type-check test files
pnpm type-check:test
```

---

## Scripts

| Script                 | Description                                                   |
| ---------------------- | ------------------------------------------------------------- |
| `pnpm dev`             | Dev server at `http://localhost:3000` with HMR + Fast Refresh |
| `pnpm build`           | Production build → `dist/`                                    |
| `pnpm type-check`      | `tsc --noEmit` on source files                                |
| `pnpm type-check:test` | `tsc --noEmit` on test files (uses `jest/tsconfig.test.json`) |
| `pnpm lint`            | ESLint across `src/`                                          |
| `pnpm lint:fix`        | ESLint with auto-fix                                          |
| `pnpm format`          | Prettier write on `src/**`                                    |
| `pnpm format:check`    | Prettier check (CI-safe, no writes)                           |
| `pnpm test`            | Jest single-run                                               |
| `pnpm test:watch`      | Jest in watch mode                                            |
| `pnpm test:coverage`   | Jest with lcov coverage report → `coverage/`                  |

---

## Project Structure

```
React basepack/
│
├── __tests__/                  # All test files (flat)
│   ├── axios.test.ts
│   ├── counterSlice.test.ts
│   ├── HomePage.test.tsx
│   ├── NotFoundPage.test.tsx
│   ├── PostsPage.test.tsx
│   └── RootLayout.test.tsx
│
├── jest/                       # Jest configuration & support
│   ├── __mocks__/
│   │   ├── fileMock.ts         # Static asset stub
│   │   └── renderWithProviders.tsx  # Test render helper (Redux + Router)
│   ├── jest-dom.d.ts           # @testing-library/jest-dom type augmentation
│   ├── jest.config.mjs         # Jest configuration
│   ├── setupTests.ts           # Global test setup (TextEncoder polyfill, jest-dom)
│   └── tsconfig.test.json      # TypeScript config for test files
│
├── src/
│   ├── assets/                 # SVGs, images, fonts
│   ├── layouts/
│   │   └── RootLayout.tsx      # App shell with navbar and <Outlet>
│   ├── lib/
│   │   └── axios.ts            # Pre-configured Axios instance with interceptors
│   ├── pages/
│   │   ├── HomePage.tsx        # Redux counter demo
│   │   ├── PostsPage.tsx       # Axios data-fetch demo
│   │   └── NotFoundPage.tsx    # 404 catch-all
│   ├── router/
│   │   └── index.tsx           # createBrowserRouter route definitions
│   ├── store/
│   │   ├── hooks.ts            # useAppDispatch / useAppSelector (pre-typed)
│   │   ├── store.ts            # configureStore + RootState / AppDispatch types
│   │   └── slices/
│   │       └── counterSlice.ts # Example slice
│   ├── styles/
│   │   └── index.css           # Global reset + CSS custom properties
│   ├── App.tsx                 # Re-exports RootLayout (entry component)
│   ├── main.tsx                # ReactDOM.createRoot + Provider + RouterProvider
│   └── vite-env.d.ts           # Asset & CSS module type declarations
│
├── .kiro/steering/             # Kiro AI steering docs (project context)
├── eslint.config.mjs           # ESLint flat config
├── index.html                  # HTML entry template
├── rspack.config.mjs           # Rspack bundler configuration
├── tsconfig.json               # TypeScript source config
├── .prettierrc                 # Prettier options
└── package.json
```

---

## Key Conventions

### Path alias

`@/` maps to `src/` everywhere — in source, tests, and TypeScript configs.

```ts
import { store } from '@/store/store';
import api from '@/lib/axios';
```

### CSS Modules

Files named `*.module.css` are automatically scoped. Import as a namespace:

```tsx
import * as styles from './MyComponent.module.css';
// <div className={styles.container}>
```

Global styles live in `src/styles/index.css` and use CSS custom properties (design tokens).

### Redux

Always use the pre-typed hooks — never the raw `useDispatch` / `useSelector`:

```ts
import { useAppDispatch, useAppSelector } from '@/store/hooks';
```

Add new slices in `src/store/slices/`, register the reducer in `src/store/store.ts`.

### Routing

Routes are defined in `src/router/index.tsx`. The app shell (`RootLayout`) wraps all routes via `<Outlet>`. Add new pages in `src/pages/` and register them there.

### Axios

`src/lib/axios.ts` exports a pre-configured instance. Import it directly — do not use the raw `axios` import in feature code:

```ts
import api from '@/lib/axios';
const { data } = await api.get('/endpoint');
```

Set `API_BASE_URL` via `rspack.config.mjs`'s `DefinePlugin` to point at your real API.

---

## Testing

Tests live in `__tests__/` at the project root. Jest config is in `jest/jest.config.mjs`.

```bash
pnpm test                # single run
pnpm test:watch          # watch mode
pnpm test:coverage       # coverage report → coverage/
```

**Helpers:**

- `jest/__mocks__/renderWithProviders.tsx` — wraps UI in `<Provider>` + `<MemoryRouter>`. Use for any component that touches Redux or React Router.
- `jest/__mocks__/fileMock.ts` — stubs static asset imports.

```tsx
import { renderWithProviders } from '@/__mocks__/renderWithProviders';

renderWithProviders(<MyComponent />, {
  preloadedState: { counter: { value: 5 } },
  initialEntries: ['/my-route'],
});
```

---

## Extending

### SVGR — SVG as React components

```bash
pnpm add -D @svgr/webpack
```

Add to `rspack.config.mjs`:

```js
{ test: /\.svg$/i, issuer: /\.[jt]sx?$/, use: ['@svgr/webpack'] }
```

### SCSS / Sass

```bash
pnpm add -D sass sass-loader
```

Add rule to `rspack.config.mjs`:

```js
{ test: /\.s[ac]ss$/, use: ['sass-loader'], type: 'css' }
```

### Tailwind CSS

```bash
pnpm add -D tailwindcss @tailwindcss/postcss postcss
npx tailwindcss init
```

Add `postcss-loader` to your CSS rules and create `postcss.config.js`.

### New Redux slice

```bash
# 1. Create src/store/slices/mySlice.ts
# 2. Register in src/store/store.ts:
import myReducer from './slices/mySlice';
export const store = configureStore({
  reducer: { counter: counterReducer, my: myReducer },
});
```

---

## Environment Variables

Expose env vars via `DefinePlugin` in `rspack.config.mjs`:

```js
new rspack.DefinePlugin({
  'process.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL ?? ''),
});
```

Then read with `process.env.API_BASE_URL` in source code.

---

## TypeScript Notes

- Source uses `tsconfig.json` (strict, `moduleResolution: bundler`)
- Tests use `jest/tsconfig.test.json` (extends source config, adds `@types/jest` and `@testing-library/jest-dom`)
- TypeScript 6 is pinned at `^6.0.3` — `typescript-eslint@8` requires `< 6.1.0`; upgrade when eslint support catches up to TS 7
