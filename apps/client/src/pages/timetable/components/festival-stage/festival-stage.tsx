import { TimetableInfoType } from '@pages/timetable/types/timetable-info-type';

import { Stroke } from '@confeti/design-system/icons';

import * as styles from './festival-stage.css';

const FestivalStage = ({ timetableInfo }: TimetableInfoType) => {
  return (
    <div className={styles.stageWrapper}>
      {timetableInfo.stages.map((info) => (
        <div key={info.stageOrder} className={styles.stageBoxWrapper}>
          <div className={styles.stageBox}>{info.stageName}</div>
          <Stroke width="2px" height="16px" />
        </div>
      ))}
    </div>
  );
};

export default FestivalStage;
