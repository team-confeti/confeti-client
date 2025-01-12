import {
  LogoMain,
  BtnSearchG90024,
  BtnAccountGray24,
  BtnArrowLeft20,
} from '../../icons/src';
import * as styles from './header.css';

interface HeaderProps {
  variant?: 'default' | 'detail';
  title?: string;
  onBackClick?: () => void;
}

const Header = ({ variant = 'default', title, onBackClick }: HeaderProps) => {
  if (variant === 'detail') {
    return (
      <header className={styles.container.detail}>
        <button
          className={styles.button.back}
          onClick={onBackClick}
          aria-label="뒤로가기"
        >
          <BtnArrowLeft20 className={styles.icon} />
        </button>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.spacer} />
      </header>
    );
  }

  return (
    <header className={styles.container.default}>
      <LogoMain className={styles.logo} />
      <div className={styles.iconSection}>
        <button className={styles.button.default} aria-label="검색">
          <BtnSearchG90024 className={styles.icon} />
        </button>
        <button className={styles.button.default} aria-label="프로필">
          <BtnAccountGray24 className={styles.icon} />
        </button>
      </div>
    </header>
  );
};

export default Header;
