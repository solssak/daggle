'use client';

import { useMyInfoStore } from '@/globalState/zusatnd/useMyInfoStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './Header.module.scss';

export default function Header() {
  const router = useRouter();

  const { userId } = useMyInfoStore();

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
              <Image
                src="/images/auth/profile.svg"
                alt="profile"
                width={31.61}
                height={31.61}
              />
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
