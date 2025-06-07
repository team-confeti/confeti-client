import { useRef } from 'react';
import BoothOpenBox from '@pages/timetable/components/timetable-board/booth-open-box';
import TimeCell from '@pages/timetable/components/timetable-board/time-cell';
import TimetableItem from '@pages/timetable/components/timetable-board/timetable-item';
import { END_HOUR, HALF_HOUR_TO_MINUTES } from '@pages/timetable/constants';
import { usePatchTimetableMutation } from '@pages/timetable/hooks/use-timetable-festival-mutation';
import { TimetableInfo } from '@pages/timetable/types/timetable-info-type';
import { generateTableRow, parseTimeString } from '@pages/timetable/utils';

import { toast } from '@confeti/design-system';
import { UserTimetable } from '@shared/types/timetable-response';

import * as styles from './timetable-board.css';

interface Props {
  timetableInfo: TimetableInfo;
  isEditMode: boolean;
}

const TimetableBoard = ({ timetableInfo, isEditMode }: Props) => {
  const [openHour, openMin] = parseTimeString(timetableInfo.ticketOpenAt);
  const isHalfHourOpen = Number(openMin) === HALF_HOUR_TO_MINUTES;
  const ticketOpenHour = isHalfHourOpen ? openHour + 1 : openHour;
  const cellNumber = generateTableRow(ticketOpenHour);
  const ref = useRef<HTMLDivElement>(null);

  const patchTimeTableMutation = usePatchTimetableMutation();

  const handleTimetableItemClick = (
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

    const updatedTimetables: UserTimetable[] = timetableInfo.stages.flatMap(
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
          stageCount: timetableInfo.stages.length === 4 ? 4 : undefined,
        })}
        ref={ref}
      >
        <BoothOpenBox ticketOpenAt={timetableInfo.ticketOpenAt} />
        {cellNumber.map((hour) => (
          <div key={hour}>
            <TimeCell hour={hour} isHalfHourOpen={isHalfHourOpen} />
          </div>
        ))}

        <div className={styles.stagesContainer}>
          {timetableInfo.stages.map((stage) => (
            <div key={stage.stageOrder} className={styles.stageColumn}>
              {stage.festivalTimes.map((block) => (
                <TimetableItem
                  key={block.userTimetableId}
                  userTimetableId={block.userTimetableId}
                  artists={block.artists}
                  isSelected={block.isSelected}
                  startTime={block.startAt}
                  endTime={block.endAt}
                  ticketOpenAt={timetableInfo.ticketOpenAt}
                  isEditTimetableMode={isEditMode}
                  onClick={handleTimetableItemClick}
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

export default TimetableBoard;
