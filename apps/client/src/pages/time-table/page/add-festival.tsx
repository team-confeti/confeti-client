import { Button, FestivalCard, Header } from '@confeti/design-system';
import * as styles from './add-festival.css';
import useFestivalSelection from '../hooks/use-festival-selection';
import { useGetFestivalToAdd } from '../hooks/use-get-festival-to-add';
import { useInfiniteScroll } from '@shared/utils/use-infinite-scroll';

const MAX_SELECTIONS = 3;

const AddFestival = () => {
  const { selectedFestivals, handleFestivalClick, showToast } =
    useFestivalSelection();
  const { festivals, fetchNextPage, hasNextPage } = useGetFestivalToAdd();
  const observerRef = useInfiniteScroll(hasNextPage, fetchNextPage);

  const handleAddClick = () => {
    if (selectedFestivals.length > MAX_SELECTIONS) {
      showToast();
    } else {
      // 타임테이블에 추가되는 로직 작성 예정
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
              type="festival"
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
        {hasNextPage && <div ref={observerRef} style={{ height: '20px' }} />}
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
