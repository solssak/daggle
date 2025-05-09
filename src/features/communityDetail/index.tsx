'use client';

import {
  useGetCommunityPost,
  useGetCommunityPostComments,
} from '@/globalState/tanstackQueryHooks/community';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import styles from './index.module.scss';
import PostComment from './postComment';
import PostHeader from './postHeader';
import { COMMUNITY_DETAIL_CONSTANTS } from './constants';

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
                : COMMUNITY_DETAIL_CONSTANTS.IMAGE.COMMENT.DEFAULT
            }
            className={styles.container__content__commentIcon}
            alt={COMMUNITY_DETAIL_CONSTANTS.IMAGE.COMMENT.ALT}
            width={COMMUNITY_DETAIL_CONSTANTS.IMAGE.COMMENT.WIDTH}
            height={COMMUNITY_DETAIL_CONSTANTS.IMAGE.COMMENT.HEIGHT}
          />
          <div className={styles.container__content__commentCount}>
            {comments?.length}
            {COMMUNITY_DETAIL_CONSTANTS.TEXT.COMMENT.COUNT_SUFFIX}
          </div>
        </div>
      </div>
      {/* 댓글 목록 */}
      <PostComment comments={comments} />
    </div>
  );
}
