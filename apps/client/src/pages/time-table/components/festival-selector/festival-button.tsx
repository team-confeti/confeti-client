import { ButtonHTMLAttributes } from 'react';

import * as styles from './festival-button.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSelected: boolean;
  imgUrl: string;
  title: string;
}

const FestivalButton = ({ isSelected, imgUrl, title, ...props }: Props) => {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.festivalButton({ isSelected })} {...props}>
        <img src={imgUrl} alt={title} />
      </button>
      <span className={styles.text}>{title}</span>
    </div>
  );
};

export default FestivalButton;
