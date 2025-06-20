import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { FestivalCard, Header } from '@confeti/design-system';

import { MY_SETLIST_QUERY_OPTION } from '@shared/apis/my-history/my-setlist-queries';
import { MY_TIMETABLE_QUERY_OPTION } from '@shared/apis/my-history/my-timetable-queries';
import {
  SORT_LABELS,
  SORT_OPTIONS,
  SortOption,
} from '@shared/constants/sort-label';
import { routePath } from '@shared/router/path';
import { buildPath } from '@shared/utils/build-path';

import CountDisplay from '@pages/my-history/components/overview/count-display';
import OrderByButton from '@pages/my-history/components/overview/order-by-button';

import * as styles from './my-history-overview-page.css';

const MyHistoryOverviewPage = () => {
  //TODO: FestivalCard에 Skeleton 추가
  const [sortOption, setSortOption] = useState<SortOption>(SORT_OPTIONS.RECENT);
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const isSetList = type === 'SET_LIST';
  const navigate = useNavigate();

  const { data: setListOverviewData } = useQuery(
    MY_SETLIST_QUERY_OPTION.OVERVIEW(sortOption, isSetList),
  );
  const { data: timetableOverviewData } = useQuery(
    MY_TIMETABLE_QUERY_OPTION.OVERVIEW(sortOption, !isSetList),
  );

  const overviewData = isSetList
    ? {
        data: setListOverviewData?.setlists,
        count: setListOverviewData?.totalCount,
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

  const handleNavigateToDetail = (setlistId: number) => {
    navigate(
      buildPath(routePath.MY_HISTORY_SETLIST_DETAIL_ABSOLUTE, { setlistId }),
    );
  };

  const handleNavigateToTimeTable = () => {
    navigate(`${routePath.TIME_TABLE_OUTLET}`);
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
          {isSetList
            ? setListOverviewData?.setlists?.map((item) => (
                <FestivalCard
                  key={item.typeId}
                  imageSrc={item.posterUrl}
                  title={item.title}
                  onClick={() => handleNavigateToDetail(item.setlistId)}
                />
              ))
            : timetableOverviewData?.timetables?.map((item) => (
                <FestivalCard
                  key={item.typeId}
                  imageSrc={item.posterUrl}
                  title={item.title}
                  onClick={handleNavigateToTimeTable}
                />
              ))}
        </div>
      </section>
    </>
  );
};

export default MyHistoryOverviewPage;
