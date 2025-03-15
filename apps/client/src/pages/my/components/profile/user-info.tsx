import LogoutButton from './logout-button.tsx';
import * as styles from './user-info.css.ts';
import { useLogoutMutation } from '@pages/my/hooks/use-logout.ts';

interface Props {
  userName: string;
  profileUrl: string;
}

const USER_POSTFIX = '님' as const;

const UserInfo = ({ userName, profileUrl }: Props) => {
  const { mutate: logout } = useLogoutMutation();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={styles.wrapper}>
      <img
        src={profileUrl}
        alt={`${userName}의 아바타`}
        className={styles.img}
      />

      <div className={styles.userInfo}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>{userName}</h2>
          <p className={styles.titlePostfix}>{USER_POSTFIX}</p>
        </div>

        <LogoutButton text="로그아웃하기" onClick={handleLogout} />
      </div>
    </div>
  );
};

export default UserInfo;
