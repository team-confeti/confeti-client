import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { CONCERT_QUERY_OPTIONS } from '@shared/apis/concert-queries';
import { EmptyState } from '@shared/components/common';
import PerformanceCard from '@shared/components/performance/performance-card';
import { PATH } from '@shared/constants';
import { getConcertGroups } from '@shared/models/concert';
import { mapConcertToCardData } from '@shared/models/performance-card';

import * as styles from './concert-page.css';

const ConcertPage = () => {
  const navigate = useNavigate();

  const { data } = useSuspenseQuery(CONCERT_QUERY_OPTIONS.LIST());
  const concertGroups = getConcertGroups(data);
  const upcomingConcerts = concertGroups.upcomingConcerts.concerts;
  const pastConcerts = concertGroups.finishedConcerts.concerts;

  const handleSelectPerformance = (id: number) => {
    navigate(`${PATH.PERFORMANCES.replace(':id', String(id))}?type=concert`);
  };

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>진행 예정 / 진행 중</h3>
          <span className={styles.countBadge}>
            {concertGroups.upcomingConcerts.count}
          </span>
        </div>
        {upcomingConcerts.length === 0 ? (
          <EmptyState title="예정된 콘서트가 없습니다." />
        ) : (
          <div className={styles.grid}>
            {upcomingConcerts.map((concert) => (
              <PerformanceCard
                key={concert.concertId}
                data={mapConcertToCardData(concert)}
                onClick={() => handleSelectPerformance(concert.concertId)}
              />
            ))}
          </div>
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeaderPast}>
          <h3 className={styles.sectionTitlePast}>종료된 공연</h3>
          <span className={styles.countBadgePast}>
            {concertGroups.finishedConcerts.count}
          </span>
        </div>
        {pastConcerts.length === 0 ? (
          <EmptyState title="종료된 콘서트가 없습니다." />
        ) : (
          <div className={styles.gridPast}>
            {pastConcerts.map((concert) => (
              <PerformanceCard
                key={concert.concertId}
                data={mapConcertToCardData(concert)}
                onClick={() => handleSelectPerformance(concert.concertId)}
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
