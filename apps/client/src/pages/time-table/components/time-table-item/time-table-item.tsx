import { useState } from 'react';
import {
  parseTimeString,
  calcPosition,
  calcTotalMinutes,
  calcMinutesFromOpen,
} from '@pages/time-table/utils';
import * as styles from './time-table-item.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';

interface ItemProps {
  artists: Artist[];
  startTime: string;
  endTime: string;
  stageCount: number;
  isSelected: boolean;
  stageOrder: number;
  ticketOpenAt: string;
  userTimetableId: number;
  isEditTimeTableMode: boolean;
  onClick: (userTimetableId: number, isSelected: boolean) => void;
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
  userTimetableId,
  isEditTimeTableMode,
  onClick,
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

  const handleSetSelectedBlock = () => {
    if (isEditTimeTableMode) {
      setSelectBlock((prev) => !prev);
      onClick(userTimetableId, !selectBlock);
    }
  };

  const dynamicVars = assignInlineVars({
    [styles.stageCount]: stageCount.toString(),
    [styles.stageOrder]: (stageOrder - 1).toString(),
    [styles.topPosition]: `${top}rem`,
    [styles.height]: `${diff}rem`,
  });

  return (
    <div
      style={dynamicVars}
      className={styles.itemsWrapper({ isSelected: selectBlock })}
      onClick={handleSetSelectedBlock}
    >
      <div className={styles.artistName({ isSelected: selectBlock })}>
        {artists.map((artist) => artist.artistName).join(', ')}
      </div>
      <div className={styles.durationP({ isSelected: selectBlock })}>
        {startTime.slice(0, 5)}-{endTime.slice(0, 5)}
        {`(${totalMin}min)`}
      </div>
    </div>
  );
};

export default TimeTableItem;
