import { useState } from 'react';
import EmptyFestivalSection from '@pages/time-table/components/empty/empty-festival-section';
import FestivalSelector from '@pages/time-table/components/festival-selector/festival-selector';
import TimeTableBoard from '@pages/time-table/components/time-table-board/time-table-board';

import Calender from '../components/calender/calender';
import { useButtonSelection } from '../hooks/use-button-selection';
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
  const [selectedFestivalId, setSelectedFestivalId] = useState<number>(
    festivals[0].festivalId,
  );

  const handleSelectFestival = (id: number) => {
    setSelectedFestivalId(id);
  };

  const handleDeleteFestival = (festivalId: number) => {
    setFestivalsToDelete((prev) => [...prev, festivalId]);
  };

  const {
    selectedFestivalDates,
    selectedFestivalDateId,
    clickedFestivalTitle,
    setSelectedFestivalDateId,
  } = useButtonSelection(festivals);

  const handleDateSelect = (festivalDateId: number) => {
    setSelectedFestivalDateId(festivalDateId);
  };

  const { data: boardData } = useFestivalTimetableData(
    selectedFestivalDateId as number,
  );

  return (
    <>
      {festivals.length === 0 ? (
        <EmptyFestivalSection />
      ) : (
        <>
          <FestivalSelector
            festivals={festivals}
            selectedFestivalId={selectedFestivalId}
            handleSelectFestival={handleSelectFestival}
          />
          <Calender
            festivalDates={selectedFestivalDates}
            onDateSelect={handleDateSelect}
          />

          {boardData && (
            <TimeTableBoard
              clickedFestivalTitle={clickedFestivalTitle}
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
