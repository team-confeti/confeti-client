import { useSuspenseQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { FESTIVAL_QUERY_OPTIONS } from '@shared/apis/festival-queries';
import { EmptyState } from '@shared/components/common';
import PerformanceCard from '@shared/components/performance/performance-card';
import { PATH } from '@shared/constants';
import { getFestivalGroups } from '@shared/models/festival';
import { mapFestivalToCardData } from '@shared/models/performance-card';

import * as styles from './festival-page.css';

const FestivalPage = () => {
  const navigate = useNavigate();

  const { data } = useSuspenseQuery(FESTIVAL_QUERY_OPTIONS.LIST());
  const festivalGroups = getFestivalGroups(data);
  const upcomingFestivals = festivalGroups.upcomingFestivals.festivals;
  const pastFestivals = festivalGroups.finishedFestivals.festivals;

  const handleSelectPerformance = (id: number) => {
    navigate(`${PATH.PERFORMANCES.replace(':id', String(id))}?type=festival`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>페스티벌</h1>
          <p className={styles.pageSubtitle}>등록된 페스티벌을 관리하세요.</p>
        </div>
        <button
          className={styles.addButton}
          onClick={() =>
            navigate(
              `${PATH.PERFORMANCE_EDITOR.replace(':id', 'new')}?type=festival`,
            )
          }
        >
          <Plus size={16} />새 페스티벌 등록
        </button>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>진행 예정 / 진행 중</h3>
          <span className={styles.countBadge}>
            {festivalGroups.upcomingFestivals.count}
          </span>
        </div>
        {upcomingFestivals.length === 0 ? (
          <EmptyState title="진행 예정인 페스티벌이 없습니다." />
        ) : (
          <div className={styles.grid}>
            {upcomingFestivals.map((festival) => (
              <PerformanceCard
                key={festival.festivalId}
                data={mapFestivalToCardData(festival)}
                onClick={() => handleSelectPerformance(festival.festivalId)}
              />
            ))}
          </div>
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeaderPast}>
          <h3 className={styles.sectionTitlePast}>종료된 공연</h3>
          <span className={styles.countBadgePast}>
            {festivalGroups.finishedFestivals.count}
          </span>
        </div>
        {pastFestivals.length === 0 ? (
          <EmptyState title="종료된 페스티벌이 없습니다." />
        ) : (
          <div className={styles.gridPast}>
            {pastFestivals.map((festival) => (
              <PerformanceCard
                key={festival.festivalId}
                data={mapFestivalToCardData(festival)}
                onClick={() => handleSelectPerformance(festival.festivalId)}
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
