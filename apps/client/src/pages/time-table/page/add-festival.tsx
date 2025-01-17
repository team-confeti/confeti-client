import { Button, FestivalCard, Header } from '@confeti/design-system';
import { PERFORMANCE_DATA } from '@shared/mocks/performance-data';
import * as styles from './add-festival.css';
import { useState } from 'react';

const AddFestival = () => {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const handleSelectChange = (id: number, isSelected: boolean) => {
    setSelectedIds((prev) => {
      const newSelection = new Set(prev);
      if (isSelected) {
        newSelection.add(id);
      } else {
        newSelection.delete(id);
      }
      return newSelection;
    });
  };

  return (
    <div className={styles.wrapper}>
      <Header variant="detail" title="페스티벌 추가하기" />
      <div className={styles.container}>
        {PERFORMANCE_DATA.data.performances.map((performance) => (
          <FestivalCard
            key={performance.performanceId}
            festivalId={performance.performanceId}
            title={performance.title}
            imageSrc={performance.posterUrl}
            isSelected={selectedIds.has(performance.performanceId)}
            selectable={true}
            onSelectChange={handleSelectChange}
          />
        ))}
      </div>
      <div className={styles.buttonSection}>
        <Button
          className={styles.addBtn}
          variant="add"
          text={'추가하기'}
          disabled={selectedIds.size === 0}
        />
      </div>
    </div>
  );
};

export default AddFestival;
