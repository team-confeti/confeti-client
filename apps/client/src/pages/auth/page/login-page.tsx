import { Button } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import { ENV_CONFIG } from '@shared/constants/config';
import { EXTERNAL_LINKS } from '@shared/constants/links';

import { useSocialLoginMutation } from '../hooks/use-social-login-mutation';
import { getAppleAuthData, initAppleAuth } from '../utils/apple-login';
import { getKakaoLoginRedirectUri } from '../utils/kakao-redirect-uri';

import * as styles from './login-page.css';

const DESCRIPTION_TEXT =
  '가입 시, confeti의\n[이용약관] 및 [개인정보처리방침]에 동의하게 돼요.';

const parseLinkContent = (
  part: string,
  lineIndex: number,
  index: number,
): React.JSX.Element | string => {
  const [, content] = part.match(/\[(.*?)\]/) || [];
  const link =
    content && EXTERNAL_LINKS.find((link) => link.label === content)?.url;

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
): (React.JSX.Element | string)[] => {
  if (!line) return [];
  const parts = line.split(/(\[.*?\])/);
  return parts.map((part, index) => parseLinkContent(part, lineIndex, index));
};

const LoginPage = () => {
  const { mutate: appleLoginMutate } = useSocialLoginMutation();

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
    window.location.href = `${ENV_CONFIG.KAKAO_URI}&redirect_uri=${encodeURIComponent(
      getKakaoLoginRedirectUri(),
    )}`;
  };

  return (
    <>
      <section className={styles.container}>
        <div>
          <Icon name="logo-big" size="18rem" />
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.loginButton}>
            <Button
              text="카카오로 계속하기"
              variant="kakao"
              icon={<Icon name="kakao" size="3rem" />}
              onClick={handleKakaoLogin}
              className={styles.button}
            />
            <Button
              text="Apple로 계속하기"
              variant="apple"
              icon={<Icon name="apple" size="3rem" />}
              onClick={handleAppleLogin}
              className={styles.button}
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
