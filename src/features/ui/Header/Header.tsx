'use client';

import { useLogout } from '@/globalState/tanstackQueryHooks/Login';
import { useMyInfoStore } from '@/globalState/zusatnd/useMyInfoStore';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import styles from './Header.module.scss';

export default function Header() {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const { userId, nickname, profileImageUrl, refreshToken, clear } =
    useMyInfoStore();
  const { mutate: logout } = useLogout();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsPopupOpen(false);

    if (typeof window !== 'undefined' && refreshToken) {
      logout({ refreshToken: refreshToken });
      clear();
    }

    queryClient.clear();
    router.push('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
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
                  <div
                    ref={popupRef}
                    className={styles.profileContainer__popup}
                  >
                    <div className={styles.profileContainer__popup__userInfo}>
                      <Image
                        src={
                          profileImageUrl
                            ? profileImageUrl
                            : '/images/community-list/profile.svg'
                        }
                        alt="profile"
                        width={32}
                        height={32}
                      />
                      <span>{nickname ? nickname : '익명유저'} 님</span>
                    </div>
                    <button
                      className={styles.profileContainer__popup__logout}
                      onClick={() => {
                        if (window.confirm('로그아웃 하시겠습니까?')) {
                          handleLogout();
                        }
                      }}
                    >
                      로그아웃
                    </button>
                  </div>
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
      </div>
    </header>
  );
}
