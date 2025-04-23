import * as styles from './festival-button.css';

interface Props {
  isSelected: boolean;
  imgUrl: string;
  title: string;
}

const FestivalButton = ({ isSelected, imgUrl, title }: Props) => {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.festivalButton({ isSelected })}>
        <img src={imgUrl} alt={title} />
      </button>
      <span className={styles.text}>{title}</span>
    </div>
  );
};

export default FestivalButton;
