'use client';

import Image from 'next/image';
import styles from './index.module.scss';

export interface CommunityPostProps {
  id: string;
  title: string;
  createdAt: string;
  commentCount: number;
}

export default function CommunityPost({
  id,
  title,
  createdAt,
  commentCount,
}: CommunityPostProps) {
  return (
    <li className={styles.container} key={id}>
      <article className={styles.container__content}>
        <h3 className={styles.container__content__title}>{title}</h3>
        <footer className={styles.container__content__meta}>
          <time
            className={styles.container__content__meta__date}
            dateTime={createdAt}
          >
            {createdAt?.slice(2, 10).replace(/-/g, '.')}
          </time>
          <div className={styles.container__content__meta__item__comment}>
            <Image
              src={'/images/community-list/comment.svg'}
              alt="comment"
              width={19}
              height={18}
            />
            <span
              className={styles.container__content__meta__item__comment__count}
            >
              {commentCount}
            </span>
          </div>
          <Image
            className={styles.container__content__meta__item__profile}
            src={'/images/community-list/profile.svg'}
            alt="profile"
            width={24}
            height={24}
          />
        </footer>
      </article>
    </li>
  );
}
