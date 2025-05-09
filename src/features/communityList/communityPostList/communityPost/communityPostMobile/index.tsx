'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.scss';

export interface CommunityPostMobileProps {
  id: string;
  title: string;
  createdAt: string;
  commentCount: number;
  username: boolean;
}

export default function CommunityPostMobile({
  id,
  title,
  createdAt,
  commentCount,
  username,
}: CommunityPostMobileProps) {
  return (
    <li className={styles.container} key={id}>
      <Link href={`/post/${id}`} className={styles.container__link}>
        <article className={styles.container__content}>
          <h3 className={styles.container__content__title}>{title}</h3>
          <div className={styles.container__content__bottom}>
            <div className={styles.container__content__bottom__meta}>
              <time
                className={styles.container__content__bottom__meta__date}
                dateTime={createdAt}
              >
                {createdAt?.slice(2, 10).replace(/-/g, '.')}
              </time>
              <div className={styles.container__content__bottom__meta__comment}>
                <Image
                  src={'/images/community-list/comment.svg'}
                  alt="comment"
                  width={16}
                  height={16}
                />
                <span
                  className={
                    styles.container__content__bottom__meta__comment__count
                  }
                >
                  {commentCount}
                </span>
              </div>
            </div>
            <div className={styles.container__content__bottom__profile}>
              <Image
                src={'/images/community-list/profile.svg'}
                alt="profile"
                width={24}
                height={24}
              />
              <span className={styles.container__content__bottom__username}>
                {username || '익명유저'}
              </span>
            </div>
          </div>
        </article>
      </Link>
    </li>
  );
}
