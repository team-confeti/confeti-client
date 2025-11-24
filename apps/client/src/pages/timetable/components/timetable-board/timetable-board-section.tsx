import { useSuspenseQuery } from '@tanstack/react-query';

import { Skeleton } from '@confeti/design-system';

import { FESTIVAL_TIMETABLE_QUERY_OPTIONS } from '@shared/apis/timetable/festival-timetable-queries';
import Deferred from '@shared/components/deferred/deferred';

import FestivalStage from '@pages/timetable/components/festival-stage/festival-stage';
import TimetableBoard from '@pages/timetable/components/timetable-board/timetable-board';
import useSyncScroll from '@pages/timetable/hooks/use-sync-scroll';

import * as styles from './timetable-board-section.css';

interface TimetableBoardSectionProps {
  selectedDateId: number;
  isEditMode: boolean;
  elementRef: React.RefObject<HTMLDivElement | null>;
}

const TimetableBoardSection = ({
  selectedDateId,
  isEditMode,
  elementRef,
}: TimetableBoardSectionProps) => {
  const {
    primaryRef: stageRef,
    secondaryRef: boardRef,
    handlePrimaryScroll: handleStageScroll,
    handleSecondaryScroll: handleBoardScroll,
  } = useSyncScroll();

  const { data: boardData } = useSuspenseQuery(
    FESTIVAL_TIMETABLE_QUERY_OPTIONS.FESTIVAL_TIMETABLE(selectedDateId),
  );

  if (!boardData) return null;

  return (
    <div ref={elementRef}>
      <FestivalStage
        timetableInfo={boardData}
        scrollRef={stageRef}
        onScroll={handleStageScroll}
      />
      <TimetableBoard
        timetableInfo={boardData}
        isEditMode={isEditMode}
        scrollRef={boardRef}
        onScroll={handleBoardScroll}
      />
    </div>
  );
};

export const TimetableBoardSkeleton = () => {
  return (
    <Deferred>
      <div className={styles.skeletonContainer}>
        <Skeleton width="100%" height="4rem" variants="rectangular" />
        <Skeleton width="100%" height="30rem" variants="rectangular" />
      </div>
    </Deferred>
  );
};

export default TimetableBoardSection;
