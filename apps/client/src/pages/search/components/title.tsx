import * as styles from './title.css';

interface TitleProps {
  text: string;
}

const Title = ({ text }: TitleProps) => {
  return <h2 className={styles.title}>{text}</h2>;
};

export default Title;
