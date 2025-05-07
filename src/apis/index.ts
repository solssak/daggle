import axios, { AxiosInstance } from 'axios';
import { API_URL } from '@/constants/env';

export const apiCaller: AxiosInstance = axios.create({
  baseURL: API_URL,
});

apiCaller.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const userStorage = localStorage.getItem('user-storage');
    const accessToken = userStorage
      ? JSON.parse(userStorage).state.accessToken
      : null;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
});

apiCaller.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const userStorage = localStorage.getItem('user-storage');
      const refreshToken = userStorage
        ? JSON.parse(userStorage).state.refreshToken
        : null;

      if (refreshToken) {
        try {
          const res = await axios.post(`${API_URL}/api/auth/refresh`, {
            refreshToken,
          });

          const { accessToken, refreshToken: newRefreshToken } = res.data;
          localStorage.setItem(
            'user-storage',
            JSON.stringify({
              accessToken,
              refreshToken: newRefreshToken,
            }),
          );

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiCaller(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('user-storage');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  },
);
