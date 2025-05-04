import { queryKeys } from '@/constants/query.keys';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/lib/tanstackQuery/fetcher';

export interface CommunityPost {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  viewCount: number;
  commentCount: number;
  isAuthor: boolean;
}

export interface CommunityListResponse {
  items: CommunityPost[];
  meta: {
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
  };
}

export const useGetCommunityList = (page: number, limit: number) => {
  const api = () =>
    fetcher<CommunityListResponse>(`api/posts?page=${page}&limit=${limit}`);

  return useQuery({
    queryKey: [queryKeys.community.list, page, limit],
    queryFn: api,
  });
};
