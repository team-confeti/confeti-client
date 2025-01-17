import TimeCell from '@pages/time-table/components/time-cell';
import * as styles from './time-table-board.css';
import BoothOpenBox from '@pages/time-table/components/booth-open-box';
import TimeTableItem from '@pages/time-table/components/time-table-item';

interface Artist {
  artistId: string;
  artistName: string;
}

interface FestivalTimes {
  festivalTimeId: number;
  startAt: string;
  endAt: string;
  isSelected: boolean;
  artists: Artist[];
}

interface Stage {
  stageOrder: number;
  stageName: string;
  festivalTimes: FestivalTimes[];
}

interface TimeTableInfo {
  ticketOpenAt: string;
  stageCount: number;
  stages: Stage[];
}

interface TimeTableBoardProps {
  timeTableInfo: TimeTableInfo;
}

const TimeTableBoard = ({ timeTableInfo }: TimeTableBoardProps) => {
  const [openHour, openMin] = timeTableInfo.ticketOpenAt
    .slice(0, 5)
    .split(':')
    .map(Number);

  const isHalfHourOpen = openMin === 30;
  const ticketOpenHour = isHalfHourOpen
    ? Number(openHour) + 1
    : Number(openHour);

  const cellNumber = Array.from(
    { length: 24 - ticketOpenHour },
    (_, idx) => ticketOpenHour + idx,
  );

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
          <p className={styles.minutesP}>{30}</p>
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
