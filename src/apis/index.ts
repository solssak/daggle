import axios, { AxiosInstance } from 'axios';
import { API_URL } from '@/constants/env';

export const apiCaller: AxiosInstance = axios.create({
  baseURL: API_URL,
});

apiCaller.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
