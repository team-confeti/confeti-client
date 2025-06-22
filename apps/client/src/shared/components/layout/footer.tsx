import { Icon } from '@confeti/design-system/icon';

import { EXTERNAL_LINKS } from '@shared/constants/links';

import * as styles from './footer.css';

const Footer = () => {
  const list = {
    companyInfo: [
      { label: '대표', value: '김가연' },
      { label: '이메일', value: 'weareconfeti@gmail.com' },
    ],
    legalInfo: EXTERNAL_LINKS.filter((link) =>
      ['개인정보처리방침', '이용약관'].includes(link.label),
    ),
  } as const;

  return (
    <footer className={styles.container}>
      <div className={styles.logoSection}>
        <Icon name="logo-footer" width="7.8rem" height="2.1rem" />
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
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
