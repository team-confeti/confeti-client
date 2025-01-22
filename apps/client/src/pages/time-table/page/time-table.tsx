import { Spacing } from '@confeti/design-system';
import TimeTableBoard from '@pages/time-table/components/time-table-board/time-table-board';
import EditFloatingButton from '@pages/time-table/components/edit/edit-floating-button';
import Calender from '../components/calender/calender';
import InfoButton from '../components/info/info-button';
import { useButtonSelection } from '../hooks/use-button-selection';
import { useEditModes } from '../hooks/use-edit-mode';
import {
  useFestivalButtonData,
  useFestivalTimetableData,
} from '../hooks/use-festival-data';

const TimeTable = () => {
  const {
    isEditMode,
    isEditTimeTableMode,
    isFestivalDeleteMode,
    isTextVisible,
    toggleEditMode,
    toggleEditTimeTableMode,
    toggleFestivalDeleteMode,
    toggleTextVisibility,
    resetModes,
  } = useEditModes();
  const { festivals } = useFestivalButtonData();
  const {
    clickedFestivalId,
    selectedFestivalDates,
    handleFestivalClick,
    selectedFestivalDateId,
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
      <InfoButton.TotalWrap festivals={festivals}>
        <InfoButton.ItemContainer>
          <InfoButton.FixButton />
          {festivals.map(({ festivalId, title, logoUrl }) => (
            <InfoButton.Items
              key={festivalId}
              src={logoUrl}
              alt={title}
              text={title}
              onClick={() => handleFestivalClick(festivalId)}
              isClicked={clickedFestivalId === festivalId}
            />
          ))}
        </InfoButton.ItemContainer>
      </InfoButton.TotalWrap>
      <Spacing />
      <Calender
        festivalDates={selectedFestivalDates}
        onDateSelect={handleDateSelect}
      />
      <Spacing />
      {boardData && (
        <TimeTableBoard
          timeTableInfo={boardData}
          isEditTimeTableMode={isEditTimeTableMode}
          isFestivalDeleteMode={isFestivalDeleteMode}
        />
      )}
      <div>
        <EditFloatingButton
          isEditMode={isEditMode}
          isEditTimeTableMode={isEditTimeTableMode}
          isFestivalDeleteMode={isFestivalDeleteMode}
          isTextVisible={isTextVisible}
          onToggleEditMode={toggleEditMode}
          onToggleEditTimeTableMode={toggleEditTimeTableMode}
          onToggleFestivalDeleteMode={toggleFestivalDeleteMode}
          onToggleTextVisibility={toggleTextVisibility}
          onResetModes={resetModes}
        />
      </div>
    </>
  );
};

export default TimeTable;
