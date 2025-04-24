import { useState } from 'react';
import {
  calcMinutesFromOpen,
  calcTotalFestivalMinutes,
  calcTotalMinutes,
  parseTimeString,
} from '@pages/time-table/utils';
import { calcTableItemPosition } from '@pages/time-table/utils/calculate-position';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import * as styles from './time-table-item.css';

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

  const totalPerformMin = calcTotalMinutes(
    startHour,
    startMin,
    endHour,
    endMin,
  );
  const minutesFromOpen = calcMinutesFromOpen(
    startHour,
    startMin,
    openHour,
    openMin,
  );

  const totalFestivalMinutes = calcTotalFestivalMinutes(openHour, openMin);

  const handleSetSelectedBlock = () => {
    if (isEditTimeTableMode) {
      setSelectBlock((prev) => !prev);
    }
    onClick(userTimetableId, !selectBlock);
  };

  const top = `calc(${(minutesFromOpen / totalFestivalMinutes) * 100}% + 0.75rem)`;
  const height = `calc((${totalPerformMin} / ${totalFestivalMinutes}) * 100%)`;

  const dynamicVars = assignInlineVars({
    [styles.top]: top,
    [styles.height]: height,
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
        {`${startHour}:${startMin}-${endHour}:${endMin}`}
        {`(${totalPerformMin}min)`}
      </div>
    </div>
  );
};

export default TimeTableItem;
