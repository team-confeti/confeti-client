import * as styles from './radio-option.css';

const RadioOption = () => {
  return (
    <label className={styles.wrapper}>
      <input type="radio" className={styles.radioStyle} />
      <span>원하는 공연이 많이 없어서</span>
    </label>
  );
};

export default RadioOption;
