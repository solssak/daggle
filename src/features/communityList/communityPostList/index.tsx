'use client';

import Button from '@/features/ui/Button/Button';
import { useGetCommunityList } from '@/globalState/tanstackQueryHooks/community';
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
import { COMMUNITY_LIST_CONSTANTS } from '../constants';

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

  const limit = COMMUNITY_LIST_CONSTANTS.POST_LIST.PAGINATION.LIMIT;

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
    if (newPage === page) return;
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
        <span className={styles.container__header__title}>
          {COMMUNITY_LIST_CONSTANTS.POST_LIST.TITLE}
        </span>
        {!isMobile && (
          <Button variant="purple" onClick={handleWriteClick}>
            {COMMUNITY_LIST_CONSTANTS.POST_LIST.BUTTON.WRITE}
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
            src={COMMUNITY_LIST_CONSTANTS.POST_LIST.MOBILE.WRITE_BUTTON.IMAGE}
            alt={COMMUNITY_LIST_CONSTANTS.POST_LIST.MOBILE.WRITE_BUTTON.ALT}
            width={COMMUNITY_LIST_CONSTANTS.POST_LIST.MOBILE.WRITE_BUTTON.WIDTH}
            height={
              COMMUNITY_LIST_CONSTANTS.POST_LIST.MOBILE.WRITE_BUTTON.HEIGHT
            }
          />
        </button>
      )}

      {isMobile && <div ref={ref} style={{ height: '20px' }} />}
    </div>
  );
}
