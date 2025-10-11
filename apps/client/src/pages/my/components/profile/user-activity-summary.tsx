import { Icon } from '@confeti/design-system/icon';

import * as styles from './user-activity-summary.css';

interface Props {
  totalPerformanceCount: number;
  TimeTableCount: number;
  setListCount: number;
}

const UserActivitySummary = ({
  totalPerformanceCount,
  TimeTableCount,
  setListCount,
}: Props) => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.itemWrapper}>
        <div className={styles.itemTextWrapper}>
          <Icon name="info" size="1.5rem" className={styles.infoIcon} />
          <p>총 관람 공연</p>
        </div>
        <p className={styles.totalPerformanceCount}>
          {totalPerformanceCount} 회
        </p>
      </div>
      <div className={styles.itemWrapper}>
        <p className={styles.itemText}>나의 타임테이블</p>
        <div className={styles.itemCountWrapper}>
          <p>{TimeTableCount} 개</p>
          <Icon name="arrow-horizontal" size="2rem" color="gray400" />
        </div>
      </div>
      <div className={styles.itemWrapper}>
        <p className={styles.itemText}>나의 셋리스트</p>
        <div className={styles.itemCountWrapper}>
          <p>{setListCount} 개</p>
          <Icon name="arrow-horizontal" size="2rem" color="gray400" />
        </div>
      </div>
    </section>
  );
};

export default UserActivitySummary;
