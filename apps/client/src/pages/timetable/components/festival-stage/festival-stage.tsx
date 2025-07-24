import { Icon } from '@confeti/design-system/icon';

import { TimetableInfoType } from '@pages/timetable/types/timetable-info-type';

import * as styles from './festival-stage.css';

const FestivalStage = ({ timetableInfo }: TimetableInfoType) => {
  return (
    <div className={styles.stageWrapper}>
      {timetableInfo.stages.map((info) => (
        <div key={info.stageOrder} className={styles.stageBoxWrapper}>
          <div className={styles.stageBox}>{info.stageName}</div>
          <Icon name="timetable-stroke" width="0.2rem" height="1.6rem" />
        </div>
      ))}
    </div>
  );
};

export default FestivalStage;
