import { apiCaller } from '@/apis';
import { API_URL } from '@/constants/env';

export async function fetcher<T = unknown>(path: string): Promise<T> {
  try {
    const response = await apiCaller.get<T>(`${API_URL}/${path}`);
    return response.data;
  } catch (e) {
    throw e;
  }
}
