import { useState } from 'react';
import EmptyFestivalSection from '@pages/time-table/components/empty/empty-festival-section';
import FestivalSelector from '@pages/time-table/components/festival-selector/festival-selector';
import TimeTableBoard from '@pages/time-table/components/time-table-board/time-table-board';

import { FestivalTimetable } from '@shared/types/festival-timetable-response';

import Calender from '../components/calender/calender';
import { useEditModes } from '../hooks/use-edit-mode';
import {
  useFestivalButtonData,
  useFestivalTimetableData,
} from '../hooks/use-festival-data';

import * as styles from './time-table-page.css';

const TimeTablePage = () => {
  const {
    isEditTimeTableMode,
    isFestivalDeleteMode,
    isComplete,
    toggleComplete,
  } = useEditModes();

  const { festivals } = useFestivalButtonData();
  const [festivalsToDelete, setFestivalsToDelete] = useState<number[]>([]);
  const [selectedFestivalInfo, setSelectedFestivalInfo] =
    useState<FestivalTimetable>(festivals[0]);
  const [selectedDateId, setSelectedDateId] = useState<number>(1);

  const handleSelectFestival = (id: number) => {
    const selectedFestival = festivals.find(
      (festival) => festival.festivalId === id,
    );

    // 찾은 정보로 상태 업데이트
    if (selectedFestival) {
      setSelectedFestivalInfo(selectedFestival);
      setSelectedDateId(selectedFestival.festivalDates[0].festivalDateId);
    }
  };

  const handleDeleteFestival = (festivalId: number) => {
    setFestivalsToDelete((prev) => [...prev, festivalId]);
  };

  const handleSelectDate = (dateId: number) => {
    setSelectedDateId(dateId);
  };

  const { data: boardData } = useFestivalTimetableData(selectedDateId);

  return (
    <>
      {festivals.length === 0 ? (
        <EmptyFestivalSection />
      ) : (
        <>
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
            <TimeTableBoard
              clickedFestivalTitle={selectedFestivalInfo.title}
              timeTableInfo={boardData}
              isEditTimeTableMode={isEditTimeTableMode}
              isFestivalDeleteMode={isFestivalDeleteMode}
              isComplete={isComplete}
              onToggleComplete={toggleComplete}
            />
          )}
        </>
      )}
    </>
  );
};

export default TimeTablePage;
