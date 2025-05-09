import { post } from '@/lib/tanstackQuery/post';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type LoginResponse = {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user: {
    loginId: string;
    profileImageUrl: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    id: string;
    nickname: string;
  };
};

export const useLogin = () => {
  return useMutation<
    LoginResponse,
    AxiosError,
    { loginId: string; password: string }
  >({
    mutationFn: (payload: { loginId: string; password: string }) =>
      post('api/auth/login', payload),
  });
};

export const useLogout = () => {
  return useMutation<void, AxiosError, { refreshToken: string }>({
    mutationFn: (payload: { refreshToken: string }) =>
      post('api/auth/logout', payload),
  });
};
