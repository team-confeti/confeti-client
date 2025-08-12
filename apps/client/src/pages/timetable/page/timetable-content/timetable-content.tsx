import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { postScreenshot } from '@shared/apis/timetable/festival-timetable-mutation';
import { FESTIVAL_TIMETABLE_QUERY_OPTIONS } from '@shared/apis/timetable/festival-timetable-queries';
import { FestivalTimetable } from '@shared/types/festival-timetable-response';

import Calender from '@pages/timetable/components/calender/calender';
import FestivalSelector from '@pages/timetable/components/festival-selector/festival-selector';
import FestivalStage from '@pages/timetable/components/festival-stage/festival-stage';
import TimetableActions from '@pages/timetable/components/timetable-actions/timetable-actions';
import TimetableBoard from '@pages/timetable/components/timetable-board/timetable-board';
import { useFestivalSelect } from '@pages/timetable/hooks/use-festival-select';
import { useImageDownload } from '@pages/timetable/hooks/use-image-download';
import { useTimetableEdit } from '@pages/timetable/hooks/use-timetable-edit';

import * as styles from './timetable-content.css';

interface TimetableContentProps {
  festivals: FestivalTimetable[];
}

const TimetableContent = ({ festivals }: TimetableContentProps) => {
  const {
    selectedFestivalInfo,
    selectedDateId,
    handleSelectFestival,
    handleSelectDate,
  } = useFestivalSelect(festivals);
  const { isEditTimetableMode, toggleEditTimetableMode } = useTimetableEdit();

  const { elementRef } = useImageDownload<HTMLDivElement>({
    fileName: `${selectedFestivalInfo.title}`,
  });
  const { data: boardData } = useQuery({
    ...FESTIVAL_TIMETABLE_QUERY_OPTIONS.FESTIVAL_TIMETABLE(selectedDateId ?? 0),
    enabled: selectedDateId !== undefined,
  });

  // 페이지 로딩 완료 시 콘솔 출력
  useEffect(() => {
    if (boardData && selectedDateId) {
      console.log('페이지 로딩 완료');
    }
  }, [boardData, selectedDateId]);

  if (!boardData || !selectedDateId) return null;

  return (
    <div className={styles.wrapper}>
      <FestivalSelector
        festivals={festivals}
        selectedFestivalId={selectedFestivalInfo.festivalId}
        handleSelectFestival={handleSelectFestival}
      />
      <Calender
        festivalDates={selectedFestivalInfo.festivalDates}
        onDateSelect={handleSelectDate}
        selectedDateId={selectedDateId}
      />

      <div className={styles.timeTableWrapper} ref={elementRef}>
        <FestivalStage timetableInfo={boardData} />
        <TimetableBoard
          timetableInfo={boardData}
          isEditMode={isEditTimetableMode}
        />
      </div>

      <TimetableActions
        isEditMode={isEditTimetableMode}
        onToggleEditMode={toggleEditTimetableMode}
        onDownload={postScreenshot}
      />
    </div>
  );
};

export default TimetableContent;
