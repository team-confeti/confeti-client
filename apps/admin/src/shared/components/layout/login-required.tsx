import { LogIn, ShieldAlert } from 'lucide-react';

import * as styles from './login-required.css';

const LOGIN_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5173/login'
    : 'https://www.confeti.co.kr/login';

const LoginRequired = () => {
  const handleLoginClick = () => {
    window.location.href = LOGIN_URL;
  };

  return (
    <div className={styles.container}>
      <ShieldAlert className={styles.icon} />
      <h2 className={styles.title}>로그인이 필요합니다</h2>
      <p className={styles.message}>
        관리자 페이지를 이용하려면 로그인 후 이용해 주세요.
      </p>
      <button className={styles.loginButton} onClick={handleLoginClick}>
        <LogIn size={18} />
        로그인하러 가기
      </button>
    </div>
  );
};

export default LoginRequired;
