import { useState } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import { cn } from '@confeti/utils';

import { MINUTE_HEIGHT_PX } from '@pages/timetable/constants';
import {
  calcMinutesFromOpen,
  calcTotalMinutes,
  parseTimeString,
} from '@pages/timetable/utils';

import * as styles from './timetable-item.css';

interface ItemProps {
  artists: Artist[];
  startTime: string;
  endTime: string;
  isSelected: boolean;
  ticketOpenAt: string;
  timeBlockId: number;
  isEditTimetableMode: boolean;
  onClick: (timeBlockId: number, isSelected: boolean) => void;
}

interface Artist {
  artistId: string;
  artistName: string;
}

const TimetableItem = ({
  artists,
  startTime,
  endTime,
  ticketOpenAt,
  isSelected,

  timeBlockId,
  isEditTimetableMode,
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

  const handleSetSelectedBlock = () => {
    if (isEditTimetableMode) {
      setSelectBlock((prev) => !prev);
    }
    onClick(timeBlockId, !selectBlock);
  };

  const top = `${minutesFromOpen * MINUTE_HEIGHT_PX}px`;
  const height = `${totalPerformMin * MINUTE_HEIGHT_PX}px`;

  const dynamicVars = assignInlineVars({
    [styles.top]: top,
    [styles.height]: height,
  });

  return (
    <div
      style={dynamicVars}
      className={cn(
        styles.itemsWrapper({ isSelected: selectBlock }),
        'time-table-item',
      )}
      onClick={handleSetSelectedBlock}
    >
      <div className={cn(styles.artistName({ isSelected: selectBlock }))}>
        {artists.map((artist) => artist.artistName).join(', ')}
      </div>
      <div className={styles.durationP({ isSelected: selectBlock })}>
        {`${startHour}:${startMin}-${endHour}:${endMin}`}
        {`(${totalPerformMin}min)`}
      </div>
    </div>
  );
};

export default TimetableItem;
