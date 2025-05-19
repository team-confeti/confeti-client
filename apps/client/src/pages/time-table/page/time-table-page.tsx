import { lazy } from 'react';
import Calender from '@pages/time-table/components/calender/calender';
import EmptyFestivalSection from '@pages/time-table/components/empty/empty-festival-section';
import FestivalSelector from '@pages/time-table/components/festival-selector/festival-selector';
import FestivalStage from '@pages/time-table/components/festival-stage/festival-stage';
import TimeTableActions from '@pages/time-table/components/time-table-actions/time-table-actions';
import TimeTableBoard from '@pages/time-table/components/time-table-board/time-table-board';
import { useFestivalSelect } from '@pages/time-table/hooks/use-festival-select';
import { useImageDownload } from '@pages/time-table/hooks/use-image-download';
import { useTimeTableEdit } from '@pages/time-table/hooks/use-time-table-edit';

import {
  useFestivalButtonData,
  useFestivalTimetableData,
} from '../hooks/use-festival-data';

import * as styles from './time-table-page.css';

const TimeTablePage = () => {
  const { isEditTimeTableMode, toggleEditTimeTableMode } = useTimeTableEdit();
  const { festivals } = useFestivalButtonData();

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

  return (
    <>
      {festivals.length === 0 ? (
        <EmptyFestivalSection />
      ) : (
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
          {boardData && (
            <div className={styles.timeTableWrapper} ref={elementRef}>
              <FestivalStage timeTableInfo={boardData} />
              <TimeTableBoard
                timeTableInfo={boardData}
                isEditMode={isEditTimeTableMode}
              />
            </div>
          )}

          <TimeTableActions
            isEditMode={isEditTimeTableMode}
            onToggleEditMode={toggleEditTimeTableMode}
            onDownload={downloadImage}
          />
        </div>
      )}
    </>
  );
};

export default TimeTablePage;
