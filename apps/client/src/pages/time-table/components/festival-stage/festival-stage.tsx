import { TimeTableInfoType } from '@pages/time-table/types/time-table-info-type';

import { Stroke } from '@confeti/design-system/icons';

import * as styles from './festival-stage.css';
const FestivalStage = ({ timeTableInfo }: TimeTableInfoType) => {
  const stageCount = [1, 2, 3, 4];
  return (
    <div className={styles.stageWrapper}>
      {stageCount.map((i) => (
        <div key={i} className={styles.stageBoxWrapper}>
          <div className={styles.stageBox}>무대지롱</div>
          <Stroke width="2px" height="16px" />
        </div>
      ))}
    </div>
  );
};

export default FestivalStage;
