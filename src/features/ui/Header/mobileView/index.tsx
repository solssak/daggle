'use client';

import Image from 'next/image';
import styles from '../index.module.scss';
import Sidebar from './Sidebar';

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
  return (
    <>
      <button
        className={styles.header__container__hamburger}
        onClick={() => {
          console.log('사이드바 열기 버튼 클릭');
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

      <Sidebar
        isOpen={isSidebarOpen}
        userId={userId}
        nickname={nickname}
        profileImageUrl={profileImageUrl}
        onClose={() => {
          console.log('사이드바 닫기 버튼 클릭');
          onSidebarClose();
        }}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />
    </>
  );
}
