import { useState } from 'react';
import { Button, FestivalCard, Header } from '@confeti/design-system';
import { PERFORMANCE_DATA } from '@shared/mocks/performance-data';
import { toast } from '@confeti/design-system';
import * as styles from './add-festival.css';

const MAX_SELECTIONS = 3;

const AddFestival = () => {
  const [selectedFestivals, setSelectedFestivals] = useState<number[]>([]);

  const removeSelect = (festivalId: number) => {
    setSelectedFestivals((prev) => prev.filter((id) => id !== festivalId));
  };

  const addSelect = (festivalId: number) => {
    setSelectedFestivals((prev) => [...prev, festivalId]);
  };

  const showToast = () => {
    toast.default('페스티벌은 3개까지만 추가할 수 있어요.', {
      position: 'middleCenter',
    });
  };

  const canAddFestival = selectedFestivals.length < MAX_SELECTIONS;

  const handleFestivalClick = (festivalId: number, isSelected: boolean) =>
    isSelected
      ? removeSelect(festivalId)
      : canAddFestival
        ? addSelect(festivalId)
        : showToast();

  const handleAddClick = () => {
    // 타임테이블에 추가되는 로직 작성 예정
  };

  return (
    <div className={styles.wrapper}>
      <Header variant="detail" title="페스티벌 추가하기" />
      <div className={styles.container}>
        {PERFORMANCE_DATA.data.performances.map((performance) => {
          const isSelected = selectedFestivals.includes(
            performance.performanceId,
          );

          return (
            <FestivalCard
              key={performance.performanceId}
              festivalId={performance.performanceId}
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
