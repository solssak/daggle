'use client';

import { UserInfo } from '../types';
import styles from './index.module.scss';
import { HEADER_CONSTANTS } from '@/features/ui/Header/constants';

interface SidebarNavProps extends UserInfo {
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

export default function Navigation({
  userId,
  onNavigate,
  onLogout,
}: SidebarNavProps) {
  return (
    <nav className={styles.nav}>
      {!userId && (
        <button
          className={styles.nav__login}
          onClick={() => onNavigate(HEADER_CONSTANTS.PATHS.AUTH)}
        >
          {HEADER_CONSTANTS.TEXT.LOGIN}
        </button>
      )}
      {userId && (
        <button
          onClick={() => {
            if (window.confirm(HEADER_CONSTANTS.TEXT.POPUP.LOGOUT_CONFIRM)) {
              onLogout();
            }
          }}
        >
          {HEADER_CONSTANTS.TEXT.POPUP.LOGOUT}
        </button>
      )}
      <button onClick={() => onNavigate(HEADER_CONSTANTS.PATHS.HOME)}>
        {HEADER_CONSTANTS.TEXT.NAVIGATION.COMMUNITY}
      </button>
    </nav>
  );
}
