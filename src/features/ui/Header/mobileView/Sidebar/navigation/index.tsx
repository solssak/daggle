'use client';

import { UserInfo } from '../types';
import styles from './index.module.scss';

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
          onClick={() => onNavigate('/auth')}
        >
          로그인
        </button>
      )}
      {userId && (
        <button
          onClick={() => {
            if (window.confirm('로그아웃 하시겠습니까?')) {
              onLogout();
            }
          }}
        >
          로그아웃
        </button>
      )}
      <button onClick={() => onNavigate('/')}>커뮤니티</button>
    </nav>
  );
}
