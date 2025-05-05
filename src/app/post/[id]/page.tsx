'use client';

import CommunityDetail from '@/features/communityDetail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function PostPage() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CommunityDetail />
    </QueryClientProvider>
  );
}
