## 🔘 프로젝트 소개
Daggle은 커뮤니티 게시판 기능을 중심으로 한 React 기반의 웹 애플리케이션입니다.   
게시글 목록, 작성, 상세 조회 기능을 포함하며, Tanstack-query를 통해 클라이언트-서버 간 데이터 흐름을 체계적으로 구성했습니다.   
사전 안내된 내용에 따라 제한된 기간 내에 구현되었으며, 구현 사항을 모두 충족합니다.

`pnpm run dev`를 통해 개발서버 실행이 가능합니다.

## 🔘 배포 링크
[Daggle 바로 가기](https://daggle-da75p6v6p-solssaks-projects.vercel.app/)   
배포 방식: Vercel

## 🔘 테스트 계정
ID: `daggle1234`   
PW: `gswoong1234`

## 🔘 사용 기술
| 분류     | 기술                                |
| -------- | --------------------------------- |
| 패키지매니저 | pnpm                             |
| 프레임워크 | Next.js                            |
| 스타일링  | SCSS (Sass)                        |
| 상태 관리 | Zustand                            |
| 데이터 패칭 | TanStack Query                   |

## 🔘 폴더구조
```
src
├── constants           # 전역 상수 정의
├── features            # 도메인(기능) 단위 폴더
│   ├── auth            # 로그인 기능 관련 로직
│   ├── communityDetail # 게시글 상세 페이지 관련 로직
│   ├── communityList   # 커뮤니티 리스트 페이지 관련 로직
│   └── write           # 게시글 작성 및 수정 관련 로직
├── globalState         # Tanstack-query, Zustand 전역 상태 관리 로직
├── hooks               # 커스텀 훅 모음
├── lib                 # API 호출 유틸, 공통 로직 함수
├── modules             # 외부 라이브러리 설정 및 모듈화된 로직
├── types               # 전역 타입 정의 (interface, type 등)
└── ui                  # 공통 UI 컴포넌트 (버튼, 입력창 등)
```
## 🔘 전달사항
### 🔘 구현 전달사항
1. SCSS(SASS) 환경 세팅   
    
      스타일 시스템의 모듈화 및 개발 생산성 향상을 위해 SCSS 환경을 설정했습니다.
      `Nextjs`의 `sassOptions` 통해 공통 스타일을 전역에서 사용할 수 있도록 설정하고,
      `@import` 문법을 활용해 `_commons.scss` 파일을 모든 SCSS 파일에서 자동으로 불러올 수 있도록 구성했습니다.

2. 반응형 처리

      `react-responsive`를 활용했습니다.   
      핵심은 단순히 CSS로 display: none 처리하는 방식이 아니라, 조건에 맞지 않으면 아예 DOM에 렌더링되지 않도록 구성한 부분입니다.
      
      예를 들어,   
      모바일 전용 컴포넌트는 데스크탑 해상도일 경우 렌더링 자체를 하지 않으며,   
      데스크탑 전용 컴포넌트도 모바일에서는 DOM에서 제외됩니다.   
      
      이러한 방식은 불필요한 렌더링을 줄이고, 퍼포먼스 측면에서도 더 효율적입니다.

### 🔘 api 관련 제약 사항
[Swagger API](https://api.daggle.io/api-docs#/%EA%B2%8C%EC%8B%9C%EA%B8%80%20API/PostController_getPostWithDetails)   

- `/api/posts/{id}`[게시판] 게시글 상세: 회원 유저 전용 api로 비로그인 상태에서는 접근이 불가합니다.(`401`응답)   
- `/api/auth/refresh` 토큰 재발급: Swagger에 명시되어 있으나 실제로는 `404`를 응답합니다.
