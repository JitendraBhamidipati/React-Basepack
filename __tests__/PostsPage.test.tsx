import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import PostsPage from '@/pages/PostsPage';
import api from '@/lib/axios';
import { renderWithProviders } from '@/__mocks__/renderWithProviders';

// Mock the shared axios instance (not the raw axios import)
const mock = new MockAdapter(api);

const MOCK_POSTS = [
  { id: 1, title: 'First post', body: 'Body of the first post' },
  { id: 2, title: 'Second post', body: 'Body of the second post' },
];

beforeEach(() => mock.reset());
afterEach(() => mock.reset());

describe('PostsPage', () => {
  it('shows a loading state immediately', () => {
    mock.onGet('/posts').reply(() => new Promise(() => {})); // never resolves
    renderWithProviders(<PostsPage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders posts after a successful fetch', async () => {
    mock.onGet('/posts').reply(200, MOCK_POSTS);
    renderWithProviders(<PostsPage />);

    await waitFor(() => expect(screen.getByText('First post')).toBeInTheDocument());
    expect(screen.getByText('Second post')).toBeInTheDocument();
    expect(screen.getByText('Body of the first post')).toBeInTheDocument();
  });

  it('shows an error message when the request fails', async () => {
    mock.onGet('/posts').reply(500);
    renderWithProviders(<PostsPage />);

    await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
  });

  it('renders the page heading and description', async () => {
    mock.onGet('/posts').reply(200, MOCK_POSTS);
    renderWithProviders(<PostsPage />);

    expect(screen.getByRole('heading', { name: /posts/i })).toBeInTheDocument();
    expect(screen.getByText(/fetched via/i)).toBeInTheDocument();

    // Wait for loading to finish so there are no pending state updates
    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());
  });
});

// Keep the axios import used for MockAdapter visible to TypeScript
void axios;
