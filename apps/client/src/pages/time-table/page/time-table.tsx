import { FestivalCard, Spacing } from '@confeti/design-system';
import { BtnFestivalDelete } from '@confeti/design-system/icons';
import { TIME_TABLE_INFO } from '@shared/mocks/time-table';
import TimeTableBoard from '@pages/time-table/components/time-table-board/time-table-board';
import EditFloatingButton from '@pages/time-table/components/edit/edit-floating-button';
import Calender from '../components/calender/calender';
import InfoButton from '../components/info/info-button';

import { useButtonSelection } from '../hooks/use-button-selection';
import { useEditModes } from '../hooks/use-edit-mode';
import { useFestivalTimetables } from '../hooks/use-festival-timetables';
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
              <button className={styles.closeBtn({ isFestivalDeleteMode })}>
                <BtnFestivalDelete
                  width={'2.4rem'}
                  height={'2.4rem'}
                ></BtnFestivalDelete>
              </button>
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
