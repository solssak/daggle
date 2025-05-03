import { AxiosRequestConfig } from 'axios';
import { API_URL } from '../../constants/env';
import { apiCaller } from '@/apis';

export async function post<T = unknown>(
  path: string,
  payload?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  try {
    const response = await apiCaller.post<T>(
      `${API_URL}/${path}`,
      payload,
      config,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
