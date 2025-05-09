'use client';

import Image from 'next/image';
import { useRef } from 'react';
import styles from './index.module.scss';
import Navigation from './navigation';
import { UserInfo } from './types';
import UserInformation from './userInformation';

export interface SidebarProps extends UserInfo {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

export default function Sidebar({
  isOpen,
  userId,
  nickname,
  profileImageUrl,
  onClose,
  onNavigate,
  onLogout,
}: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        className={`${styles.sidebar__overlay} ${
          isOpen ? styles.sidebar__overlay__open : ''
        }`}
        onClick={onClose}
      />
      <div
        ref={sidebarRef}
        className={`${styles.sidebar} ${isOpen ? styles.sidebar__open : ''}`}
      >
        <div className={styles.sidebar__content}>
          <span className={styles.sidebar__close} onClick={onClose}>
            <Image
              src="/images/icons/close.svg"
              alt="close"
              width={13}
              height={13}
            />
          </span>
          <UserInformation
            userId={userId}
            nickname={nickname}
            profileImageUrl={profileImageUrl}
          />
          <Navigation
            userId={userId}
            onNavigate={onNavigate}
            onLogout={onLogout}
          />
        </div>
      </div>
    </>
  );
}
