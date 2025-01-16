import * as styles from './time-table-item.css';

interface ItemProps {
  name: string;
  startTime: string;
  endTime: string;
  stageCount: number;
  isSelected: boolean;
  stageOrder: number;

  handleIsSelected: () => void;
}

const TimeTableItem = ({
  name,
  startTime,
  endTime,
  isSelected,
  stageOrder,
  stageCount,
  handleIsSelected,
}: ItemProps) => {
  const [startHour, startMin] = startTime.slice(0, 5).split(':').map(Number);
  const [endHour, endMin] = endTime.slice(0, 5).split(':').map(Number);
  const totalMinutes = endHour * 60 + endMin - (startHour * 60 + startMin);

  const diff = (totalMinutes / 5) * 0.75;
  return (
    <div
      style={
        {
          '--stage-count': stageCount,
          '--stage-order': stageOrder - 1,
          '--diff': `${diff}rem`,
        } as React.CSSProperties
      }
      className={styles.itemsWrapper}
      onClick={handleIsSelected}
    >
      <p>{name}</p>
      <p>
        {startTime}-{endTime}
      </p>
    </div>
  );
};

export default TimeTableItem;
