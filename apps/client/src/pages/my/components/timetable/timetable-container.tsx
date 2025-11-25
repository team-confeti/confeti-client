import { Suspense, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Button, Dialog, Skeleton } from '@confeti/design-system';

import { MY_TIMETABLE_MUTATION_OPTIONS } from '@shared/apis/my/my-timetable-queries';
import Deferred from '@shared/components/deferred/deferred';
import { MY_TIMETABLE_QUERY_KEY } from '@shared/constants/query-key';
import { SORT_OPTIONS } from '@shared/constants/sort-label';
import { routePath } from '@shared/router/path';
import { buildPath } from '@shared/utils/build-path';

import { TimetableContent } from './timetable-content';
import { TimetableListHeader } from './timetable-list-header';

import * as styles from './timetable-container.css';

export const TimetableContainer = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [deleteStatus, setDeleteStatus] = useState<
    'none' | 'confirm' | 'success'
  >('none');
  const [sortOption, setSortOption] = useState<
    SORT_OPTIONS.RECENT | SORT_OPTIONS.OLDEST
  >(SORT_OPTIONS.RECENT);

  const [totalCount, setTotalCount] = useState<number | null>(null);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const orderBy = sortOption === SORT_OPTIONS.RECENT ? 'latest' : 'earliest';

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
    if (isEditMode) setSelectedIds([]);
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

    const timer = setTimeout(() => setDeleteStatus('none'), 2000);
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

  const handleSortChange = (
    newSortOption: SORT_OPTIONS.RECENT | SORT_OPTIONS.OLDEST,
  ) => setSortOption(newSortOption);

  return (
    <article className={styles.wrapper}>
      <TimetableListHeader
        totalCount={totalCount ?? 0}
        isEditMode={isEditMode}
        selectedCount={selectedIds.length}
        sortOption={sortOption}
        onEditModeToggle={handleEditModeToggle}
        onDelete={handleDelete}
        onSortChange={handleSortChange}
      />

      <Suspense fallback={<TimetableListSkeleton />}>
        <TimetableContent
          isEditMode={isEditMode}
          selectedIds={selectedIds}
          orderBy={orderBy}
          onItemClick={handleItemClick}
          onCheckboxToggle={toggleSelection}
          setTotalCount={setTotalCount}
        />
      </Suspense>

      <Dialog open={deleteStatus === 'confirm'} handleClose={handleCloseDialog}>
        <Dialog.Content>
          <Dialog.Title>
            <span className={styles.text}>{selectedIds.length}</span>개의
            페스티벌을 삭제할까요?
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

const TimetableListSkeleton = () => {
  return (
    <Deferred>
      <div className={styles.skeletonWrapper}>
        {Array.from({ length: 3 }).map((_, idx) => (
          <Skeleton
            key={idx}
            width="100%"
            height="5rem"
            variants="rectangular"
          />
        ))}
      </div>
    </Deferred>
  );
};
