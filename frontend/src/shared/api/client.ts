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
      if (status === 401) {
        window.location.href = '/login';
      }
      if (status === 419) {
        window.location.reload();
      }
    }
    return Promise.reject(err);
  }
);
