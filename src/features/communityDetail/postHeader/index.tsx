'use client';

import {
  CommunityPost,
  useDeleteCommunityPost,
} from '@/globalState/tanstackQueryHooks/communityList';
import Image from 'next/image';
import styles from './index.module.scss';
import { useRouter } from 'next/navigation';
import { COMMUNITY_DETAIL_CONSTANTS } from '../constants';

interface PostHeaderProps {
  post: CommunityPost | undefined;
}

export default function PostHeader({ post }: PostHeaderProps) {
  const { mutate: deletePost } = useDeleteCommunityPost(post?.id as string);
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.container__title}>{post?.title}</div>
      <div className={styles.container__bottom}>
        <div className={styles.container__bottom__meta}>
          <span className={styles.container__bottom__meta__username}>
            {post?.author?.nickname ||
              COMMUNITY_DETAIL_CONSTANTS.TEXT.DEFAULT_USERNAME}
          </span>
          <Image
            src={COMMUNITY_DETAIL_CONSTANTS.IMAGE.SEPARATOR.SRC}
            className={styles.container__bottom__meta__separator}
            alt={COMMUNITY_DETAIL_CONSTANTS.IMAGE.SEPARATOR.ALT}
            width={COMMUNITY_DETAIL_CONSTANTS.IMAGE.SEPARATOR.WIDTH}
            height={COMMUNITY_DETAIL_CONSTANTS.IMAGE.SEPARATOR.HEIGHT}
          />
          <span className={styles.container__bottom__meta__createdAt}>
            {post?.createdAt?.slice(2, 10).replace(/-/g, '.')}
          </span>
        </div>
        {post?.isAuthor && (
          <div className={styles.container__bottom__actions}>
            <button
              className={styles.container__bottom__actions__edit}
              onClick={() => {
                router.push(`/post/write/${post?.id}`);
              }}
            >
              {COMMUNITY_DETAIL_CONSTANTS.TEXT.BUTTON.EDIT}
            </button>
            <button
              className={styles.container__bottom__actions__delete}
              onClick={() => {
                if (
                  confirm(COMMUNITY_DETAIL_CONSTANTS.TEXT.CONFIRM.DELETE_POST)
                ) {
                  deletePost();
                  router.push('/');
                }
              }}
            >
              {COMMUNITY_DETAIL_CONSTANTS.TEXT.BUTTON.DELETE}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
