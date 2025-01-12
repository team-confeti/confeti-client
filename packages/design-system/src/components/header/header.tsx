import { LogoMain, BtnSearchG90024, BtnAccountGray24 } from '../../icons/src';
import * as styles from './header.css';

const Header = () => (
  <header className={styles.container}>
    <LogoMain className={styles.logo} />

    <div className={styles.iconSection}>
      <button className={styles.iconButton} aria-label="Search">
        <BtnSearchG90024 className={styles.icon} />
      </button>
      <button className={styles.iconButton} aria-label="Account">
        <BtnAccountGray24 className={styles.icon} />
      </button>
    </div>
  </header>
);

export default Header;
