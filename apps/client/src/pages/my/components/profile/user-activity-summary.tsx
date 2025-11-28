import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Tooltip } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import { MY_RECORD_QUERY_OPTIONS } from '@shared/apis/my/my-record-queries';
import { routePath } from '@shared/router/path';

import * as styles from './user-activity-summary.css';

const UserActivitySummary = () => {
  const navigate = useNavigate();
  const { data: recordData } = useSuspenseQuery(MY_RECORD_QUERY_OPTIONS.ALL());

  const handleTimetableClick = () => {
    navigate(`${routePath.MY}/${routePath.MY_TIMETABLE}`);
  };

  const handleSetListClick = () => {
    navigate(routePath.SETLIST_MAINTENANCE);
  };

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
          {recordData.totalCount}
          <span className={styles.countGap}>회</span>
        </p>
      </div>
      <div className={styles.itemWrapper} onClick={handleTimetableClick}>
        <p className={styles.itemText}>타임테이블</p>
        <div className={styles.itemCountWrapper}>
          <p>
            {recordData.timetableCount}
            <span className={styles.countGap}>개</span>
          </p>
          <Icon name="arrow-horizontal" size="1.7rem" color="gray400" />
        </div>
      </div>
      <div className={styles.itemWrapper} onClick={handleSetListClick}>
        <p className={styles.itemText}>셋리스트</p>
        <div className={styles.itemCountWrapper}>
          <p>
            {recordData.setlistCount}
            <span className={styles.countGap}>개</span>
          </p>
          <Icon name="arrow-horizontal" size="1.7rem" color="gray400" />
        </div>
      </div>
    </section>
  );
};

export default UserActivitySummary;
