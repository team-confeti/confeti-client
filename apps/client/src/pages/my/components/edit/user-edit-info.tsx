import { Avatar } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import { LogClickEvent } from '@shared/analytics/logging';

import * as styles from './user-edit-info.css.ts';

interface Props {
  name: string;
  profileUrl: string;
  onEditImage?: () => void;
}

const USER_POSTFIX = '님' as const;

const UserEditInfo = ({ name, profileUrl, onEditImage }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.profileWrapper}>
        <Avatar
          src={profileUrl}
          alt={`${name}의 프로필 이미지`}
          size="xl"
          isHandleClick={false}
        />
        <LogClickEvent name="click_profile_edit_image">
          <Icon
            name="edit"
            className={styles.editIcon}
            onClick={onEditImage}
            size="1.6rem"
          />
        </LogClickEvent>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>{name}</h2>
          <p className={styles.titlePostfix}>{USER_POSTFIX}</p>
        </div>
      </div>
    </div>
  );
};

export default UserEditInfo;
