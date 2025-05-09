'use client';

import Image from 'next/image';
import styles from './index.module.scss';

interface PopupProps {
  profileImageUrl?: string;
  nickname?: string;
  onLogout: () => void;
  popupRef: React.RefObject<HTMLDivElement>;
}

export default function Popup({
  profileImageUrl,
  nickname,
  onLogout,
  popupRef,
}: PopupProps) {
  return (
    <div ref={popupRef} className={styles.container__popup}>
      <div className={styles.container__popup__userInfo}>
        <Image
          src={profileImageUrl || '/images/community-list/profile.svg'}
          alt="profile"
          width={32}
          height={32}
        />
        <span>{nickname || '익명유저'} 님</span>
      </div>
      <button
        className={styles.container__popup__logout}
        onClick={() => {
          if (window.confirm('로그아웃 하시겠습니까?')) {
            onLogout();
          }
        }}
      >
        로그아웃
      </button>
    </div>
  );
}
