import { RefObject } from 'react';

import { Icon } from '@confeti/design-system/icon';

import { TimetableInfoType } from '@pages/timetable/types/timetable-info-type';

import * as styles from './festival-stage.css';

interface FestivalStageProps extends TimetableInfoType {
  scrollRef?: RefObject<HTMLDivElement | null>;
  onScroll?: () => void;
}

const FestivalStage = ({
  timetableInfo,
  scrollRef,
  onScroll,
}: FestivalStageProps) => {
  const lastIndex = timetableInfo.stages.length - 1;

  return (
    <div className={styles.stageWrapper} ref={scrollRef} onScroll={onScroll}>
      {timetableInfo.stages.map((info, index) => (
        <div key={info.stageOrder} className={styles.stageBoxWrapper}>
          <div
            className={styles.stageBox({
              hasSingleFestivalTime: info.festivalTimes.length === 1,
            })}
          >
            {info.stageName}
          </div>
          {index !== lastIndex && (
            <Icon name="timetable-stroke" width="0.5rem" height="1.6rem" />
          )}
        </div>
      ))}
    </div>
  );
};

export default FestivalStage;
