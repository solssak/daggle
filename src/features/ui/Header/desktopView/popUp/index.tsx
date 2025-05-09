'use client';

import Image from 'next/image';
import styles from './index.module.scss';
import { HEADER_CONSTANTS } from '../../constants';

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
          src={profileImageUrl || HEADER_CONSTANTS.PROFILE.DEFAULT}
          alt={HEADER_CONSTANTS.PROFILE.ALT}
          width={HEADER_CONSTANTS.PROFILE.WIDTH}
          height={HEADER_CONSTANTS.PROFILE.HEIGHT}
        />
        <span>{nickname || HEADER_CONSTANTS.TEXT.POPUP.ANONYMOUS} 님</span>
      </div>
      <button
        className={styles.container__popup__logout}
        onClick={() => {
          if (window.confirm(HEADER_CONSTANTS.TEXT.POPUP.LOGOUT_CONFIRM)) {
            onLogout();
          }
        }}
      >
        {HEADER_CONSTANTS.TEXT.POPUP.LOGOUT}
      </button>
    </div>
  );
}
