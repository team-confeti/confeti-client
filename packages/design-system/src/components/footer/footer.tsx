import { LogoFooter } from '../../icons/src';

import * as styles from './footer.css';

const list = {
  companyInfo: [
    { label: '대표', value: '김가연' },
    { label: '이메일', value: 'weareconfeti@gmail.com' },
  ],
  legalInfo: [{ label: '개인정보처리방침' }, { label: '이용약관' }],
} as const;

const Footer = () => (
  <footer className={styles.container}>
    <div className={styles.logoSection}>
      <LogoFooter className={styles.logo} />
    </div>

    <div className={styles.textSection}>
      <ul className={styles.left}>
        {list.companyInfo.map((item, index) => (
          <li key={index}>
            {item.label} | {item.value}
          </li>
        ))}
      </ul>

      <ul className={styles.right}>
        {list.legalInfo.map((item, index) => (
          <li key={index}>{item.label}</li>
        ))}
      </ul>
    </div>
  </footer>
);

export default Footer;
