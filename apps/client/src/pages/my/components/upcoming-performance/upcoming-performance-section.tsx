import { useNavigate } from 'react-router-dom';

import { Button } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import { useNavigateToDetail } from '@shared/hooks/use-navigate-to-detail';
import { routePath } from '@shared/router/path';
import { MyUpcomingPerformance } from '@shared/types/user-response';
import { formatDate } from '@shared/utils/format-date';

import * as styles from './upcoming-performance-section.css';

interface Props {
  performance: MyUpcomingPerformance;
}

const UpcomingPerformanceSection = ({ performance }: Props) => {
  const hasTimetable = performance.type === 'FESTIVAL';
  const navigateToDetail = useNavigateToDetail();
  const navigate = useNavigate();
  const navigateToTimeTable = () => {
    navigate(`${routePath.TIME_TABLE_OUTLET}`);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <img
          src={performance.posterUrl}
          alt={performance.title}
          onClick={() => navigateToDetail(performance.type, performance.typeId)}
          className={styles.image}
        />

        <div className={styles.info}>
          <h2
            className={styles.title}
            onClick={() =>
              navigateToDetail(performance.type, performance.typeId)
            }
          >
            {performance.title}
          </h2>

          <div>
            <div className={styles.description}>
              <Icon name="time" size="1.4rem" />
              <p>
                {formatDate(
                  '',
                  'startEndFull',
                  performance.startAt,
                  performance.endAt,
                )}
              </p>
            </div>

            <div className={styles.description}>
              <Icon name="place" size="1.4rem" />
              <p>{performance.area}</p>
            </div>
          </div>
        </div>
      </div>

      {hasTimetable && (
        <Button
          className={styles.button}
          onClick={navigateToTimeTable}
          text="타임테이블 보기"
        />
      )}
    </>
  );
};

export default UpcomingPerformanceSection;
