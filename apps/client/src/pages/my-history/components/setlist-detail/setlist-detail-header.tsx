import * as styles from './setlist-detail-header.css';

interface SetListHeaderProps {
  isEditMode: boolean;
  showEditButton: boolean;
  onClickStartEdit: () => void;
  onClickCompleteEdit: () => void;
}

const SetListHeader = ({
  isEditMode,
  showEditButton,
  onClickStartEdit,
  onClickCompleteEdit,
}: SetListHeaderProps) => {
  return (
    <header className={styles.header}>
      <h2 className={styles.title}>셋리스트</h2>
      {showEditButton && (
        <button
          className={`${styles.editButton} ${isEditMode ? styles.editButtonDone : ''}`}
          onClick={isEditMode ? onClickCompleteEdit : onClickStartEdit}
        >
          {isEditMode ? '완료' : '편집'}
        </button>
      )}
    </header>
  );
};

export default SetListHeader;
