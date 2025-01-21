import TimeCell from '@pages/time-table/components/time-cell/time-cell';
import BoothOpenBox from '@pages/time-table/components/booth-open-box/booth-open-box';
import TimeTableItem from '@pages/time-table/components/time-table-item/time-table-item';
import Stage from '@pages/time-table/components/stage/stage';
import { Button } from '@confeti/design-system';
import { TimeTableInfoType } from '@pages/time-table/types/time-table-info-type';
import { generateTableRow, parseTimeString } from '@pages/time-table/utils';
import { HALF_HOUR_TO_MINUTES } from '@pages/time-table/constants';
import * as styles from './time-table-board.css';
import { useImageDownload } from '@pages/time-table/hooks/use-image-download';

const TimeTableBoard = ({ timeTableInfo }: TimeTableInfoType) => {
  const { elementRef, downloadImage } = useImageDownload<HTMLDivElement>({
    fileName: 'timetable',
  });
  const [openHour, openMin] = parseTimeString(timeTableInfo.ticketOpenAt);

  const isHalfHourOpen = openMin === HALF_HOUR_TO_MINUTES;
  const ticketOpenHour = isHalfHourOpen ? openHour + 1 : openHour;
  const cellNumber = generateTableRow(ticketOpenHour);

  return (
    <section className={styles.container} ref={elementRef}>
      <Stage timeTableInfo={timeTableInfo}></Stage>
      <div className={styles.wrapper}>
        <BoothOpenBox ticketOpenHour={timeTableInfo.ticketOpenAt} />

        {cellNumber.map((hour) => (
          <div key={hour}>
            <TimeCell hour={hour} isHalfHourOpen={isHalfHourOpen} />
          </div>
        ))}

        {timeTableInfo.stages.map((stage) => {
          return (
            <div key={stage.stageOrder}>
              {stage.festivalTimes.map((block) => (
                <TimeTableItem
                  ticketOpenAt={timeTableInfo.ticketOpenAt}
                  stageCount={timeTableInfo.stageCount}
                  key={block.festivalTimeId}
                  artists={block.artists}
                  isSelected={block.isSelected}
                  startTime={block.startAt}
                  endTime={block.endAt}
                  stageOrder={stage.stageOrder}
                  festivalTimeId={block.festivalTimeId}
                />
              ))}
            </div>
          );
        })}

        {isHalfHourOpen && (
          <div className={styles.timeList}>
            <p className={styles.minutesP}>{HALF_HOUR_TO_MINUTES}</p>
          </div>
        )}

        <div className={styles.timeList}>
          <p className={styles.timeP}>{24}</p>
          <hr className={styles.timeBar} />
        </div>

        <div className={styles.saveButtonWrapper}>
          <Button
            text="이미지 저장"
            variant="add"
            className={styles.saveButton}
            onClick={downloadImage}
          ></Button>
        </div>
      </div>
    </section>
  );
};

export default TimeTableBoard;
