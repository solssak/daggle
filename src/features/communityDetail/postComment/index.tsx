'use client';

import Button from '@/features/ui/Button/Button';
import {
  CommunityPostComment,
  useCreateCommunityPostComment,
  useDeleteCommunityPostComment,
  useUpdateCommunityPostComment,
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
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>('');
  const { id } = useParams();
  const myUserId =
    typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

  const { mutate: createComment } = useCreateCommunityPostComment(id as string);
  const { mutate: deleteComment } = useDeleteCommunityPostComment(id as string);
  const { mutate: updateComment } = useUpdateCommunityPostComment(id as string);

  const handleEditClick = (comment: CommunityPostComment) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditContent('');
  };

  return (
    <ul className={styles.container}>
      {/* 댓글 목록 */}
      {comments &&
        [...comments].reverse().map((comment) => (
          <div className={styles.container__comment} key={comment.id}>
            <div className={styles.container__comment__top}>
              <div className={styles.container__comment__username}>
                <Image
                  src={'/images/community-list/profile.svg'}
                  alt="profile"
                  width={24}
                  height={24}
                />
                {comment.user.nickname || '익명유저'}
              </div>
              {comment.user.id === myUserId && (
                <div className={styles.container__comment__actions}>
                  {editingCommentId === comment.id ? (
                    <>
                      <button
                        className={styles.container__comment__actions__save}
                        onClick={() => {
                          updateComment({
                            commentId: comment.id,
                            content: editContent,
                          });
                          setEditingCommentId(null);
                          setEditContent('');
                        }}
                      >
                        저장
                      </button>
                      <button
                        className={styles.container__comment__actions__cancel}
                        onClick={handleCancelEdit}
                      >
                        취소
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className={styles.container__comment__actions__edit}
                        onClick={() => handleEditClick(comment)}
                      >
                        수정
                      </button>
                      <button
                        className={styles.container__comment__actions__delete}
                        onClick={() => {
                          if (confirm('댓글을 삭제하시겠습니까?')) {
                            deleteComment(comment.id);
                          }
                        }}
                      >
                        삭제
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
            {editingCommentId === comment.id ? (
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className={styles.container__comment__editTextarea}
              />
            ) : (
              <div className={styles.container__comment__content}>
                {comment.content}
              </div>
            )}
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
          onClick={() => {
            createComment(content);
            setContent('');
          }}
        >
          등록
        </Button>
      </div>
    </ul>
  );
}
