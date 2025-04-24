import { Button, ButtonIcon } from '@confeti/design-system';
import { BtnDownload } from '@confeti/design-system/icons';

import * as styles from './time-table-actions.css';

const TimeTableActions = () => {
  return (
    <div className={styles.wrapper}>
      <ButtonIcon
        className={styles.downloadButton}
        ariaLabel="download-button"
        icon={<BtnDownload width={'3rem'} height={'3rem'} />}
      />
      <Button text="타임테이블 편집하기"></Button>
    </div>
  );
};

export default TimeTableActions;
