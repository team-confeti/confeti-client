import { useState } from 'react';
import { TIME_SLOT_HEIGHT_1_MIN } from '@pages/timetable/constants';
import {
  calcMinutesFromOpen,
  calcTotalMinutes,
  parseTimeString,
} from '@pages/timetable/utils';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import { cn } from '@confeti/design-system/utils';

import * as styles from './timetable-item.css';

interface ItemProps {
  artists: Artist[];
  startTime: string;
  endTime: string;
  isSelected: boolean;
  ticketOpenAt: string;
  userTimetableId: number;
  isEditTimetableMode: boolean;
  onClick: (userTimetableId: number, isSelected: boolean) => void;
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

  userTimetableId,
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
    onClick(userTimetableId, !selectBlock);
  };

  const MARGIN_TOP_PX = 7;
  const top = `${minutesFromOpen * TIME_SLOT_HEIGHT_1_MIN + MARGIN_TOP_PX}px`;
  const height = `${totalPerformMin * TIME_SLOT_HEIGHT_1_MIN}px`;

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
