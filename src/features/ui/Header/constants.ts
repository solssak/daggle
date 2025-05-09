export const HEADER_CONSTANTS = {
  LOGO: {
    SRC: '/images/logo/logo@3x.png',
    ALT: 'logo',
    WIDTH: 100,
    HEIGHT: 20,
  },
  PROFILE: {
    SRC: '/images/auth/profile.svg',
    ALT: 'profile',
    WIDTH: 32,
    HEIGHT: 32,
    DEFAULT: '/images/community-list/profile.svg',
  },
  MOBILE: {
    BACK: {
      SRC: '/images/icons/arrow-back.svg',
      ALT: 'back',
      WIDTH: 24,
      HEIGHT: 24,
    },
    MENU: {
      SRC: '/images/icons/hamburger.svg',
      ALT: 'menu',
      WIDTH: 24,
      HEIGHT: 24,
    },
    CLOSE: {
      SRC: '/images/icons/close.svg',
      ALT: 'close',
      WIDTH: 13,
      HEIGHT: 13,
    },
  },
  TEXT: {
    LOGIN: '로그인',
    WRITE: {
      TITLE: '게시글 작성',
      EDIT_TITLE: '게시글 수정',
      SUBMIT: '등록',
      EDIT: '수정',
    },
    POPUP: {
      ANONYMOUS: '익명유저',
      LOGOUT: '로그아웃',
      LOGOUT_CONFIRM: '로그아웃 하시겠습니까?',
    },
    NAVIGATION: {
      COMMUNITY: '커뮤니티',
    },
  },
  PATHS: {
    HOME: '/',
    AUTH: '/auth',
    POST: '/post',
    WRITE: '/post/write',
  },
  VALIDATION: {
    TITLE: {
      MIN_LENGTH: 1,
    },
    CONTENT: {
      MIN_LENGTH: 5,
    },
  },
  ERROR: {
    TITLE_REQUIRED: '제목을 입력해주세요.',
    CONTENT_REQUIRED: '내용을 5자 이상 입력해주세요.',
  },
} as const;
