import { TimeTableInfoType } from '@pages/time-table/types/time-table-info-type';

import * as styles from './stage.css';
const Stage = ({ timeTableInfo }: TimeTableInfoType) => {
  return (
    <div className={styles.stageWrapper}>
      {timeTableInfo.stages.map(({ stageOrder, stageName }) => (
        <div key={stageOrder} className={styles.wrapper}>
          {stageName.replace(/ STAGE$/, '')}
        </div>
      ))}
    </div>
  );
};

export default Stage;
