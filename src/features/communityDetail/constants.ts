export const COMMUNITY_DETAIL_CONSTANTS = {
  IMAGE: {
    COMMENT: {
      DEFAULT: '/images/community-detail/comment.svg',
      ALT: '댓글 아이콘',
      WIDTH: 19,
      HEIGHT: 18,
    },
    SEPARATOR: {
      SRC: '/images/community-detail/separator.svg',
      ALT: 'profile',
      WIDTH: 2,
      HEIGHT: 20,
    },
    PROFILE: {
      SRC: '/images/community-list/profile.svg',
      ALT: 'profile',
      WIDTH: 24,
      HEIGHT: 24,
    },
  },
  TEXT: {
    DEFAULT_USERNAME: '익명유저',
    COMMENT: {
      COUNT_SUFFIX: '개',
      PLACEHOLDER: '댓글을 통해 자유롭게 의견을 나눠보세요',
    },
    BUTTON: {
      EDIT: '수정',
      DELETE: '삭제',
      SAVE: '저장',
      CANCEL: '취소',
      SUBMIT: '등록',
    },
    CONFIRM: {
      DELETE_POST: '게시글을 삭제하시겠습니까?',
      DELETE_COMMENT: '댓글을 삭제하시겠습니까?',
    },
  },
} as const;
