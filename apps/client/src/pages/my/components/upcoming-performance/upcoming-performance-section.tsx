import { Button } from '@confeti/design-system';
import { IcPlaceGray14, IcTimeGray14 } from '@confeti/design-system/icons';
import { MyUpcomingPerformance } from '@shared/types/user-response';
import { formatDate } from '@shared/utils/format-date';

import * as styles from './upcoming-performance-section.css';

type Props = {
  performance: MyUpcomingPerformance;
};

const UpcomingPerformanceSection = ({ performance }: Props) => {
  const hasTimetable = performance.type === 'FESTIVAL';

  return (
    <>
      <div className={styles.wrapper}>
        <img
          src={performance.posterUrl}
          alt={performance.title}
          className={styles.image}
        />

        <div className={styles.info}>
          <h2 className={styles.title}>{performance.title}</h2>

          <div>
            <div className={styles.description}>
              <IcTimeGray14 width={'1.4rem'} height={'1.4rem'} />
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
              <IcPlaceGray14 width={'1.4rem'} height={'1.4rem'} />
              <p>{performance.area}</p>
            </div>
          </div>
        </div>
      </div>

      {hasTimetable && (
        <Button className={styles.button} text="타임테이블 보기" />
      )}
    </>
  );
};

export default UpcomingPerformanceSection;
