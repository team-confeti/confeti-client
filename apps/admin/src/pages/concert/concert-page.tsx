import { useNavigate } from 'react-router-dom';

import { EmptyState } from '@shared/components/common';
import PerformanceCard from '@shared/components/performance/performance-card';
import { PATH } from '@shared/constants';
import { CONCERTS } from '@shared/mocks';

import * as styles from './concert-page.css';

const ConcertPage = () => {
  const navigate = useNavigate();

  const upcomingConcerts = CONCERTS.filter(
    (concert) => concert.status === 'Scheduled',
  );
  const pastConcerts = CONCERTS.filter(
    (concert) => concert.status === 'Completed',
  );

  const handleSelectPerformance = (id: number) => {
    navigate(PATH.PERFORMANCES.replace(':id', String(id)));
  };

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>진행 예정 / 진행 중</h3>
          <span className={styles.countBadge}>{upcomingConcerts.length}</span>
        </div>
        {upcomingConcerts.length === 0 ? (
          <EmptyState title="예정된 콘서트가 없습니다." />
        ) : (
          <div className={styles.grid}>
            {upcomingConcerts.map((concert) => (
              <PerformanceCard
                key={concert.id}
                data={concert}
                onClick={() => handleSelectPerformance(concert.id)}
              />
            ))}
          </div>
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeaderPast}>
          <h3 className={styles.sectionTitlePast}>종료된 공연</h3>
          <span className={styles.countBadgePast}>{pastConcerts.length}</span>
        </div>
        {pastConcerts.length === 0 ? (
          <EmptyState title="종료된 콘서트가 없습니다." />
        ) : (
          <div className={styles.gridPast}>
            {pastConcerts.map((concert) => (
              <PerformanceCard
                key={concert.id}
                data={concert}
                onClick={() => handleSelectPerformance(concert.id)}
                isPast
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ConcertPage;
