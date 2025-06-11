import { Icon } from '@confeti/design-system/icon';
import { useNavigateToDetail } from '@shared/hooks/use-navigate-to-detail';
import { MyPerformancesResponse } from '@shared/types/user-response';
import { formatDate } from '@shared/utils/format-date';

import * as styles from './performance-list.css';

const PerformanceList = ({ performances }: MyPerformancesResponse) => {
  const navigateToDetail = useNavigateToDetail();

  return (
    <ul className={styles.wrapper}>
      {performances.map(
        ({ title, posterUrl, startAt, endAt, area, type, typeId }) => (
          <li
            key={title}
            className={styles.performanceItem}
            onClick={() => navigateToDetail(type, typeId)}
          >
            <img src={posterUrl} alt={title} className={styles.image} />

            <div className={styles.info}>
              <h2 className={styles.title}>{title}</h2>

              <div>
                <div className={styles.description}>
                  <Icon name="time" width="1.4rem" height="1.4rem" />
                  <p>{formatDate('', 'startEndFull', startAt, endAt)}</p>
                </div>

                <div className={styles.description}>
                  <Icon name="place" width="1.4rem" height="1.4rem" />
                  <p>{area}</p>
                </div>
              </div>
            </div>
          </li>
        ),
      )}
    </ul>
  );
};

export default PerformanceList;
