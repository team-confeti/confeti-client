import { useState } from 'react';
import EmptyFestivalSection from '@pages/time-table/components/empty/empty-festival-section';
import FestivalSelector from '@pages/time-table/components/festival-selector/festival-selector';
import FestivalStage from '@pages/time-table/components/festival-stage/festival-stage';
import TimeTableActions from '@pages/time-table/components/time-table-actions/time-table-actions';
import TimeTableBoard from '@pages/time-table/components/time-table-board/time-table-board';
import { useImageDownload } from '@pages/time-table/hooks/use-image-download';
import { useTimeTableEdit } from '@pages/time-table/hooks/use-time-table-edit';

import { FestivalTimetable } from '@shared/types/festival-timetable-response';

import Calender from '../components/calender/calender';
import {
  useFestivalButtonData,
  useFestivalTimetableData,
} from '../hooks/use-festival-data';

import * as styles from './time-table-page.css';

const TimeTablePage = () => {
  const { isEditTimeTableMode, toggleEditTimeTableMode } = useTimeTableEdit();

  const { festivals } = useFestivalButtonData();
  const [selectedFestivalInfo, setSelectedFestivalInfo] =
    useState<FestivalTimetable>(festivals[0]);
  const [selectedDateId, setSelectedDateId] = useState<number>(1);

  const handleSelectFestival = (id: number) => {
    const selectedFestival = festivals.find(
      (festival) => festival.festivalId === id,
    );

    if (selectedFestival) {
      setSelectedFestivalInfo(selectedFestival);
      setSelectedDateId(selectedFestival.festivalDates[0].festivalDateId);
    }
  };

  const handleSelectDate = (dateId: number) => {
    setSelectedDateId(dateId);
  };

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
      )}
    </>
  );
};

export default TimeTablePage;
