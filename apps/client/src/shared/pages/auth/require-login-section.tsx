import { useNavigate } from 'react-router-dom';

import { Button } from '@confeti/design-system';

import { routePath } from '@shared/router/path';

import * as styles from './require-login-section.css';

type RoutePathType = (typeof routePath)[keyof typeof routePath];

interface RequireLoginSectionProps {
  redirectPath?: RoutePathType;
}

const RequireLoginSection = ({
  redirectPath = routePath.LOGIN,
}: RequireLoginSectionProps) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(redirectPath);
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>로그인이 필요한 서비스예요!</h2>
        <p className={styles.description}>
          회원 로그인을 하면 각종 정보를 제공 받을 수 있어요
        </p>
      </div>
      <Button
        className={styles.button}
        text="로그인하기"
        onClick={handleLoginClick}
      />
    </section>
  );
};

export default RequireLoginSection;
