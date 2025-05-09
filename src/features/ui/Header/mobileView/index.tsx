'use client';

import Image from 'next/image';
import styles from '../index.module.scss';
import Sidebar from './Sidebar';
import { usePathname, useRouter, useParams } from 'next/navigation';
import {
  useCreateCommunityPost,
  useUpdateCommunityPost,
} from '@/globalState/tanstackQueryHooks/communityList';
import { useWriteStore } from '@/globalState/zusatnd/useWriteStore';

interface MobileViewProps {
  userId?: string;
  nickname?: string;
  profileImageUrl?: string;
  onLogout: () => void;
  onNavigate: (path: string) => void;
  isSidebarOpen: boolean;
  onSidebarOpen: () => void;
  onSidebarClose: () => void;
}

export default function MobileView({
  userId,
  nickname,
  profileImageUrl,
  onLogout,
  onNavigate,
  isSidebarOpen,
  onSidebarOpen,
  onSidebarClose,
}: MobileViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const postId = params?.id as string;
  const isEditPage = !!postId;

  const { title, content, setTitleError, setContentError } = useWriteStore();

  const { mutate: updateCommunityPost } = useUpdateCommunityPost(postId);

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
    <>
      {pathname.startsWith('/post') ? (
        <>
          <button className={styles.header__container__hamburger}>
            <Image
              src="/images/icons/arrow-back.svg"
              alt="back"
              width={24}
              height={24}
              className={styles.header__container__hamburger__backButton}
              onClick={() => {
                router.back();
              }}
            />
            {pathname.startsWith('/post/write') && (
              <span className={styles.header__container__hamburger__writeTitle}>
                {isEditPage ? '게시글 수정' : '게시글 작성'}
              </span>
            )}
          </button>
          {pathname.startsWith('/post/write') && (
            <button
              className={styles.header__container__writeButton}
              onClick={handleSubmit}
            >
              {isEditPage ? '수정' : '등록'}
            </button>
          )}
        </>
      ) : (
        <button
          className={styles.header__container__hamburger}
          onClick={() => {
            onSidebarOpen();
          }}
        >
          <Image
            src="/images/icons/hamburger.svg"
            alt="menu"
            width={24}
            height={24}
          />
        </button>
      )}

      <Sidebar
        isOpen={isSidebarOpen}
        userId={userId}
        nickname={nickname}
        profileImageUrl={profileImageUrl}
        onClose={() => {
          onSidebarClose();
        }}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />
    </>
  );
}
