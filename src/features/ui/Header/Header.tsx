'use client';

import { useLogout } from '@/globalState/tanstackQueryHooks/Login';
import { useMyInfoStore } from '@/globalState/zusatnd/useMyInfoStore';
import useMedia from '@/hooks/useMedia';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import styles from './Header.module.scss';

export default function Header() {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { isMobile, isReady } = useMedia();

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
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(
          `.${styles.header__container__hamburger}`,
        )
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsPopupOpen(false);
    if (typeof window !== 'undefined' && refreshToken) {
      logout({ refreshToken });
      clear();
    }
    queryClient.clear();
    router.push('/');
  };

  const handleSidebarClose = () => setIsSidebarOpen(false);
  const handleNavigate = (path: string) => {
    setIsSidebarOpen(false);
    router.push(path);
  };

  if (!isReady) return null;

  const renderProfilePopup = () => (
    <div ref={popupRef} className={styles.profileContainer__popup}>
      <div className={styles.profileContainer__popup__userInfo}>
        <Image
          src={profileImageUrl || '/images/community-list/profile.svg'}
          alt="profile"
          width={32}
          height={32}
        />
        <span>{nickname || '익명유저'} 님</span>
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
  );

  const renderSidebar = () => (
    <>
      <div
        className={`${styles.sidebar__overlay} ${
          isSidebarOpen ? styles.sidebar__overlay__open : ''
        }`}
        onClick={handleSidebarClose}
      />
      <div
        ref={sidebarRef}
        className={`${styles.sidebar} ${
          isSidebarOpen ? styles.sidebar__open : ''
        }`}
      >
        <div className={styles.sidebar__content}>
          <span className={styles.sidebar__close} onClick={handleSidebarClose}>
            <Image
              src="/images/icons/close.svg"
              alt="close"
              width={13}
              height={13}
            />
          </span>
          <div className={styles.sidebar__userInfo}>
            {userId ? (
              <>
                <Image
                  src={profileImageUrl || '/images/community-list/profile.svg'}
                  alt="profile"
                  width={27}
                  height={27}
                />
                <span>{nickname || '익명유저'} 님</span>
              </>
            ) : (
              <span>로그인이 필요합니다.</span>
            )}
          </div>
          <nav className={styles.sidebar__nav}>
            {!userId && (
              <button
                className={styles.sidebar__nav__login}
                onClick={() => handleNavigate('/auth')}
              >
                로그인
              </button>
            )}
            <button onClick={() => handleNavigate('/')}>홈</button>
            {userId && (
              <button
                onClick={() => {
                  if (window.confirm('로그아웃 하시겠습니까?')) {
                    handleLogout();
                  }
                }}
              >
                로그아웃
              </button>
            )}
          </nav>
        </div>
      </div>
    </>
  );

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        {!isMobile && (
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
        )}
        {isMobile && (
          <button
            className={styles.header__container__hamburger}
            onClick={() => setIsSidebarOpen(true)}
          >
            <Image
              src="/images/icons/hamburger.svg"
              alt="menu"
              width={24}
              height={24}
            />
          </button>
        )}
        {!isMobile && (
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
                  {isPopupOpen && renderProfilePopup()}
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
        )}
      </div>
      {isMobile && renderSidebar()}
    </header>
  );
}
