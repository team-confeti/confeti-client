import Calender from '@pages/time-table/components/calender/calender';
import FestivalSelector from '@pages/time-table/components/festival-selector/festival-selector';
import FestivalStage from '@pages/time-table/components/festival-stage/festival-stage';
import TimeTableActions from '@pages/time-table/components/time-table-actions/time-table-actions';
import TimeTableBoard from '@pages/time-table/components/time-table-board/time-table-board';
import { useFestivalSelect } from '@pages/time-table/hooks/use-festival-select';
import { useImageDownload } from '@pages/time-table/hooks/use-image-download';
import { useTimeTableEdit } from '@pages/time-table/hooks/use-time-table-edit';

import {
  FestivalTimetable,
  FestivalTimetableExtended,
} from '@shared/types/festival-timetable-response';

import * as styles from './time-table-loaded.css';

interface TimeTableLoadedProps {
  festivals: FestivalTimetable[];
  boardData?: FestivalTimetableExtended;
}

const TimeTableContent = ({ festivals, boardData }: TimeTableLoadedProps) => {
  const { selectedFestivalInfo, handleSelectFestival, handleSelectDate } =
    useFestivalSelect(festivals);
  const { isEditTimeTableMode, toggleEditTimeTableMode } = useTimeTableEdit();

  const { elementRef, downloadImage } = useImageDownload<HTMLDivElement>({
    fileName: `${selectedFestivalInfo.title}`,
  });

  if (!boardData) return null;

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
      />
      <div className={styles.timeTableWrapper} ref={elementRef}>
        <FestivalStage timeTableInfo={boardData} />
        <TimeTableBoard
          timeTableInfo={boardData}
          isEditMode={isEditTimeTableMode}
        />
      </div>
      <TimeTableActions
        isEditMode={isEditTimeTableMode}
        onToggleEditMode={toggleEditTimeTableMode}
        onDownload={downloadImage}
      />
    </div>
  );
};

export default TimeTableContent;
