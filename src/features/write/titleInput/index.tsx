import styles from './index.module.scss';

interface TitleInputProps {
  value: string;
  onChange: (value: string) => void;
  hasError: boolean;
}

export default function TitleInput({
  value,
  onChange,
  hasError,
}: TitleInputProps) {
  return (
    <section className={styles.container}>
      <div
        className={`${styles.container__wrapper} ${
          hasError ? styles.container__wrapper__error : ''
        }`}
      >
        <input
          className={styles.container__wrapper__input}
          type="text"
          placeholder="제목을 입력해주세요."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {hasError && (
          <p className={styles.container__wrapper__errorMessage}>
            최소 1글자 이상 입력해주세요.
          </p>
        )}
      </div>
    </section>
  );
}
