import { TimeTableInfoType } from '@pages/time-table/types/time-table-info-type';

import * as styles from './stage.css';
const Stage = ({ timeTableInfo }: TimeTableInfoType) => {
  const stageCount = [1, 2, 3];
  return (
    <div className={styles.stageWrapper}>
      {stageCount.map((i) => (
        <div key={i} className={styles.stageBox}>
          무대지롱
        </div>
      ))}
    </div>
  );
};

export default Stage;
