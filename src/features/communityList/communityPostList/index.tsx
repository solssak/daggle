'use client';

import Button from '@/features/ui/Button/Button';
import { useGetCommunityList } from '@/globalState/tanstackQueryHooks/communityList';
import { useState } from 'react';
import CommunityPost from './communityPost';
import styles from './index.module.scss';
import PageSelector from './pageSelector';
import { useRouter } from 'next/navigation';

export default function CommunityPostList() {
  const [page, setPage] = useState<number>(1);
  const limit = 10;
  const { data } = useGetCommunityList(page, limit);
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleWriteClick = () => {
    const accessToken =
      typeof window !== 'undefined' && localStorage.getItem('accessToken');

    if (accessToken) {
      router.push('/post/write');
    } else {
      router.push('/auth');
    }
  };

  return (
    <div className={styles.container}>
      {/* 게시판 헤더 */}
      <div className={styles.container__header}>
        <span className={styles.container__header__title}>게시판</span>
        <Button variant="purple" onClick={handleWriteClick}>
          글쓰기
        </Button>
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
