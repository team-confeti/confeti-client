import BoothOpenBox from '@pages/time-table/components/time-table-board/booth-open-box';
import Stage from '@pages/time-table/components/time-table-board/stage';
import TimeCell from '@pages/time-table/components/time-table-board/time-cell';
import TimeTableItem from '@pages/time-table/components/time-table-board/time-table-item';
import { END_HOUR, HALF_HOUR_TO_MINUTES } from '@pages/time-table/constants';
import { useImageDownload } from '@pages/time-table/hooks/use-image-download';
import { TimeTableInfo } from '@pages/time-table/types/time-table-info-type';
import { generateTableRow, parseTimeString } from '@pages/time-table/utils';

import { Button } from '@confeti/design-system';

import * as styles from './time-table-board.css';

interface Props {
  clickedFestivalTitle: string | null;
  timeTableInfo: TimeTableInfo;
  isEditTimeTableMode: boolean;
  isFestivalDeleteMode: boolean;
  isComplete: boolean;
  onToggleComplete: () => void;
}

const TimeTableBoard = ({
  clickedFestivalTitle,
  timeTableInfo,
  isEditTimeTableMode,
  isFestivalDeleteMode,
}: Props) => {
  const { elementRef, downloadImage } = useImageDownload<HTMLDivElement>({
    fileName: `${clickedFestivalTitle}`,
  });
  const [openHour, openMin] = parseTimeString(timeTableInfo.ticketOpenAt);
  const isHalfHourOpen = Number(openMin) === HALF_HOUR_TO_MINUTES;
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
                  key={block.userTimetableId}
                  userTimetableId={block.userTimetableId}
                  artists={block.artists}
                  isSelected={block.isSelected}
                  startTime={block.startAt}
                  endTime={block.endAt}
                  ticketOpenAt={timeTableInfo.ticketOpenAt}
                  stageCount={timeTableInfo.stageCount}
                  stageOrder={stage.stageOrder}
                  isEditTimeTableMode={isEditTimeTableMode}
                  onClick={() => console.log('')}
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
      </div>
      <div className={styles.timeList}>
        <p className={styles.timeP}>{END_HOUR}</p>
        <hr className={styles.timeBar} />
      </div>

      {!isEditTimeTableMode && !isFestivalDeleteMode && (
        <div className={styles.saveButtonWrapper}>
          <Button
            text="이미지 저장"
            variant="add"
            className={styles.saveButton}
            onClick={downloadImage}
          ></Button>
        </div>
      )}
    </section>
  );
};

export default TimeTableBoard;
