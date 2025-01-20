import { TIME_TABLE_INFO } from '@shared/mocks/time-table';
import TimeTableBoard from '@pages/time-table/components/time-table-board/time-table-board';
import Stage from '@pages/time-table/components/stage/stage';
import * as styles from './time-table-section.css';
import { Button } from '@confeti/design-system';
const TimeTableSection = () => {
  return (
    <>
      <section className={styles.container}>
        <Stage timeTableInfo={TIME_TABLE_INFO}></Stage>
        <TimeTableBoard timeTableInfo={TIME_TABLE_INFO}></TimeTableBoard>
        <div className={styles.bottomWrapper}>
          <Button
            text="이미지 저장"
            variant="add"
            className={styles.saveButton}
          ></Button>
        </div>
      </section>
    </>
  );
};

export default TimeTableSection;
