import { useLogoutMutation } from '@pages/my/hooks/use-logout';

import { Button } from '@confeti/design-system';

import * as styles from './logout-section.css';

const LogoutSection = () => {
  const { mutate: logout } = useLogoutMutation();

  // TODO: logout 버튼 클릭시 로그아웃 모달 띄우기
  const handleLogout = () => {
    logout();
  };

  return (
    <section className={styles.container}>
      <Button onClick={handleLogout} text="로그아웃" variant="logout" />
    </section>
  );
};

export default LogoutSection;
