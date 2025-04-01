import { Avatar } from '@confeti/design-system';
import { IcArrowGray16 } from '@confeti/design-system/icons';

import * as styles from './user-info.css.ts';

interface Props {
  name: string;
  profileUrl: string;
}

const USER_POSTFIX = '님' as const;

const UserInfo = ({ name, profileUrl }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Avatar src={profileUrl} alt={`${name}의 프로필 이미지`} size="xl" />

      <div className={styles.userInfo}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>{name}</h2>
          <p className={styles.titlePostfix}>{USER_POSTFIX}</p>
          <IcArrowGray16 width={16} height={16} />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
