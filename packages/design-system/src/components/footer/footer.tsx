import { LogoFooter } from '../../icons/src';

import * as styles from './footer.css';

const list = {
  companyInfo: [
    { label: '대표', value: '김가연' },
    { label: '이메일', value: 'weareconfeti@gmail.com' },
  ],
  legalInfo: [
    {
      label: '개인정보처리방침',
      href: 'https://wonderful-celestite-e3c.notion.site/confeti-1b4210e281b080e5ad4ad28c651a651a',
    },
    {
      label: '이용약관',
      href: 'https://wonderful-celestite-e3c.notion.site/confeti-1b3210e281b08080b766f48bf18d0be9',
    },
  ],
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
          <li key={index}>
            <a href={item.href} target="_blank" rel="noopener noreferrer">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </footer>
);

export default Footer;
