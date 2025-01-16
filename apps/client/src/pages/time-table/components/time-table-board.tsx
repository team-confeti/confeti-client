import TimeCell from '@pages/time-table/components/time-cell';
import * as styles from './time-table-board.css';
import BoothOpenBox from '@pages/time-table/components/booth-open-box';
import TimeTableItem from '@pages/time-table/components/time-table-item';
import { useState } from 'react';

interface Artist {
  artistId: string;
  name: string;
  startAt: string;
  endAt: string;
  isSelected: boolean;
}

interface Stage {
  stageOrder: number;
  name: string;
  artists: Artist[];
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
  const [isSelected, setIsSelected] = useState(false);

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

  const handleIsSelected = () => {
    setIsSelected((prev) => !prev);
  };

  return (
    <div className={styles.wrapper}>
      <BoothOpenBox openHour={openHour} openMin={openMin} />

      {cellNumber.map((hour) => (
        <div key={hour}>
          <TimeCell hour={hour} isHalfHourOpen={isHalfHourOpen} />
        </div>
      ))}

      {timeTableInfo.stages.map((stage) => {
        return (
          <div key={stage.stageOrder}>
            {stage.artists.map((artist) => (
              <TimeTableItem
                stageCount={timeTableInfo.stageCount}
                key={artist.artistId}
                name={artist.name}
                isSelected={isSelected}
                handleIsSelected={handleIsSelected}
                startTime={artist.startAt}
                endTime={artist.endAt}
                stageOrder={stage.stageOrder}
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
