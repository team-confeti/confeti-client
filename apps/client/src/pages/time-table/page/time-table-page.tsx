import { Spacing } from '@confeti/design-system';
import EditFloatingButton from '@pages/time-table/components/edit/edit-floating-button';
import Calender from '../components/calender/calender';
import InfoButton from '../components/info/info-button';
import TimeTableSection from '@pages/time-table/components/time-table-section/time-table-section';
import { REGISTERDED_FESTIVAL } from '../mocks/festival-data';
import useButtonSelection from '../hooks/use-button-selection';

const TimeTablePage = () => {
  const festivals = REGISTERDED_FESTIVAL.data.festivals;
  const { clickedFestivalId, selectedFestivalDates, handleFestivalClick } =
    useButtonSelection(festivals);

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
      <Calender festivalDates={selectedFestivalDates} />
      <Spacing />
      <TimeTableSection />
      <EditFloatingButton></EditFloatingButton>
    </>
  );
};

export default TimeTablePage;
