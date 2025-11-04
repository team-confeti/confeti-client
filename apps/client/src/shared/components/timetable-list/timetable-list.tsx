import { Avatar, Chip } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import * as styles from './timetable-list.css';

interface TimetableItem {
  id: number;
  posterUrl: string;
  title: string;
  dDay: string;
}

interface TimetableListProps {
  children: React.ReactNode;
}

const TimetableListRoot = ({ children }: TimetableListProps) => {
  return <ul className={styles.wrapper}>{children}</ul>;
};

interface ItemProps {
  timetable: TimetableItem;
  onClick?: () => void;
}

const TimetableListItem = ({
  timetable,
  onClick,
  children,
}: ItemProps & { children?: React.ReactNode }) => {
  return (
    <li className={styles.item} onClick={onClick}>
      <div className={styles.itemContent}>
        <Avatar
          src={timetable.posterUrl}
          alt={timetable.title}
          size="md"
          isHandleClick={false}
          className={styles.avatar}
        />
        <div className={styles.content}>
          {/* TODO: 실제 Chip로직에 맞게 수정 */}
          <Chip className={styles.chip} variant="assist">
            {timetable.dDay}
          </Chip>
          <h2 className={styles.title}>{timetable.title}</h2>
        </div>
      </div>
      {children}
    </li>
  );
};

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const TimetableListCheckbox = ({ checked, onChange }: CheckboxProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange();
  };

  return (
    <div className={styles.checkbox} onClick={handleClick}>
      <Icon
        name={checked ? 'checkbox-active' : 'checkbox-default'}
        size="2.4rem"
        color={checked ? 'confeti_lime' : 'gray400'}
      />
    </div>
  );
};

export const TimetableList = Object.assign(TimetableListRoot, {
  Item: TimetableListItem,
  Checkbox: TimetableListCheckbox,
});
