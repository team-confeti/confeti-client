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
  const bracketMatch = part.match(/\[(.*?)\]/);
  if (bracketMatch) {
    const content = bracketMatch[1];
    const link = LINK_MAP[content];

    if (link) {
      return (
        <a
          key={`${lineIndex}-${index}-${content}`}
          href={link}
          className={styles.atagText}
          target="_blank"
          rel="noreferrer"
        >
          {content}
        </a>
      );
    }
  }
  return part;
};

const processLine = (line: string, lineIndex: number): JSX.Element => {
  const parts = line.split(/(\[.*?\])/);
  const processedParts = parts.map((part, index) =>
    parseLinkContent(part, lineIndex, index),
  );

  return <p key={`line-${lineIndex}`}>{processedParts}</p>;
};

const parseDescription = (text: string): (JSX.Element | string)[] | null => {
  if (!text) return null;

  const lines = text.split('\n');
  return lines.map((line, lineIndex) => processLine(line, lineIndex));
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
        <div className={styles.bottomSection}>
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
          <footer className={styles.description}>
            {parseDescription(DESCRIPTION_TEXT)}
          </footer>
        </div>
      </section>
    </>
  );
};

export default Login;
