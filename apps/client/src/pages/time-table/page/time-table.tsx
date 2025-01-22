import { Spacing } from '@confeti/design-system';

import { TIME_TABLE_INFO } from '@shared/mocks/time-table';
import TimeTableBoard from '@pages/time-table/components/time-table-board/time-table-board';
import EditFloatingButton from '@pages/time-table/components/edit/edit-floating-button';
import Calender from '../components/calender/calender';
import InfoButton from '../components/info/info-button';
import DeleteButton from '@pages/time-table/components/info/delete-button';

import { useButtonSelection } from '../hooks/use-button-selection';
import { useEditModes } from '../hooks/use-edit-mode';
import { useFestivalTimetables } from '../hooks/use-festival-timetables';
import { useTimeTableFestivalMutation } from '@pages/time-table/hooks/use-timetable-festival-mutation';
import * as styles from './time-table.css';

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

  const { festivals } = useFestivalTimetables();
  const { clickedFestivalId, selectedFestivalDates, handleFestivalClick } =
    useButtonSelection(festivals);

  const deleteFestival = useTimeTableFestivalMutation();

  const handleDeleteFestival = (festivalId: number) => {
    deleteFestival.mutate(festivalId);
  };

  return (
    <>
      <InfoButton.TotalWrap festivals={festivals}>
        <InfoButton.ItemContainer>
          <InfoButton.FixButton />
          {festivals.map(({ festivalId, title, logoUrl }) => (
            <div className={styles.festivalBtnWrapper} key={festivalId}>
              <InfoButton.Items
                src={logoUrl}
                alt={title}
                text={title}
                onClick={() => handleFestivalClick(festivalId)}
                isClicked={clickedFestivalId === festivalId}
              />
              {festivalId && (
                <DeleteButton
                  onDelete={() => handleDeleteFestival(festivalId)}
                  isFestivalDeleteMode={isFestivalDeleteMode}
                  festivalId={festivalId}
                />
              )}
            </div>
          ))}
        </InfoButton.ItemContainer>
      </InfoButton.TotalWrap>
      <Spacing />
      <Calender festivalDates={selectedFestivalDates} />
      <Spacing />
      <TimeTableBoard
        timeTableInfo={TIME_TABLE_INFO}
        isEditTimeTableMode={isEditTimeTableMode}
        isFestivalDeleteMode={isFestivalDeleteMode}
      />
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
