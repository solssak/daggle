'use client';

import Write from '@/features/write';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function PostWritePage() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Write />
    </QueryClientProvider>
  );
}
