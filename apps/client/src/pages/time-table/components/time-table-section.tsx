import { TIME_TABLE_INFO } from '@shared/mocks/time-table';
import TimeTableBoard from '@pages/time-table/components/time-table-board/time-table-board';
import Stage from '@pages/time-table/components/stage/stage';
import * as styles from './time-table-section.css';

const TimeTableSection = () => {
  return (
    <div className={styles.container}>
      <Stage timeTableInfo={TIME_TABLE_INFO}></Stage>
      <TimeTableBoard timeTableInfo={TIME_TABLE_INFO}></TimeTableBoard>
    </div>
  );
};

export default TimeTableSection;
