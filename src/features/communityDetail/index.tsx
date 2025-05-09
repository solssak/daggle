'use client';

import {
  useGetCommunityPost,
  useGetCommunityPostComments,
} from '@/globalState/tanstackQueryHooks/communityList';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import styles from './index.module.scss';
import PostComment from './postComment';
import PostHeader from './postHeader';

export default function CommunityDetail() {
  const { id } = useParams();
  const { data: post } = useGetCommunityPost(id as string);
  const { data: comments } = useGetCommunityPostComments(id as string);

  return (
    <div className={styles.container}>
      {/* 게시글 헤더 */}
      <PostHeader post={post} />
      {/* 게시글 본문 */}
      <div className={styles.container__content}>
        <div className={styles.container__content__text}>{post?.content}</div>
        <div className={styles.container__content__comment}>
          <Image
            src={
              post?.author.profileImageUrl
                ? post?.author.profileImageUrl
                : '/images/community-detail/comment.svg'
            }
            className={styles.container__content__commentIcon}
            alt="댓글 아이콘"
            width={19}
            height={18}
          />
          <div className={styles.container__content__commentCount}>
            {comments?.length}개
          </div>
        </div>
      </div>
      {/* 댓글 목록 */}
      <PostComment comments={comments} />
    </div>
  );
}
