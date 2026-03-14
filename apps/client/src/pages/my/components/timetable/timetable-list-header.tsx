import { Icon } from '@confeti/design-system/icon';

import { LogClickEvent } from '@shared/analytics/logging';
import { SORT_BASIC_LABELS, SORT_OPTIONS } from '@shared/constants/sort-label';

import * as styles from './timetable-list-header.css';

interface Props {
  totalCount: number;
  isEditMode: boolean;
  selectedCount?: number;
  sortOption: SORT_OPTIONS.RECENT | SORT_OPTIONS.OLDEST;
  onEditModeToggle: () => void;
  onDelete: () => void;
  onSortChange: (sortOption: SORT_OPTIONS.RECENT | SORT_OPTIONS.OLDEST) => void;
}

export const TimetableListHeader = ({
  totalCount,
  isEditMode,
  selectedCount = 0,
  sortOption,
  onEditModeToggle,
  onDelete,
  onSortChange,
}: Props) => {
  const nextSortOption =
    sortOption === SORT_OPTIONS.RECENT
      ? SORT_OPTIONS.OLDEST
      : SORT_OPTIONS.RECENT;

  const toggleSort = () => {
    onSortChange(nextSortOption);
  };

  return (
    <section className={styles.header}>
      <div className={styles.leftContent}>
        <p>전체 {totalCount}</p>
        <LogClickEvent
          name="click_my_timetable_sort"
          params={{ sort: nextSortOption }}
        >
          <button className={styles.sort} onClick={toggleSort}>
            <p>{SORT_BASIC_LABELS[sortOption]}</p>
            <Icon name="switch" size="1.6rem" />
          </button>
        </LogClickEvent>
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
    <LogClickEvent name="click_my_timetable_cancel_edit">
      <button className={styles.cancelButton} onClick={onCancel}>
        <p>취소</p>
      </button>
    </LogClickEvent>
    <LogClickEvent
      name="click_my_timetable_open_delete"
      params={{ count: selectedCount }}
    >
      <button
        className={styles.deleteButton({ isActive: selectedCount > 0 })}
        onClick={onDelete}
      >
        <p>삭제</p>
      </button>
    </LogClickEvent>
  </div>
);

interface DefaultModeButtonProps {
  onEditModeToggle: () => void;
}

const DefaultModeButton = ({ onEditModeToggle }: DefaultModeButtonProps) => (
  <LogClickEvent name="click_my_timetable_edit">
    <button className={styles.editButton} onClick={onEditModeToggle}>
      <Icon name="edit" size="1.6rem" />
      <p>편집하기</p>
    </button>
  </LogClickEvent>
);
