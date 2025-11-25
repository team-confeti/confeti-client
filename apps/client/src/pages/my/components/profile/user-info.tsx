import { useNavigate } from 'react-router-dom';

import { Avatar } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import { routePath } from '@shared/router/path.ts';

import * as styles from './user-info.css.ts';

interface Props {
  name: string;
  profileUrl: string;
}

const UserInfo = ({ name, profileUrl }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(routePath.MY_EDIT_PROFILE);
  };
  return (
    <div className={styles.wrapper}>
      <Avatar
        src={profileUrl}
        alt={`${name}의 프로필 이미지`}
        size="xl"
        isHandleClick={false}
      />
      <div className={styles.titleWrapper} onClick={handleClick}>
        <h2 className={styles.title}>{name}</h2>
        <div className={styles.profileLink}>
          <p>내 프로필</p>
          <Icon name="arrow-horizontal" size="1.2rem" color="gray500" />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
