import { AxiosRequestConfig } from 'axios';
import { apiCaller } from '@/apis';

export async function patch<T, F = unknown>(
  path: string,
  payload?: any,
  params?: AxiosRequestConfig<F>,
) {
  try {
    const response = await apiCaller.patch<T>(path, payload, params);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
