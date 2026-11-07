---
inclusion: always
---

# Coding Conventions

## TypeScript

- All files are `.ts` or `.tsx`. No plain `.js` in `src/`.
- Strict mode is on. Never disable `strict`, `noUnusedLocals`, or `noUnusedParameters`.
- Prefix intentionally unused variables/params with `_` to satisfy the linter.
- Use `import type { ... }` for type-only imports (`@typescript-eslint/consistent-type-imports` is enforced).
- TypeScript 6 is pinned at `^6.0.3` — `typescript-eslint@8` requires `<6.1.0`.

## Components

- One component per file. File name matches the exported component name.
- Functional components only — no class components.
- Props interfaces are defined in the same file, named `<ComponentName>Props`.
- Export components as default exports; export utilities/hooks as named exports.

## CSS

- Component styles use **CSS Modules** (`*.module.css`). Import as a namespace:
  ```tsx
  import * as styles from './MyComponent.module.css';
  ```
- Global styles and CSS custom properties (design tokens) live in `src/styles/index.css`.
- Never use inline styles for anything beyond truly dynamic values.

## Redux

- Slices live in `src/store/slices/`. One slice per domain concept.
- Register new reducers in `src/store/store.ts`.
- Only use `useAppDispatch` and `useAppSelector` from `src/store/hooks.ts` — never the raw React-Redux hooks.
- Keep slice logic pure (no side effects in reducers). Use `createAsyncThunk` for async work.

## Routing

- All routes are defined in `src/router/index.tsx`.
- Pages live in `src/pages/`. Layouts live in `src/layouts/`.
- Use `<NavLink>` (not `<a>`) for internal navigation.

## HTTP / Axios

- All API calls go through the shared instance from `src/lib/axios.ts`.
- Use `AbortController` and pass `signal` to cancellable requests (see `PostsPage.tsx` for the pattern).
- Never import `axios` directly in feature code — always import `api` from `@/lib/axios`.

## File & Folder Naming

- React component files: `PascalCase.tsx` (e.g. `HomePage.tsx`)
- CSS module files: `PascalCase.module.css` (matches component)
- Utility / non-component files: `camelCase.ts` (e.g. `axios.ts`, `store.ts`)
- Test files: `<Name>.test.tsx` or `<Name>.test.ts` placed in `__tests__/`

## Imports Order

Prettier + ESLint handle formatting, but prefer this mental order:
1. React and framework imports
2. Third-party packages
3. Internal `@/` path aliases
4. Relative imports
5. CSS / asset imports
