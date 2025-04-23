import { useState } from 'react';
import CountDisplay from '@pages/my-history/components/overview/count-display';
import OrderByButton from '@pages/my-history/components/overview/order-by-button';
import { useMyTimeTableOverView } from '@pages/my-history/hooks/use-my-history';

import { FestivalCard, Header } from '@confeti/design-system';
import {
  SORT_LABELS,
  SORT_OPTIONS,
  SortOption,
} from '@shared/constants/sort-label';

import * as styles from './my-history-overview-page.css';

const MyHistoryOverviewPage = () => {
  const [sortOption, setSortOption] = useState<SortOption>(SORT_OPTIONS.RECENT);
  const { data: timetableOverviewData } = useMyTimeTableOverView(sortOption);

  const toggleSort = () => {
    setSortOption((prev) =>
      prev === SORT_OPTIONS.RECENT ? SORT_OPTIONS.OLDEST : SORT_OPTIONS.RECENT,
    );
  };

  return (
    <>
      <Header variant="detail" title="My 타임테이블" />
      <section className={styles.overviewContainer}>
        <div className={styles.filterContainer}>
          <CountDisplay count={timetableOverviewData?.timetableCount || 0} />
          <OrderByButton
            orderByText={SORT_LABELS[sortOption]}
            onClick={toggleSort}
          />
        </div>
        <div className={styles.gridContainer}>
          {timetableOverviewData?.timetables.map((item) => (
            <FestivalCard
              //TODO : 서버에게 고유한 값(id) 요청
              key={item.posterUrl}
              typeId={item.typeId}
              imageSrc={item.posterUrl}
              title={item.title}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default MyHistoryOverviewPage;
