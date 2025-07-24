import { HALF_HOUR_TO_MINUTES } from '@pages/timetable/constants';

import * as styles from './time-cell.css';

interface TimeCellProps {
  hour: number;
}

const TimeCell = ({ hour }: TimeCellProps) => {
  return (
    <>
      <div className={styles.timeList}>
        <p className={styles.timeP({ bold: true })}>{hour}</p>
        <hr className={styles.timeBar({ bold: true })} />
      </div>
      {hour !== 24 && (
        <div className={styles.timeList}>
          <p className={styles.timeP({ bold: false })}>
            {HALF_HOUR_TO_MINUTES}
          </p>
          <hr className={styles.timeBar({ bold: false })} />
        </div>
      )}
    </>
  );
};

export default TimeCell;
