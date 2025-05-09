'use client';

import {
  CommunityPost,
  useDeleteCommunityPost,
} from '@/globalState/tanstackQueryHooks/communityList';
import Image from 'next/image';
import styles from './index.module.scss';
import { useRouter } from 'next/navigation';

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
            {post?.author?.nickname || '익명유저'}
          </span>
          <Image
            src={'/images/community-detail/separator.svg'}
            className={styles.container__bottom__meta__separator}
            alt="profile"
            width={2}
            height={20}
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
              수정
            </button>
            <button
              className={styles.container__bottom__actions__delete}
              onClick={() => {
                if (confirm('게시글을 삭제하시겠습니까?')) {
                  deletePost();
                  router.push('/');
                }
              }}
            >
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
