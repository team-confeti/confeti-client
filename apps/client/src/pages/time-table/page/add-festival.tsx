import { Button, FestivalCard, Header } from '@confeti/design-system';
import { PERFORMANCE_DATA } from '@shared/mocks/performance-data';
import * as styles from './add-festival.css';
import useFestivalSelection from '../hooks/use-festival-selection';

const MAX_SELECTIONS = 3;

const AddFestival = () => {
  const { selectedFestivals, handleFestivalClick, showToast } =
    useFestivalSelection();

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
        {PERFORMANCE_DATA.data.performances.map((performance) => {
          const isSelected = selectedFestivals.includes(
            performance.performanceId,
          );

          return (
            <FestivalCard
              key={performance.performanceId}
              id={performance.performanceId}
              type={performance.type}
              title={performance.title}
              imageSrc={performance.posterUrl}
              selectable={true}
              isSelected={isSelected}
              onClick={() =>
                handleFestivalClick(performance.performanceId, isSelected)
              }
            />
          );
        })}
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
