'use client';

import useMedia from '@/hooks/useMedia';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import styles from './index.module.scss';
import DesktopView from './desktopView';
import MobileView from './mobileView';
import { useUserInfo } from '../../../hooks/useUserInfo';

export default function Header() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isMobile, isReady } = useMedia();
  const { userId, nickname, profileImageUrl, handleLogout } = useUserInfo();

  const handleNavigate = useCallback(
    (path: string) => {
      setIsSidebarOpen(false);
      router.push(path);
    },
    [router],
  );

  if (!isReady) return null;

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        {!isMobile ? (
          <DesktopView
            userId={userId || undefined}
            nickname={nickname || undefined}
            profileImageUrl={profileImageUrl || undefined}
            onLogout={handleLogout}
          />
        ) : (
          <MobileView
            userId={userId || undefined}
            nickname={nickname || undefined}
            profileImageUrl={profileImageUrl || undefined}
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            isSidebarOpen={isSidebarOpen}
            onSidebarOpen={() => setIsSidebarOpen(true)}
            onSidebarClose={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </header>
  );
}
