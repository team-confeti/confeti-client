import { useQuery } from '@tanstack/react-query';

import { FESTIVAL_TIMETABLE_QUERY_OPTIONS } from '@shared/apis/timetable/festival-timetable-queries';
import { FestivalTimetable } from '@shared/types/festival-timetable-response';

import Calender from '@pages/timetable/components/calender/calender';
import FestivalSelector from '@pages/timetable/components/festival-selector/festival-selector';
import FestivalStage from '@pages/timetable/components/festival-stage/festival-stage';
import TimeTableActions from '@pages/timetable/components/timetable-actions/timetable-actions';
import TimeTableBoard from '@pages/timetable/components/timetable-board/timetable-board';
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

  const { elementRef, downloadImage } = useImageDownload<HTMLDivElement>({
    fileName: `${selectedFestivalInfo.title}`,
  });
  const { data: boardData } = useQuery({
    ...FESTIVAL_TIMETABLE_QUERY_OPTIONS.FESTIVAL_TIMETABLE(selectedDateId ?? 0),
    enabled: selectedDateId !== undefined,
  });

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
        <TimeTableBoard
          timetableInfo={boardData}
          isEditMode={isEditTimetableMode}
        />
      </div>
      <TimeTableActions
        isEditMode={isEditTimetableMode}
        onToggleEditMode={toggleEditTimetableMode}
        onDownload={downloadImage}
      />
    </div>
  );
};

export default TimetableContent;
