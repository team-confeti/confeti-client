import { useState } from 'react';

import { Button, FestivalCard } from '@confeti/design-system';
import { SetListPerformance } from '@shared/types/my-history-response';

import * as styles from './setlist-performance.css';

interface Props {
  performanceCount: number;
  performances: SetListPerformance[];
}

const SetlistPerformance = ({ performanceCount, performances }: Props) => {
  const [selectedFestivals, setSelectedFestivals] = useState<number[]>([]);

  // TODO: 셋리스트 만들기 API 연동
  const handleAddClick = () => {
    console.log(selectedFestivals);
  };

  const handleFestivalSelect = (performanceId: number, isSelected: boolean) => {
    setSelectedFestivals((prev) => {
      if (isSelected) {
        return [...prev, performanceId];
      } else {
        return prev.filter((id) => id !== performanceId);
      }
    });
  };

  return (
    <div className={styles.container}>
      <section className={styles.title}>
        <p>{performanceCount}개의 검색결과</p>
      </section>

      <section className={styles.performanceContainer}>
        {performances.map((performance) => {
          const isSelected = selectedFestivals.includes(
            performance.performanceId,
          );

          return (
            <FestivalCard
              key={performance.performanceId}
              typeId={performance.performanceId}
              title={performance.title}
              imageSrc={performance.posterUrl}
              selectable={true}
              isSelected={isSelected}
              onSelectChange={(_title, isSelected) =>
                handleFestivalSelect(performance.performanceId, isSelected)
              }
            />
          );
        })}
      </section>

      <section className={styles.buttonSection}>
        <Button
          variant="add"
          text={'셋리스트 만들기'}
          disabled={selectedFestivals.length === 0}
          onClick={handleAddClick}
        />
      </section>
    </div>
  );
};

export default SetlistPerformance;
