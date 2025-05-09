import { apiCaller } from '@/apis';
import { queryKeys } from '@/constants/query.keys';
import { fetcher } from '@/lib/tanstackQuery/fetcher';
import { patch } from '@/lib/tanstackQuery/patch';
import { post } from '@/lib/tanstackQuery/post';
import { queryClient } from '@/lib/tanstackQuery/queryClient';
import {
  CommunityListResponse,
  CommunityPost,
  CommunityPostComment,
} from '@/types/community';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from '@tanstack/react-query';

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

  return useMutation({
    mutationFn: api,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.community.post, id, 'comments'],
      });
    },
  });
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

export const useUpdateCommunityPost = (id: string) => {
  const api = ({ title, content }: { title: string; content: string }) =>
    patch<CommunityPost>(`api/posts/${id}`, { title, content });

  return useMutation({ mutationFn: api });
};

export const useDeleteCommunityPost = (id: string) => {
  const api = () => apiCaller.delete(`api/posts/${id}`);

  return useMutation({ mutationFn: api });
};

export const useDeleteCommunityPostComment = (id: string) => {
  const api = (commentId: string) =>
    apiCaller.delete(`api/posts/${id}/comments/${commentId}`);

  return useMutation({
    mutationFn: api,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.community.post, id, 'comments'],
      });
    },
  });
};

export const useUpdateCommunityPostComment = (id: string) => {
  const api = ({
    commentId,
    content,
  }: {
    commentId: string;
    content: string;
  }) => patch(`api/posts/${id}/comments/${commentId}`, { content });

  return useMutation({
    mutationFn: api,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.community.post, id, 'comments'],
      });
    },
  });
};
