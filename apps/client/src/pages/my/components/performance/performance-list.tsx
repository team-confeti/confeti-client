import { IcPlaceGray14, IcTimeGray14 } from '@confeti/design-system/icons';
import { MyPerformancesResponse } from '@shared/types/user-response';
import { formatDate } from '@shared/utils/format-date';

import * as styles from './performance-list.css';

const PerformanceList = ({ performances }: MyPerformancesResponse) => {
  return (
    <ul className={styles.wrapper}>
      {performances.map(({ title, posterUrl, startAt, endAt, area }) => (
        <li key={title} className={styles.performanceItem}>
          <img src={posterUrl} alt={title} className={styles.image} />

          <div className={styles.info}>
            <h2 className={styles.title}>{title}</h2>

            <div>
              <div className={styles.description}>
                <IcTimeGray14 width={'1.4rem'} height={'1.4rem'} />
                <p>{formatDate('', 'startEndFull', startAt, endAt)}</p>
              </div>

              <div className={styles.description}>
                <IcPlaceGray14 width={'1.4rem'} height={'1.4rem'} />
                <p>{area}</p>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PerformanceList;
