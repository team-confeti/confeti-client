import { Button, toast } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import * as styles from './timetable-actions.css';

interface Props {
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onDownload: () => void;
}

const TimetableActions = ({
  isEditMode,
  onToggleEditMode,
  onDownload,
}: Props) => {
  return (
    <div className={styles.actionsWrapper}>
      {!isEditMode && (
        <button
          onClick={() => {
            onDownload();
            toast({
              text: '타임테이블 이미지가 저장되었어요.',
              position: 'middleCenter',
            });
          }}
          className={styles.downloadButton}
          aria-label="이미지 저장"
        >
          <Icon name="download" size="5rem" color="gray500" />
        </button>
      )}
      <Button
        className={styles.editButton}
        onClick={onToggleEditMode}
        text={isEditMode ? '완료하기' : '타임테이블 편집하기'}
        icon={
          isEditMode ? (
            <Icon name="check" size="2.4rem" />
          ) : (
            <Icon name="edit" size="2rem" color="confeti_lime2" />
          )
        }
      />
    </div>
  );
};

export default TimetableActions;
