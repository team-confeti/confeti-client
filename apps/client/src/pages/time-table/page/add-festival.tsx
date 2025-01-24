import { useNavigate } from 'react-router-dom';
import { Button, FestivalCard, Header } from '@confeti/design-system';
import { routePath } from '@shared/constants/path';
import { useInfiniteScroll } from '@shared/utils/use-infinite-scroll';
import useFestivalSelection from '../hooks/use-festival-selection';
import { useGetFestivalToAdd } from '../hooks/use-get-festival-to-add';
import { useAddTimeTableFestival } from '@pages/time-table/hooks/use-timetable-festival-mutation';
import { useFestivalButtonData } from '../hooks/use-festival-data';
import * as styles from './add-festival.css';

const MAX_SELECTIONS = 3;

const AddFestival = () => {
  const navigate = useNavigate();
  const { selectedFestivals, handleFestivalClick, showToast } =
    useFestivalSelection();
  const { festivals, fetchNextPage, hasNextPage } = useGetFestivalToAdd();
  const { festivals: existingFestivals } = useFestivalButtonData();
  const observerRef = useInfiniteScroll(hasNextPage, fetchNextPage);
  const { mutate: addFestival } = useAddTimeTableFestival();

  const handleAddClick = () => {
    if (selectedFestivals.length + existingFestivals.length > MAX_SELECTIONS) {
      showToast();
    } else {
      addFestival(selectedFestivals);
      navigate(routePath.TIME_TABLE_OUTLET);
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
