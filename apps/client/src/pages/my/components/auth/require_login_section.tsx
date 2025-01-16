import { useNavigate } from 'react-router-dom';

import { Button } from '@confeti/design-system';
import { routePath } from '@shared/constants/path';
import * as styles from './require_login_section.css';

const RequireLoginSection = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    const userId = localStorage.getItem('user-id');
    if (!userId) {
      localStorage.setItem('user-id', '1');
    }
    navigate(routePath.MY);
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>로그인이 필요한 서비스에요!</h2>
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
