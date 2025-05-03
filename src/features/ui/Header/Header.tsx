import Image from 'next/image';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <Image
            src="/images/logo/logo@3x.png"
            alt="logo"
            width={100}
            height={20}
          />
        </div>
        <div className={styles.header__isLogin}>
          <div className={styles.header__isLogin__button}>
            <button>로그인</button>
          </div>
        </div>
      </div>
    </header>
  );
}
