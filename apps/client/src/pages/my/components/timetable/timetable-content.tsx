import { useState } from 'react';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';

import { Button, Dialog } from '@confeti/design-system';

import {
  MY_TIMETABLE_MUTATION_OPTIONS,
  MY_TIMETABLE_QUERY_OPTIONS,
} from '@shared/apis/my/my-timetable-queries';
import { FestivalList } from '@shared/components';
import { MY_TIMETABLE_QUERY_KEY } from '@shared/constants/query-key';
import { SORT_OPTIONS } from '@shared/constants/sort-label';

import { TimetableListHeader } from '@pages/my/components/timetable/timetable-list-header';

import * as styles from './timetable-content.css';

export const TimetableContent = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const queryClient = useQueryClient();

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
      setIsDialogOpen(false);
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
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedIds.length === 0 || isPending) return;
    deleteTimetables(selectedIds);
  };

  const handleCloseDialog = () => {
    if (isPending) return;
    setIsDialogOpen(false);
  };

  const toggleSelection = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleItemClick = (id: number) => {
    if (isEditMode) {
      toggleSelection(id);
    }
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

      <Dialog open={isDialogOpen} handleClose={handleCloseDialog}>
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
    </article>
  );
};
