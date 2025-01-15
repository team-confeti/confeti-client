import * as styles from './performance-count.css';

interface PerformanceCountProps {
  count: number;
}

const PerformanceCount = ({ count }: PerformanceCountProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        <span className={styles.count}>{count}개</span>의 공연이 검색되었어요
      </p>
    </div>
  );
};

export default PerformanceCount;
