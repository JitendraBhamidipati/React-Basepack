import { describe, it, expect } from '@jest/globals';
import { screen } from '@testing-library/react';
import NotFoundPage from '@/pages/NotFoundPage';
import { renderWithProviders } from '@/__mocks__/renderWithProviders';

describe('NotFoundPage', () => {
  it('renders the 404 heading', () => {
    renderWithProviders(<NotFoundPage />);
    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
  });

  it('renders a "page not found" message', () => {
    renderWithProviders(<NotFoundPage />);
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });

  it('renders a link back to home', () => {
    renderWithProviders(<NotFoundPage />);
    const link = screen.getByRole('link', { name: /back home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
