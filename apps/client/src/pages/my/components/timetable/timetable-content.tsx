import { useEffect, useState } from 'react';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Button, Dialog } from '@confeti/design-system';

import {
  MY_TIMETABLE_MUTATION_OPTIONS,
  MY_TIMETABLE_QUERY_OPTIONS,
} from '@shared/apis/my/my-timetable-queries';
import { FestivalList } from '@shared/components';
import { MY_TIMETABLE_QUERY_KEY } from '@shared/constants/query-key';
import { SORT_OPTIONS } from '@shared/constants/sort-label';
import { routePath } from '@shared/router/path';
import { buildPath } from '@shared/utils/build-path';

import { TimetableListHeader } from '@pages/my/components/timetable/timetable-list-header';

import * as styles from './timetable-content.css';

export const TimetableContent = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [deleteStatus, setDeleteStatus] = useState<
    'none' | 'confirm' | 'success'
  >('none');

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data } = useSuspenseQuery(
    MY_TIMETABLE_QUERY_OPTIONS.OVERVIEW(SORT_OPTIONS.RECENT),
  );

  const { mutate: deleteTimetables, isPending } = useMutation({
    ...MY_TIMETABLE_MUTATION_OPTIONS.DELETE_TIMETABLES(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: MY_TIMETABLE_QUERY_KEY.ALL,
      });

      setIsEditMode(false);
      setSelectedIds([]);
      setDeleteStatus('success');
    },
  });

  const handleEditModeToggle = () => {
    setIsEditMode((prev) => !prev);
    if (isEditMode) {
      setSelectedIds([]);
    }
  };

  const handleDelete = () => {
    if (selectedIds.length === 0 || isPending) return;
    setDeleteStatus('confirm');
  };

  const handleConfirmDelete = () => {
    if (selectedIds.length === 0 || isPending) return;
    deleteTimetables(selectedIds);
  };

  const handleCloseDialog = () => {
    if (isPending) return;
    setDeleteStatus('none');
  };

  useEffect(() => {
    if (deleteStatus !== 'success') return;

    const timer = setTimeout(() => {
      setDeleteStatus('none');
    }, 2000);

    return () => clearTimeout(timer);
  }, [deleteStatus]);

  const toggleSelection = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleItemClick = (id: number) => {
    if (isEditMode) {
      toggleSelection(id);
      return;
    }

    navigate(buildPath(routePath.MY_TIMETABLE_DETAIL, { id }));
  };

  const festivals = data.timetables.map((timetable) => ({
    id: timetable.typeId,
    posterUrl: timetable.posterUrl,
    title: timetable.title,
  }));

  return (
    <article className={styles.wrapper}>
      <TimetableListHeader
        totalCount={data.timetableCount}
        isEditMode={isEditMode}
        selectedCount={selectedIds.length}
        onEditModeToggle={handleEditModeToggle}
        onDelete={handleDelete}
      />
      <FestivalList>
        {festivals.map((festival) => (
          <FestivalList.Item
            key={festival.id}
            festival={festival}
            onClick={() => handleItemClick(festival.id)}
          >
            {isEditMode && (
              <FestivalList.Checkbox
                checked={selectedIds.includes(festival.id)}
                onChange={() => toggleSelection(festival.id)}
              />
            )}
          </FestivalList.Item>
        ))}
      </FestivalList>

      <Dialog open={deleteStatus === 'confirm'} handleClose={handleCloseDialog}>
        <Dialog.Content>
          <Dialog.Title>
            <span className={styles.text}>{selectedIds.length}</span>
            <span>개의 페스티벌을 삭제할까요?</span>
          </Dialog.Title>
          <Dialog.Description>
            해당 타임테이블이 영구적으로 삭제돼요.
          </Dialog.Description>
        </Dialog.Content>
        <Dialog.Action>
          <Button text="돌아가기" onClick={handleCloseDialog} variant="back" />
          <Button text="삭제하기" onClick={handleConfirmDelete} />
        </Dialog.Action>
      </Dialog>

      <Dialog open={deleteStatus === 'success'}>
        <Dialog.Content>
          <Dialog.Title>성공적으로 삭제되었어요.</Dialog.Title>
        </Dialog.Content>
      </Dialog>
    </article>
  );
};
