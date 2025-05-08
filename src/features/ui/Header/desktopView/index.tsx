'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import styles from '../index.module.scss';
import Popup from './popUp';
import { useClickOutside } from '../../../../hooks/useClickOutside';

interface DesktopViewProps {
  userId?: string;
  nickname?: string;
  profileImageUrl?: string;
  onLogout: () => void;
}

export default function DesktopView({
  userId,
  nickname,
  profileImageUrl,
  onLogout,
}: DesktopViewProps) {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: popupRef,
    handler: () => setIsPopupOpen(false),
  });

  return (
    <>
      <button
        className={styles.header__container__logo}
        onClick={() => router.push('/')}
      >
        <Image
          src="/images/logo/logo@3x.png"
          alt="logo"
          width={100}
          height={20}
        />
      </button>

      <div className={styles.header__isLogin}>
        <div className={styles.header__isLogin__button}>
          {userId ? (
            <div className={styles.profileContainer}>
              <button
                onClick={() => setIsPopupOpen(!isPopupOpen)}
                className={styles.profileContainer__profileButton}
              >
                <Image
                  src="/images/auth/profile.svg"
                  alt="profile"
                  width={32}
                  height={32}
                />
              </button>
              {isPopupOpen && (
                <Popup
                  profileImageUrl={profileImageUrl}
                  nickname={nickname}
                  onLogout={onLogout}
                  popupRef={popupRef}
                />
              )}
            </div>
          ) : (
            <button
              className={styles.header__isLogin__button__login}
              onClick={() => router.push('/auth')}
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </>
  );
}
