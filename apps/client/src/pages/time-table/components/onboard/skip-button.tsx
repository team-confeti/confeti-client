import * as styles from './skip-button.css';
interface SkipButtonProps {
  onClick?: () => void;
}
const SkipButton = ({ onClick }: SkipButtonProps) => {
  return (
    <button className={styles.skipButton} onClick={onClick}>
      SKIP
    </button>
  );
};

export default SkipButton;
