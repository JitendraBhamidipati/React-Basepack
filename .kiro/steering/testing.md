---
inclusion: always
---

# Testing Guide

## Setup

- **Framework:** Jest 30 + `@testing-library/react` 16 + `@testing-library/user-event` 14
- **Config:** `jest/jest.config.mjs` (rootDir points to project root)
- **Test TypeScript config:** `jest/tsconfig.test.json`
- **Setup file:** `jest/setupTests.ts` (TextEncoder polyfill + jest-dom matchers)
- **Test environment:** `jest-environment-jsdom`
- **Transform:** `@swc/jest` (no Babel)

## Running Tests

```bash
pnpm test               # single run
pnpm test:watch         # watch mode
pnpm test:coverage      # with lcov coverage → coverage/
pnpm type-check:test    # tsc on test files only
```

## File Location

All test files live in `__tests__/` at the project root — flat, no subdirectories.

```
__tests__/
├── axios.test.ts
├── counterSlice.test.ts
├── HomePage.test.tsx
├── NotFoundPage.test.tsx
├── PostsPage.test.tsx
└── RootLayout.test.tsx
```

## Test Helpers

### renderWithProviders

Any component that uses Redux state or React Router hooks must be rendered with `renderWithProviders` from `@/__mocks__/renderWithProviders`:

```tsx
import { renderWithProviders } from '@/__mocks__/renderWithProviders';

// Basic usage
renderWithProviders(<MyComponent />);

// With preloaded Redux state
renderWithProviders(<MyComponent />, {
  preloadedState: { counter: { value: 5 } },
});

// With a specific route
renderWithProviders(<MyComponent />, {
  initialEntries: ['/posts'],
});
```

### Axios mocking

Use `axios-mock-adapter` against the shared `api` instance, not raw `axios`:

```ts
import MockAdapter from 'axios-mock-adapter';
import api from '@/lib/axios';

const mock = new MockAdapter(api);

beforeEach(() => mock.reset());
afterEach(() => mock.reset());

mock.onGet('/endpoint').reply(200, { data: 'value' });
```

### fileMock

Static assets (SVG, PNG, CSS non-modules) are automatically stubbed via `jest/__mocks__/fileMock.ts`. No manual setup needed.

## Patterns

### Async / waitFor

```tsx
import { screen, waitFor } from '@testing-library/react';

await waitFor(() =>
  expect(screen.getByText('Loaded')).toBeInTheDocument()
);
```

### User interactions

```tsx
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();
await user.click(screen.getByRole('button', { name: /submit/i }));
await user.type(screen.getByRole('textbox'), 'hello');
```

### Accessible queries — priority order

1. `getByRole` (preferred — most resilient)
2. `getByLabelText`
3. `getByPlaceholderText`
4. `getByText`
5. `getByTestId` (last resort)

## What to Test

| Layer | What to cover |
|---|---|
| Redux slices | Reducer logic for every action — pure unit tests, no render needed |
| Axios instance | Interceptor behaviour (token injection, 401 handling) using `axios-mock-adapter` |
| Pages | Render output, user interactions, async data states (loading / success / error) |
| Layouts | Navigation link presence, `href` values, active state |
| Utilities | Pure function input → output |

## jest-dom Matchers

`@testing-library/jest-dom/jest-globals` is imported in `jest/setupTests.ts`, so all matchers are available globally:

```ts
expect(el).toBeInTheDocument();
expect(el).toHaveTextContent('foo');
expect(el).toHaveAttribute('href', '/path');
expect(el).toBeDisabled();
expect(el).toHaveClass('active');
```
