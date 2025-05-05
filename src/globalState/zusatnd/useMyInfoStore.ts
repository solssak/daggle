import { create } from 'zustand';

interface MyInfoState {
  userId: string | null;
  setUserId: (userId: string | null) => void;
}

export const useMyInfoStore = create<MyInfoState>((set) => ({
  userId: null,
  setUserId: (userId) => set({ userId }),
}));
