'use client';

import { memo, useMemo } from 'react';
import styles from './index.module.scss';

interface PageSelectorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const VISIBLE_PAGES = 5;

function PageSelector({
  currentPage,
  totalPages,
  onPageChange,
}: PageSelectorProps) {
  // 페이지 번호 배열 생성 (현재 페이지 기준으로 보여줄 페이지 수)
  const pageNumbers = useMemo(() => {
    const startPage = Math.max(1, currentPage - Math.floor(VISIBLE_PAGES / 2));
    const endPage = Math.min(totalPages, startPage + VISIBLE_PAGES - 1);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index,
    );
  }, [currentPage, totalPages]);

  return (
    <nav className={styles.pagination} aria-label="페이지 네비게이션">
      <button
        className={styles.pagination__button}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="이전 페이지"
      >
        {'<'}
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`${styles.pagination__button} ${
            currentPage === pageNumber
              ? styles['pagination__button--active']
              : ''
          }`}
          onClick={() => onPageChange(pageNumber)}
          aria-current={currentPage === pageNumber ? 'page' : undefined}
        >
          {pageNumber}
        </button>
      ))}
      <button
        className={styles.pagination__button}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="다음 페이지"
      >
        {'>'}
      </button>
    </nav>
  );
}

export default memo(PageSelector);
