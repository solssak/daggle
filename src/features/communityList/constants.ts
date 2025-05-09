export const COMMUNITY_LIST_CONSTANTS = {
  TITLE: {
    SUBTITLE: '다글제작소',
    MAIN: {
      LINE1: '다글제작소의 과제전형에',
      LINE2: '오신 것을 환영합니다.',
    },
  },
  BANNER: {
    CARDS: [
      {
        title: '프린티',
        desc: '작가와 펜을 잇는 일러스트 출력 플랫폼',
        subtitle: '주식회사 프린티',
        image: '/images/community-list/Printi.png',
      },
      {
        title: 'G-Alpha',
        desc: '물류 관계자 비교견적 솔류션',
        subtitle: '(주)씨에어허브',
        image: '/images/community-list/G-alpha.png',
      },
      {
        title: 'KOSTA-EDU',
        desc: '학습관리 시스템',
        subtitle: '한국소프트웨어 기술진흥협회',
        image: '/images/community-list/Kosta.png',
      },
      {
        title: '달콤수학',
        desc: '엄마표 온라인 수학교육 강의 플랫폼',
        subtitle: '달콤교육',
        image: '/images/community-list/DalcomMath.png',
      },
    ],
    IMAGE: {
      SIZES: '319px',
    },
  },
  POST_LIST: {
    TITLE: '게시판',
    BUTTON: {
      WRITE: '글쓰기',
    },
    MOBILE: {
      WRITE_BUTTON: {
        IMAGE: '/images/community-list/mobile_write_button.svg',
        ALT: '글쓰기',
        WIDTH: 24,
        HEIGHT: 24,
      },
      COMMENT: {
        IMAGE: '/images/community-list/comment.svg',
        ALT: 'comment',
        WIDTH: 16,
        HEIGHT: 16,
      },
      PROFILE: {
        IMAGE: '/images/community-list/profile.svg',
        ALT: 'profile',
        WIDTH: 24,
        HEIGHT: 24,
      },
      DEFAULT_USERNAME: '익명유저',
    },
    PAGINATION: {
      LIMIT: 10,
      VISIBLE_PAGES: 5,
      ARROW: {
        LEFT: {
          SRC: '/images/community-list/arrow-left.svg',
          ALT: '이전 페이지',
          WIDTH: 16,
          HEIGHT: 16,
        },
        RIGHT: {
          SRC: '/images/community-list/arrow-right.svg',
          ALT: '다음 페이지',
          WIDTH: 16,
          HEIGHT: 16,
        },
      },
    },
  },
} as const;
