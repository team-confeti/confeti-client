import { FestivalCard } from '@confeti/design-system';
import { RecentPerformanceViewResponse } from '@shared/types/search-response';

import * as styles from './recent-festivals-section.css';

interface Props {
  recentViewData: RecentPerformanceViewResponse | null;
}

export default function RecentFestivalSection({ recentViewData }: Props) {
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
                typeId={festival.typeId}
                title={festival.title}
                imageSrc={festival.posterUrl}
                type={festival.type}
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
}
