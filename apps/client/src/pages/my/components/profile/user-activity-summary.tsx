import { Tooltip } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import * as styles from './user-activity-summary.css';

interface Props {
  totalPerformanceCount: number;
  timetableCount: number;
  setListCount: number;
}

const UserActivitySummary = ({
  totalPerformanceCount,
  timetableCount,
  setListCount,
}: Props) => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.itemWrapper}>
        <div className={styles.itemTextWrapper}>
          <Tooltip trigger="click">
            <Tooltip.Trigger asChild>
              <Icon name="info" size="1.5rem" className={styles.infoIcon} />
            </Tooltip.Trigger>
            <Tooltip.Content className={styles.tooltipContent}>
              타임테이블 + 셋리스트 등록 공연 (중복 제외)
            </Tooltip.Content>
          </Tooltip>
          <p>총 관람 공연</p>
        </div>
        <p className={styles.totalPerformanceCount}>
          {totalPerformanceCount}
          <span className={styles.countGap}>회</span>
        </p>
      </div>
      <div className={styles.itemWrapper}>
        <p className={styles.itemText}>나의 타임테이블</p>
        <div className={styles.itemCountWrapper}>
          <p>
            {timetableCount}
            <span className={styles.countGap}>개</span>
          </p>
          <Icon name="arrow-horizontal" size="1.7rem" color="gray400" />
        </div>
      </div>
      <div className={styles.itemWrapper}>
        <p className={styles.itemText}>나의 셋리스트</p>
        <div className={styles.itemCountWrapper}>
          <p>
            {setListCount}
            <span className={styles.countGap}>개</span>
          </p>
          <Icon name="arrow-horizontal" size="1.7rem" color="gray400" />
        </div>
      </div>
    </section>
  );
};

export default UserActivitySummary;
