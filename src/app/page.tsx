'use client';

import CommunityList from '@/features/communityList';
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
export default function Home() {
  const queryClient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <CommunityList />
      </QueryClientProvider>
    </div>
  );
}
