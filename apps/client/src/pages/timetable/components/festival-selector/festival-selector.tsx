import { useNavigate } from 'react-router-dom';
import FestivalButton from '@pages/timetable/components/festival-selector/festival-button';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { DropdownMenu } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';
import { FESTIVAL_TIMETABLE_QUERY_OPTIONS } from '@shared/apis/timetable/festival-timetable-queries';
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

  const { data } = useSuspenseInfiniteQuery(
    FESTIVAL_TIMETABLE_QUERY_OPTIONS.ADDABLE_FESTIVALS(),
  );

  const isEmpty = data.pages[0]?.festivals.length === 0;

  const handleAddFestival = () => {
    navigate(isEmpty ? routePath.NO_UPCOMING_FESTIVAL : routePath.ADD_FESTIVAL);
  };

  const handleDeleteFestival = () => {
    navigate(`${routePath.DELETE_FESTIVAL}`);
  };

  return (
    <div className={styles.festivalSelectorWrapper}>
      <div className={styles.festivalButtonsWrapper}>
        {festivals.map(({ festivalId, title, logoUrl }) => (
          <FestivalButton
            isSelected={festivalId === selectedFestivalId}
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
              <Icon
                className={styles.meatballButton({ isOpen: open })}
                name="meatball"
                size="2.4rem"
                color="confeti_lime3"
              />
            )}
          </DropdownMenu.Trigger>

          <DropdownMenu.Content>
            <DropdownMenu.Item
              label="페스티벌 추가하기"
              onClick={handleAddFestival}
            >
              <Icon name="add-timetable" size="2rem" />
            </DropdownMenu.Item>
            <DropdownMenu.Item
              label="페스티벌 삭제하기"
              onClick={handleDeleteFestival}
            >
              <Icon name="remove" size="2rem" />
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FestivalSelector;
