import { useRef } from 'react';
import BoothOpenBox from '@pages/time-table/components/time-table-board/booth-open-box';
import TimeCell from '@pages/time-table/components/time-table-board/time-cell';
import TimeTableItem from '@pages/time-table/components/time-table-board/time-table-item';
import { END_HOUR, HALF_HOUR_TO_MINUTES } from '@pages/time-table/constants';
import { usePatchTimetableMutation } from '@pages/time-table/hooks/use-timetable-festival-mutation';
import { TimeTableInfo } from '@pages/time-table/types/time-table-info-type';
import { generateTableRow, parseTimeString } from '@pages/time-table/utils';

import { toast } from '@confeti/design-system';
import { UserTimetable } from '@shared/types/timetable-response';

import * as styles from './time-table-board.css';

interface Props {
  timeTableInfo: TimeTableInfo;
  isEditMode: boolean;
}

const TimeTableBoard = ({ timeTableInfo, isEditMode }: Props) => {
  const [openHour, openMin] = parseTimeString(timeTableInfo.ticketOpenAt);
  const isHalfHourOpen = Number(openMin) === HALF_HOUR_TO_MINUTES;
  const ticketOpenHour = isHalfHourOpen ? openHour + 1 : openHour;
  const cellNumber = generateTableRow(ticketOpenHour);
  const ref = useRef<HTMLDivElement>(null);

  const patchTimeTableMutation = usePatchTimetableMutation();

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
    <section className={styles.container}>
      <div
        className={styles.wrapper({
          stageCount: timeTableInfo.stages.length === 4 ? 4 : undefined,
        })}
        ref={ref}
      >
        <BoothOpenBox ticketOpenAt={timeTableInfo.ticketOpenAt} />
        {cellNumber.map((hour) => (
          <div key={hour}>
            <TimeCell hour={hour} isHalfHourOpen={isHalfHourOpen} />
          </div>
        ))}

        <div className={styles.stagesContainer}>
          {timeTableInfo.stages.map((stage) => (
            <div key={stage.stageOrder} className={styles.stageColumn}>
              {stage.festivalTimes.map((block) => (
                <TimeTableItem
                  key={block.userTimetableId}
                  userTimetableId={block.userTimetableId}
                  artists={block.artists}
                  isSelected={block.isSelected}
                  startTime={block.startAt}
                  endTime={block.endAt}
                  ticketOpenAt={timeTableInfo.ticketOpenAt}
                  isEditTimeTableMode={isEditMode}
                  onClick={handleTimeTableItemClick}
                />
              ))}
            </div>
          ))}
        </div>

        {isHalfHourOpen && (
          <div className={styles.timeList}>
            <p className={styles.minutesP}>{HALF_HOUR_TO_MINUTES}</p>
          </div>
        )}

        <div className={styles.timeList}>
          <p className={styles.timeP}>{END_HOUR}</p>
          <hr className={styles.timeBar} />
        </div>
      </div>
    </section>
  );
};

export default TimeTableBoard;
