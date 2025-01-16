import { Spacing } from '@confeti/design-system';
import InfoButton from '../components/info-button';
import { REGISTERDED_FESTIVAL } from '../mocks/festival-data';

const TimeTable = () => {
  const festivals = REGISTERDED_FESTIVAL.data.festivals;

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
            ></InfoButton.Items>
          ))}
        </InfoButton.ItemContainer>
      </InfoButton.TotalWrap>
      <Spacing />
    </>
  );
};

export default TimeTable;
