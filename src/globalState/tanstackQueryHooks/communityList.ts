import { queryKeys } from '@/constants/query.keys';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from '@tanstack/react-query';
import { fetcher } from '@/lib/tanstackQuery/fetcher';
import { post } from '@/lib/tanstackQuery/post';

export interface CommunityPost {
  author: {
    createdAt: string;
    deletedAt: string;
    id: string;
    loginId: string;
    nickname: string;
    profileImageUrl: string;
    updatedAt: string;
  };
  commentCount: number;
  content: string;
  createdAt: string;
  id: string;
  isAuthor: boolean;
  title: string;
  updatedAt: string;
  viewCount: number;
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

export interface CommunityPostComment {
  content: string;
  createdAt: string;
  id: string;
  updatedAt: string;
  user: {
    id: string;
    nickname: string;
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

export const useGetCommunityPost = (id: string) => {
  const api = () => fetcher<CommunityPost>(`api/posts/${id}`);

  return useQuery({
    queryKey: [queryKeys.community.post, id],
    queryFn: api,
  });
};

export const useGetCommunityPostComments = (id: string) => {
  const api = () => fetcher<CommunityPostComment[]>(`api/posts/${id}/comments`);

  return useQuery({
    queryKey: [queryKeys.community.post, id, 'comments'],
    queryFn: api,
  });
};

export const useCreateCommunityPostComment = (id: string) => {
  const api = (content: string) =>
    post<CommunityPostComment>(`api/posts/${id}/comments`, { content });

  return useMutation({ mutationFn: api });
};
export const useCreateCommunityPost = (
  options?: UseMutationOptions<
    CommunityPost,
    Error,
    { title: string; content: string }
  >,
) => {
  const api = ({ title, content }: { title: string; content: string }) =>
    post<CommunityPost>('api/posts', { title, content });

  return useMutation({ mutationFn: api, ...options });
};
