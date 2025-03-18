import { useNavigate } from 'react-router-dom';
import { useAddTimeTableFestival } from '@pages/time-table/hooks/use-timetable-festival-mutation';

import { Button, FestivalCard, Header } from '@confeti/design-system';
import { routePath } from '@shared/constants/path';
import { useInfiniteScroll } from '@shared/utils/use-infinite-scroll';

import { MAX_SELECTIONS } from '../constants';
import { useFestivalButtonData } from '../hooks/use-festival-data';
import useFestivalSelection from '../hooks/use-festival-selection';
import { useGetFestivalToAdd } from '../hooks/use-get-festival-to-add';

import * as styles from './add-festival.css';

const AddFestival = () => {
  const { selectedFestivals, handleFestivalClick, showToast } =
    useFestivalSelection();
  const { festivals, fetchNextPage, hasNextPage } = useGetFestivalToAdd();
  const { festivals: addedFestivals } = useFestivalButtonData();
  const observerRef = useInfiniteScroll(hasNextPage, fetchNextPage);
  const navigate = useNavigate();
  const { mutate: addFestival } = useAddTimeTableFestival(() => {
    navigate(routePath.TIME_TABLE_OUTLET);
  });
  const TOTAL_SELECTIONS = selectedFestivals.length + addedFestivals.length;

  const handleAddClick = () => {
    if (TOTAL_SELECTIONS > MAX_SELECTIONS) {
      showToast();
    } else {
      addFestival(selectedFestivals);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Header
        variant="detail"
        title="페스티벌 추가하기"
        className={styles.headerLayout}
      />
      <div className={styles.container}>
        {festivals.map((festival) => {
          const isSelected = selectedFestivals.includes(festival.festivalId);
          return (
            <FestivalCard
              key={festival.festivalId}
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
          );
        })}
        {hasNextPage && <div ref={observerRef} style={{ height: '2rem' }} />}
      </div>
      <div className={styles.buttonSection}>
        <Button
          variant="add"
          text={'추가하기'}
          disabled={selectedFestivals.length === 0}
          onClick={handleAddClick}
        />
      </div>
    </div>
  );
};

export default AddFestival;
