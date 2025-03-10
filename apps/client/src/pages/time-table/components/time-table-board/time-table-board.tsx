import { Button } from '@confeti/design-system';
import TimeCell from '@pages/time-table/components/time-cell/time-cell';
import BoothOpenBox from '@pages/time-table/components/booth-open-box/booth-open-box';
import TimeTableItem from '@pages/time-table/components/time-table-item/time-table-item';
import Stage from '@pages/time-table/components/stage/stage';
import { TimeTableInfo } from '@pages/time-table/types/time-table-info-type';
import { generateTableRow, parseTimeString } from '@pages/time-table/utils';
import { HALF_HOUR_TO_MINUTES, END_HOUR } from '@pages/time-table/constants';
import { useImageDownload } from '@pages/time-table/hooks/use-image-download';
import * as styles from './time-table-board.css';
import { useEffect, useState } from 'react';
import { usePatchTimeTableMutation } from '@pages/time-table/hooks/use-patch-time-table-mutation';

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
  isComplete,
  onToggleComplete,
}: Props) => {
  const { elementRef, downloadImage } = useImageDownload<HTMLDivElement>({
    fileName: `${clickedFestivalTitle}`,
  });
  const [openHour, openMin] = parseTimeString(timeTableInfo.ticketOpenAt);
  const isHalfHourOpen = Number(openMin) === HALF_HOUR_TO_MINUTES;
  const ticketOpenHour = isHalfHourOpen ? openHour + 1 : openHour;
  const cellNumber = generateTableRow(Number(ticketOpenHour));

  const [selectedItems, setSelectedItems] = useState<
    { userTimetableId: number; isSelected: boolean }[]
  >([]);
  const mutate = usePatchTimeTableMutation();

  const handleItemClick = (userTimetableId: number, isSelected: boolean) => {
    setSelectedItems((prev) => {
      const existingItem = prev.find(
        (item) => item.userTimetableId === userTimetableId,
      );

      if (existingItem) {
        return prev.filter((item) => item.userTimetableId !== userTimetableId);
      } else {
        return [...prev, { userTimetableId, isSelected }];
      }
    });
  };

  useEffect(() => {
    if (isComplete) {
      onToggleComplete();
      const userTimetables = selectedItems.map((item) => ({
        userTimetableId: item.userTimetableId,
        isSelected: item.isSelected,
      }));
      mutate.mutate(userTimetables);
    }
  }, [isComplete, onToggleComplete]);

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
                  onClick={handleItemClick}
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
