import { useNavigate } from 'react-router-dom';

import { Avatar } from '@confeti/design-system';
import { IcArrowGray16, IcEdit16 } from '@confeti/design-system/icons';
import { routePath } from '@shared/router/path';

import * as styles from './user-info.css.ts';

interface Props {
  name: string;
  profileUrl: string;
  showEditBtn?: boolean;
  showArrow?: boolean;
  onEditImage?: () => void;
}

const USER_POSTFIX = '님' as const;

const UserInfo = ({
  name,
  profileUrl,
  showEditBtn,
  showArrow,
  onEditImage,
}: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(routePath.MY_EDIT_PROFILE);
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
          <IcEdit16 className={styles.editIcon} onClick={onEditImage} />
        )}
      </div>

      <div className={styles.userInfo}>
        <div className={styles.titleWrapper} onClick={handleClick}>
          <h2 className={styles.title}>{name}</h2>
          <p className={styles.titlePostfix}>{USER_POSTFIX}</p>
          {showArrow && <IcArrowGray16 width={'1.6rem'} height={'1.6rem'} />}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
