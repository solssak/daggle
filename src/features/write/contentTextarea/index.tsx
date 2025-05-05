import styles from './index.module.scss';

interface ContentTextareaProps {
  value: string;
  onChange: (value: string) => void;
  hasError: boolean;
  maxLength: number;
}

export default function ContentTextarea({
  value,
  onChange,
  hasError,
  maxLength,
}: ContentTextareaProps) {
  return (
    <section className={styles.container}>
      <div
        className={`${styles.container__wrapper} ${
          hasError ? styles.container__wrapper__error : ''
        }`}
      >
        <textarea
          className={styles.container__textarea}
          placeholder="내용을 입력해주세요."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
        />
        <p
          className={`${styles.container__length} ${
            hasError ? styles.container__length__error : ''
          }`}
        >
          {value.length}/{maxLength}
        </p>
        {hasError && (
          <p className={styles.errorMessage}>최소 5자 이상 입력해주세요.</p>
        )}
      </div>
    </section>
  );
}
