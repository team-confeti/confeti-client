import { useState } from 'react';
import FestivalButton from '@pages/time-table/components/festival-selector/festival-button';
import { useFestivalButtonData } from '@pages/time-table/hooks/use-festival-data';

import { Button, Dialog, Header } from '@confeti/design-system';

import * as styles from './delete-festival-page.css';

const DeleteFestivalPage = () => {
  const [festivalsToDelete, setFestivalsToDelete] = useState<number[]>([]);
  const handleSelectFestival = (festivalId: number) => {
    setFestivalsToDelete((prev) => [...prev, festivalId]);
  };

  const numberToDelete = festivalsToDelete.length;
  const { festivals } = useFestivalButtonData();

  return (
    <div className={styles.container}>
      <Header variant="detail" title="페스티벌 삭제하기" />
      <main className={styles.festivalSelectorWrapper}>
        <div className={styles.festivalButtonsWrapper}>
          {festivals.map(({ festivalId, title, logoUrl }) => (
            <FestivalButton
              isSelected={false}
              key={festivalId}
              imgUrl={logoUrl}
              title={title}
              onClick={() => handleSelectFestival(festivalId)}
            />
          ))}
        </div>
      </main>
      <footer className={styles.buttonContainer}>
        <Button
          text={numberToDelete + ' ' + `개 항목 삭제하기`}
          className={styles.buttonStyle}
        ></Button>
      </footer>
    </div>
  );
};

export default DeleteFestivalPage;
