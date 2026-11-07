import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import MockAdapter from 'axios-mock-adapter';
import api from '@/lib/axios';

const mock = new MockAdapter(api);

beforeEach(() => {
  mock.reset();
  localStorage.clear();
});

afterEach(() => {
  mock.reset();
  localStorage.clear();
});

describe('axios instance', () => {
  it('uses the correct baseURL', () => {
    expect(api.defaults.baseURL).toBe('https://jsonplaceholder.typicode.com');
  });

  it('sets Content-Type to application/json by default', () => {
    expect(api.defaults.headers['Content-Type']).toBe('application/json');
  });

  it('makes a successful GET request and returns data', async () => {
    mock.onGet('/todos/1').reply(200, { id: 1, title: 'Test todo' });
    const { data } = await api.get('/todos/1');
    expect(data).toEqual({ id: 1, title: 'Test todo' });
  });

  it('attaches Bearer token from localStorage when present', async () => {
    localStorage.setItem('auth_token', 'my-secret-token');
    mock.onGet('/me').reply((config) => {
      expect(config.headers?.Authorization).toBe('Bearer my-secret-token');
      return [200, { user: 'me' }];
    });
    await api.get('/me');
  });

  it('does not attach Authorization header when no token is stored', async () => {
    mock.onGet('/public').reply((config) => {
      expect(config.headers?.Authorization).toBeUndefined();
      return [200, {}];
    });
    await api.get('/public');
  });

  it('removes auth_token from localStorage on a 401 response', async () => {
    localStorage.setItem('auth_token', 'expired-token');
    mock.onGet('/secure').reply(401);
    await expect(api.get('/secure')).rejects.toThrow();
    expect(localStorage.getItem('auth_token')).toBeNull();
  });

  it('rejects with an error on a 500 response', async () => {
    mock.onGet('/boom').reply(500);
    await expect(api.get('/boom')).rejects.toThrow();
  });
});
