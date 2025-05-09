'use client';

import Button from '../ui/Button/Button';
import styles from './index.module.scss';
import { useEffect } from 'react';
import TitleInput from './titleInput';
import ContentTextarea from './contentTextarea';
import {
  useCreateCommunityPost,
  useGetCommunityPost,
} from '@/globalState/tanstackQueryHooks/communityList';
import { useParams, useRouter } from 'next/navigation';
import { useMyInfoStore } from '@/globalState/zusatnd/useMyInfoStore';
import { useWriteStore } from '@/globalState/zusatnd/useWriteStore';
import useMedia from '@/hooks/useMedia';

export default function Write() {
  const maxContentLength = 300;
  const router = useRouter();
  const params = useParams();
  const postId = params?.id as string;
  const isEditPage = !!postId;

  const { data: post } = useGetCommunityPost(postId);
  const { accessToken } = useMyInfoStore();
  const { isMobile } = useMedia();

  const {
    title,
    content,
    titleError,
    contentError,
    setTitle,
    setContent,
    setTitleError,
    setContentError,
  } = useWriteStore();

  const isContentChanged =
    isEditPage && post && (title !== post.title || content !== post.content);

  useEffect(() => {
    if (typeof window !== 'undefined' && !accessToken) {
      router.replace('/auth');
    }
  }, [router]);

  useEffect(() => {
    if (isEditPage && post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [isEditPage, post]);

  const { mutate: createCommunityPost } = useCreateCommunityPost({
    onSuccess: (data) => {
      router.push(`/post/${data.id}`);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleSubmit = () => {
    let hasError = false;
    if (title.trim().length < 1) {
      setTitleError(true);
      hasError = true;
    } else {
      setTitleError(false);
    }
    if (content.trim().length < 5) {
      setContentError(true);
      hasError = true;
    } else {
      setContentError(false);
    }
    if (hasError) return;

    if (isEditPage) {
      updateCommunityPost({ title, content });
      router.push(`/post/${postId}`);
    } else {
      createCommunityPost({ title, content });
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.container__wrapper}>
        {!isMobile && (
          <h1 className={styles.container__wrapper__title}>
            {isEditPage ? '게시글 수정' : '게시글 작성'}
          </h1>
        )}
        <form className={styles.container__wrapper__form}>
          <TitleInput value={title} onChange={setTitle} hasError={titleError} />
          <ContentTextarea
            value={content}
            onChange={setContent}
            hasError={contentError}
            maxLength={maxContentLength}
          />
        </form>
      </div>
      {!isMobile && (
        <Button
          className={styles.container__button}
          size="lg"
          onClick={handleSubmit}
          disabled={isEditPage && !isContentChanged}
        >
          {isEditPage ? '수정하기' : '등록하기'}
        </Button>
      )}
    </section>
  );
}
