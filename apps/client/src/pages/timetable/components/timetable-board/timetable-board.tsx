import { useRef } from 'react';

import { toast } from '@confeti/design-system';

import { UserTimetable } from '@shared/types/timetable-response';

import BoothOpenBox from '@pages/timetable/components/timetable-board/booth-open-box';
import TimeCell from '@pages/timetable/components/timetable-board/time-cell';
import TimetableItem from '@pages/timetable/components/timetable-board/timetable-item';
import { usePatchTimetableMutation } from '@pages/timetable/hooks/use-timetable-festival-mutation';
import { TimetableInfo } from '@pages/timetable/types/timetable-info-type';
import { generateTableRow, parseTimeString } from '@pages/timetable/utils';

import * as styles from './timetable-board.css';

interface Props {
  timetableInfo: TimetableInfo;
  isEditMode: boolean;
}

const TimetableBoard = ({ timetableInfo, isEditMode }: Props) => {
  const [openHour] = parseTimeString(timetableInfo.ticketOpenAt);
  const cellNumber = generateTableRow(openHour);
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
            <TimeCell hour={hour} />
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
      </div>
    </section>
  );
};

export default TimetableBoard;
