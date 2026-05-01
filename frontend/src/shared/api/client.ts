import axios from 'axios';

export const api = axios.create({
  baseURL: '/api/v1',
  withCredentials: true,
  headers: { Accept: 'application/json' },
});

export async function csrf(): Promise<void> {
  await axios.get('/sanctum/csrf-cookie', { baseURL: '', withCredentials: true });
}

api.interceptors.response.use(
  (response) => response,
  (err: unknown) => {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;
      const url = err.config?.url ?? '';
      const onAuthPage = window.location.pathname.startsWith('/login');
      const isMeProbe = url.endsWith('/me');

      if (status === 401 && !onAuthPage && !isMeProbe) {
        window.location.href = '/login';
      }
      if (status === 419 && !onAuthPage) {
        window.location.reload();
      }
    }
    return Promise.reject(err);
  }
);
