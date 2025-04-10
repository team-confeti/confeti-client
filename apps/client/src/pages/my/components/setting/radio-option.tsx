import * as styles from './radio-option.css';

interface RadioProps {
  text: string;
}

const RadioOption = ({ text }: RadioProps) => {
  return (
    <label className={styles.wrapper}>
      <input type="radio" className={styles.radioStyle} />
      <span>{text}</span>
    </label>
  );
};

export default RadioOption;
