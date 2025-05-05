'use client';

import Button from '@/features/ui/Button/Button';
import {
  CommunityPostComment,
  useCreateCommunityPostComment,
} from '@/globalState/tanstackQueryHooks/communityList';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import styles from './index.module.scss';

interface CommentProps {
  comments: CommunityPostComment[] | undefined;
}

export default function PostComment({ comments }: CommentProps) {
  const [content, setContent] = useState<string>('');
  const { id } = useParams();
  const { mutate: createComment } = useCreateCommunityPostComment(id as string);

  return (
    <ul className={styles.container}>
      {/* 댓글 목록 */}
      {comments?.map((comment) => (
        <div className={styles.container__comment} key={comment.id}>
          <div className={styles.container__comment__username}>
            <Image
              src={'/images/community-list/profile.svg'}
              alt="profile"
              width={24}
              height={24}
            />
            {comment.user.nickname}
          </div>
          <div className={styles.container__comment__content}>
            {comment.content}
          </div>
          <div className={styles.container__comment__createdAt}>
            {comment.createdAt?.slice(2, 10).replace(/-/g, '.')}
          </div>
        </div>
      ))}
      {/* 댓글 작성 */}
      <div className={styles.container__write}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.container__write__textarea}
          placeholder="댓글을 통해 자유롭게 의견을 나눠보세요"
        />
        <Button
          variant="grayscale1"
          size="md"
          onClick={() => createComment(content)}
        >
          등록
        </Button>
      </div>
    </ul>
  );
}
