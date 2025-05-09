'use client';

import Button from '@/features/ui/Button/Button';
import { useGetCommunityList } from '@/globalState/tanstackQueryHooks/communityList';
import { useState, useEffect } from 'react';
import CommunityPost from './communityPost';
import styles from './index.module.scss';
import PageSelector from './pageSelector';
import { useRouter } from 'next/navigation';
import { useMyInfoStore } from '@/globalState/zusatnd/useMyInfoStore';
import useMedia from '@/hooks/useMedia';
import CommunityPostMobile from './communityPost/communityPostMobile';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

interface CommunityPostItem {
  id: string;
  title: string;
  createdAt: string;
  commentCount: number;
  isAuthor: boolean;
}

export default function CommunityPostList() {
  const router = useRouter();

  const [page, setPage] = useState<number>(1);
  const [allItems, setAllItems] = useState<CommunityPostItem[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const limit = 10;

  const { data, isLoading } = useGetCommunityList(page, limit);
  const { accessToken } = useMyInfoStore();
  const { isMobile } = useMedia();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (data?.items) {
      setAllItems((prev) => {
        const newItems = data.items.filter(
          (item) => !prev.some((prevItem) => prevItem.id === item.id),
        );
        return [...prev, ...newItems];
      });
    }
  }, [data?.items]);

  useEffect(() => {
    if (
      inView &&
      data?.meta &&
      data.meta.currentPage < data.meta.totalPages &&
      !isLoading &&
      !isLoadingMore
    ) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setPage((prev) => prev + 1);
        setIsLoadingMore(false);
      }, 1000);
    }
  }, [inView, data?.meta, isLoading, isLoadingMore]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setAllItems([]);
  };

  const handleWriteClick = () => {
    if (typeof window !== 'undefined' && accessToken) {
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
        {!isMobile && (
          <Button variant="purple" onClick={handleWriteClick}>
            글쓰기
          </Button>
        )}
      </div>
      {/* 게시판 목록 */}
      <ul className={styles.container__list}>
        {allItems.map((item) =>
          !isMobile ? (
            <CommunityPost
              key={item.id}
              id={item.id}
              title={item.title}
              createdAt={item.createdAt}
              commentCount={item.commentCount}
            />
          ) : (
            <CommunityPostMobile
              key={item.id}
              id={item.id}
              title={item.title}
              createdAt={item.createdAt}
              commentCount={item.commentCount}
              username={item.isAuthor}
            />
          ),
        )}
      </ul>

      {/* 페이지 선택 */}
      {!isMobile && (
        <PageSelector
          currentPage={page}
          totalPages={data?.meta.totalPages || 1}
          onPageChange={handlePageChange}
        />
      )}

      {/* 모바일 화면에서만 글쓰기 float 버튼 */}
      {isMobile && (
        <button
          className={styles.container__writeButton}
          onClick={handleWriteClick}
        >
          <Image
            src="/images/community-list/mobile_write_button.svg"
            alt="글쓰기"
            width={24}
            height={24}
          />
        </button>
      )}

      {isMobile && <div ref={ref} style={{ height: '20px' }} />}
    </div>
  );
}
