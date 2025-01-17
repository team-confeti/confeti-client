import { useState } from 'react';
import * as styles from './time-table-item.css';

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
  const [startHour, startMin] = startTime.slice(0, 5).split(':').map(Number);
  const [endHour, endMin] = endTime.slice(0, 5).split(':').map(Number);
  const [openHour, openMin] = ticketOpenAt.slice(0, 5).split(':').map(Number);
  const totalMin = endHour * 60 + endMin - (startHour * 60 + startMin);
  const startTotalMin = startHour * 60 + startMin;
  const openTotalMin = openHour * 60 + openMin;
  const minutesFromOpen = startTotalMin - openTotalMin;
  const top = (minutesFromOpen / 5) * 0.74;
  const diff = (totalMin / 5) * 0.75;

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
