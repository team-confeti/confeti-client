import { useState } from 'react';
import { Spacing } from '@confeti/design-system';
import Calender from '../components/calender/calender';
import InfoButton from '../components/info/info-button';
import { REGISTERDED_FESTIVAL } from '../mocks/festival-data';

const TimeTable = () => {
  const festivals = REGISTERDED_FESTIVAL.data.festivals;
  const festivalDates = festivals.flatMap((festival) => festival.festivalDates);

  const [clickedFestivalId, setClickedFestivalId] = useState<number | null>(
    null,
  );

  const handleClicked = (festivalId: number) => {
    setClickedFestivalId((prevId) =>
      prevId === festivalId ? null : festivalId,
    );
  };

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
              onClick={() => handleClicked(festivalId)}
              isClicked={clickedFestivalId === festivalId}
            />
          ))}
        </InfoButton.ItemContainer>
      </InfoButton.TotalWrap>
      <Spacing />
      <Calender festivalDates={festivalDates} />
    </>
  );
};

export default TimeTable;
