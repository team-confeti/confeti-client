import { RefObject } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from '@confeti/design-system';

import { TIMETABLE_MUTATION_OPTIONS } from '@shared/apis/timetable/festival-timetable-mutations';
import { FESTIVAL_TIMETABLE_QUERY_KEY } from '@shared/constants/query-key';
import { UserTimetable } from '@shared/types/timetable-response';

import BoothOpenBox from '@pages/timetable/components/timetable-board/booth-open-box';
import TimeCell from '@pages/timetable/components/timetable-board/time-cell';
import TimetableItem from '@pages/timetable/components/timetable-board/timetable-item';
import { TimetableInfo } from '@pages/timetable/types/timetable-info-type';
import { generateTableRow, parseTimeString } from '@pages/timetable/utils';

import * as styles from './timetable-board.css';

interface Props {
  timetableInfo: TimetableInfo;
  isEditMode: boolean;
  scrollRef?: RefObject<HTMLElement | null>;
  onScroll?: () => void;
}

const TimetableBoard = ({
  timetableInfo,
  isEditMode,
  scrollRef,
  onScroll,
}: Props) => {
  const [openHour] = parseTimeString(timetableInfo.ticketOpenAt);
  const cellNumber = generateTableRow(openHour);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    ...TIMETABLE_MUTATION_OPTIONS.PATCH_TIMETABLE(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...FESTIVAL_TIMETABLE_QUERY_KEY.ALL],
      });
    },
  });

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

    mutate({ userTimetables: updatedTimetables });
  };

  return (
    <section
      className={styles.container}
      ref={scrollRef as RefObject<HTMLElement>}
      onScroll={onScroll}
    >
      <div
        className={styles.wrapper({
          stageCount: timetableInfo.stages.length === 4 ? 4 : undefined,
        })}
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
