import { describe, it, expect } from '@jest/globals';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/__mocks__/renderWithProviders';
import RootLayout from '@/layouts/RootLayout';

describe('RootLayout', () => {
  it('renders the brand name', () => {
    renderWithProviders(<RootLayout />);
    expect(screen.getByText(/react basepack/i)).toBeInTheDocument();
  });

  it('renders Home and Posts navigation links', () => {
    renderWithProviders(<RootLayout />);
    expect(screen.getByRole('link', { name: /^home$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^posts$/i })).toBeInTheDocument();
  });

  it('Home link points to /', () => {
    renderWithProviders(<RootLayout />);
    expect(screen.getByRole('link', { name: /^home$/i })).toHaveAttribute('href', '/');
  });

  it('Posts link points to /posts', () => {
    renderWithProviders(<RootLayout />);
    expect(screen.getByRole('link', { name: /^posts$/i })).toHaveAttribute('href', '/posts');
  });
});
