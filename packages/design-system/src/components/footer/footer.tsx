import { LogoFooter } from '../../icons/src';
import * as styles from './footer.css';

const list = {
  leftItems: [
    { label: '대표', value: '김가연' },
    { label: '이메일', value: 'weareconfeti@gamil.com' },
  ],
  rightItems: [{ label: '개인정보처리방침' }, { label: '이용약관' }],
};

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.logoSection}>
        <LogoFooter className={styles.logo} />
      </div>

      <div className={styles.textSection}>
        <ul className={styles.left}>
          {list.leftItems.map((item, index) => (
            <li key={index}>
              {item.label} | {item.value}
            </li>
          ))}
        </ul>

        <ul className={styles.right}>
          {list.rightItems.map((item, index) => (
            <li key={index}>{item.label}</li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
