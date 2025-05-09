import { create } from 'zustand';

interface WriteStore {
  title: string;
  content: string;
  titleError: boolean;
  contentError: boolean;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setTitleError: (error: boolean) => void;
  setContentError: (error: boolean) => void;
}

export const useWriteStore = create<WriteStore>((set) => ({
  title: '',
  content: '',
  titleError: false,
  contentError: false,
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setTitleError: (error) => set({ titleError: error }),
  setContentError: (error) => set({ contentError: error }),
}));
