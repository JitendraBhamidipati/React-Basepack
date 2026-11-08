/** @type {import('jest').Config} */
const config = {
  rootDir: '../',
  testEnvironment: 'jest-environment-jsdom',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],

  // SWC replaces babel-jest for fast TS/TSX transforms
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          target: 'es2020',
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },

  // react-router v8 ships ESM only — allow it to be transformed by SWC.
  // Anchored lookahead works for both flat node_modules and pnpm's virtual
  // store (.pnpm/<hash>/node_modules/<pkg>/).
  transformIgnorePatterns: ['/node_modules/(?!(react-router|@remix-run))'],

  // CSS Modules → identity-obj-proxy, static assets → simple string stub
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': '<rootDir>/jest/__mocks__/fileMock.ts',
    '\\.(png|jpe?g|gif|svg|webp|avif|ico|woff2?)$': '<rootDir>/jest/__mocks__/fileMock.ts',
    // @/__mocks__ now lives in jest/__mocks__ (not src/__mocks__)
    '^@/__mocks__/(.*)$': '<rootDir>/jest/__mocks__/$1',
    // Mirror the @ alias from rspack/tsconfig
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  setupFilesAfterEnv: ['<rootDir>/jest/setupTests.ts'],

  // Test file discovery — root-level __tests__ folder
  testMatch: ['<rootDir>/__tests__/**/*.{ts,tsx}'],

  // Coverage
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/main.tsx', // bootstrap only, nothing to test
    '!src/App.tsx', // 2-line re-export
    '!src/router/index.tsx', // pure wiring
    '!src/store/store.ts', // pure wiring
    '!src/**/*.d.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  coverageThreshold: {
    global: {
      lines: 80,
      functions: 80,
    },
  },
};

export default config;
