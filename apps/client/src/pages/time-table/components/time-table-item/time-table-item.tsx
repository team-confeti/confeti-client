import { useState } from 'react';
import {
  parseTimeString,
  calcTotalMinutes,
  calcMinutesFromOpen,
  calcTotalFestivalMinutes,
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
      onClick(userTimetableId, !selectBlock);
    }
  };

  const top = `calc(${(minutesFromOpen / totalFestivalMinutes) * 100}% + 0.75rem)`;
  const heightPercentage = `calc((${totalPerformMin} / ${totalFestivalMinutes}) * 100%)`;
  const left = `calc( 3.1rem + ((100% - 3.5rem) / ${stageCount} * ${stageOrder - 1}))`;
  const width = `calc((100% - 3.2rem) / ${stageCount})`;

  const dynamicVars = assignInlineVars({
    [styles.left]: left,
    [styles.width]: width,
    [styles.top]: top,
    [styles.height]: heightPercentage,
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
        {`(${totalPerformMin}min)`}
      </div>
    </div>
  );
};

export default TimeTableItem;
