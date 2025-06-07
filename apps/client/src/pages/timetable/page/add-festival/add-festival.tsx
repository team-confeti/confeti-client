import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddTimeTableFestival } from '@pages/timetable/hooks/use-timetable-festival-mutation';
import { useInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';

import { Button, FestivalCard, Header } from '@confeti/design-system';
import { FESTIVAL_TIMETABLE_QUERY_OPTIONS } from '@shared/apis/timetable/festival-timetable-queries';
import { routePath } from '@shared/router/path';
import { useInfiniteScroll } from '@shared/utils/use-infinite-scroll';

import { MAX_SELECTIONS } from '../../constants';
import useFestivalAdd from '../../hooks/use-festival-add';

import * as styles from './add-festival.css';

const AddFestival = () => {
  const { selectedFestivals, handleFestivalClick, showToast } =
    useFestivalAdd();
  const {
    data: festivalsData,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    ...FESTIVAL_TIMETABLE_QUERY_OPTIONS.ADDABLE_FESTIVALS(),
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor === -1 ? undefined : lastPage.nextCursor;
    },
  });
  const festivals =
    festivalsData?.pages.flatMap((page) => page.festivals) ?? [];

  const { data: addedFestivals } = useSuspenseQuery(
    FESTIVAL_TIMETABLE_QUERY_OPTIONS.AVAILABLE_FESTIVALS(),
  );
  const observerRef = useInfiniteScroll(hasNextPage, fetchNextPage);
  const navigate = useNavigate();
  const { mutate: addFestival } = useAddTimeTableFestival(() => {
    navigate(routePath.TIME_TABLE_OUTLET);
  });
  const TOTAL_SELECTIONS =
    selectedFestivals.length + addedFestivals.festivals.length;
  const isButtonDisabled =
    selectedFestivals.length === 0 || TOTAL_SELECTIONS >= MAX_SELECTIONS;

  useEffect(() => {
    if (TOTAL_SELECTIONS >= MAX_SELECTIONS) {
      showToast();
    }
  }, [selectedFestivals, TOTAL_SELECTIONS, showToast]);

  const handleAddClick = () => {
    addFestival(selectedFestivals);
  };

  return (
    <div className={styles.wrapper}>
      <Header variant="detail" title="페스티벌 추가하기" />
      <div className={styles.container}>
        {festivals.map((festival) => {
          const isSelected = selectedFestivals.includes(festival.festivalId);
          return (
            <div
              key={festival.festivalId}
              className={styles.festivalCardWrapper}
            >
              <FestivalCard
                typeId={festival.festivalId}
                type="FESTIVAL"
                title={festival.title}
                imageSrc={festival.posterUrl}
                selectable={true}
                isSelected={isSelected}
                onClick={() =>
                  handleFestivalClick(festival.festivalId, isSelected)
                }
              />
            </div>
          );
        })}

        {hasNextPage && <div ref={observerRef} style={{ height: '2rem' }} />}
      </div>
      <div className={styles.buttonSection}>
        <Button
          variant="add"
          text={'추가하기'}
          disabled={isButtonDisabled}
          onClick={handleAddClick}
        />
      </div>
    </div>
  );
};

export default AddFestival;
