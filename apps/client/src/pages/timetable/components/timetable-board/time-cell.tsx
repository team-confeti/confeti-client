import { HALF_HOUR_TO_MINUTES } from '@pages/timetable/constants';

import * as styles from './time-cell.css';

interface TimeCellProps {
  hour: number;
  isLast?: boolean;
}

const TimeCell = ({ hour, isLast = false }: TimeCellProps) => {
  return (
    <div className={styles.hourCell}>
      <span className={styles.timeLabel({ type: 'hour' })}>{hour}</span>
      <hr className={styles.timeLine({ type: 'hour' })} />
      {!isLast && (
        <span className={styles.timeLabel({ type: 'half' })}>
          {HALF_HOUR_TO_MINUTES}
        </span>
      )}
    </div>
  );
};

export default TimeCell;
