import * as styles from './performance-count-section.css';

interface PerformanceCountProps {
  count?: number;
}

const PerformanceCount = ({ count }: PerformanceCountProps) => {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <p className={styles.text}>
          <span className={styles.count}>{count}개</span>의 공연이 검색되었어요
        </p>
      </div>
    </div>
  );
};

export default PerformanceCount;
