import { Button } from '@confeti/design-system';
import { IcPlaceGray14, IcTimeGray14 } from '@confeti/design-system/icons';
import { Performance } from '@shared/types/user-response';

import * as styles from './upcoming-performance-section.css';

interface Props {
  performance: Performance;
}

const UpcomingPerformanceSection = ({ performance }: Props) => {
  // TODO: 타임테이블 존재 여부 API에서 받아오도록 수정
  const hasTimetable = true;

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
              <p>2025.02.01 - 2025.08.02</p>
            </div>

            <div className={styles.description}>
              <IcPlaceGray14 width={'1.4rem'} height={'1.4rem'} />
              <p>벡스코 제1전시장 1호</p>
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
