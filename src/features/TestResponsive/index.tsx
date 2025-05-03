import Button from '@/features/ui/Button/Button';
import styles from './index.module.scss';

export default function TestResponsive() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Button example</h1>
        <Button variant="grayscale1" size="lg">
          버튼
        </Button>
        <Button variant="purple" size="sm">
          버튼
        </Button>
        <Button variant="grayscale1" size="sm">
          버튼
        </Button>
        <Button variant="grayscale1" size="md" disabled>
          버튼
        </Button>
      </div>
    </div>
  );
}
