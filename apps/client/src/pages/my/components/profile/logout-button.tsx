import { IcArrowGray16 } from '@confeti/design-system/icons';
import * as styles from './logout-button.css.ts';

interface Props {
  text: string;
  onClick: () => void;
}

const LogoutButton = ({ text, onClick }: Props) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
      <IcArrowGray16 />
    </button>
  );
};

export default LogoutButton;
