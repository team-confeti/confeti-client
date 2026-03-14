import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { FestivalCard } from '@confeti/design-system';

import { LogClickEvent, LogShowEvent } from '@shared/analytics/logging';
import { MY_SETLIST_QUERY_OPTIONS } from '@shared/apis/my/my-setlist-queries';
import { MY_TIMETABLE_QUERY_OPTIONS } from '@shared/apis/my/my-timetable-queries';
import { DetailHeader } from '@shared/components';
import {
  SORT_LABELS,
  SORT_OPTIONS,
  SortOption,
} from '@shared/constants/sort-label';
import { routePath } from '@shared/router/path';
import { buildPath } from '@shared/utils/build-path';

import CountDisplay from '@pages/my/components/overview/count-display';
import OrderByButton from '@pages/my/components/overview/order-by-button';

import * as styles from './my-overview-page.css';

const MyOverviewPage = () => {
  //TODO: FestivalCard에 Skeleton 추가
  const [sortOption, setSortOption] = useState<SortOption>(SORT_OPTIONS.RECENT);
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const isSetList = type === 'SET_LIST';
  const navigate = useNavigate();

  const timetableSortBy =
    sortOption === SORT_OPTIONS.OLDEST ? 'earliest' : 'latest';

  const { data: setListOverviewData } = useQuery(
    MY_SETLIST_QUERY_OPTIONS.OVERVIEW(sortOption, isSetList),
  );
  const { data: timetableOverviewData } = useQuery({
    ...MY_TIMETABLE_QUERY_OPTIONS.SORT_BY(timetableSortBy),
    enabled: !isSetList,
  });

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
    navigate(buildPath(routePath.MY_SETLIST_DETAIL_ABSOLUTE, { setlistId }));
  };

  const handleNavigateToTimeTable = () => {
    navigate(`${routePath.TIME_TABLE_OUTLET}`);
  };

  const setlistOverviewItems =
    setListOverviewData?.setlists?.map((item) => ({
      key: item.typeId,
      imageSrc: item.posterUrl,
      title: item.title,
      eventParams: {
        entry_point: 'setlist',
        target_id: item.setlistId,
      },
      handleClick: () => handleNavigateToDetail(item.setlistId),
    })) ?? [];

  const timetableOverviewItems =
    timetableOverviewData?.timetables?.map((item) => ({
      key: item.typeId,
      imageSrc: item.posterUrl,
      title: item.title,
      eventParams: {
        entry_point: 'timetable',
        target_id: item.timetableId,
      },
      handleClick: handleNavigateToTimeTable,
    })) ?? [];

  return (
    <>
      <LogShowEvent name="show_my_overview" />
      <DetailHeader title={isSetList ? 'My 셋리스트' : 'My 타임테이블'} />
      <section className={styles.overviewContainer}>
        <div className={styles.filterContainer}>
          <CountDisplay count={overviewData.count || 0} />
          <LogClickEvent
            name="click_my_overview_sort"
            params={{
              sort:
                sortOption === SORT_OPTIONS.RECENT
                  ? SORT_OPTIONS.OLDEST
                  : SORT_OPTIONS.RECENT,
            }}
          >
            <OrderByButton
              orderByText={SORT_LABELS[sortOption]}
              onClick={toggleSort}
            />
          </LogClickEvent>
        </div>
        <div className={styles.gridContainer}>
          {isSetList
            ? setlistOverviewItems.map(
                ({ key, imageSrc, title, eventParams, handleClick }) => (
                  <LogClickEvent
                    key={key}
                    name="click_my_overview_item"
                    params={eventParams}
                  >
                    <FestivalCard
                      imageSrc={imageSrc}
                      title={title}
                      onClick={handleClick}
                    />
                  </LogClickEvent>
                ),
              )
            : timetableOverviewItems.map(
                ({ key, imageSrc, title, eventParams, handleClick }) => (
                  <LogClickEvent
                    key={key}
                    name="click_my_overview_item"
                    params={eventParams}
                  >
                    <FestivalCard
                      imageSrc={imageSrc}
                      title={title}
                      onClick={handleClick}
                    />
                  </LogClickEvent>
                ),
              )}
        </div>
      </section>
    </>
  );
};

export default MyOverviewPage;
