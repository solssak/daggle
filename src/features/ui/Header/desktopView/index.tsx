'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import styles from '../index.module.scss';
import Popup from './popUp';
import { useClickOutside } from '../../../../hooks/useClickOutside';
import { HEADER_CONSTANTS } from '../constants';

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
        onClick={() => router.push(HEADER_CONSTANTS.PATHS.HOME)}
      >
        <Image
          src={HEADER_CONSTANTS.LOGO.SRC}
          alt={HEADER_CONSTANTS.LOGO.ALT}
          width={HEADER_CONSTANTS.LOGO.WIDTH}
          height={HEADER_CONSTANTS.LOGO.HEIGHT}
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
                  src={HEADER_CONSTANTS.PROFILE.SRC}
                  alt={HEADER_CONSTANTS.PROFILE.ALT}
                  width={HEADER_CONSTANTS.PROFILE.WIDTH}
                  height={HEADER_CONSTANTS.PROFILE.HEIGHT}
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
              onClick={() => router.push(HEADER_CONSTANTS.PATHS.AUTH)}
            >
              {HEADER_CONSTANTS.TEXT.LOGIN}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
