import * as styles from './count-display.css';

const CountDisplay = () => {
  return (
    <div className={styles.countDisplayContainer}>
      <p className={styles.countDisplayText}>전체</p>
      <p className={styles.countDisplayText}>12</p>
    </div>
  );
};

export default CountDisplay;
