import { Button, ButtonIcon } from '@confeti/design-system';
import { BtnDownload, IcEditGreen24 } from '@confeti/design-system/icons';

import * as styles from './time-table-actions.css';

const TimeTableActions = () => {
  return (
    <div className={styles.wrapper}>
      <ButtonIcon
        ariaLabel="download-button"
        icon={<BtnDownload width={'5rem'} height={'5rem'} />}
      />
      <Button
        text="타임테이블 편집하기"
        icon={<IcEditGreen24 width={'2.4rem'} height={'2.4rem'} />}
        className={styles.editButton}
      ></Button>
    </div>
  );
};

export default TimeTableActions;
