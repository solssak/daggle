import axios, { AxiosError, AxiosInstance } from 'axios';
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

          const currentState = userStorage ? JSON.parse(userStorage).state : {};
          localStorage.setItem(
            'user-storage',
            JSON.stringify({
              state: {
                ...currentState,
                accessToken,
                refreshToken: newRefreshToken,
              },
            }),
          );

          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${accessToken}`,
          };
          return apiCaller(originalRequest);
        } catch (refreshError) {
          if (
            refreshError instanceof AxiosError &&
            refreshError.response?.status === 401
          ) {
            localStorage.removeItem('user-storage');
            window.location.href = '/login';
          } else {
            console.error('123123:', refreshError);
          }
        }
      }
    }
    return Promise.reject(error);
  },
);
