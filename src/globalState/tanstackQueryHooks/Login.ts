import { post } from '@/lib/tanstackQuery/post';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type LoginResponse = {
  tokens: {
    accessToken: string;
    refreshToken: string;
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
