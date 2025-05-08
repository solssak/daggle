import { useLogout } from '@/globalState/tanstackQueryHooks/Login';
import { useMyInfoStore } from '@/globalState/zusatnd/useMyInfoStore';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useUserInfo = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { userId, nickname, profileImageUrl, refreshToken, clear } =
    useMyInfoStore();

  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    if (typeof window !== 'undefined' && refreshToken) {
      logout({ refreshToken });
      clear();
    }
    queryClient.clear();
    router.push('/');
  };

  return {
    userId,
    nickname,
    profileImageUrl,
    handleLogout,
  };
};
