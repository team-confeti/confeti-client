import { useState } from 'react';
import * as styles from './time-table-item.css';
import {
  parseTimeString,
  calcPosition,
  calcTotalMinutes,
  calcMinutesFromOpen,
} from '@pages/time-table';

interface ItemProps {
  artists: Artist[];
  startTime: string;
  endTime: string;
  stageCount: number;
  isSelected: boolean;
  stageOrder: number;
  ticketOpenAt: string;

  festivalTimeId: number;
}

interface Artist {
  artistId: string;
  artistName: string;
}

const TimeTableItem = ({
  artists,
  startTime,
  endTime,
  ticketOpenAt,
  isSelected,
  stageOrder,
  stageCount,
  festivalTimeId,
}: ItemProps) => {
  const [selectBlock, setSelectBlock] = useState(isSelected);
  const [startHour, startMin] = parseTimeString(startTime);
  const [endHour, endMin] = parseTimeString(endTime);
  const [openHour, openMin] = parseTimeString(ticketOpenAt);
  const totalMin = calcTotalMinutes(startHour, startMin, endHour, endMin);
  const minutesFromOpen = calcMinutesFromOpen(
    startHour,
    startMin,
    openHour,
    openMin,
  );
  const { top, diff } = calcPosition(totalMin, minutesFromOpen);

  //TODO: 추후 API 연결할때 필요한 prop, build 에러 방지를 위한 코드
  festivalTimeId;

  const handleSetSelectedBlock = () => {
    setSelectBlock((prev) => !prev);
  };
  return (
    <div
      style={
        {
          '--stage-count': stageCount,
          '--stage-order': stageOrder - 1,
          '--diff': `${diff}rem`,
          '--top': `${top}rem`,
        } as React.CSSProperties
      }
      className={styles.itemsWrapper({ isSelected: selectBlock })}
      onClick={() => handleSetSelectedBlock()}
    >
      <div className={styles.alignContainer}>
        <p className={styles.artistName({ isSelected: selectBlock })}>
          {artists.map((artist) => artist.artistName).join(', ')}
        </p>
      </div>

      <p className={styles.durationP({ isSelected: selectBlock })}>
        {startTime.slice(0, 5)}-{endTime.slice(0, 5)}
        {`(${totalMin}min)`}
      </p>
    </div>
  );
};

export default TimeTableItem;
