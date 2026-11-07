# React + Rspack Basepack

A minimal, production-ready React starter powered by **[Rspack](https://rspack.dev)** — the Rust-based bundler with webpack-compatible APIs and up to 10× faster cold builds.

## Stack

| Tool                                                              | Purpose                            |
| ----------------------------------------------------------------- | ---------------------------------- |
| [React 19](https://react.dev)                                     | UI library                         |
| [Rspack](https://rspack.dev)                                      | Bundler (Rust, webpack-compatible) |
| [SWC](https://swc.rs)                                             | Built-in TypeScript/JSX transform  |
| [React Fast Refresh](https://www.npmjs.com/package/react-refresh) | HMR with state preservation        |
| [TypeScript 5](https://www.typescriptlang.org)                    | Type safety                        |
| CSS Modules                                                       | Scoped component styles            |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (http://localhost:3000)
npm run dev

# 3. Production build → dist/
npm run build

# 4. Preview the production build
npm run preview

# 5. Type-check without emitting
npm run type-check
```

## Project Structure

```
├── public/              # Static assets served as-is
├── src/
│   ├── assets/          # Images, SVGs, fonts
│   ├── styles/
│   │   └── index.css    # Global styles & CSS variables
│   ├── App.module.css   # Component-scoped styles
│   ├── App.tsx          # Root component
│   ├── main.tsx         # Entry point
│   └── vite-env.d.ts    # Asset type declarations
├── index.html           # HTML template
├── rspack.config.mjs    # Rspack configuration
└── tsconfig.json        # TypeScript configuration
```

## Key Features

- **`@` path alias** → maps to `src/`, so `import Foo from '@/components/Foo'` works everywhere.
- **CSS Modules** → files ending in `.module.css` are scoped automatically.
- **Global CSS** → regular `.css` files apply globally.
- **Asset inlining** → images < 8 KB are inlined as data URIs; larger ones are emitted as files.
- **Code splitting** → vendor chunk is split automatically in production.
- **Source maps** → `cheap-module-source-map` in dev, full `source-map` in production.

## Configuration

All bundler options live in `rspack.config.mjs`. The most common things you'll want to change:

```js
// Change dev server port
devServer: { port: 3000 }

// Add more path aliases
resolve: { alias: { '@components': path.resolve(__dirname, 'src/components') } }

// Inline threshold for images
parser: { dataUrlCondition: { maxSize: 8 * 1024 } }
```

## Extending

### SVGR (SVG as React components)

```bash
npm install @svgr/webpack -D
```

Then add to `rspack.config.mjs`:

```js
{ test: /\.svg$/i, issuer: /\.[jt]sx?$/, use: ['@svgr/webpack'] }
```

### SCSS / Sass

```bash
npm install sass sass-loader -D
```

Add rule:

```js
{ test: /\.s[ac]ss$/, use: ['sass-loader'], type: 'css' }
```

### Tailwind CSS

```bash
npm install tailwindcss @tailwindcss/postcss postcss -D
npx tailwindcss init
```

Add `postcss-loader` to your CSS rules and configure `postcss.config.js`.
