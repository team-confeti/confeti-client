import { Avatar, Chip } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import * as styles from './festival-list.css';

interface FestivalItem {
  id: number;
  posterUrl: string;
  title: string;
  dDay: string;
}

interface FestivalListRootProps {
  children: React.ReactNode;
}

const FestivalListRoot = ({ children }: FestivalListRootProps) => {
  return <ul className={styles.wrapper}>{children}</ul>;
};

interface FestivalListItemProps {
  festival: FestivalItem;
  onClick?: () => void;
}

const FestivalListItem = ({
  festival,
  onClick,
  children,
}: FestivalListItemProps & { children?: React.ReactNode }) => {
  return (
    <li className={styles.item} onClick={onClick}>
      <div className={styles.itemContent}>
        <Avatar
          src={festival.posterUrl}
          alt={festival.title}
          size="md"
          isHandleClick={false}
          className={styles.avatar}
        />
        <div className={styles.content}>
          {/* TODO: 실제 Chip로직에 맞게 수정 */}
          <Chip className={styles.chip} variant="assist">
            {festival.dDay}
          </Chip>
          <p className={styles.title}>{festival.title}</p>
        </div>
      </div>
      {children}
    </li>
  );
};

interface FestivalListCheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const FestivalListCheckbox = ({
  checked,
  onChange,
}: FestivalListCheckboxProps) => {
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

export const FestivalList = Object.assign(FestivalListRoot, {
  Item: FestivalListItem,
  Checkbox: FestivalListCheckbox,
});
