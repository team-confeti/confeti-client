import * as styles from './skip-button.css';
interface SkipButtonProps {
  onClick?: () => void;
  text: string;
}
const SkipButton = ({ onClick, text }: SkipButtonProps) => {
  return (
    <button className={styles.skipButton} onClick={onClick}>
      {text}
    </button>
  );
};

export default SkipButton;
