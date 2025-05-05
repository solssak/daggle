'use client';

import Button from '@/features/ui/Button/Button';
import { useLogin } from '@/globalState/tanstackQueryHooks/Login';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

export default function Auth() {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [idError, setIdError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const router = useRouter();
  const { mutate } = useLogin();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      router.replace('/');
    }
  }, [router]);

  const handleLogin = async () => {
    const idValid = !!id;
    const passwordValid = !!password;

    setIdError(!idValid);
    setPasswordError(!passwordValid);

    if (!idValid || !passwordValid) return;

    mutate(
      { loginId: id, password: password },
      {
        onSuccess: (data) => {
          localStorage.setItem('accessToken', data.tokens.accessToken);
          localStorage.setItem('refreshToken', data.tokens.refreshToken);
          localStorage.setItem('userId', data.user.id);
          router.replace('/');
        },
        onError: (error) => {
          if (error.response?.status === 400) {
            alert('잘못된 요청 데이터입니다.');
          } else if (error.response?.status === 401) {
            alert('잘못된 비밀번호입니다.');
          } else if (error.response?.status === 404) {
            alert('존재하지 않는 아이디입니다.');
          } else {
            alert('로그인 실패');
          }
        },
      },
    );
  };

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
                value={id}
                onChange={(e) => setId(e.target.value)}
                type="text"
                placeholder="아이디를 입력해주세요."
                className={
                  styles.container__wrapper__formWrapper__form__input +
                  (idError
                    ? ' ' +
                      styles.container__wrapper__formWrapper__form__input__error
                    : '')
                }
              />
              {idError && (
                <div
                  className={
                    styles.container__wrapper__formWrapper__form__errorMessage
                  }
                >
                  아이디를 입력해주세요.
                </div>
              )}
            </div>
            <div
              className={
                styles.container__wrapper__formWrapper__form__inputWrapper
              }
            >
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="비밀번호를 입력해주세요."
                className={
                  styles.container__wrapper__formWrapper__form__input +
                  (passwordError
                    ? ' ' +
                      styles.container__wrapper__formWrapper__form__input__error
                    : '')
                }
              />
              {passwordError && (
                <div
                  className={
                    styles.container__wrapper__formWrapper__form__errorMessage
                  }
                >
                  비밀번호를 입력해주세요.
                </div>
              )}
            </div>
          </div>
        </div>
        <Button variant="grayscale1" size="lg" fullWidth onClick={handleLogin}>
          로그인
        </Button>
      </div>
    </div>
  );
}
