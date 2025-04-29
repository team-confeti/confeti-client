import { Header } from '@confeti/design-system';
import { Button } from '@confeti/design-system';
import {
  BtnDeleteBlack20,
  Confeti3DLogo21,
  IcApple,
  IcKakao,
  ImgTypelogoBig,
} from '@confeti/design-system/icons';
import { CONFIG } from '@shared/constants/api';
import { routePath } from '@shared/constants/path';
import { getAppleAuthData, initAppleAuth } from '@shared/utils/apple-login';

import { useAppleLoginMutation } from '../hooks/use-social-login-mutation';

import * as styles from './login.css';

const DESCRIPTION_TEXT =
  '가입 시, confeti의\n[이용약관] 및 [개인정보처리방침]에 동의하게 돼요.';
const LINK_MAP: LinkMap = {
  이용약관: routePath.PRIVACY_CONFETI,
  개인정보처리방침: routePath.PRIVACY_PERSONAL,
};

interface LinkMap {
  [key: string]: string;
}

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
  const processedParts = parts.map((part, index) =>
    parseLinkContent(part, lineIndex, index),
  );

  return processedParts;
};

const Login = () => {
  const { mutate: appleLoginMutate } = useAppleLoginMutation();

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
    const redirectUri =
      window.location.hostname === 'localhost'
        ? 'http://localhost:5173/'
        : 'https://confeti.co.kr/';

    window.location.href = `${CONFIG.KAKAO_URI}&redirect_uri=${redirectUri}`;
  };

  return (
    <>
      <Header
        variant="detail"
        title="로그인"
        icon={<BtnDeleteBlack20 width={'2rem'} height={'2rem'} />}
        isBackToHome={true}
      />
      <section className={styles.container}>
        <div>
          <Confeti3DLogo21 width={'18rem'} height={'18rem'} />
          <ImgTypelogoBig width={'17rem'} height={'4rem'} />
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.loginButton}>
            <Button
              text="카카오로 계속하기"
              variant="kakao"
              icon={<IcKakao width={'2.4rem'} height={'2.4rem'} />}
              onClick={handleKakaoLogin}
            />
            <Button
              text="Apple로 계속하기"
              variant="apple"
              icon={<IcApple width={'2.4rem'} height={'2.4rem'} />}
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

export default Login;
