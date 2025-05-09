'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.scss';
import { COMMUNITY_LIST_CONSTANTS } from '../../../constants';

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
                  src={COMMUNITY_LIST_CONSTANTS.POST_LIST.MOBILE.COMMENT.IMAGE}
                  alt={COMMUNITY_LIST_CONSTANTS.POST_LIST.MOBILE.COMMENT.ALT}
                  width={
                    COMMUNITY_LIST_CONSTANTS.POST_LIST.MOBILE.COMMENT.WIDTH
                  }
                  height={
                    COMMUNITY_LIST_CONSTANTS.POST_LIST.MOBILE.COMMENT.HEIGHT
                  }
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
                src={COMMUNITY_LIST_CONSTANTS.POST_LIST.MOBILE.PROFILE.IMAGE}
                alt={COMMUNITY_LIST_CONSTANTS.POST_LIST.MOBILE.PROFILE.ALT}
                width={COMMUNITY_LIST_CONSTANTS.POST_LIST.MOBILE.PROFILE.WIDTH}
                height={
                  COMMUNITY_LIST_CONSTANTS.POST_LIST.MOBILE.PROFILE.HEIGHT
                }
              />
              <span className={styles.container__content__bottom__username}>
                {username ||
                  COMMUNITY_LIST_CONSTANTS.POST_LIST.MOBILE.DEFAULT_USERNAME}
              </span>
            </div>
          </div>
        </article>
      </Link>
    </li>
  );
}
