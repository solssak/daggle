'use client';

import Auth from '@/features/auth/Auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function AuthPage() {
  const queryClient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Auth />
      </QueryClientProvider>
    </div>
  );
}
