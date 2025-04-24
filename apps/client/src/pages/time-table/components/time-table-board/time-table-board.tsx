import { RefObject } from 'react';
import BoothOpenBox from '@pages/time-table/components/time-table-board/booth-open-box';
import TimeCell from '@pages/time-table/components/time-table-board/time-cell';
import TimeTableItem from '@pages/time-table/components/time-table-board/time-table-item';
import { END_HOUR, HALF_HOUR_TO_MINUTES } from '@pages/time-table/constants';
import { usePatchTimeTableMutation } from '@pages/time-table/hooks/use-patch-time-table-mutation';
import { TimeTableInfo } from '@pages/time-table/types/time-table-info-type';
import { generateTableRow, parseTimeString } from '@pages/time-table/utils';

import { toast } from '@confeti/design-system';
import { UserTimetable } from '@shared/types/timetable-response';

import * as styles from './time-table-board.css';

interface Props {
  timeTableInfo: TimeTableInfo;
  isEditMode: boolean;
  ref: RefObject<HTMLDivElement | null>;
}

const TimeTableBoard = ({ timeTableInfo, isEditMode, ref }: Props) => {
  const [openHour, openMin] = parseTimeString(timeTableInfo.ticketOpenAt);
  const isHalfHourOpen = Number(openMin) === HALF_HOUR_TO_MINUTES;
  const ticketOpenHour = isHalfHourOpen ? openHour + 1 : openHour;
  const cellNumber = generateTableRow(ticketOpenHour);

  const patchTimeTableMutation = usePatchTimeTableMutation();

  const handleTimeTableItemClick = (
    userTimetableId: number,
    isSelected: boolean,
  ) => {
    if (!isEditMode) {
      toast({
        text: ` 버튼으로 편집할 수 있어요.`,
        position: 'middleCenter',
        highlightText: `'타임테이블 편집하기'`,
      });
      return;
    }

    const updatedTimetables: UserTimetable[] = timeTableInfo.stages.flatMap(
      (stage) =>
        stage.festivalTimes.map((time) => ({
          userTimetableId: time.userTimetableId,
          isSelected:
            time.userTimetableId === userTimetableId
              ? isSelected
              : time.isSelected,
        })),
    );

    patchTimeTableMutation.mutate(updatedTimetables);
  };

  return (
    <section className={styles.container} ref={ref}>
      <div className={styles.wrapper}>
        <BoothOpenBox ticketOpenHour={timeTableInfo.ticketOpenAt} />

        {cellNumber.map((hour) => (
          <div key={hour}>
            <TimeCell hour={hour} isHalfHourOpen={isHalfHourOpen} />
          </div>
        ))}

        {timeTableInfo.stages.map((stage) => (
          <div key={stage.stageOrder}>
            {stage.festivalTimes.map((block) => {
              const timeTableItemProps = {
                key: block.userTimetableId,
                userTimetableId: block.userTimetableId,
                artists: block.artists,
                isSelected: block.isSelected,
                startTime: block.startAt,
                endTime: block.endAt,
                ticketOpenAt: timeTableInfo.ticketOpenAt,
                stageCount: timeTableInfo.stageCount,
                stageOrder: stage.stageOrder,
                isEditTimeTableMode: isEditMode,
                onClick: handleTimeTableItemClick,
              };

              return (
                <TimeTableItem
                  {...timeTableItemProps}
                  key={block.userTimetableId}
                />
              );
            })}
          </div>
        ))}

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
    </section>
  );
};

export default TimeTableBoard;
