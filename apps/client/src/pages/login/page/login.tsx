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
        <div className={styles.Logo}>
          <Confeti3DLogo21 width={'18rem'} height={'18rem'} />
          <ImgTypelogoBig width={'17rem'} height={'4rem'} />
        </div>
        <div className={styles.loginButtonSection}>
          <Button
            text="카카오로 계속하기"
            variant="kakao"
            icon={<IcKakao width={'2.4rem'} height={'2.4rem'} />}
          />
          <Button
            text="애플로 계속하기"
            variant="apple"
            icon={<IcApple width={'2.4rem'} height={'2.4rem'} />}
          />
        </div>
      </section>
      <div className={styles.description}>
        <p>{DESCRIPTION.description[0]}</p>
        <a href={routePath.ROOT} className={styles.atagText}>
          {DESCRIPTION.atagText[0]}
        </a>
        {DESCRIPTION.description[1]}
        <a href={routePath.ROOT} className={styles.atagText}>
          {DESCRIPTION.atagText[1]}
        </a>
        {DESCRIPTION.description[2]}
      </div>
    </>
  );
};

export default Login;
