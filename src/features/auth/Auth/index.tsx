import Button from '@/features/ui/Button/Button';
import styles from './index.module.scss';

export default function Auth() {
  return (
    <div className={styles.container}>
      <div className={styles.container__wrapper}>
        <h1 className={styles.container__wrapper__title}>
          안녕하세요
          <br />
          <span className={styles.container__wrapper__title__purple}>
            한다글다글
          </span>
          입니다.
        </h1>
        <h2 className={styles.container__wrapper__subtitle}>
          로그인을 통해 더 많은 기능을 이용하세요
        </h2>
        <div className={styles.container__wrapper__formWrapper}>
          <div className={styles.container__wrapper__formWrapper__form}>
            <div
              className={
                styles.container__wrapper__formWrapper__form__inputWrapper
              }
            >
              <input
                type="text"
                placeholder="아이디를 입력해주세요."
                className={styles.container__wrapper__formWrapper__form__input}
              />
            </div>
            <div
              className={
                styles.container__wrapper__formWrapper__form__inputWrapper
              }
            >
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요."
                className={styles.container__wrapper__formWrapper__form__input}
              />
            </div>
          </div>
        </div>
        <Button variant="grayscale1" size="lg" fullWidth>
          로그인
        </Button>
      </div>
    </div>
  );
}
