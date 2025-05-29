import { Button, Header } from '@confeti/design-system';
import {
  BtnDeleteBlack20,
  IcApple,
  IcKakao,
  ImgTypelogoBig,
} from '@confeti/design-system/icons';
import { ENV_CONFIG } from '@shared/constants/config';
import { routePath } from '@shared/router/path';

import { useAppleLoginMutation } from '../hooks/use-social-login-mutation';
import { getAppleAuthData, initAppleAuth } from '../utils/apple-login';

import * as styles from './login-page.css';

const DESCRIPTION_TEXT =
  '가입 시, confeti의\n[이용약관] 및 [개인정보처리방침]에 동의하게 돼요.';

const LINK_MAP: Record<string, string> = {
  이용약관: routePath.PRIVACY_CONFETI,
  개인정보처리방침: routePath.PRIVACY_PERSONAL,
};

const parseLinkContent = (
  part: string,
  lineIndex: number,
  index: number,
): JSX.Element | string => {
  const [, content] = part.match(/\[(.*?)\]/) || [];
  const link = content && LINK_MAP[content];

  return link ? (
    <a
      key={`${lineIndex}-${index}-${content}`}
      href={link}
      className={styles.atagText}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  ) : (
    part
  );
};

const processLine = (
  line: string,
  lineIndex: number,
): (JSX.Element | string)[] => {
  if (!line) return [];
  const parts = line.split(/(\[.*?\])/);
  return parts.map((part, index) => parseLinkContent(part, lineIndex, index));
};

const LoginPage = () => {
  const { mutate: appleLoginMutate } = useAppleLoginMutation();

  const REDIRECT_URI =
    window.location.hostname === 'localhost'
      ? 'http://localhost:5173/auth'
      : 'https://confeti.co.kr/auth';

  const handleAppleLogin = async () => {
    try {
      initAppleAuth();
      const loginData = await getAppleAuthData();
      appleLoginMutate(loginData);
    } catch (error) {
      console.error('애플 로그인 에러:', error);
    }
  };

  const handleKakaoLogin = () => {
    window.location.href = `${ENV_CONFIG.KAKAO_URI}&redirect_uri=${REDIRECT_URI}`;
  };

  return (
    <>
      <Header
        variant="detail"
        title="로그인"
        icon={<BtnDeleteBlack20 width="2rem" height="2rem" />}
        isBackToHome
      />
      <section className={styles.container}>
        <div>
          <img
            src="/images/confeti_3d_logo21.svg"
            className={styles.logoImage}
            alt="confeti logo"
          />
          <ImgTypelogoBig width="17rem" height="4rem" />
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.loginButton}>
            <Button
              text="카카오로 계속하기"
              variant="kakao"
              icon={<IcKakao width="2.4rem" height="2.4rem" />}
              onClick={handleKakaoLogin}
            />
            <Button
              text="Apple로 계속하기"
              variant="apple"
              icon={<IcApple width="2.4rem" height="2.4rem" />}
              onClick={handleAppleLogin}
            />
          </div>
          <footer className={styles.description}>
            {processLine(DESCRIPTION_TEXT, 0)}
          </footer>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
