import EmptyFestivalSection from '@pages/time-table/components/empty/empty-festival-section';
import FestivalSelector from '@pages/time-table/components/festival-selector/festival-selector';
import FestivalStage from '@pages/time-table/components/festival-stage/festival-stage';
import TimeTableActions from '@pages/time-table/components/time-table-actions/time-table-actions';
import TimeTableBoard from '@pages/time-table/components/time-table-board/time-table-board';
import { useFestivalSelect } from '@pages/time-table/hooks/use-festival-select';
import { useImageDownload } from '@pages/time-table/hooks/use-image-download';
import { useTimeTableEdit } from '@pages/time-table/hooks/use-time-table-edit';

import Calender from '../components/calender/calender';
import {
  useFestivalButtonData,
  useFestivalTimetableData,
  useTimeTableCreationHistory,
} from '../hooks/use-festival-data';
import TimeTableOnboard from './onboading/time-table-onboard-page';

import * as styles from './time-table-page.css';

const TimeTablePage = () => {
  const { isEditTimeTableMode, toggleEditTimeTableMode } = useTimeTableEdit();
  const { festivals } = useFestivalButtonData();
  const { hasTimetableHistory } = useTimeTableCreationHistory();

  const {
    selectedFestivalInfo,
    selectedDateId,
    handleSelectFestival,
    handleSelectDate,
  } = useFestivalSelect(festivals);

  const { data: boardData } = useFestivalTimetableData(selectedDateId);

  const { elementRef, downloadImage } = useImageDownload<HTMLDivElement>({
    fileName: `${selectedFestivalInfo.title}`,
  });

  let content;

  if (!hasTimetableHistory) {
    content = <TimeTableOnboard />;
  } else if (hasTimetableHistory && festivals.length === 0) {
    content = <EmptyFestivalSection />;
  } else if (festivals.length > 0 && boardData) {
    content = (
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
  }

  return <>{content}</>;
};

export default TimeTablePage;
