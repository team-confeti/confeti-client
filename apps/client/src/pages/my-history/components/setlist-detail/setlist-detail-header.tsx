import * as styles from './setlist-detail-header.css';

interface SetListHeaderProps {
  isEditMode?: boolean;
  showEditButton?: boolean;
  onClickToggleEdit?: () => void;
}

const SetListHeader = ({
  isEditMode = false,
  showEditButton = false,
  onClickToggleEdit,
}: SetListHeaderProps) => {
  return (
    <header className={styles.header}>
      <h2 className={styles.title}>셋리스트</h2>
      {showEditButton && (
        <button
          className={`${styles.editButton} ${isEditMode ? styles.editButtonDone : ''}`}
          onClick={onClickToggleEdit}
        >
          {isEditMode ? '완료' : '편집'}
        </button>
      )}
    </header>
  );
};

export default SetListHeader;
