import FestivalButton from '@pages/time-table/components/festival-selector/festival-button';

import {
  CheckboxFestival,
  CheckboxFestivalActive,
} from '@confeti/design-system/icons';
import { cn } from '@confeti/design-system/utils';
import { FestivalTimetable } from '@shared/types/festival-timetable-response';

import * as styles from './delete-festival-selector.css';

interface Props {
  festivals: FestivalTimetable[];
  festivalsToDelete: number[];
  handleToggleFestival: (id: number) => void;
}

const DeleteFestivalSelector = ({
  festivals,
  festivalsToDelete,
  handleToggleFestival,
}: Props) => {
  return (
    <>
      <div className={styles.festivalButtonsWrapper}>
        {festivals.map(({ festivalId, title, logoUrl }) => (
          <FestivalButton
            isSelected={false}
            imgUrl={logoUrl}
            title={title}
            key={festivalId}
            onClick={() => handleToggleFestival(festivalId)}
            className={cn(styles.festivalButtonBox)}
          >
            <input
              type="checkbox"
              checked={festivalsToDelete.includes(festivalId)}
              onChange={() => handleToggleFestival(festivalId)}
              className={styles.checkBox}
            />
            {/* 체크 상태에 따라 active 또는 inactive 컴포넌트 렌더링 */}
            {festivalsToDelete.includes(festivalId) ? (
              <CheckboxFestivalActive
                width={'2.2rem'}
                height={'2.2rem'}
                className={styles.checkboxBase}
              />
            ) : (
              <CheckboxFestival
                width={'2.2rem'}
                height={'2.2rem'}
                className={styles.checkboxBase}
              />
            )}
          </FestivalButton>
        ))}
      </div>
    </>
  );
};

export default DeleteFestivalSelector;
