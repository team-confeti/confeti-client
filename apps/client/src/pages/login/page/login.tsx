import { Header } from '@confeti/design-system';
import {
  BtnDeleteBlack20,
  IcKakao,
  IcApple,
  ImgTypelogoBig,
  Confeti3DLogo21,
} from '@confeti/design-system/icons';
import { Button } from '@confeti/design-system';
import * as styles from './login.css';
import { routePath } from '@shared/constants/path';

const DESCRIPTION = {
  atagText: ['이용약관 ', ' 개인정보처리방침'],
  description: ['가입 시, confeti의', ' 및', '에 동의하게 돼요.'],
};

const Login = () => {
  return (
    <>
      <Header
        variant="detail"
        title="로그인"
        icon={<BtnDeleteBlack20 width={'2rem'} height={'2rem'} />}
      />
      <section className={styles.container}>
        <div>
          <Confeti3DLogo21 width={'18rem'} height={'18rem'} />
          <ImgTypelogoBig width={'17rem'} height={'4rem'} />
        </div>
        <section className={styles.bottomSection}>
          <div className={styles.loginButton}>
            <Button
              text="카카오로 계속하기"
              variant="kakao"
              icon={<IcKakao width={'2.4rem'} height={'2.4rem'} />}
            />
            <Button
              text="Apple로 계속하기"
              variant="apple"
              icon={<IcApple width={'2.4rem'} height={'2.4rem'} />}
            />
          </div>
          <div className={styles.description}>
            <p>{DESCRIPTION.description[0]}</p>
            <a
              href={routePath.PRIVACY_CONFETI}
              className={styles.atagText}
              target="_blank"
              rel="noreferrer"
            >
              {DESCRIPTION.atagText[0]}
            </a>
            {DESCRIPTION.description[1]}
            <a
              href={routePath.PRIVACY_PERSONAL}
              className={styles.atagText}
              target="_blank"
              rel="noreferrer"
            >
              {DESCRIPTION.atagText[1]}
            </a>
            {DESCRIPTION.description[2]}
          </div>
        </section>
      </section>
    </>
  );
};

export default Login;
