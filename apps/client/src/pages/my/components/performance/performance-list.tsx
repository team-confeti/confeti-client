import { IcTimeGray14 } from '@confeti/design-system/icons';

import * as styles from './performance-list.css';

interface Performance {
  index: number;
  posterUrl: string;
  title: string;
  type: string;
  typeId: number;
}

interface PerformanceListProps {
  performances: Performance[];
}

const PerformanceList = ({ performances }: PerformanceListProps) => {
  return (
    <ul className={styles.wrapper}>
      {performances.map((performance) => (
        <li key={performance.index} className={styles.performanceItem}>
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
                {/* TODO: icon 변경 */}
                <IcTimeGray14 width={'1.4rem'} height={'1.4rem'} />
                <p>벡스코 제1전시장 1호</p>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PerformanceList;
