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
  name: string;
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
  name,
  onClick,
}: ItemProps) => {
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

  const top = `${minutesFromOpen * MINUTE_HEIGHT_PX}px`;
  const height = `${totalPerformMin * MINUTE_HEIGHT_PX}px`;

  const dynamicVars = assignInlineVars({
    [styles.top]: top,
    [styles.height]: height,
  });

  const isShort = totalPerformMin <= 20;

  return (
    <div
      style={dynamicVars}
      className={cn(
        styles.itemsWrapper({ isSelected, isShort }),
        'time-table-item',
      )}
      onClick={() => onClick(timeBlockId, !isSelected)}
    >
      <div className={cn(styles.artistName({ isSelected, isShort }))}>
        {name}
      </div>
      <div className={styles.durationP({ isSelected, isShort })}>
        {`${startHour}:${startMin}-${endHour}:${endMin}`}
        {`(${totalPerformMin}min)`}
      </div>
    </div>
  );
};

export default TimetableItem;
