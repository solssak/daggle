import styles from './index.module.scss';

export default function CommunityListTitle() {
  return (
    <div className={styles.container}>
      <h2 className={styles.container__subtitle}>다글제작소</h2>
      <h1 className={styles.container__title}>
        다글제작소의 과제전형에 <br />
        오신 것을 환영합니다.
      </h1>
    </div>
  );
}
