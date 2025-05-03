'use client';

import Image from 'next/image';
import styles from './Header.module.scss';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    setIsLogin(!!accessToken && !!refreshToken);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__container__logo}>
          <Image
            src="/images/logo/logo@3x.png"
            alt="logo"
            width={100}
            height={20}
          />
        </div>
        <div className={styles.header__isLogin}>
          <div className={styles.header__isLogin__button}>
            {isLogin ? (
              <Image
                src="/images/auth/profile.svg"
                alt="profile"
                width={31.61}
                height={31.61}
              />
            ) : (
              <button className={styles.header__isLogin__button__login}>
                로그인
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
