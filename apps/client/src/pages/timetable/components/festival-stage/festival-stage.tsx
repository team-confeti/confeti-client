import { TimeTableInfoType } from '@pages/timetable/types/timetable-info-type';

import { Stroke } from '@confeti/design-system/icons';

import * as styles from './festival-stage.css';

const FestivalStage = ({ timeTableInfo }: TimeTableInfoType) => {
  return (
    <div className={styles.stageWrapper}>
      {timeTableInfo.stages.map((info) => (
        <div key={info.stageOrder} className={styles.stageBoxWrapper}>
          <div className={styles.stageBox}>{info.stageName}</div>
          <Stroke width="2px" height="16px" />
        </div>
      ))}
    </div>
  );
};

export default FestivalStage;
