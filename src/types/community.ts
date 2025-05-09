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
