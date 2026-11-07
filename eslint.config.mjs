import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  // ── Ignore patterns ──────────────────────────────────────
  {
    ignores: ['dist/**', 'node_modules/**', '*.config.mjs'],
  },

  // ── Base JS rules ─────────────────────────────────────────
  js.configs.recommended,

  // ── TypeScript rules ──────────────────────────────────────
  ...tseslint.configs.recommended,

  // ── React-specific rules ──────────────────────────────────
  {
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // React Hooks
      ...reactHooks.configs.recommended.rules,

      // Fast Refresh — warn when a module exports non-components
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  // ── Project-wide TypeScript overrides ─────────────────────
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // Allow explicit `any` in rare cases — remove if you want stricter checks
      '@typescript-eslint/no-explicit-any': 'warn',
      // Unused vars as errors (override base rule with TS-aware version)
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      // Consistent type imports
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    },
  },

  // ── Prettier — must be last to disable formatting rules ───
  prettierConfig,
);
