import { useState } from 'react';

import { Button, toast } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import { LogClickEvent } from '@shared/analytics/logging';

import * as styles from './timetable-actions.css';

interface Props {
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onDownload: () => Promise<{ success: boolean; message: string }>;
}

const TimetableActions = ({
  isEditMode,
  onToggleEditMode,
  onDownload,
}: Props) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadImage = async () => {
    if (isDownloading) return;

    setIsDownloading(true);
    try {
      const result = await onDownload();
      toast({
        text: result.message,
        position: 'middleCenter',
      });
    } catch {
      toast({
        text: '이미지 저장 중 오류가 발생했습니다.',
        position: 'middleCenter',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className={styles.actionsWrapper}>
      {!isEditMode && (
        <LogClickEvent name="click_timetable_download_image">
          <button
            onClick={handleDownloadImage}
            className={styles.downloadButton}
            aria-label="이미지 저장"
            disabled={isDownloading}
          >
            {isDownloading ? (
              <div className={styles.spinner} />
            ) : (
              <Icon name="download" size="5rem" color="gray500" />
            )}
          </button>
        </LogClickEvent>
      )}
      <LogClickEvent
        name="click_timetable_edit_mode"
        params={{ action: isEditMode ? 'complete' : 'start' }}
      >
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
      </LogClickEvent>
    </div>
  );
};

export default TimetableActions;
