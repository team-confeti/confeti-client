import { useState } from 'react';

import { Icon } from '@confeti/design-system/icon';

import {
  SORT_LABELS,
  SORT_OPTIONS,
  SortOption,
} from '@shared/constants/sort-label';

import * as styles from './timetable-list-header.css';

interface Props {
  totalCount: number;
  isEditMode: boolean;
  selectedCount?: number;
  onEditModeToggle: () => void;
  onDelete: () => void;
}

export const TimetableListHeader = ({
  totalCount,
  isEditMode,
  selectedCount = 0,
  onEditModeToggle,
  onDelete,
}: Props) => {
  const [sortOption, setSortOption] = useState<SortOption>(SORT_OPTIONS.RECENT);

  // TODO: 실제 정렬 기준 나오면 수정
  const toggleSort = () => {
    setSortOption((prev) =>
      prev === SORT_OPTIONS.RECENT
        ? SORT_OPTIONS.ALPHABETICAL
        : SORT_OPTIONS.RECENT,
    );
  };

  return (
    <section className={styles.header}>
      <div className={styles.leftContent}>
        <p>전체 {totalCount}</p>
        <button className={styles.sort} onClick={toggleSort}>
          <p>{SORT_LABELS[sortOption]}</p>
          <Icon name="switch" size="1.6rem" />
        </button>
      </div>
      <div className={styles.rightContent}>
        {isEditMode ? (
          <EditModeButtons
            selectedCount={selectedCount}
            onCancel={onEditModeToggle}
            onDelete={onDelete}
          />
        ) : (
          <DefaultModeButton onEditModeToggle={onEditModeToggle} />
        )}
      </div>
    </section>
  );
};

interface EditModeButtonsProps {
  selectedCount: number;
  onCancel: () => void;
  onDelete: () => void;
}

const EditModeButtons = ({
  selectedCount,
  onCancel,
  onDelete,
}: EditModeButtonsProps) => (
  <div className={styles.buttons}>
    <button className={styles.cancelButton} onClick={onCancel}>
      <p>취소</p>
    </button>
    <button
      className={styles.deleteButton({ isActive: selectedCount > 0 })}
      onClick={onDelete}
    >
      <p>삭제</p>
    </button>
  </div>
);

interface DefaultModeButtonProps {
  onEditModeToggle: () => void;
}

const DefaultModeButton = ({ onEditModeToggle }: DefaultModeButtonProps) => (
  <button className={styles.editButton} onClick={onEditModeToggle}>
    <Icon name="edit" size="1.6rem" />
    <p>편집하기</p>
  </button>
);
