import { useNavigate } from 'react-router-dom';
import FestivalButton from '@pages/time-table/components/festival-selector/festival-button';

import { DropdownMenu } from '@confeti/design-system';
import {
  BtnMeatball,
  IcTimetableAddfestival,
  IcTimetableDeletefestival,
} from '@confeti/design-system/icons';
import { routePath } from '@shared/router/path';
import { FestivalTimetable } from '@shared/types/festival-timetable-response';

import * as styles from './festival-selector.css';

interface Props {
  festivals: FestivalTimetable[];
  selectedFestivalId: number;
  handleSelectFestival: (id: number) => void;
}

const FestivalSelector = ({
  festivals,
  selectedFestivalId,
  handleSelectFestival,
}: Props) => {
  const navigate = useNavigate();
  const handleAddFestival = () => {
    navigate(`${routePath.ADD_FESTIVAL}`);
  };
  const handleDeleteFestival = () => {
    navigate(`${routePath.DELETE_FESTIVAL}`);
  };

  return (
    <div className={styles.festivalSelectorWrapper}>
      <div className={styles.festivalButtonsWrapper}>
        {festivals.map(({ festivalId, title, logoUrl }) => (
          <FestivalButton
            isSelected={festivalId == selectedFestivalId}
            key={festivalId}
            imgUrl={logoUrl}
            title={title}
            onClick={() => handleSelectFestival(festivalId)}
          />
        ))}
      </div>
      <div className={styles.dropdownContainer}>
        <DropdownMenu>
          <DropdownMenu.Trigger>
            {({ open }: { open: boolean }) => (
              <BtnMeatball
                width={'2.4rem'}
                height={'2.4rem'}
                isDropdownOpen={open}
              />
            )}
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item
              label="페스티벌 추가하기"
              onClick={handleAddFestival}
            >
              <IcTimetableAddfestival width={'2rem'} height={'2rem'} />
            </DropdownMenu.Item>
            <DropdownMenu.Item
              label="페스티벌 삭제하기"
              onClick={handleDeleteFestival}
            >
              <IcTimetableDeletefestival width={'2rem'} height={'2rem'} />
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FestivalSelector;
