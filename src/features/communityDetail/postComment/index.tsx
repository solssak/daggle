'use client';

import Button from '@/features/ui/Button/Button';
import {
  CommunityPostComment,
  useCreateCommunityPostComment,
  useDeleteCommunityPostComment,
  useUpdateCommunityPostComment,
} from '@/globalState/tanstackQueryHooks/communityList';
import { useMyInfoStore } from '@/globalState/zusatnd/useMyInfoStore';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import styles from './index.module.scss';
import { COMMUNITY_DETAIL_CONSTANTS } from '../constants';

interface CommentProps {
  comments: CommunityPostComment[] | undefined;
}

export default function PostComment({ comments }: CommentProps) {
  const [content, setContent] = useState<string>('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>('');
  const { id } = useParams();
  const userId = useMyInfoStore((state) => state.userId);

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
                  src={COMMUNITY_DETAIL_CONSTANTS.IMAGE.PROFILE.SRC}
                  alt={COMMUNITY_DETAIL_CONSTANTS.IMAGE.PROFILE.ALT}
                  width={COMMUNITY_DETAIL_CONSTANTS.IMAGE.PROFILE.WIDTH}
                  height={COMMUNITY_DETAIL_CONSTANTS.IMAGE.PROFILE.HEIGHT}
                />
                {comment.user.nickname ||
                  COMMUNITY_DETAIL_CONSTANTS.TEXT.DEFAULT_USERNAME}
              </div>
              {comment.user.id === userId && (
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
                        {COMMUNITY_DETAIL_CONSTANTS.TEXT.BUTTON.SAVE}
                      </button>
                      <button
                        className={styles.container__comment__actions__cancel}
                        onClick={handleCancelEdit}
                      >
                        {COMMUNITY_DETAIL_CONSTANTS.TEXT.BUTTON.CANCEL}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className={styles.container__comment__actions__edit}
                        onClick={() => handleEditClick(comment)}
                      >
                        {COMMUNITY_DETAIL_CONSTANTS.TEXT.BUTTON.EDIT}
                      </button>
                      <button
                        className={styles.container__comment__actions__delete}
                        onClick={() => {
                          if (
                            confirm(
                              COMMUNITY_DETAIL_CONSTANTS.TEXT.CONFIRM
                                .DELETE_COMMENT,
                            )
                          ) {
                            deleteComment(comment.id);
                          }
                        }}
                      >
                        {COMMUNITY_DETAIL_CONSTANTS.TEXT.BUTTON.DELETE}
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
          placeholder={COMMUNITY_DETAIL_CONSTANTS.TEXT.COMMENT.PLACEHOLDER}
        />
        <Button
          variant="grayscale1"
          size="md"
          onClick={() => {
            createComment(content);
            setContent('');
          }}
          disabled={!userId}
        >
          {COMMUNITY_DETAIL_CONSTANTS.TEXT.BUTTON.SUBMIT}
        </Button>
      </div>
    </ul>
  );
}
