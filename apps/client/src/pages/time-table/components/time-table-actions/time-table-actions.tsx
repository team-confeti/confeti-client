import { Button, ButtonIcon } from '@confeti/design-system';
import {
  BtnDownload,
  IcCheck,
  IcEditGreen24,
} from '@confeti/design-system/icons';

import * as styles from './time-table-actions.css';

interface Props {
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onDownload: () => void;
}

const TimeTableActions = ({
  isEditMode,
  onToggleEditMode,
  onDownload,
}: Props) => {
  return (
    <div className={styles.actionsWrapper}>
      {!isEditMode && (
        <ButtonIcon
          onClick={onDownload}
          ariaLabel="이미지 저장"
          icon={<BtnDownload width={'5rem'} height={'5rem'} />}
        />
      )}
      <Button
        className={styles.editButton}
        onClick={onToggleEditMode}
        text={isEditMode ? '완료하기' : '타임테이블 편집하기'}
        icon={
          isEditMode ? (
            <IcEditGreen24 width={'2.4rem'} height={'2.4rem'} />
          ) : (
            <IcCheck width={'2.4rem'} height={'2.4rem'} />
          )
        }
      />
    </div>
  );
};

export default TimeTableActions;
