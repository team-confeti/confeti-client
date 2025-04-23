import FestivalButton from '@pages/time-table/components/festival-selector/festival-button';

import { DropdownMenu } from '@confeti/design-system';
import {
  BtnMeatball,
  IcTimetableAddfestival,
  IcTimetableDeletefestival,
} from '@confeti/design-system/icons';
import { FestivalTimetableResponse } from '@shared/types/festival-timetable-response';

import * as styles from './festival-selector.css';

const FestivalSelector = ({ festivals }: FestivalTimetableResponse) => {
  return (
    <div className={styles.festivalSelectorWrapper}>
      <div className={styles.festivalButtonsWrapper}>
        {festivals.map(({ festivalId, title, logoUrl }) => (
          <FestivalButton
            isSelected={true}
            key={festivalId}
            imgUrl={logoUrl}
            title={title}
          />
        ))}
      </div>

      <div className={styles.dropdownContainer}>
        <DropdownMenu>
          <DropdownMenu.Trigger>
            <BtnMeatball width={'2.4rem'} height={'2.4rem'} />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item label="페스티벌 추가하기">
              <IcTimetableAddfestival width={'2rem'} height={'2rem'} />
            </DropdownMenu.Item>
            <DropdownMenu.Item label="페스티벌 삭제하기">
              <IcTimetableDeletefestival width={'2rem'} height={'2rem'} />
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FestivalSelector;
