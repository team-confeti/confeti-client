import { useState } from 'react';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Button, useOverlay } from '@confeti/design-system';

import {
  MY_TIMETABLE_MUTATION_OPTIONS,
  MY_TIMETABLE_QUERY_OPTIONS,
} from '@shared/apis/my/my-timetable-queries';
import { DetailHeader } from '@shared/components';
import { FESTIVAL_TIMETABLE_QUERY_KEY } from '@shared/constants/query-key';
import { MY_TIMETABLE_QUERY_KEY } from '@shared/constants/query-key';

import {
  ConfirmDialog,
  SuccessDialog,
} from '@pages/timetable/page/delete-festival/delete-festival-dialogs';
import DeleteFestivalSelector from '@pages/timetable/page/delete-festival/delete-festival-selector';

import * as styles from './delete-festival-page.css';

const DeleteFestivalPage = () => {
  const [festivalsToDelete, setFestivalsToDelete] = useState<number[]>([]);
  const overlay = useOverlay();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const numberToDelete = festivalsToDelete.length;

  const { data: timetableData } = useSuspenseQuery(
    MY_TIMETABLE_QUERY_OPTIONS.SORT_BY('earliest'),
  );
  const festivalsData = {
    festivals: timetableData.timetables.map((t) => ({
      festivalId: t.timetableId,
      title: t.title,
      logoUrl: t.posterUrl,
      festivalDates: [],
    })),
  };
  const { mutate: deleteTimetables } = useMutation({
    ...MY_TIMETABLE_MUTATION_OPTIONS.DELETE_TIMETABLES(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...FESTIVAL_TIMETABLE_QUERY_KEY.ALL],
      });
      queryClient.invalidateQueries({
        queryKey: MY_TIMETABLE_QUERY_KEY.ALL,
      });
    },
  });

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
          deleteTimetables(festivalsToDelete);

          // 삭제 mutation 완료 후 성공 모달창 open
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
      <DetailHeader title="페스티벌 삭제하기" />
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
