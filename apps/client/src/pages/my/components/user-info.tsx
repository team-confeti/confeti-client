import LogoutButton from './logout-button.tsx';
import * as styles from './user-info.css.ts';

const list = {
  userName: '집나간 구름',
  profileUrl: 'https://dummyimage.com/80x80',
};

const USER_POSTFIX = '님';

const UserInfo = () => {
  return (
    <div className={styles.wrapper}>
      <img
        src={list.profileUrl}
        alt={`${list.userName}의 아바타`}
        className={styles.img}
      />

      <div className={styles.userInfo}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>{list.userName}</h2>
          <p className={styles.titlePostfix}>{USER_POSTFIX}</p>
        </div>

        <LogoutButton text="로그아웃하기" />
      </div>
    </div>
  );
};

export default UserInfo;
