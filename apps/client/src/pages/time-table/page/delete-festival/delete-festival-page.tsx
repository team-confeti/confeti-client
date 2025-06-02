import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteTimeTableFestival } from '@pages/time-table/hooks/use-timetable-festival-mutation';
import {
  ConfirmDialog,
  SuccessDialog,
} from '@pages/time-table/page/delete-festival/delete-festival-dialogs';
import DeleteFestivalSelector from '@pages/time-table/page/delete-festival/delete-festival-selector';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Button, Header, useOverlay } from '@confeti/design-system';
import { FESTIVAL_TIMETABLE_QUERY_OPTIONS } from '@shared/apis/time-table/festival-timetable-queries';

import * as styles from './delete-festival-page.css';

const DeleteFestivalPage = () => {
  const [festivalsToDelete, setFestivalsToDelete] = useState<number[]>([]);
  const { data: festivalsData } = useSuspenseQuery(
    FESTIVAL_TIMETABLE_QUERY_OPTIONS.AVAILABLE_FESTIVALS(),
  );

  const deleteFestival = useDeleteTimeTableFestival();
  const overlay = useOverlay();
  const navigate = useNavigate();
  const numberToDelete = festivalsToDelete.length;

  const handleToggleFestival = (festivalId: number) => {
    setFestivalsToDelete((prev) =>
      prev.includes(festivalId)
        ? prev.filter((id) => id !== festivalId)
        : [...prev, festivalId],
    );
  };

  const handleConfirm = () => {
    overlay.open(({ isOpen, close }) => (
      <ConfirmDialog
        className={styles.modalText}
        numberToDelete={numberToDelete}
        isOpen={isOpen}
        onClose={close}
        onConfirm={async () => {
          await Promise.all(
            festivalsToDelete.map((id) => deleteFestival.mutateAsync(id)),
          );

          // 삭제 mutation 모두 완료 후 성공 모달창 open
          overlay.open(({ isOpen, close }) => (
            <SuccessDialog
              isOpen={isOpen}
              onClose={() => {
                close();
                navigate(-1);
              }}
            />
          ));
        }}
      />
    ));
  };

  return (
    <div className={styles.container}>
      <Header variant="detail" title="페스티벌 삭제하기" />
      <main className={styles.festivalSelectorWrapper}>
        <DeleteFestivalSelector
          festivals={festivalsData.festivals}
          festivalsToDelete={festivalsToDelete}
          handleToggleFestival={handleToggleFestival}
        />
      </main>
      <footer className={styles.buttonContainer}>
        <Button
          text={numberToDelete + ' ' + `개 항목 삭제하기`}
          className={styles.buttonStyle}
          onClick={handleConfirm}
          disabled={numberToDelete == 0}
        ></Button>
      </footer>
    </div>
  );
};

export default DeleteFestivalPage;
