'use client';

import Image from 'next/image';
import styles from '../index.module.scss';
import Sidebar from './Sidebar';
import { usePathname, useRouter, useParams } from 'next/navigation';
import {
  useCreateCommunityPost,
  useUpdateCommunityPost,
} from '@/globalState/tanstackQueryHooks/community';
import { useWriteStore } from '@/globalState/zusatnd/useWriteStore';
import { HEADER_CONSTANTS } from '../constants';

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
    if (title.trim().length < HEADER_CONSTANTS.VALIDATION.TITLE.MIN_LENGTH) {
      setTitleError(true);
      hasError = true;
    } else {
      setTitleError(false);
    }
    if (
      content.trim().length < HEADER_CONSTANTS.VALIDATION.CONTENT.MIN_LENGTH
    ) {
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
      {pathname.startsWith(HEADER_CONSTANTS.PATHS.POST) ? (
        <>
          <button className={styles.header__container__hamburger}>
            <Image
              src={HEADER_CONSTANTS.MOBILE.BACK.SRC}
              alt={HEADER_CONSTANTS.MOBILE.BACK.ALT}
              width={HEADER_CONSTANTS.MOBILE.BACK.WIDTH}
              height={HEADER_CONSTANTS.MOBILE.BACK.HEIGHT}
              className={styles.header__container__hamburger__backButton}
              onClick={() => {
                router.back();
              }}
            />
            {pathname.startsWith(HEADER_CONSTANTS.PATHS.WRITE) && (
              <span className={styles.header__container__hamburger__writeTitle}>
                {isEditPage
                  ? HEADER_CONSTANTS.TEXT.WRITE.EDIT_TITLE
                  : HEADER_CONSTANTS.TEXT.WRITE.TITLE}
              </span>
            )}
          </button>
          {pathname.startsWith(HEADER_CONSTANTS.PATHS.WRITE) && (
            <button
              className={styles.header__container__writeButton}
              onClick={handleSubmit}
            >
              {isEditPage
                ? HEADER_CONSTANTS.TEXT.WRITE.EDIT
                : HEADER_CONSTANTS.TEXT.WRITE.SUBMIT}
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
            src={HEADER_CONSTANTS.MOBILE.MENU.SRC}
            className={styles.header__container__hamburger__icon}
            alt={HEADER_CONSTANTS.MOBILE.MENU.ALT}
            width={HEADER_CONSTANTS.MOBILE.MENU.WIDTH}
            height={HEADER_CONSTANTS.MOBILE.MENU.HEIGHT}
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
