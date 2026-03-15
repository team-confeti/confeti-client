import { LogIn, ShieldAlert } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

import { getLoginPath } from '@shared/constants/path';

import * as styles from './login-required.css';

const LoginRequired = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(
      getLoginPath(`${location.pathname}${location.search}${location.hash}`),
    );
  };

  return (
    <div className={styles.container}>
      <ShieldAlert className={styles.icon} />
      <h2 className={styles.title}>로그인이 필요합니다</h2>
      <p className={styles.message}>
        관리자 페이지를 이용하려면 팀원 계정으로 로그인해 주세요.
      </p>
      <button className={styles.loginButton} onClick={handleLoginClick}>
        <LogIn size={18} />
        로그인하기
      </button>
    </div>
  );
};

export default LoginRequired;
