import { api, csrf } from '@/shared/api/client';
import type { User } from '../types/User';

export async function login(email: string, password: string): Promise<User> {
  await csrf();
  const { data } = await api.post<{ data: User }>('/login', { email, password });
  return data.data;
}

export async function logout(): Promise<void> {
  await api.post('/logout');
}

export async function fetchMe(): Promise<User> {
  const { data } = await api.get<{ data: User }>('/me');
  return data.data;
}
