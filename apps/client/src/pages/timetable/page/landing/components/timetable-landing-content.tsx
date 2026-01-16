import { useState } from 'react';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Button, Dialog } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import {
  MY_TIMETABLE_MUTATION_OPTIONS,
  MY_TIMETABLE_QUERY_OPTIONS,
} from '@shared/apis/my/my-timetable-queries';
import { FestivalList } from '@shared/components';
import { MY_TIMETABLE_QUERY_KEY } from '@shared/constants/query-key';
import { routePath } from '@shared/router/path';
import { buildPath } from '@shared/utils/build-path';
import { calculateDDay } from '@shared/utils/calculate-d-day';

import * as styles from './timetable-landing-content.css';

type DialogStatus = 'none' | 'confirm' | 'success';

interface TimetableLandingContentProps {
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
}

const TimetableLandingContent = ({
  isEditMode,
  setIsEditMode,
}: TimetableLandingContentProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [dialogStatus, setDialogStatus] = useState<DialogStatus>('none');

  const { data } = useSuspenseQuery(
    MY_TIMETABLE_QUERY_OPTIONS.SORT_BY('earliest'),
  );

  const { mutate: deleteTimetables, isPending } = useMutation({
    ...MY_TIMETABLE_MUTATION_OPTIONS.DELETE_TIMETABLES(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: MY_TIMETABLE_QUERY_KEY.ALL,
      });

      setIsEditMode(false);
      setSelectedIds([]);
      setDialogStatus('success');

      setTimeout(() => {
        setDialogStatus('none');
      }, 2000);
    },
  });

  const festivals = data.timetables
    .filter((t) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const festivalDate = new Date(t.startAt);
      festivalDate.setHours(0, 0, 0, 0);
      return festivalDate >= today;
    })
    .map((t) => ({
      id: t.timetableFestivalId,
      posterUrl: t.posterUrl,
      title: t.title,
      dDay: calculateDDay(t.startAt),
    }));

  const totalCount = festivals.length;
  const isEmpty = totalCount === 0;
  const selectedCount = selectedIds.length;

  const handleEditModeToggle = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      setSelectedIds([]);
    }
  };

  const handleCheckboxToggle = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  const handleItemClick = (festivalId: number) => {
    if (isEditMode) {
      handleCheckboxToggle(festivalId);
      return;
    }
    navigate(buildPath(routePath.MY_TIMETABLE_DETAIL, { id: festivalId }));
  };

  const handleDeleteClick = () => {
    if (selectedCount === 0 || isPending) return;
    setDialogStatus('confirm');
  };

  const handleConfirmDelete = () => {
    if (selectedCount === 0 || isPending) return;
    deleteTimetables(selectedIds);
  };

  const handleCloseDialog = () => {
    setDialogStatus('none');
  };

  return (
    <>
      <section className={styles.header}>
        <div className={styles.leftContent}>
          {!isEditMode && (
            <p className={styles.totalCount}>전체 {totalCount}</p>
          )}
        </div>
        <div className={styles.rightContent}>
          {isEditMode ? (
            <EditModeButtons
              selectedCount={selectedCount}
              onCancel={handleEditModeToggle}
              onDelete={handleDeleteClick}
            />
          ) : (
            <DefaultModeButton onEditModeToggle={handleEditModeToggle} />
          )}
        </div>
      </section>

      {isEmpty && (
        <div className={styles.emptyState}>
          <Icon name="fesetival" size="5rem" color="gray300" />
          <p className={styles.emptyMessage}>새 타임테이블을 추가해보세요!</p>
        </div>
      )}

      {!isEmpty && (
        <div className={styles.listWrapper}>
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
                    onChange={() => handleCheckboxToggle(festival.id)}
                  />
                )}
              </FestivalList.Item>
            ))}
          </FestivalList>
        </div>
      )}

      <Dialog open={dialogStatus === 'confirm'} handleClose={handleCloseDialog}>
        <Dialog.Content>
          <Dialog.Title>
            <span className={styles.dialogHighlight}>{selectedCount}</span>개의
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

      <Dialog open={dialogStatus === 'success'}>
        <Dialog.Content>
          <Dialog.Title>성공적으로 삭제되었어요.</Dialog.Title>
        </Dialog.Content>
      </Dialog>
    </>
  );
};

/**
 * 편집 모드 버튼들 (취소, 삭제)
 */
interface EditModeButtonsProps {
  selectedCount: number;
  onCancel: () => void;
  onDelete: () => void;
}

const EditModeButtons = ({
  selectedCount,
  onCancel,
  onDelete,
}: EditModeButtonsProps) => {
  const isDeleteEnabled = selectedCount > 0;

  return (
    <div className={styles.editModeButtons}>
      <button className={styles.cancelButton} onClick={onCancel}>
        <p>취소</p>
      </button>
      <button
        className={styles.deleteButton({ isActive: isDeleteEnabled })}
        onClick={onDelete}
        disabled={!isDeleteEnabled}
      >
        <p>삭제</p>
      </button>
    </div>
  );
};

/**
 * 일반 모드 버튼 (편집하기)
 */
interface DefaultModeButtonProps {
  onEditModeToggle: () => void;
}

const DefaultModeButton = ({ onEditModeToggle }: DefaultModeButtonProps) => (
  <button className={styles.editButton} onClick={onEditModeToggle}>
    <Icon name="edit" size="1.6rem" />
    <p>편집하기</p>
  </button>
);

export default TimetableLandingContent;
