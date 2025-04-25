import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CountDisplay from '@pages/my-history/components/overview/count-display';
import OrderByButton from '@pages/my-history/components/overview/order-by-button';
import {
  useMySetListOverView,
  useMyTimeTableOverView,
} from '@pages/my-history/hooks/use-my-history';

import { FestivalCard, Header } from '@confeti/design-system';
import {
  SORT_LABELS,
  SORT_OPTIONS,
  SortOption,
} from '@shared/constants/sort-label';

import * as styles from './my-history-overview-page.css';

const MyHistoryOverviewPage = () => {
  //TODO: FestivalCard에 Skeleton 추가
  const [sortOption, setSortOption] = useState<SortOption>(SORT_OPTIONS.RECENT);
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const isSetList = type === 'SET_LIST';
  const { data: setListOverviewData } = useMySetListOverView(
    sortOption,
    isSetList,
  );
  const { data: timetableOverviewData } = useMyTimeTableOverView(
    sortOption,
    !isSetList,
  );

  const overviewData = isSetList
    ? {
        data: setListOverviewData?.setlists,
        count: setListOverviewData?.setlistCount,
      }
    : {
        data: timetableOverviewData?.timetables,
        count: timetableOverviewData?.timetableCount,
      };

  const toggleSort = () => {
    setSortOption((prev) =>
      prev === SORT_OPTIONS.RECENT ? SORT_OPTIONS.OLDEST : SORT_OPTIONS.RECENT,
    );
  };

  return (
    <>
      <Header
        variant="detail"
        title={isSetList ? 'My 셋리스트' : 'My 타임테이블'}
      />
      <section className={styles.overviewContainer}>
        <div className={styles.filterContainer}>
          <CountDisplay count={overviewData.count || 0} />
          <OrderByButton
            orderByText={SORT_LABELS[sortOption]}
            onClick={toggleSort}
          />
        </div>
        <div className={styles.gridContainer}>
          {overviewData.data?.map((item) => (
            <FestivalCard
              key={item.typeId}
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
