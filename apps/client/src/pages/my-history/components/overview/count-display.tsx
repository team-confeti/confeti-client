import * as styles from './count-display.css';

interface CountDisplayProps {
  count: number;
}

const CountDisplay = ({ count }: CountDisplayProps) => {
  return (
    <div className={styles.countDisplayContainer}>
      <p className={styles.countDisplayText}>전체</p>
      <p className={styles.countDisplayText}>{count}</p>
    </div>
  );
};

export default CountDisplay;
