import { describe, it, expect } from '@jest/globals';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomePage from '@/pages/HomePage';
import { renderWithProviders } from '@/__mocks__/renderWithProviders';

describe('HomePage', () => {
  it('renders the heading and initial count', () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByRole('heading', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders with a preloaded count from Redux store', () => {
    renderWithProviders(<HomePage />, { preloadedState: { counter: { value: 7 } } });
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('increments the count when + is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<HomePage />);
    await user.click(screen.getByRole('button', { name: /increment/i }));
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('decrements the count when − is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<HomePage />, { preloadedState: { counter: { value: 3 } } });
    await user.click(screen.getByRole('button', { name: /decrement/i }));
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('resets the count to 0 when Reset is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<HomePage />, { preloadedState: { counter: { value: 10 } } });
    await user.click(screen.getByRole('button', { name: /reset/i }));
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
