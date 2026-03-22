import { RefObject } from 'react';

import { toast } from '@confeti/design-system';

import { logClickEvent } from '@shared/analytics/logging';

import BoothOpenBox from '@pages/timetable/components/timetable-board/booth-open-box';
import TimeCell from '@pages/timetable/components/timetable-board/time-cell';
import TimetableItem from '@pages/timetable/components/timetable-board/timetable-item';
import { TimetableInfo } from '@pages/timetable/types/timetable-info-type';
import { generateTableRow, parseTimeString } from '@pages/timetable/utils';

import * as styles from './timetable-board.css';

interface Props {
  timetableInfo: TimetableInfo;
  isEditMode: boolean;
  onToggleBlock: (timeBlockId: number, isSelected: boolean) => void;
  getIsSelected: (timeBlockId: number, serverIsSelected: boolean) => boolean;
  scrollRef?: RefObject<HTMLElement | null>;
  onScroll?: () => void;
  disableToast?: boolean;
}

const TimetableBoard = ({
  timetableInfo,
  isEditMode,
  onToggleBlock,
  getIsSelected,
  scrollRef,
  onScroll,
  disableToast = false,
}: Props) => {
  const [openHour] = parseTimeString(timetableInfo.ticketOpenAt);
  const cellNumber = generateTableRow(openHour);

  const handleTimetableItemClick = (
    timeBlockId: number,
    isSelected: boolean,
  ) => {
    if (!isEditMode) {
      if (!disableToast) {
        toast({
          text: ` 버튼으로 편집할 수 있어요.`,
          position: 'middleCenter',
          highlightText: `'타임테이블 편집하기'`,
        });
      }
      return;
    }
    onToggleBlock(timeBlockId, isSelected);
  };

  const handleClickTimeBlock = (timeBlockId: number, nextSelected: boolean) => {
    logClickEvent({
      name: 'click_timetable_toggle_block',
      params: {
        target_id: timeBlockId,
        isSelected: nextSelected,
      },
    });
    handleTimetableItemClick(timeBlockId, nextSelected);
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
        {cellNumber.map((hour, index) => (
          <TimeCell
            key={hour}
            hour={hour}
            isLast={index === cellNumber.length - 1}
          />
        ))}

        <div className={styles.stagesContainer}>
          {timetableInfo.stages.map((stage) => (
            <div key={stage.stageOrder} className={styles.stageColumn}>
              {stage.festivalTimes.map((block) => (
                <TimetableItem
                  key={block.timeBlockId}
                  timeBlockId={block.timeBlockId}
                  name={block.name}
                  isSelected={getIsSelected(
                    block.timeBlockId,
                    block.isSelected,
                  )}
                  startTime={block.startAt}
                  endTime={block.endAt}
                  ticketOpenAt={timetableInfo.ticketOpenAt}
                  onClick={(_timeBlockId, nextSelected) =>
                    handleClickTimeBlock(block.timeBlockId, nextSelected)
                  }
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
