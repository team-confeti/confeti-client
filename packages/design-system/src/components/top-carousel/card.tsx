import * as styles from './card.css';
interface CardProps {
  posterUrl: string;
}

const Card = ({ posterUrl }: CardProps) => {
  return <img className={styles.card} src={posterUrl}></img>;
};

export default Card;
