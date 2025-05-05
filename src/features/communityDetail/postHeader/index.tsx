'use client';

import { CommunityPost } from '@/globalState/tanstackQueryHooks/communityList';
import Image from 'next/image';
import styles from './index.module.scss';

interface PostHeaderProps {
  post: CommunityPost | undefined;
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <div className={styles.container}>
      <div className={styles.container__title}>{post?.title}</div>
      <div className={styles.container__meta}>
        <span className={styles.container__meta__username}>
          {post?.author?.nickname}
        </span>
        <Image
          src={'/images/community-detail/separator.svg'}
          className={styles.container__meta__separator}
          alt="profile"
          width={2}
          height={20}
        />
        <span className={styles.container__meta__createdAt}>
          {post?.createdAt?.slice(2, 10).replace(/-/g, '.')}
        </span>
      </div>
    </div>
  );
}
