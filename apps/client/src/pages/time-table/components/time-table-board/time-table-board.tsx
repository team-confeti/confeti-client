import TimeCell from '@pages/time-table/components/time-cell/time-cell';
import * as styles from './time-table-board.css';
import BoothOpenBox from '@pages/time-table/components/booth-open-box/booth-open-box';
import TimeTableItem from '@pages/time-table/components/time-table-item/time-table-item';
import { TimeTableInfoType } from '@pages/time-table/types/time-table-info-type';
import { generateTableRow, parseTimeString } from '@pages/time-table/utils';
import { HALF_HOUR_TO_MINUTES } from '@pages/time-table/constants';

const TimeTableBoard = ({ timeTableInfo }: TimeTableInfoType) => {
  const [openHour, openMin] = parseTimeString(timeTableInfo.ticketOpenAt);

  const isHalfHourOpen = openMin === HALF_HOUR_TO_MINUTES;
  const ticketOpenHour = isHalfHourOpen ? openHour + 1 : openHour;

  const cellNumber = generateTableRow(ticketOpenHour);

  return (
    <div className={styles.wrapper}>
      <BoothOpenBox ticketOpenHour={timeTableInfo.ticketOpenAt} />

      {cellNumber.map((hour) => (
        <div key={hour}>
          <TimeCell hour={hour} isHalfHourOpen={isHalfHourOpen} />
        </div>
      ))}

      {timeTableInfo.stages.map((stage) => {
        return (
          <div key={stage.stageOrder}>
            {stage.festivalTimes.map((block) => (
              <TimeTableItem
                ticketOpenAt={timeTableInfo.ticketOpenAt}
                stageCount={timeTableInfo.stageCount}
                key={block.festivalTimeId}
                artists={block.artists}
                isSelected={block.isSelected}
                startTime={block.startAt}
                endTime={block.endAt}
                stageOrder={stage.stageOrder}
                festivalTimeId={block.festivalTimeId}
              />
            ))}
          </div>
        );
      })}

      {isHalfHourOpen && (
        <div className={styles.timeList}>
          <p className={styles.minutesP}>{HALF_HOUR_TO_MINUTES}</p>
        </div>
      )}

      <div className={styles.timeList}>
        <p className={styles.timeP}>{24}</p>
        <hr className={styles.timeBar} />
      </div>
    </div>
  );
};

export default TimeTableBoard;
