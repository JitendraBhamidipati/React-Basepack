import React from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import counterReducer from '@/store/slices/counterSlice';
import type { RootState } from '@/store/store';

interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Partial<RootState>;
  initialEntries?: string[];
}

function makeStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: { counter: counterReducer },
    // Cast to RootState to match what configureStore expects when P defaults to S.
    preloadedState: preloadedState as RootState | undefined,
  });
}

/**
 * Custom render that wraps the component under test with Redux Provider and
 * MemoryRouter (so components that use hooks like useNavigate or NavLink work).
 */
export function renderWithProviders(
  ui: React.ReactElement,
  { preloadedState, initialEntries = ['/'], ...renderOptions }: RenderWithProvidersOptions = {},
) {
  const store = makeStore(preloadedState);

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
