import { useNavigate } from 'react-router-dom';

import { Avatar } from '@confeti/design-system';
import { IcArrowGray16 } from '@confeti/design-system/icons';

import * as styles from './user-info.css.ts';

interface Props {
  name: string;
  profileUrl: string;
}

const USER_POSTFIX = '님' as const;

const UserInfo = ({ name, profileUrl }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/my/edit-profile');
  };

  return (
    <div className={styles.wrapper}>
      <Avatar src={profileUrl} alt={`${name}의 프로필 이미지`} size="xl" />

      <div className={styles.userInfo}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>{name}</h2>
          <p className={styles.titlePostfix}>{USER_POSTFIX}</p>
          <IcArrowGray16 width="1.6rem" height="1.6rem" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
