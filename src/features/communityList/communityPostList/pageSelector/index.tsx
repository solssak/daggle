'use client';

import Image from 'next/image';
import { memo, useMemo } from 'react';
import styles from './index.module.scss';
import { COMMUNITY_LIST_CONSTANTS } from '../../constants';

interface PageSelectorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function PageSelector({
  currentPage,
  totalPages,
  onPageChange,
}: PageSelectorProps) {
  const pageNumbers = useMemo(() => {
    const startPage = Math.max(
      1,
      currentPage -
        Math.floor(
          COMMUNITY_LIST_CONSTANTS.POST_LIST.PAGINATION.VISIBLE_PAGES / 2,
        ),
    );
    const endPage = Math.min(
      totalPages,
      startPage +
        COMMUNITY_LIST_CONSTANTS.POST_LIST.PAGINATION.VISIBLE_PAGES -
        1,
    );

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index,
    );
  }, [currentPage, totalPages]);

  return (
    <nav className={styles.pagination}>
      <button
        className={styles.pagination__button}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <Image
          src={COMMUNITY_LIST_CONSTANTS.POST_LIST.PAGINATION.ARROW.LEFT.SRC}
          alt={COMMUNITY_LIST_CONSTANTS.POST_LIST.PAGINATION.ARROW.LEFT.ALT}
          width={COMMUNITY_LIST_CONSTANTS.POST_LIST.PAGINATION.ARROW.LEFT.WIDTH}
          height={
            COMMUNITY_LIST_CONSTANTS.POST_LIST.PAGINATION.ARROW.LEFT.HEIGHT
          }
        />
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`${styles.pagination__button__number} ${
            currentPage === pageNumber
              ? styles['pagination__button__number--active']
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
        onClick={() => onPageChange(currentPage + 1)}
      >
        <Image
          src={COMMUNITY_LIST_CONSTANTS.POST_LIST.PAGINATION.ARROW.RIGHT.SRC}
          alt={COMMUNITY_LIST_CONSTANTS.POST_LIST.PAGINATION.ARROW.RIGHT.ALT}
          width={
            COMMUNITY_LIST_CONSTANTS.POST_LIST.PAGINATION.ARROW.RIGHT.WIDTH
          }
          height={
            COMMUNITY_LIST_CONSTANTS.POST_LIST.PAGINATION.ARROW.RIGHT.HEIGHT
          }
        />
      </button>
    </nav>
  );
}

export default memo(PageSelector);
