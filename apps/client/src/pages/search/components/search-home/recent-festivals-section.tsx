import { FestivalCard } from '@confeti/design-system';

import { useNavigateToDetail } from '@shared/hooks/use-navigate-to-detail';
import { RecentPerformanceViewResponse } from '@shared/types/search-response';

import * as styles from './recent-festivals-section.css';

interface Props {
  recentViewData: RecentPerformanceViewResponse | null;
}

const RecentFestivalSection = ({ recentViewData }: Props) => {
  const navigateToDetail = useNavigateToDetail();
  const performances = recentViewData?.performances ?? [];
  const hasRecentlyViewed = performances.length > 0;

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>최근 본 콘서트/페스티벌</h1>
      {hasRecentlyViewed ? (
        <ul className={styles.list}>
          {performances.map((festival) => (
            <li key={festival.performanceId} className={styles.item}>
              <FestivalCard
                title={festival.title}
                imageSrc={festival.posterUrl}
                onClick={() => navigateToDetail(festival.type, festival.typeId)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.emptyText}>
          최근 본 콘서트/페스티벌 기록이 없어요.
        </p>
      )}
    </section>
  );
};

export default RecentFestivalSection;
