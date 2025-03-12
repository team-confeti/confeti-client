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
      <div className={styles.container}>
        <div>
          <Confeti3DLogo21 width={'18rem'} height={'18rem'} />
          <ImgTypelogoBig width={'17rem'} height={'4rem'} />
        </div>
      </div>
    </>
  );
};

export default Login;
