import { useNavigate } from 'react-router-dom';

import { Avatar } from '@confeti/design-system';
import { IcArrowGray16, IcEdit16 } from '@confeti/design-system/icons';

import * as styles from './user-info.css.ts';

interface Props {
  name: string;
  profileUrl: string;
  showEditBtn?: boolean;
  showArrow?: boolean;
}

const USER_POSTFIX = '님' as const;

const UserInfo = ({
  name,
  profileUrl,
  showEditBtn,
  showArrow = true,
}: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/my/edit-profile');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.profileWrapper}>
        <Avatar src={profileUrl} alt={`${name}의 프로필 이미지`} size="xl" />
        {showEditBtn && <IcEdit16 className={styles.editIcon} />}
      </div>

      <div className={styles.userInfo}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>{name}</h2>
          <p className={styles.titlePostfix}>{USER_POSTFIX}</p>
          {showArrow && (
            <IcArrowGray16 className={styles.arrowIcon} onClick={handleClick} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
