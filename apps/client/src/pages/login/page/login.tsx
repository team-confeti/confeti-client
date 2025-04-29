import { Header } from '@confeti/design-system';
import { Button } from '@confeti/design-system';
import {
  BtnDeleteBlack20,
  Confeti3DLogo21,
  IcApple,
  IcKakao,
  ImgTypelogoBig,
} from '@confeti/design-system/icons';
import { postSocialLogin } from '@shared/apis/auth/auth';
import { CONFIG } from '@shared/constants/api';
import { routePath } from '@shared/constants/path';

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

const handleLogin = (socialUrl: string) => {
  if (socialUrl === 'kakao') {
    window.location.href = CONFIG.KAKAO_URI;
  }
};

const REDIRECT_URI =
  window.location.protocol + '//' + window.location.host + '/callback/apple';

export const appleLogin = async () => {
  window.AppleID.auth.init({
    clientId: CONFIG.APPLE_CLIENT_ID,
    scope: 'name',
    redirectURI: 'https://collie-needed-globally.ngrok-free.app/callback/apple', // 네가 정한 콜백 URL
    state: 'initial',
    usePopup: true,
  });

  try {
    const res = await window.AppleID.auth.signIn();
    console.log('애플 로그인 결과:', res);
    console.log(res.user);

    const code = res.authorization?.code;
    const name = res.user?.name?.firstName
      ? `${res.user.name.firstName} ${res.user.name.lastName ?? ''}`.trim()
      : '';

    if (!code) {
      throw new Error('애플 로그인에 실패했습니다. (코드 없음)');
    }

    await postSocialLogin({
      provider: 'APPLE',
      code,
      name,
    });

    // 로그인 성공 후 이동
    window.location.href = '/'; // 홈으로 보내거나 원하는 페이지로 이동
  } catch (error) {
    console.error('애플 로그인 에러:', error);
  }
};

// export const appleLogin = async () => {
//   const RESPONSE_TYPE = 'code id_token'; // 요청하는 응답 타입
//   const RESPONSE_MODE = 'fragment';

//   const AUTH_URL =
//     `https://appleid.apple.com/auth/authorize?` +
//     `client_id=${encodeURIComponent(CONFIG.APPLE_CLIENT_ID)}` +
//     `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
//     `&response_type=${encodeURIComponent(RESPONSE_TYPE)}` +
//     `&response_mode=${encodeURIComponent(RESPONSE_MODE)}` +
//     `&scope=${encodeURIComponent('')}` +
//     `&state=${encodeURIComponent('previewInsure')}` +
//     `&nonce=${encodeURIComponent('821')}`;

//   // 브라우저에서 Apple 로그인 페이지로 리디렉션
//   window.location.href = AUTH_URL;
// };

const Login = () => {
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
              onClick={() => handleLogin('kakao')}
            />
            <Button
              text="Apple로 계속하기"
              variant="apple"
              icon={<IcApple width={'2.4rem'} height={'2.4rem'} />}
              onClick={appleLogin}
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
