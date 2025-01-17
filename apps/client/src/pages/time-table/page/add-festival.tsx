import { Button, FestivalCard, Header } from '@confeti/design-system';
import { PERFORMANCE_DATA } from '@shared/mocks/performance-data';
import * as styles from './add-festival.css';
import { useState } from 'react';

const AddFestival = () => {
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);

  const handleSelectChange = (title: string, isSelected: boolean) => {
    setSelectedTitle(isSelected ? title : null);
  };

  return (
    <div className={styles.wrapper}>
      <Header variant="detail" title="페스티벌 추가하기" />
      <div className={styles.container}>
        {PERFORMANCE_DATA.data.performances.map((performance) => (
          <FestivalCard
            key={performance.performanceId}
            title={performance.title}
            imageSrc={performance.posterUrl}
            isSelected={selectedTitle === performance.title}
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
          disabled={!selectedTitle}
        />
      </div>
    </div>
  );
};

export default AddFestival;
