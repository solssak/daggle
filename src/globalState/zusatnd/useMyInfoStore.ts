import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type MyInfoState = {
  userId: string | null;
  nickname: string | null;
  profileImageUrl: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUserStorage: <
    K extends keyof Omit<MyInfoState, 'setUserStorage' | 'clear'>,
  >(
    key: K,
    value: MyInfoState[K],
  ) => void;
  clear: () => void;
};

export const useMyInfoStore = create<MyInfoState>()(
  persist(
    (set) => ({
      userId: null,
      nickname: null,
      profileImageUrl: null,
      accessToken: null,
      refreshToken: null,
      setUserStorage: (key, value) => set({ [key]: value }),
      clear: () =>
        set({
          userId: null,
          nickname: null,
          profileImageUrl: null,
          accessToken: null,
          refreshToken: null,
        }),
    }),
    {
      name: 'user-storage',
    },
  ),
);
