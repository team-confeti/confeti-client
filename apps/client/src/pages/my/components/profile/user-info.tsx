import { useNavigate } from 'react-router-dom';

import { Avatar } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import { routePath } from '@shared/router/path';

import * as styles from './user-info.css.ts';

interface Props {
  name: string;
  profileUrl: string;
  showEditBtn?: boolean;
  showArrow?: boolean;
  onEditImage?: () => void;
  disableClick?: boolean;
}

const USER_POSTFIX = '님' as const;

const UserInfo = ({
  name,
  profileUrl,
  showEditBtn,
  showArrow,
  onEditImage,
  disableClick = false,
}: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!disableClick) {
      navigate(routePath.MY_EDIT_PROFILE);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.profileWrapper}>
        <Avatar
          src={profileUrl}
          alt={`${name}의 프로필 이미지`}
          size="xl"
          isHandleClick={false}
        />
        {showEditBtn && (
          <Icon
            name="edit"
            className={styles.editIcon}
            onClick={onEditImage}
            size="1.6rem"
          />
        )}
      </div>

      <div className={styles.userInfo}>
        <div className={styles.titleWrapper} onClick={handleClick}>
          <h2 className={styles.title}>{name}</h2>
          <p className={styles.titlePostfix}>{USER_POSTFIX}</p>
          {showArrow && (
            <Icon name="arrow-horizontal" size="1.6rem" color="gray500" />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
