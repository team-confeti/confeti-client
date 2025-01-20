import * as styles from './time-cell.css';
import { HALF_HOUR_TO_MINUTES } from '@pages/time-table/constants';

interface TimeCellProps {
  isHalfHourOpen: boolean;
  hour: number;
}

const TimeCell = ({ isHalfHourOpen, hour }: TimeCellProps) => {
  const timeItems = [
    {
      time: isHalfHourOpen ? HALF_HOUR_TO_MINUTES : hour,
      bold: !isHalfHourOpen,
    },
    {
      time: isHalfHourOpen ? hour : HALF_HOUR_TO_MINUTES,
      bold: isHalfHourOpen,
    },
  ];

  return (
    <>
      {timeItems.map(({ time, bold }, idx) => (
        <div className={styles.timeList} key={idx}>
          <p className={styles.timeP({ bold })}>{time}</p>
          <hr className={styles.timeBar({ bold })} />
        </div>
      ))}
    </>
  );
};

export default TimeCell;
