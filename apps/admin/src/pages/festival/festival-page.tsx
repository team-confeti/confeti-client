import { useNavigate } from 'react-router-dom';

import { EmptyState } from '@shared/components/common';
import EventCard from '@shared/components/event/event-card';
import { PATH } from '@shared/constants';
import { FESTIVALS } from '@shared/mocks';

import * as styles from './festival-page.css';

const FestivalPage = () => {
  const navigate = useNavigate();

  const upcomingFestivals = FESTIVALS.filter(
    (festival) => festival.status === 'Scheduled',
  );
  const pastFestivals = FESTIVALS.filter(
    (festival) => festival.status === 'Completed',
  );

  const handleSelectEvent = (id: number) => {
    navigate(PATH.EVENTS.replace(':id', String(id)));
  };

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>진행 예정 / 진행 중</h3>
          <span className={styles.countBadge}>{upcomingFestivals.length}</span>
        </div>
        {upcomingFestivals.length === 0 ? (
          <EmptyState title="진행 예정인 페스티벌이 없습니다." />
        ) : (
          <div className={styles.grid}>
            {upcomingFestivals.map((festival) => (
              <EventCard
                key={festival.id}
                data={festival}
                onClick={() => handleSelectEvent(festival.id)}
              />
            ))}
          </div>
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeaderPast}>
          <h3 className={styles.sectionTitlePast}>종료된 공연</h3>
          <span className={styles.countBadgePast}>{pastFestivals.length}</span>
        </div>
        {pastFestivals.length === 0 ? (
          <EmptyState title="종료된 페스티벌이 없습니다." />
        ) : (
          <div className={styles.gridPast}>
            {pastFestivals.map((festival) => (
              <EventCard
                key={festival.id}
                data={festival}
                onClick={() => handleSelectEvent(festival.id)}
                isPast
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default FestivalPage;
