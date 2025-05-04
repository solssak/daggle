'use client';

import { useState } from 'react';
import Button from '@/features/ui/Button/Button';
import styles from './index.module.scss';
import { useGetCommunityList } from '@/globalState/tanstackQueryHooks/communityList';
import CommunityPost from './communityPost';
import PageSelector from './pageSelector';

export default function CommunityPostList() {
  const [page, setPage] = useState<number>(1);
  const limit = 10;
  const { data } = useGetCommunityList(page, limit);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className={styles.container}>
      {/* 게시판 헤더 */}
      <div className={styles.container__header}>
        <span className={styles.container__header__title}>게시판</span>
        <Button variant="purple">글쓰기</Button>
      </div>
      {/* 게시판 목록 */}
      <ul className={styles.container__list}>
        {data?.items.map((item) => (
          <CommunityPost
            key={item.id}
            id={item.id}
            title={item.title}
            createdAt={item.createdAt}
            commentCount={item.commentCount}
          />
        ))}
      </ul>

      {/* 페이지 선택 */}
      <PageSelector
        currentPage={page}
        totalPages={data?.meta.totalPages || 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
