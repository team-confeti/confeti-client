import * as styles from './title.css';

interface TitleProps {
  text: string;
}

const Title = ({ text }: TitleProps) => {
  return <p className={styles.title}>{text}</p>;
};

export default Title;
